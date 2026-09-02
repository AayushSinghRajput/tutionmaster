const express = require('express');
const {
  register,
  login,
  getMe,
  logout,
  googleAuth,
  refresh
} = require('../controllers/authController');
const {
  registerValidation,
  handleValidationErrors,
  loginValidation,
  googleAuthValidation
} = require('../middleware/validation');
const { protect } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password, confirmPassword]
 *             properties:
 *               username: { type: string }
 *               email: { type: string, format: email }
 *               password: { type: string, minLength: 6 }
 *               confirmPassword: { type: string, minLength: 6 }
 *     responses:
 *       201:
 *         description: User created, returns a JWT
 *       400:
 *         description: Validation error or email already registered
 */
//route to register a teacher
router.post('/register', authLimiter, registerValidation, handleValidationErrors, register);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Log in with email and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Returns a JWT
 *       401:
 *         description: Invalid credentials
 */
//route to login a teacher
router.post('/login', authLimiter, loginValidation, handleValidationErrors, login);

/**
 * @openapi
 * /auth/google:
 *   post:
 *     summary: Log in or register using a Google ID token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [credential]
 *             properties:
 *               credential: { type: string, description: Google ID token }
 *     responses:
 *       200:
 *         description: Returns a JWT
 *       401:
 *         description: Invalid or unverified Google credential
 */
//route to login or register a teacher via Google
router.post('/google', authLimiter, googleAuthValidation, handleValidationErrors, googleAuth);

/**
 * @openapi
 * /auth/me:
 *   get:
 *     summary: Get the current logged-in user
 *     tags: [Auth]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: The current user
 *       401:
 *         description: Not authorized
 */
//route to get the personal info
router.get('/me', protect, getMe);

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     summary: Log out and invalidate the current token
 *     description: Invalidates every JWT previously issued to this user (logout-everywhere), since tokens are stateless and not tracked individually.
 *     tags: [Auth]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Logged out
 *       401:
 *         description: Not authorized
 */
//route to logout the account
router.post('/logout', protect, logout);

/**
 * @openapi
 * /auth/refresh:
 *   get:
 *     summary: Refresh the access token using the HttpOnly refresh token cookie
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Returns a new access token
 *       401:
 *         description: Not authorized (cookie missing or invalid)
 */
router.get('/refresh', refresh);

module.exports = router;
