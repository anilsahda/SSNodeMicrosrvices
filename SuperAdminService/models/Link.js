const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
  link: { type: String, required: true },
  purpose: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Link", LinkSchema);