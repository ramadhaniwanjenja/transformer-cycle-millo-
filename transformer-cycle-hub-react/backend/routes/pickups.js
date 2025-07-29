const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Placeholder for pickup routes
router.get('/', protect, async (req, res) => {
  res.json({
    success: true,
    message: 'Pickups route - to be implemented'
  });
});

module.exports = router; 