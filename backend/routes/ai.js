const express = require('express');
const router = express.Router();
const { optionalAuth } = require('../middleware/auth');
const { aiLimiter } = require('../middleware/rateLimiter');
const { aiChatValidation, handleValidationErrors } = require('../middleware/validation');
const { chat } = require('../controllers/aiController');

// Guests and logged-in tutors can both chat; optionalAuth attaches req.user
// only when a valid token is present, without rejecting guests.
router.post('/chat', aiLimiter, optionalAuth, aiChatValidation, handleValidationErrors, chat);

module.exports = router;
