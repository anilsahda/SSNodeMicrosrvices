const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');

// Create
router.post('/', careerController.createCareer);

// Read All
router.get('/', careerController.getAllCareers);

// Read One
router.get('/:id', careerController.getCareerById);

// Update
router.put('/:id', careerController.updateCareer);

// Delete
router.delete('/:id', careerController.deleteCareer);

module.exports = router;
