const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const Tutorial = require('../models/Tutorial');
const UserTutorial = require('../models/UserTutorial');
const User = require('../models/User');
const { sendTutorialCompletionEmail } = require('../utils/email');

const router = express.Router();

// @desc    Get all tutorials (public)
// @route   GET /api/tutorials
// @access  Public
router.get('/', async (req, res) => {
  try {
    console.log('Fetching tutorials...');
    
    // Check if database is connected
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      console.log('Database not connected, attempting to connect...');
      try {
        await mongoose.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      } catch (dbError) {
        console.error('Database connection failed:', dbError);
        return res.status(500).json({
          success: false,
          message: 'Database connection failed',
          error: process.env.NODE_ENV === 'development' ? dbError.message : 'Internal server error'
        });
      }
    }

    const { category, difficulty, search } = req.query;
    
    let query = { isActive: true };
    
    if (category) {
      query.category = category;
    }
    
    if (difficulty) {
      query.difficulty = difficulty;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const tutorials = await Tutorial.find(query).sort({ createdAt: -1 });
    console.log(`Found ${tutorials.length} tutorials`);
    
    res.json({
      success: true,
      data: tutorials
    });
  } catch (error) {
    console.error('Error fetching tutorials:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching tutorials',
      error: error.message
    });
  }
});

// @desc    Get tutorial by ID
// @route   GET /api/tutorials/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);
    
    if (!tutorial) {
      return res.status(404).json({
        success: false,
        message: 'Tutorial not found'
      });
    }
    
    res.json({
      success: true,
      data: tutorial
    });
  } catch (error) {
    console.error('Error fetching tutorial:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching tutorial',
      error: error.message
    });
  }
});

// @desc    Get user's tutorial progress
// @route   GET /api/tutorials/progress
// @access  Private
router.get('/progress', protect, async (req, res) => {
  try {
    console.log('Fetching user tutorial progress...');
    
    // Check if database is connected
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      console.log('Database not connected, attempting to connect...');
      try {
        await mongoose.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      } catch (dbError) {
        console.error('Database connection failed:', dbError);
        return res.status(500).json({
          success: false,
          message: 'Database connection failed',
          error: process.env.NODE_ENV === 'development' ? dbError.message : 'Internal server error'
        });
      }
    }

    const userTutorials = await UserTutorial.find({ user: req.user.id })
      .populate('tutorial')
      .sort({ updatedAt: -1 });
    
    console.log(`Found ${userTutorials.length} user tutorials`);
    
    res.json({
      success: true,
      data: userTutorials
    });
  } catch (error) {
    console.error('Error fetching user progress:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching progress',
      error: error.message
    });
  }
});

// @desc    Update tutorial progress
// @route   PUT /api/tutorials/:id/progress
// @access  Private
router.put('/:id/progress', protect, async (req, res) => {
  try {
    const { progress, completed } = req.body;
    const tutorialId = req.params.id;
    const userId = req.user.id;
    
    // Find or create user tutorial record
    let userTutorial = await UserTutorial.findOne({
      user: userId,
      tutorial: tutorialId
    });
    
    if (!userTutorial) {
      userTutorial = new UserTutorial({
        user: userId,
        tutorial: tutorialId
      });
    }
    
    // Update progress
    if (progress !== undefined) {
      await userTutorial.updateProgress(progress);
    }
    
    // Mark as completed if requested
    if (completed && !userTutorial.isCompleted) {
      const wasCompleted = await userTutorial.completeTutorial();
      
      if (wasCompleted) {
        // Update user points
        await User.findByIdAndUpdate(userId, {
          $inc: { points: 10 }
        });
        
        // Send completion email
        const tutorial = await Tutorial.findById(tutorialId);
        if (tutorial) {
          await sendTutorialCompletionEmail(req.user.email, req.user.firstName, tutorial.title);
        }
      }
    }
    
    // Fetch updated record
    const updatedUserTutorial = await UserTutorial.findOne({
      user: userId,
      tutorial: tutorialId
    }).populate('tutorial');
    
    res.json({
      success: true,
      data: updatedUserTutorial
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating progress',
      error: error.message
    });
  }
});

// @desc    Create tutorial (admin only)
// @route   POST /api/tutorials
// @access  Private (admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
  try {
    const tutorial = new Tutorial(req.body);
    await tutorial.save();
    
    res.status(201).json({
      success: true,
      data: tutorial
    });
  } catch (error) {
    console.error('Error creating tutorial:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating tutorial',
      error: error.message
    });
  }
});

// @desc    Update tutorial (admin only)
// @route   PUT /api/tutorials/:id
// @access  Private (admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const tutorial = await Tutorial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!tutorial) {
      return res.status(404).json({
        success: false,
        message: 'Tutorial not found'
      });
    }
    
    res.json({
      success: true,
      data: tutorial
    });
  } catch (error) {
    console.error('Error updating tutorial:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating tutorial',
      error: error.message
    });
  }
});

// @desc    Delete tutorial (admin only)
// @route   DELETE /api/tutorials/:id
// @access  Private (admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const tutorial = await Tutorial.findByIdAndDelete(req.params.id);
    
    if (!tutorial) {
      return res.status(404).json({
        success: false,
        message: 'Tutorial not found'
      });
    }
    
    // Also delete related user tutorial records
    await UserTutorial.deleteMany({ tutorial: req.params.id });
    
    res.json({
      success: true,
      message: 'Tutorial deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting tutorial:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting tutorial',
      error: error.message
    });
  }
});

module.exports = router; 