const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v); // Validates 10-digit number
      },
      message: props => `${props.value} is not a valid 10-digit mobile number!`,
    },
  },
  internshipType: {
    type: String, 
    required: true,
  },
  statusType: {
    type: String, 
  },
  interviewStatus: {
    type: String, 
  },
  notes: {
    type: String, 
  },
}, {
  timestamps: true 
});

module.exports = mongoose.model('Intern', userSchema);
