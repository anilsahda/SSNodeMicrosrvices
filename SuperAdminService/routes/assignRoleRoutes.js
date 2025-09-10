const express = require('express');
const router = express.Router();
const assignController = require('../controllers/assignRoleController');

// Routes
router.get('/getallhrs', assignController.getAllHRs);
router.post('/', assignController.assignRole);
router.get('/', assignController.getAllAssignments);
router.delete('/:id', assignController.deleteAssignment);
router.put('/:id', assignController.updateAssignment);

module.exports = router;
