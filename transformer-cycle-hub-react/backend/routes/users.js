const express = require('express');
const { protect, admin } = require('../middleware/auth');

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

module.exports = router; 