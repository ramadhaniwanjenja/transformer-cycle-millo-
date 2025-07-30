const mongoose = require('mongoose');

const userRewardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reward: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reward',
    required: true
  },
  pointsSpent: {
    type: Number,
    required: true
  },
  redeemedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'delivered', 'cancelled'],
    default: 'pending'
  },
  deliveryDetails: {
    address: String,
    phone: String,
    notes: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('UserReward', userRewardSchema); 