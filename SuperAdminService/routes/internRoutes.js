const express = require('express');
const router = express.Router();
const internController = require('../controllers/InternController');

// Create
router.post('/', internController.createIntern);

// Read All
router.get('/', internController.getAllInterns);

// Read One
router.get('/:id', internController.getInternById);

// Update
router.put('/:id', internController.updateIntern);

// Delete
router.delete('/:id', internController.deleteIntern);

module.exports = router;
