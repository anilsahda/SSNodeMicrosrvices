const Intern = require('../models/Intern');

// CREATE
exports.createIntern = async (req, res) => {
  try {
    const intern = new Intern(req.body);
    const savedIntern = await intern.save();
    res.status(201).json(savedIntern);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// READ ALL
// READ ALL (Sorted by newest first)
exports.getAllInterns = async (req, res) => {
  try {
    const interns = await Intern.find().sort({ createdAt: -1 });
    res.status(200).json(interns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// READ ONE
exports.getInternById = async (req, res) => {
  try {
    const intern = await Intern.findById(req.params.id);
    if (!intern) return res.status(404).json({ message: 'Intern not found' });
    res.status(200).json(intern);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updateIntern = async (req, res) => {
  try {
    const updatedIntern = await Intern.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedIntern) return res.status(404).json({ message: 'Intern not found' });
    res.status(200).json(updatedIntern);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
exports.deleteIntern = async (req, res) => {
  try {
    const deletedIntern = await Intern.findByIdAndDelete(req.params.id);
    if (!deletedIntern) return res.status(404).json({ message: 'Intern not found' });
    res.status(200).json({ message: 'Intern deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
