const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const Pickup = require('../models/Pickup');
const User = require('../models/User');
const Activity = require('../models/Activity');
const { 
  sendPickupRequestNotification, 
  sendPickupApprovalNotification, 
  sendPickupRejectionNotification,
  sendPickupCompletionNotification 
} = require('../utils/email');

const router = express.Router();

// @desc    Submit a new pickup request
// @route   POST /api/pickups
// @access  Private (users only)
router.post('/', protect, async (req, res) => {
  try {
    const {
      pickupDate,
      pickupTime,
      address,
      wasteType,
      estimatedWeight,
      description,
      specialInstructions,
      isUrgent
    } = req.body;

    // Validate required fields
    if (!pickupDate || !pickupTime || !address || !wasteType || !estimatedWeight || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Validate waste type
    const validWasteTypes = ['electronics', 'batteries', 'plastics', 'paper', 'metal', 'glass', 'mixed'];
    if (!validWasteTypes.includes(wasteType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid waste type'
      });
    }

    // Validate estimated weight
    if (estimatedWeight < 0.1) {
      return res.status(400).json({
        success: false,
        message: 'Estimated weight must be at least 0.1 kg'
      });
    }

    // Create pickup request
    const pickup = await Pickup.create({
      user: req.user.id,
      pickupDate,
      pickupTime,
      address,
      wasteType,
      estimatedWeight,
      description,
      specialInstructions,
      isUrgent: isUrgent || false
    });

    // Populate user data for email
    await pickup.populate('user', 'firstName lastName email phone');

    // Create activity record
    await Activity.createPickupRequest(req.user.id, pickup._id, {
      wasteType,
      estimatedWeight,
      pickupDate
    });

    // Send notification to admin
    await sendPickupRequestNotification(pickup, pickup.user);

    res.status(201).json({
      success: true,
      message: 'Pickup request submitted successfully',
      data: pickup
    });

  } catch (error) {
    console.error('Error submitting pickup request:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting pickup request',
      error: error.message
    });
  }
});

// @desc    Get user's pickup requests
// @route   GET /api/pickups/my-pickups
// @access  Private (users only)
router.get('/my-pickups', protect, async (req, res) => {
  try {
    const pickups = await Pickup.findByUser(req.user.id);
    
    res.json({
      success: true,
      count: pickups.length,
      data: pickups
    });

  } catch (error) {
    console.error('Error fetching user pickups:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching pickup requests',
      error: error.message
    });
  }
});

// @desc    Get pickup by ID
// @route   GET /api/pickups/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const pickup = await Pickup.findById(req.params.id).populate('user', 'firstName lastName email phone');

    if (!pickup) {
      return res.status(404).json({
        success: false,
        message: 'Pickup request not found'
      });
    }

    // Check if user is authorized to view this pickup
    if (pickup.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this pickup request'
      });
    }

    res.json({
      success: true,
      data: pickup
    });

  } catch (error) {
    console.error('Error fetching pickup:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching pickup request',
      error: error.message
    });
  }
});

// @desc    Get all pickup requests (admin only)
// @route   GET /api/pickups
// @access  Private (admin only)
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (status) {
      query.status = status;
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      populate: 'user',
      sort: { createdAt: -1 }
    };

    const pickups = await Pickup.paginate(query, options);

    res.json({
      success: true,
      data: pickups
    });

  } catch (error) {
    console.error('Error fetching pickups:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching pickup requests',
      error: error.message
    });
  }
});

// @desc    Get pending pickup requests (admin only)
// @route   GET /api/pickups/pending
// @access  Private (admin only)
router.get('/pending', protect, authorize('admin'), async (req, res) => {
  try {
    const pickups = await Pickup.findPending();

    res.json({
      success: true,
      count: pickups.length,
      data: pickups
    });

  } catch (error) {
    console.error('Error fetching pending pickups:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching pending pickup requests',
      error: error.message
    });
  }
});

// @desc    Approve pickup request (admin only)
// @route   PUT /api/pickups/:id/approve
// @access  Private (admin only)
router.put('/:id/approve', protect, authorize('admin'), async (req, res) => {
  try {
    const { adminNotes } = req.body;

    const pickup = await Pickup.findById(req.params.id).populate('user', 'firstName lastName email phone greenPoints');

    if (!pickup) {
      return res.status(404).json({
        success: false,
        message: 'Pickup request not found'
      });
    }

    if (pickup.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Pickup request is not pending approval'
      });
    }

    // Approve the pickup
    await pickup.approve(req.user.id, adminNotes);

    // Create activity record
    await Activity.createPickupApproval(pickup.user._id, pickup._id, {
      wasteType: pickup.wasteType,
      estimatedWeight: pickup.estimatedWeight,
      pickupDate: pickup.pickupDate
    });

    // Send approval notification to user
    await sendPickupApprovalNotification(pickup, pickup.user);

    res.json({
      success: true,
      message: 'Pickup request approved successfully',
      data: pickup
    });

  } catch (error) {
    console.error('Error approving pickup:', error);
    res.status(500).json({
      success: false,
      message: 'Error approving pickup request',
      error: error.message
    });
  }
});

// @desc    Reject pickup request (admin only)
// @route   PUT /api/pickups/:id/reject
// @access  Private (admin only)
router.put('/:id/reject', protect, authorize('admin'), async (req, res) => {
  try {
    const { adminNotes } = req.body;

    if (!adminNotes) {
      return res.status(400).json({
        success: false,
        message: 'Admin notes are required when rejecting a pickup request'
      });
    }

    const pickup = await Pickup.findById(req.params.id).populate('user', 'firstName lastName email phone');

    if (!pickup) {
      return res.status(404).json({
        success: false,
        message: 'Pickup request not found'
      });
    }

    if (pickup.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Pickup request is not pending approval'
      });
    }

    // Reject the pickup
    await pickup.reject(req.user.id, adminNotes);

    // Create activity record
    await Activity.createPickupRejection(pickup.user._id, pickup._id, {
      wasteType: pickup.wasteType,
      estimatedWeight: pickup.estimatedWeight,
      pickupDate: pickup.pickupDate
    }, adminNotes);

    // Send rejection notification to user
    await sendPickupRejectionNotification(pickup, pickup.user, adminNotes);

    res.json({
      success: true,
      message: 'Pickup request rejected successfully',
      data: pickup
    });

  } catch (error) {
    console.error('Error rejecting pickup:', error);
    res.status(500).json({
      success: false,
      message: 'Error rejecting pickup request',
      error: error.message
    });
  }
});

// @desc    Complete pickup (admin only)
// @route   PUT /api/pickups/:id/complete
// @access  Private (admin only)
router.put('/:id/complete', protect, authorize('admin'), async (req, res) => {
  try {
    const { actualWeight } = req.body;

    if (!actualWeight || actualWeight <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Actual weight is required and must be greater than 0'
      });
    }

    const pickup = await Pickup.findById(req.params.id).populate('user', 'firstName lastName email phone greenPoints');

    if (!pickup) {
      return res.status(404).json({
        success: false,
        message: 'Pickup request not found'
      });
    }

    if (pickup.status !== 'approved') {
      return res.status(400).json({
        success: false,
        message: 'Pickup request must be approved before completion'
      });
    }

    // Complete the pickup
    await pickup.complete(actualWeight);

    // Calculate green points (1 point per kg)
    const pointsEarned = Math.floor(actualWeight);

    // Update user's green points
    await pickup.user.addGreenPoints(pointsEarned);

    // Create activity record
    await Activity.createPickupCompletion(pickup.user._id, pickup._id, actualWeight, pointsEarned);

    // Send completion notification to user
    await sendPickupCompletionNotification(pickup, pickup.user, actualWeight, pointsEarned);

    res.json({
      success: true,
      message: 'Pickup completed successfully',
      data: {
        pickup,
        pointsEarned,
        totalGreenPoints: pickup.user.greenPoints + pointsEarned
      }
    });

  } catch (error) {
    console.error('Error completing pickup:', error);
    res.status(500).json({
      success: false,
      message: 'Error completing pickup',
      error: error.message
    });
  }
});

// @desc    Get pickup statistics (admin only)
// @route   GET /api/pickups/stats
// @access  Private (admin only)
router.get('/stats', protect, authorize('admin'), async (req, res) => {
  try {
    const stats = await Pickup.getStats();

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Error fetching pickup stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching pickup statistics',
      error: error.message
    });
  }
});

// @desc    Cancel pickup request (user only)
// @route   DELETE /api/pickups/:id
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const pickup = await Pickup.findById(req.params.id);

    if (!pickup) {
      return res.status(404).json({
        success: false,
        message: 'Pickup request not found'
      });
    }

    // Check if user is authorized to cancel this pickup
    if (pickup.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this pickup request'
      });
    }

    // Only allow cancellation of pending pickups
    if (pickup.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Only pending pickup requests can be cancelled'
      });
    }

    await pickup.remove();

    res.json({
      success: true,
      message: 'Pickup request cancelled successfully'
    });

  } catch (error) {
    console.error('Error cancelling pickup:', error);
    res.status(500).json({
      success: false,
      message: 'Error cancelling pickup request',
      error: error.message
    });
  }
});

module.exports = router; 