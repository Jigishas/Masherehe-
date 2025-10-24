const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['birthday', 'wedding', 'anniversary', 'graduation', 'baby-shower', 'holiday', 'other']
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  dressCode: {
    type: String,
    enum: ['casual', 'smart-casual', 'semi-formal', 'formal', 'costume'],
    default: 'casual'
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  attendees: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    default: ''
  },
  coordinates: {
    lat: Number,
    lng: Number
  },
  privacy: {
    type: String,
    enum: ['public', 'private'],
    default: 'public'
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Virtual for attendee count
eventSchema.virtual('attendeeCount').get(function() {
  return this.attendees.length;
});

// Ensure virtual fields are serialized
eventSchema.set('toJSON', { virtuals: true });
eventSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Event', eventSchema);
