const mongoose = require('mongoose');

const tutorialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: ['plastic', 'paper', 'glass', 'metal', 'textile', 'general'],
    default: 'general'
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  duration: {
    type: Number, // in minutes
    required: true
  },
  pointsReward: {
    type: Number,
    default: 10
  },
  materials: [{
    name: String,
    quantity: String,
    optional: {
      type: Boolean,
      default: false
    }
  }],
  steps: [{
    stepNumber: Number,
    title: String,
    description: String,
    imageUrl: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
tutorialSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Tutorial', tutorialSchema); 