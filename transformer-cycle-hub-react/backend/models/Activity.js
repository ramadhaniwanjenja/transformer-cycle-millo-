const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  type: {
    type: String,
    required: [true, 'Activity type is required'],
    enum: ['pickup_request', 'pickup_approved', 'pickup_rejected', 'pickup_completed', 'points_earned', 'login']
  },
  title: {
    type: String,
    required: [true, 'Activity title is required']
  },
  description: {
    type: String,
    required: [true, 'Activity description is required']
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  pickup: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pickup'
  },
  pointsEarned: {
    type: Number,
    default: 0
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for better query performance
activitySchema.index({ user: 1, createdAt: -1 });
activitySchema.index({ type: 1 });
activitySchema.index({ isRead: 1 });

// Virtual for activity display
activitySchema.virtual('displayTime').get(function() {
  const now = new Date();
  const diff = now - this.createdAt;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
  
  return this.createdAt.toLocaleDateString();
});

// Static method to create pickup request activity
activitySchema.statics.createPickupRequest = function(userId, pickupId, pickupData) {
  return this.create({
    user: userId,
    type: 'pickup_request',
    title: 'Pickup Request Submitted',
    description: `You submitted a pickup request for ${pickupData.estimatedWeight}kg of ${pickupData.wasteType} on ${new Date(pickupData.pickupDate).toLocaleDateString()}`,
    pickup: pickupId,
    metadata: {
      wasteType: pickupData.wasteType,
      estimatedWeight: pickupData.estimatedWeight,
      pickupDate: pickupData.pickupDate
    }
  });
};

// Static method to create pickup approval activity
activitySchema.statics.createPickupApproval = function(userId, pickupId, pickupData) {
  return this.create({
    user: userId,
    type: 'pickup_approved',
    title: 'Pickup Request Approved',
    description: `Your pickup request for ${pickupData.estimatedWeight}kg of ${pickupData.wasteType} has been approved! We'll contact you soon to schedule the pickup.`,
    pickup: pickupId,
    metadata: {
      wasteType: pickupData.wasteType,
      estimatedWeight: pickupData.estimatedWeight,
      pickupDate: pickupData.pickupDate
    }
  });
};

// Static method to create pickup rejection activity
activitySchema.statics.createPickupRejection = function(userId, pickupId, pickupData, adminNotes) {
  return this.create({
    user: userId,
    type: 'pickup_rejected',
    title: 'Pickup Request Rejected',
    description: `Your pickup request for ${pickupData.estimatedWeight}kg of ${pickupData.wasteType} has been rejected. ${adminNotes ? `Reason: ${adminNotes}` : ''}`,
    pickup: pickupId,
    metadata: {
      wasteType: pickupData.wasteType,
      estimatedWeight: pickupData.estimatedWeight,
      adminNotes
    }
  });
};

// Static method to create pickup completion activity
activitySchema.statics.createPickupCompletion = function(userId, pickupId, actualWeight, pointsEarned) {
  return this.create({
    user: userId,
    type: 'pickup_completed',
    title: 'Pickup Completed',
    description: `Your pickup has been completed! We collected ${actualWeight}kg of waste and you earned ${pointsEarned} green points.`,
    pickup: pickupId,
    pointsEarned,
    metadata: {
      actualWeight,
      pointsEarned
    }
  });
};

// Static method to create points earned activity
activitySchema.statics.createPointsEarned = function(userId, points, reason) {
  return this.create({
    user: userId,
    type: 'points_earned',
    title: 'Green Points Earned',
    description: `You earned ${points} green points for ${reason}.`,
    pointsEarned: points,
    metadata: {
      reason
    }
  });
};

// Static method to find recent activities for user
activitySchema.statics.findRecentByUser = function(userId, limit = 10) {
  return this.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('pickup', 'wasteType estimatedWeight actualWeight status');
};

// Static method to mark activities as read
activitySchema.statics.markAsRead = function(userId, activityIds) {
  return this.updateMany(
    { user: userId, _id: { $in: activityIds } },
    { isRead: true }
  );
};

// Static method to get unread count
activitySchema.statics.getUnreadCount = function(userId) {
  return this.countDocuments({ user: userId, isRead: false });
};

// Add pagination plugin
activitySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Activity', activitySchema); 