const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const protect = require('../middleware/authMiddleware'); // ✅ import the protect middleware

// Login Route
router.post('/login', authController.loginUser);

// ✅ Protected route example
router.get('/profile', protect, (req, res) => {
  res.status(200).json({
    message: 'You are authorized!',
    user: req.user,
    role: req.role,
  });
});

module.exports = router;
