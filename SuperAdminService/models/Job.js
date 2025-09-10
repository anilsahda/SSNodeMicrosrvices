const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  email: { type: String, required: true },
  experience: { type: String },
  education: { type: String },
  description: { type: String, required: true },
  responsibilities: [{ type: String }],
  skills: [{ type: String }],
  requiredSkills: [{ type: String }],
  order: { type: Number, default: 0 }  // 👈 Custom order field
}, { timestamps: true });
module.exports = mongoose.model('Job', jobSchema);
