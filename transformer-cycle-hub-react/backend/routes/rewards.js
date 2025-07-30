const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const Reward = require('../models/Reward');
const UserReward = require('../models/UserReward');
const User = require('../models/User');
const { sendRewardRedemptionEmail } = require('../utils/email');

const router = express.Router();

// @desc    Get all available rewards
// @route   GET /api/rewards
// @access  Public
router.get('/', async (req, res) => {
  try {
    const rewards = await Reward.find({ isActive: true }).sort({ pointsRequired: 1 });
    
    res.json({
      success: true,
      data: rewards
    });
  } catch (error) {
    console.error('Error fetching rewards:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching rewards',
      error: error.message
    });
  }
});

// @desc    Get user's reward balance and history
// @route   GET /api/rewards/my-rewards
// @access  Private
router.get('/my-rewards', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const userRewards = await UserReward.find({ user: req.user.id })
      .populate('reward')
      .sort({ redeemedAt: -1 });

    res.json({
      success: true,
      data: {
        pointsBalance: user.points || 0,
        rewards: userRewards
      }
    });
  } catch (error) {
    console.error('Error fetching user rewards:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user rewards',
      error: error.message
    });
  }
});

// @desc    Redeem a reward
// @route   POST /api/rewards/:id/redeem
// @access  Private
router.post('/:id/redeem', protect, async (req, res) => {
  try {
    const { deliveryDetails } = req.body;
    const rewardId = req.params.id;
    const userId = req.user.id;

    // Get reward details
    const reward = await Reward.findById(rewardId);
    if (!reward || !reward.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Reward not found or inactive'
      });
    }

    // Check if user has enough points
    const user = await User.findById(userId);
    if (user.points < reward.pointsRequired) {
      return res.status(400).json({
        success: false,
        message: `Insufficient points. You need ${reward.pointsRequired} points, but you have ${user.points} points.`
      });
    }

    // Check stock availability
    if (reward.stock !== -1 && reward.stock <= 0) {
      return res.status(400).json({
        success: false,
        message: 'This reward is out of stock'
      });
    }

    // Create user reward record
    const userReward = new UserReward({
      user: userId,
      reward: rewardId,
      pointsSpent: reward.pointsRequired,
      deliveryDetails
    });

    await userReward.save();

    // Deduct points from user
    await User.findByIdAndUpdate(userId, {
      $inc: { points: -reward.pointsRequired }
    });

    // Update reward stock if not unlimited
    if (reward.stock !== -1) {
      await Reward.findByIdAndUpdate(rewardId, {
        $inc: { stock: -1 }
      });
    }

    // Send redemption email
    await sendRewardRedemptionEmail(
      user.email,
      user.firstName,
      reward.name,
      reward.pointsRequired
    );

    res.json({
      success: true,
      message: 'Reward redeemed successfully!',
      data: userReward
    });
  } catch (error) {
    console.error('Error redeeming reward:', error);
    res.status(500).json({
      success: false,
      message: 'Error redeeming reward',
      error: error.message
    });
  }
});

// @desc    Create reward (admin only)
// @route   POST /api/rewards
// @access  Private (admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const reward = new Reward(req.body);
    await reward.save();
    
    res.status(201).json({
      success: true,
      data: reward
    });
  } catch (error) {
    console.error('Error creating reward:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating reward',
      error: error.message
    });
  }
});

// @desc    Update reward (admin only)
// @route   PUT /api/rewards/:id
// @access  Private (admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const reward = await Reward.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!reward) {
      return res.status(404).json({
        success: false,
        message: 'Reward not found'
      });
    }
    
    res.json({
      success: true,
      data: reward
    });
  } catch (error) {
    console.error('Error updating reward:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating reward',
      error: error.message
    });
  }
});

module.exports = router; 