const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const ErrorResponse = require("../../utils/errorResponse");
const asyncHandler = require("../../middleware/asyncHandler");

const ADMIN_JWT_SECRET =
  process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET;
const ADMIN_JWT_EXPIRE = process.env.ADMIN_JWT_EXPIRE || process.env.JWT_EXPIRE || "7d";

function generateAdminToken(adminId) {
  // The payload contains `adminId` (not `id`) so admin tokens are
  // structurally distinct from teacher tokens even when the same secret is used.
  return jwt.sign({ adminId }, ADMIN_JWT_SECRET, {
    expiresIn: ADMIN_JWT_EXPIRE,
  });
}

// @desc    Admin login
// @route   POST /api/admin/auth/login
// @access  Public
exports.adminLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide email and password", 400));
  }

  // Retrieve the passwordHash explicitly (it is select: false)
  const admin = await Admin.findOne({ email: email.toLowerCase() }).select(
    "+passwordHash"
  );

  if (!admin) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  if (!admin.isActive) {
    return next(new ErrorResponse("Your admin account has been deactivated", 403));
  }

  const isMatch = await admin.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Update lastLoginAt non-blockingly
  Admin.findByIdAndUpdate(admin._id, { lastLoginAt: new Date() }).catch(
    () => {}
  );

  const token = generateAdminToken(admin._id);

  res.json({
    success: true,
    token,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      isSuperAdmin: admin.isSuperAdmin,
    },
  });
});

// @desc    Get current admin profile
// @route   GET /api/admin/auth/me
// @access  Admin
exports.getMe = asyncHandler(async (req, res) => {
  const admin = req.admin;

  res.json({
    success: true,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      isSuperAdmin: admin.isSuperAdmin,
      isActive: admin.isActive,
      lastLoginAt: admin.lastLoginAt,
      createdAt: admin.createdAt,
    },
  });
});
