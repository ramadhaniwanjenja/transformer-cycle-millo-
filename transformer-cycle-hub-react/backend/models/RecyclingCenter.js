const mongoose = require('mongoose');

const recyclingCenterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  website: {
    type: String,
    default: ''
  },
  coordinates: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  type: {
    type: String,
    enum: ['recycling-center', 'eco-partner', 'drop-off-point', 'composting-site'],
    default: 'recycling-center'
  },
  services: [{
    type: String,
    enum: ['plastic', 'paper', 'glass', 'metal', 'electronics', 'textiles', 'batteries', 'composting', 'organic-waste', 'cardboard', 'clothing']
  }],
  operatingHours: {
    monday: { open: String, close: String },
    tuesday: { open: String, close: String },
    wednesday: { open: String, close: String },
    thursday: { open: String, close: String },
    friday: { open: String, close: String },
    saturday: { open: String, close: String },
    sunday: { open: String, close: String }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for geospatial queries
recyclingCenterSchema.index({ coordinates: '2dsphere' });

// Static method to find centers near a location
recyclingCenterSchema.statics.findNearby = function(lat, lng, maxDistance = 10000) {
  return this.find({
    coordinates: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        },
        $maxDistance: maxDistance
      }
    },
    isActive: true
  });
};

// Static method to find centers by service type
recyclingCenterSchema.statics.findByService = function(service) {
  return this.find({
    services: service,
    isActive: true
  });
};

module.exports = mongoose.model('RecyclingCenter', recyclingCenterSchema); 