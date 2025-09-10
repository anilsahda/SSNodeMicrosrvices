const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes

router.get('/me', userController.getLoggedInUser);
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/with-password/:id', userController.getUserWithPassword);



module.exports = router;
