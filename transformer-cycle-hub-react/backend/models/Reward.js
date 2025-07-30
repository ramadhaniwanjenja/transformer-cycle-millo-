const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  pointsRequired: {
    type: Number,
    required: true,
    min: 1
  },
  category: {
    type: String,
    enum: ['eco-friendly', 'gift-card', 'discount', 'merchandise', 'experience'],
    default: 'eco-friendly'
  },
  imageUrl: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  stock: {
    type: Number,
    default: -1 // -1 means unlimited
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Reward', rewardSchema); 