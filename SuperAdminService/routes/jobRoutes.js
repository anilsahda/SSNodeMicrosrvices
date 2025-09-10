const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Routes
router.post('/', jobController.createJob);      // Create job
router.get('/', jobController.getAllJobs);      // Get all jobs
router.get('/:id', jobController.getJobById);   // Get single job
router.put('/:id', jobController.updateJob);    // Update job
router.delete('/:id', jobController.deleteJob); // Delete job

module.exports = router;
