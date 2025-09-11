const express = require('express');
const router = express.Router();
const adminProfilesController = require('../controllers/adminProfilesController');

// Routes
router.post('/', adminProfilesController.createAdminProfile);
router.get('/', adminProfilesController.getAdminProfiles);
router.get('/:id', adminProfilesController.getAdminProfileById);
router.put('/:id', adminProfilesController.updateAdminProfile);
router.delete('/:id', adminProfilesController.deleteAdminProfile);

module.exports = router;
