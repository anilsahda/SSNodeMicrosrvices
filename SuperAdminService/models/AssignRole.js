const mongoose = require('mongoose');

const assignRoleSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true
  },
  roleName: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('AssignRole', assignRoleSchema);
