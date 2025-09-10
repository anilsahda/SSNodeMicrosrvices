const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: String,
  mobileNumber: String,
  meetingLink: String,
  DOJ: String,
  salary: String,
  DOL: String,
  dob: String,
  linkedin: String,
  portfolio: String,
  gender: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);