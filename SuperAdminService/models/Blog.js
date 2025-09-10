const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  image: { type: String },
  category: { type: String },
  blogfor:{type:String},
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Blog", BlogSchema);
