const express = require('express');
const router = express.Router();
const {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getDashboardStats,
  getStudentCountsByUser // ✅ Import our new controller method
} = require('../controllers/studentController');

// ➕ Create student
router.post('/', createStudent);

// 📌 Get all students
router.get('/', getStudents);

// 📌 Get count of students grouped by user who added them
router.get('/counts/by-user', getStudentCountsByUser); // ✅ New API

router.get('/stats/dashboard', getDashboardStats);

// 📌 Get single student by ID
router.get('/:id', getStudentById);

// ✏️ Update student
router.put('/:id', updateStudent);

// 🗑️ Delete student
router.delete('/:id', deleteStudent);

module.exports = router;
