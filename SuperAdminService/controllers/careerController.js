const Career = require('../models/Career');

// CREATE
exports.createCareer = async (req, res) => {
  try {
    const career = new Career(req.body);
    const savedCareer = await career.save();
    res.status(201).json(savedCareer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// READ ALL (sorted newest first)
exports.getAllCareers = async (req, res) => {
  try {
    const careers = await Career.find().sort({ createdAt: -1 });
    res.status(200).json(careers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ ONE
exports.getCareerById = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) return res.status(404).json({ message: 'Career entry not found' });
    res.status(200).json(career);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updateCareer = async (req, res) => {
  try {
    const updatedCareer = await Career.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCareer) return res.status(404).json({ message: 'Career entry not found' });
    res.status(200).json(updatedCareer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
exports.deleteCareer = async (req, res) => {
  try {
    const deletedCareer = await Career.findByIdAndDelete(req.params.id);
    if (!deletedCareer) return res.status(404).json({ message: 'Career entry not found' });
    res.status(200).json({ message: 'Career entry deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
