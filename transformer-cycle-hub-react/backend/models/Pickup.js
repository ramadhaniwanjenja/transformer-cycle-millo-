const mongoose = require('mongoose');

const pickupSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  wasteType: {
    type: String,
    required: true,
    enum: ['plastic', 'paper', 'glass', 'metal', 'ewaste', 'mixed']
  },
  quantity: {
    type: Number,
    required: true,
    min: 0.1,
    max: 100
  },
  pickupDate: {
    type: Date,
    required: true
  },
  pickupTime: {
    type: String,
    required: true,
    enum: ['morning', 'afternoon', 'evening']
  },
  address: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending'
  },
  adminNotes: {
    type: String,
    default: ''
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: {
    type: Date
  },
  completedAt: {
    type: Date
  },
  actualWeight: {
    type: Number,
    min: 0
  },
  pointsEarned: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Static method to get user's pickups
pickupSchema.statics.findByUser = function(userId) {
  return this.find({ user: userId })
    .populate('user', 'firstName lastName email phone')
    .sort({ createdAt: -1 });
};

// Static method to get pending pickups
pickupSchema.statics.findPending = function() {
  return this.find({ status: 'pending' })
    .populate('user', 'firstName lastName email phone')
    .sort({ createdAt: -1 });
};

// Static method to get pickup statistics
pickupSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalWeight: { $sum: '$quantity' }
      }
    }
  ]);
  
  const totalPickups = await this.countDocuments();
  const totalWeight = await this.aggregate([
    { $group: { _id: null, total: { $sum: '$quantity' } } }
  ]);

  return {
    byStatus: stats,
    totalPickups,
    totalWeight: totalWeight[0]?.total || 0
  };
};

// Instance method to approve pickup
pickupSchema.methods.approve = async function(adminId, notes = '') {
  this.status = 'approved';
  this.adminNotes = notes;
  this.approvedBy = adminId;
  this.approvedAt = new Date();
  return await this.save();
};

// Instance method to reject pickup
pickupSchema.methods.reject = async function(adminId, notes = '') {
  this.status = 'rejected';
  this.adminNotes = notes;
  this.approvedBy = adminId;
  this.approvedAt = new Date();
  return await this.save();
};

// Instance method to complete pickup
pickupSchema.methods.complete = async function(actualWeight) {
  this.status = 'completed';
  this.actualWeight = actualWeight;
  this.completedAt = new Date();
  this.pointsEarned = Math.floor(actualWeight * 15); // 15 points per kg
  return await this.save();
};

module.exports = mongoose.model('Pickup', pickupSchema); 