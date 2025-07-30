const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const pickupSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  pickupDate: {
    type: Date,
    required: [true, 'Pickup date is required']
  },
  pickupTime: {
    type: String,
    required: [true, 'Pickup time is required']
  },
  address: {
    street: {
      type: String,
      required: [true, 'Street address is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    zipCode: {
      type: String,
      required: [true, 'ZIP code is required']
    },
    country: {
      type: String,
      default: 'USA'
    }
  },
  wasteType: {
    type: String,
    required: [true, 'Waste type is required'],
    enum: ['electronics', 'batteries', 'plastics', 'paper', 'metal', 'glass', 'mixed']
  },
  estimatedWeight: {
    type: Number,
    required: [true, 'Estimated weight is required'],
    min: [0.1, 'Weight must be at least 0.1 kg']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending'
  },
  adminNotes: {
    type: String,
    maxlength: [1000, 'Admin notes cannot exceed 1000 characters']
  },
  actualWeight: {
    type: Number,
    min: [0, 'Actual weight cannot be negative']
  },
  greenPointsEarned: {
    type: Number,
    default: 0
  },
  adminApprovedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  adminApprovedAt: {
    type: Date
  },
  completedAt: {
    type: Date
  },
  isUrgent: {
    type: Boolean,
    default: false
  },
  specialInstructions: {
    type: String,
    maxlength: [300, 'Special instructions cannot exceed 300 characters']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full address
pickupSchema.virtual('fullAddress').get(function() {
  return `${this.address.street}, ${this.address.city}, ${this.address.state} ${this.address.zipCode}, ${this.address.country}`;
});

// Virtual for status display
pickupSchema.virtual('statusDisplay').get(function() {
  const statusMap = {
    pending: 'Pending Approval',
    approved: 'Approved',
    rejected: 'Rejected',
    completed: 'Completed'
  };
  return statusMap[this.status] || this.status;
});

// Index for better query performance
pickupSchema.index({ user: 1, status: 1 });
pickupSchema.index({ status: 1, createdAt: -1 });
pickupSchema.index({ pickupDate: 1 });

// Pre-save middleware to calculate green points
pickupSchema.pre('save', function(next) {
  if (this.isModified('actualWeight') && this.actualWeight > 0) {
    // Calculate green points based on weight (1 point per kg)
    this.greenPointsEarned = Math.floor(this.actualWeight);
  }
  next();
});

// Instance method to approve pickup
pickupSchema.methods.approve = function(adminId, notes = '') {
  this.status = 'approved';
  this.adminApprovedBy = adminId;
  this.adminApprovedAt = new Date();
  this.adminNotes = notes;
  return this.save();
};

// Instance method to reject pickup
pickupSchema.methods.reject = function(adminId, notes = '') {
  this.status = 'rejected';
  this.adminApprovedBy = adminId;
  this.adminApprovedAt = new Date();
  this.adminNotes = notes;
  return this.save();
};

// Instance method to complete pickup
pickupSchema.methods.complete = function(actualWeight) {
  this.status = 'completed';
  this.actualWeight = actualWeight;
  this.completedAt = new Date();
  return this.save();
};

// Static method to find pending pickups
pickupSchema.statics.findPending = function() {
  return this.find({ status: 'pending' }).populate('user', 'firstName lastName email phone');
};

// Static method to find pickups by user
pickupSchema.statics.findByUser = function(userId) {
  return this.find({ user: userId }).sort({ createdAt: -1 });
};

// Static method to find approved pickups
pickupSchema.statics.findApproved = function() {
  return this.find({ status: 'approved' }).populate('user', 'firstName lastName email phone');
};

// Static method to get pickup statistics
pickupSchema.statics.getStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalWeight: { $sum: '$actualWeight' }
      }
    }
  ]);
  
  return stats.reduce((acc, stat) => {
    acc[stat._id] = {
      count: stat.count,
      totalWeight: stat.totalWeight || 0
    };
    return acc;
  }, {});
};

// Add pagination plugin
pickupSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Pickup', pickupSchema); 