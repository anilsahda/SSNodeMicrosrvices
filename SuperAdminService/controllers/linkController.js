const Link = require("../models/Link");

// ✅ Create Link
exports.createLink = async (req, res) => {
  try {
    const link = new Link(req.body);
    await link.save();
    res.status(201).json({ message: "Link created successfully", link });
  } catch (err) {
    console.error("❌ Error creating link:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get All Links
exports.getAllLinks = async (req, res) => {
  try {
    const links = await Link.find().sort({ date: -1 }); // newest first
    res.status(200).json(links);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get Single Link
exports.getLinkById = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    if (!link) return res.status(404).json({ error: "Link not found" });
    res.status(200).json(link);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update Link
exports.updateLink = async (req, res) => {
  try {
    const updated = await Link.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ error: "Link not found" });
    res.status(200).json({ message: "Link updated successfully", updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete Link
exports.deleteLink = async (req, res) => {
  try {
    const link = await Link.findByIdAndDelete(req.params.id);
    if (!link) return res.status(404).json({ error: "Link not found" });
    res.status(200).json({ message: "Link deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
