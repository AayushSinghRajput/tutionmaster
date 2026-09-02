const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");
const asyncHandler = require('../middleware/asyncHandler');
const logger = require('../utils/logger');

const googleClient = process.env.GOOGLE_CLIENT_ID
  ? new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
  : null;

const jwt = require("jsonwebtoken");

const setTokenCookie = (res, token) => {
  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};



// @desc    Register teacher
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { username, email, password, confirmPassword, role = 'student' } = req.body;

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
    role
  });

  const accessToken = generateAccessToken(user._id, user.tokenVersion);
  const refreshToken = generateRefreshToken(user._id, user.tokenVersion);
  setTokenCookie(res, refreshToken);

  res.status(201).json({
    success: true,
    token: accessToken,
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

  const accessToken = generateAccessToken(user._id, user.tokenVersion);
  const refreshToken = generateRefreshToken(user._id, user.tokenVersion);
  setTokenCookie(res, refreshToken);

  res.json({
    success: true,
    token: accessToken,
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

// @desc    Logout teacher / invalidate their current token(s)
// @route   POST /api/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res) => {
  // Bumping tokenVersion invalidates every JWT issued before this point
  // (checked in middleware/auth.js `protect`), since there's no per-token
  // store to revoke a single token individually.
  req.user.tokenVersion += 1;
  await req.user.save();

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  });

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

  const { credential, role = 'student' } = req.body;

  let payload;
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    payload = ticket.getPayload();
  } catch (err) {
    logger.warn(`Google credential verification failed: ${err.message}`);
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
        role,
      });
    }
  }

  const accessToken = generateAccessToken(user._id, user.tokenVersion);
  const refreshToken = generateRefreshToken(user._id, user.tokenVersion);
  setTokenCookie(res, refreshToken);

  res.json({
    success: true,
    token: accessToken,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

// @desc    Refresh access token
// @route   GET /api/auth/refresh
// @access  Public
exports.refresh = asyncHandler(async (req, res, next) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return next(new ErrorResponse('Not authorized, no refresh token', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.tokenVersion !== decoded.tokenVersion) {
      return next(new ErrorResponse('Token is no longer valid', 401));
    }

    const accessToken = generateAccessToken(user._id, user.tokenVersion);
    const refreshToken = generateRefreshToken(user._id, user.tokenVersion);
    setTokenCookie(res, refreshToken);

    res.json({
      success: true,
      token: accessToken
    });
  } catch (err) {
    return next(new ErrorResponse('Not authorized, token failed', 401));
  }
});
