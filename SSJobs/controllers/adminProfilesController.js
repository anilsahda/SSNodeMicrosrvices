const AdminProfiles = require('../models/AdminProfiles');

// Create AdminProfile
exports.createAdminProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const adminprofile = new AdminProfiles({ name });
    await adminprofile.save();
    res.status(201).json(adminprofile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All AdminProfiles
exports.getAdminProfiles = async (req, res) => {
  try {
    const adminprofiles = await AdminProfiles.find().sort({ createdAt: -1 });
    res.status(200).json(adminprofiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single AdminProfile
exports.getAdminProfileById = async (req, res) => {
  try {
    const adminProfile = await AdminProfiles.findById(req.params.id);
    if (!adminProfile) return res.status(404).json({ error: 'Admin Profile not found' });
    res.status(200).json(adminProfile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Admin Profile
exports.updateAdminProfile = async (req, res) => {
  try {
    const updatedAdminProfile = await AdminProfiles.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAdminProfile) return res.status(404).json({ error: 'Admin Profile not found' });
    res.status(200).json(updatedAdminProfile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Admin Profile
exports.deleteAdminProfile = async (req, res) => {
  try {
    const deletedAdminProfile = await AdminProfiles.findByIdAndDelete(req.params.id);
    if (!deletedAdminProfile) return res.status(404).json({ error: 'Admin Profile not found' });
    res.status(200).json({ message: 'Admin Profile deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};