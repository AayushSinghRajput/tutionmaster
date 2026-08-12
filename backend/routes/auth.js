const express = require('express');
const {
  register,
  login,
  getMe,
  logout,
  googleAuth
} = require('../controllers/authController');
const {
  registerValidation,
  handleValidationErrors,
  loginValidation,
  googleAuthValidation
} = require('../middleware/validation');
const { protect } = require('../middleware/auth');

const router = express.Router();


//route to register a teacher
router.post('/register', registerValidation, handleValidationErrors, register);

//route to login a teacher
router.post('/login', loginValidation, handleValidationErrors, login);

//route to login or register a teacher via Google
router.post('/google', googleAuthValidation, handleValidationErrors, googleAuth);

//route to get the personal info
router.get('/me', protect, getMe);

//route to logout the account
router.post('/logout', protect, logout);

module.exports = router;
