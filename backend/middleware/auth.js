const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(new ErrorResponse('No user found with this id', 404));
    }

    // Tokens issued before the user's last logout carry a stale
    // tokenVersion and must be rejected even though they haven't expired.
    if ((decoded.tokenVersion || 0) !== req.user.tokenVersion) {
      return next(new ErrorResponse('Session expired, please log in again', 401));
    }

    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
};

// For routes usable by both guests and logged-in users (e.g. AI chat), where
// a missing/invalid token means "treat as guest" rather than a 401 — but a
// *present* token still gets verified exactly like `protect`, so nothing can
// impersonate a user with a bad token.
exports.optionalAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (user && (decoded.tokenVersion || 0) === user.tokenVersion) {
      req.user = user;
    }
  } catch (error) {
    // Invalid/expired token on an optional-auth route: proceed as a guest
    // rather than rejecting the request.
  }

  next();
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`, 403)
      );
    }
    next();
  };
};