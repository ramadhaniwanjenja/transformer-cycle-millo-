const express = require('express');
const { protect } = require('../middleware/auth');
const Activity = require('../models/Activity');
const Pickup = require('../models/Pickup');
const User = require('../models/User');

const router = express.Router();

// @desc    Get user's recent activities
// @route   GET /api/activities
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const activities = await Activity.findRecentByUser(req.user.id, parseInt(limit));
    const unreadCount = await Activity.getUnreadCount(req.user.id);

    res.json({
      success: true,
      count: activities.length,
      unreadCount,
      data: activities
    });

  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching activities',
      error: error.message
    });
  }
});

// @desc    Mark activities as read
// @route   PUT /api/activities/mark-read
// @access  Private
router.put('/mark-read', protect, async (req, res) => {
  try {
    const { activityIds } = req.body;

    if (!activityIds || !Array.isArray(activityIds)) {
      return res.status(400).json({
        success: false,
        message: 'Activity IDs array is required'
      });
    }

    await Activity.markAsRead(req.user.id, activityIds);

    res.json({
      success: true,
      message: 'Activities marked as read successfully'
    });

  } catch (error) {
    console.error('Error marking activities as read:', error);
    res.status(500).json({
      success: false,
      message: 'Error marking activities as read',
      error: error.message
    });
  }
});

// @desc    Get user dashboard statistics
// @route   GET /api/activities/dashboard
// @access  Private
router.get('/dashboard', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Get user's pickup statistics
    const pickupStats = await Pickup.aggregate([
      { $match: { user: user._id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalWeight: { $sum: '$actualWeight' }
        }
      }
    ]);

    // Get recent activities
    const recentActivities = await Activity.findRecentByUser(req.user.id, 5);
    
    // Get unread count
    const unreadCount = await Activity.getUnreadCount(req.user.id);

    // Calculate total pickups and total weight
    const totalPickups = pickupStats.reduce((sum, stat) => sum + stat.count, 0);
    const totalWeight = pickupStats.reduce((sum, stat) => sum + (stat.totalWeight || 0), 0);

    // Get completed pickups for this month
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);

    const monthlyStats = await Pickup.aggregate([
      { 
        $match: { 
          user: user._id, 
          status: 'completed',
          completedAt: { $gte: currentMonth }
        } 
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          totalWeight: { $sum: '$actualWeight' },
          totalPoints: { $sum: '$greenPointsEarned' }
        }
      }
    ]);

    const monthlyData = monthlyStats[0] || { count: 0, totalWeight: 0, totalPoints: 0 };

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          greenPoints: user.greenPoints,
          profilePicture: user.profilePicture
        },
        statistics: {
          totalPickups,
          totalWeight,
          monthlyPickups: monthlyData.count,
          monthlyWeight: monthlyData.totalWeight,
          monthlyPoints: monthlyData.totalPoints,
          unreadActivities: unreadCount
        },
        recentActivities,
        pickupStats: pickupStats.reduce((acc, stat) => {
          acc[stat._id] = {
            count: stat.count,
            totalWeight: stat.totalWeight || 0
          };
          return acc;
        }, {})
      }
    });

  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data',
      error: error.message
    });
  }
});

// @desc    Get user's pickup history
// @route   GET /api/activities/pickup-history
// @access  Private
router.get('/pickup-history', protect, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    
    const query = { user: req.user.id };
    if (status) {
      query.status = status;
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 }
    };

    const pickups = await Pickup.paginate(query, options);

    res.json({
      success: true,
      data: pickups
    });

  } catch (error) {
    console.error('Error fetching pickup history:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching pickup history',
      error: error.message
    });
  }
});

// @desc    Get user's green points history
// @route   GET /api/activities/points-history
// @access  Private
router.get('/points-history', protect, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    
    const query = { 
      user: req.user.id,
      pointsEarned: { $gt: 0 }
    };

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 }
    };

    const activities = await Activity.paginate(query, options);

    res.json({
      success: true,
      data: activities
    });

  } catch (error) {
    console.error('Error fetching points history:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching points history',
      error: error.message
    });
  }
});

module.exports = router; 