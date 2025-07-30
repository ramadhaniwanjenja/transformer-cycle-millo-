const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const RecyclingCenter = require('../models/RecyclingCenter');

const router = express.Router();

// @desc    Get all recycling centers
// @route   GET /api/recycling-centers
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { lat, lng, radius, type, service } = req.query;
    
    let query = { isActive: true };
    
    // Filter by type
    if (type) {
      query.type = type;
    }
    
    // Filter by service
    if (service) {
      query.services = service;
    }
    
    let centers;
    
    // If coordinates provided, find nearby centers
    if (lat && lng) {
      const maxDistance = radius ? parseInt(radius) : 10000; // Default 10km
      centers = await RecyclingCenter.findNearby(parseFloat(lat), parseFloat(lng), maxDistance);
    } else {
      centers = await RecyclingCenter.find(query).sort({ rating: -1 });
    }
    
    res.json({
      success: true,
      data: centers
    });
  } catch (error) {
    console.error('Error fetching recycling centers:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recycling centers',
      error: error.message
    });
  }
});

// @desc    Get recycling center by ID
// @route   GET /api/recycling-centers/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const center = await RecyclingCenter.findById(req.params.id);
    
    if (!center) {
      return res.status(404).json({
        success: false,
        message: 'Recycling center not found'
      });
    }
    
    res.json({
      success: true,
      data: center
    });
  } catch (error) {
    console.error('Error fetching recycling center:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching recycling center',
      error: error.message
    });
  }
});

// @desc    Add review to recycling center
// @route   POST /api/recycling-centers/:id/reviews
// @access  Private
router.post('/:id/reviews', protect, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }
    
    const center = await RecyclingCenter.findById(req.params.id);
    
    if (!center) {
      return res.status(404).json({
        success: false,
        message: 'Recycling center not found'
      });
    }
    
    // Add review
    center.reviews.push({
      user: req.user.id,
      rating,
      comment
    });
    
    // Update average rating
    const totalRating = center.reviews.reduce((sum, review) => sum + review.rating, 0);
    center.rating = totalRating / center.reviews.length;
    
    await center.save();
    
    res.json({
      success: true,
      data: center
    });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding review',
      error: error.message
    });
  }
});

// @desc    Create recycling center (admin only)
// @route   POST /api/recycling-centers
// @access  Private (admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const center = new RecyclingCenter(req.body);
    await center.save();
    
    res.status(201).json({
      success: true,
      data: center
    });
  } catch (error) {
    console.error('Error creating recycling center:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating recycling center',
      error: error.message
    });
  }
});

// @desc    Update recycling center (admin only)
// @route   PUT /api/recycling-centers/:id
// @access  Private (admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const center = await RecyclingCenter.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!center) {
      return res.status(404).json({
        success: false,
        message: 'Recycling center not found'
      });
    }
    
    res.json({
      success: true,
      data: center
    });
  } catch (error) {
    console.error('Error updating recycling center:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating recycling center',
      error: error.message
    });
  }
});

// @desc    Delete recycling center (admin only)
// @route   DELETE /api/recycling-centers/:id
// @access  Private (admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const center = await RecyclingCenter.findByIdAndDelete(req.params.id);
    
    if (!center) {
      return res.status(404).json({
        success: false,
        message: 'Recycling center not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Recycling center deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting recycling center:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting recycling center',
      error: error.message
    });
  }
});

module.exports = router; 