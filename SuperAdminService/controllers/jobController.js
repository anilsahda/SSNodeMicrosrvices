const Job = require('../models/Job');

// ✅ Create Job
exports.createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json({ message: 'Job created successfully', job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get All Jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ order: 1 }); // small order = top
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// ✅ Get Single Job
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update Job
exports.updateJob = async (req, res) => {
  try {
    const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Job not found' });
    res.status(200).json({ message: 'Job updated successfully', updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete Job
exports.deleteJob = async (req, res) => {
  try {
    const deleted = await Job.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Job not found' });
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
