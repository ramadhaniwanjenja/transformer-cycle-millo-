const express = require('express');
const { protect, admin } = require('../middleware/auth');
const User = require('../models/User'); // Added missing import
const { authorize } = require('../middleware/auth'); // Added missing import

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        user: req.user
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Placeholder for other user routes
router.get('/', protect, admin, async (req, res) => {
  res.json({
    success: true,
    message: 'Users route - to be implemented'
  });
});

// @desc    Get user statistics (admin only)
// @route   GET /api/users/stats
// @access  Private (admin only)
router.get('/stats', protect, authorize('admin'), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const adminUsers = await User.countDocuments({ role: 'admin' });
    const regularUsers = await User.countDocuments({ role: 'user' });

    res.json({
      success: true,
      data: {
        totalUsers,
        activeUsers,
        adminUsers,
        regularUsers
      }
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user statistics',
      error: error.message
    });
  }
});

module.exports = router; 