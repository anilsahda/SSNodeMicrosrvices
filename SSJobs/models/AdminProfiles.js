const mongoose = require('mongoose');

const adminProfilesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

module.exports = mongoose.model('AdminProfiles', adminProfilesSchema);