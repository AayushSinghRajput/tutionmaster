const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const generateToken = require("../utils/generateToken");
const asyncHandler = require('../middleware/asyncHandler');

const googleClient = process.env.GOOGLE_CLIENT_ID
  ? new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
  : null;



// @desc    Register teacher
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return next(new ErrorResponse('Passwords do not match', 400));
  }

  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorResponse('User already exists with this email', 400));
  }

  // Create user
  const user = await User.create({
    username,
    email,
    password,
    role: 'teacher'
  });

  const token = generateToken(user._id);

  res.status(201).json({
    success: true,
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    }
  });
});

// @desc    Login teacher
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide email and password', 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const token = generateToken(user._id);

  res.json({
    success: true,
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    }
  });
});

// @desc    Get current logged in teacher
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  res.json({
    success: true,
    data: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    }
  });
});

// @desc    Logout teacher / clear cookie
// @route   POST /api/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// @desc    Login or register a teacher via a Google ID token
// @route   POST /api/auth/google
// @access  Public
exports.googleAuth = asyncHandler(async (req, res, next) => {
  if (!googleClient) {
    return next(new ErrorResponse('Google sign-in is not configured', 501));
  }

  const { credential } = req.body;

  let payload;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    payload = ticket.getPayload();
  } catch (err) {
    return next(new ErrorResponse('Invalid Google credential', 401));
  }

  const { sub: googleId, email, name, email_verified: emailVerified } = payload;

  if (!email || !emailVerified) {
    return next(new ErrorResponse('Google account email is not verified', 401));
  }

  let user = await User.findOne({ googleId });

  if (!user) {
    user = await User.findOne({ email });
    if (user) {
      // Link this Google account to the existing password-based account
      user.googleId = googleId;
      await user.save();
    } else {
      user = await User.create({
        username: name || email.split('@')[0],
        email,
        googleId,
        role: 'teacher',
      });
    }
  }

  const token = generateToken(user._id);

  res.json({
    success: true,
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});
