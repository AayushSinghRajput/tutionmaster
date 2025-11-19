const express = require('express');
const {
  getTeachers,
  getTeacher,
  searchTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getMyProfile
} = require('../controllers/teacherController');
const {
  teacherProfileValidation,
  handleValidationErrors
} = require('../middleware/validation');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getTeachers);
router.get('/search', searchTeachers);
router.get('/:id', getTeacher);

// Protected routes
router.use(protect);
router.get('/my-profile', getMyProfile);
router.post('/', teacherProfileValidation, handleValidationErrors, createTeacher);
router.put('/:id', teacherProfileValidation, handleValidationErrors, updateTeacher);
router.delete('/:id', deleteTeacher);

module.exports = router;