const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  mobile: {
    type: String,
    required: false,
    validate: {
      validator: function(v) {
        return v ? /^\d{10}$/.test(v) : true;
      },
      message: props => `${props.value} is not a valid 10-digit mobile number!`
    }
  },
  subject: {
    type: String,
    required: false,
    trim: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
   statusType: {
    type: String, 
  
  },
  notes: {
    type: String, 
  
  }
});

module.exports = mongoose.model('Contact', contactSchema);