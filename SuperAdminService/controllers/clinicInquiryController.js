const ClinicInquiry = require('../models/ClinicInquiry');

// CREATE
exports.createInquiry = async (req, res) => {
  try {
    const inquiry = new ClinicInquiry(req.body);
    const savedInquiry = await inquiry.save();
    res.status(201).json(savedInquiry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// READ ALL (sorted by newest first)
exports.getAllInquiries = async (req, res) => {
  try {
    const inquiries = await ClinicInquiry.find().sort({ createdAt: -1 });
    res.status(200).json(inquiries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ ONE
exports.getInquiryById = async (req, res) => {
  try {
    const inquiry = await ClinicInquiry.findById(req.params.id);
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
    res.status(200).json(inquiry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updateInquiry = async (req, res) => {
  try {
    const updatedInquiry = await ClinicInquiry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedInquiry) return res.status(404).json({ message: 'Inquiry not found' });
    res.status(200).json(updatedInquiry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
exports.deleteInquiry = async (req, res) => {
  try {
    const deletedInquiry = await ClinicInquiry.findByIdAndDelete(req.params.id);
    if (!deletedInquiry) return res.status(404).json({ message: 'Inquiry not found' });
    res.status(200).json({ message: 'Inquiry deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
