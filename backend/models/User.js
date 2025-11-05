const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  confirmpassword: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return value === this.password; 
      },
      message: 'Passwords do not match'
    }
  },
 /* avatar: {
    type: String,
    default: ''
  },
  joinedEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }],
  createdEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }]*/
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
