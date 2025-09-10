const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  headline: {
    type: [String],  // ["WE ARE", "HIRING", "NOW!"]
    required: true
  },
  subheading: {
    type: String,    // "JOIN OUR TEAM"
    required: true
  },
  cta: {
    label: { type: String, required: true },  // "Visit Career Page"
    url: { type: String, required: true }     // "https://www.shiwansh.com/career"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Career', careerSchema);
