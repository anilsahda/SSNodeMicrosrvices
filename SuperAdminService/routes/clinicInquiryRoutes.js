const express = require('express');
const router = express.Router();
const clinicInquiryController = require('../controllers/clinicInquiryController');

// Create
router.post('/', clinicInquiryController.createInquiry);

// Read All
router.get('/', clinicInquiryController.getAllInquiries);

// Read One
router.get('/:id', clinicInquiryController.getInquiryById);

// Update
router.put('/:id', clinicInquiryController.updateInquiry);

// Delete
router.delete('/:id', clinicInquiryController.deleteInquiry);

module.exports = router;
