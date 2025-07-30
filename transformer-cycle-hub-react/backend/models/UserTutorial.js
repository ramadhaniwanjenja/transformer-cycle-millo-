const mongoose = require('mongoose');

const userTutorialSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tutorial: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tutorial',
    required: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date,
    default: null
  },
  pointsEarned: {
    type: Number,
    default: 0
  },
  watchProgress: {
    type: Number, // percentage watched (0-100)
    default: 0,
    min: 0,
    max: 100
  },
  lastWatchedAt: {
    type: Date,
    default: Date.now
  },
  watchHistory: [{
    timestamp: {
      type: Date,
      default: Date.now
    },
    progress: Number
  }]
}, {
  timestamps: true
});

// Ensure unique user-tutorial combination
userTutorialSchema.index({ user: 1, tutorial: 1 }, { unique: true });

// Method to mark tutorial as completed
userTutorialSchema.methods.completeTutorial = async function() {
  if (!this.isCompleted) {
    this.isCompleted = true;
    this.completedAt = new Date();
    this.pointsEarned = 10; // Default 10 points per tutorial
    this.watchProgress = 100;
    await this.save();
    return true;
  }
  return false;
};

// Method to update watch progress
userTutorialSchema.methods.updateProgress = async function(progress) {
  this.watchProgress = Math.min(progress, 100);
  this.lastWatchedAt = new Date();
  
  // Add to watch history
  this.watchHistory.push({
    timestamp: new Date(),
    progress: this.watchProgress
  });
  
  // Keep only last 10 entries
  if (this.watchHistory.length > 10) {
    this.watchHistory = this.watchHistory.slice(-10);
  }
  
  await this.save();
};

module.exports = mongoose.model('UserTutorial', userTutorialSchema); 