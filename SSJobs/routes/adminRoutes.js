const express = require('express');
const router = express.Router();
const adminProfilesController = require('../controllers/adminProfilesController');

// Routes
router.post('/', adminProfilesController.createRole);
router.get('/', adminProfilesController.getAllRoles);
router.get('/:id', adminProfilesController.getRoleById);
router.put('/:id', adminProfilesController.updateRole);
router.delete('/:id', adminProfilesController.deleteRole);

module.exports = router;
