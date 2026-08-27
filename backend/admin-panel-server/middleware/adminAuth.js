const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const ErrorResponse = require("../../utils/errorResponse");

const ADMIN_JWT_SECRET =
  process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET;

/**
 * Middleware: verify the admin JWT and attach req.admin.
 * Uses a distinct secret (ADMIN_JWT_SECRET) so admin tokens
 * are completely separate from teacher tokens.
 */
exports.protectAdmin = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized — no token", 401));
  }

  try {
    const decoded = jwt.verify(token, ADMIN_JWT_SECRET);

    // decoded.adminId must be present — this distinguishes admin tokens
    // from teacher tokens even when the same JWT_SECRET is shared.
    if (!decoded.adminId) {
      return next(new ErrorResponse("Invalid admin token", 401));
    }

    const admin = await Admin.findById(decoded.adminId);

    if (!admin) {
      return next(new ErrorResponse("Admin account not found", 401));
    }

    if (!admin.isActive) {
      return next(new ErrorResponse("Admin account is deactivated", 403));
    }

    req.admin = admin;
    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorized — invalid token", 401));
  }
};

/**
 * Middleware: only Super Admins may proceed.
 * Must be used AFTER protectAdmin.
 */
exports.requireSuperAdmin = (req, res, next) => {
  if (!req.admin || !req.admin.isSuperAdmin) {
    return next(
      new ErrorResponse(
        "Access denied — Super Admin privileges required",
        403
      )
    );
  }
  next();
};
