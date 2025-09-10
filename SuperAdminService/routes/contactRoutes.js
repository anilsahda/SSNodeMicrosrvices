const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Create
router.post('/', contactController.createContact);

// Read All
router.get('/', contactController.getAllContacts);

// Read One
router.get('/:id', contactController.getContactById);

// Update
router.put('/:id', contactController.updateContact);

// Delete
router.delete('/:id', contactController.deleteContact);

module.exports = router;
