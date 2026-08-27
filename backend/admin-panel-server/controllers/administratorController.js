const Admin = require("../models/Admin");
const ErrorResponse = require("../../utils/errorResponse");
const asyncHandler = require("../../middleware/asyncHandler");

const SUPER_ADMIN_EMAIL =
  process.env.SUPER_ADMIN_EMAIL || "aayusinghrajput812@gmail.com";

// @desc    List all administrators
// @route   GET /api/admin/administrators
// @access  Super Admin
exports.listAdministrators = asyncHandler(async (req, res) => {
  const admins = await Admin.find().sort({ createdAt: 1 });

  res.json({
    success: true,
    count: admins.length,
    data: admins.map((a) => ({
      id: a._id,
      name: a.name,
      email: a.email,
      isSuperAdmin: a.isSuperAdmin,
      isActive: a.isActive,
      lastLoginAt: a.lastLoginAt,
      createdAt: a.createdAt,
    })),
  });
});

// @desc    Create a new administrator (normal, never Super Admin)
// @route   POST /api/admin/administrators
// @access  Super Admin
exports.createAdministrator = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(
      new ErrorResponse("Name, email, and password are required", 400)
    );
  }

  if (password.length < 8) {
    return next(
      new ErrorResponse("Password must be at least 8 characters", 400)
    );
  }

  const exists = await Admin.findOne({ email: email.toLowerCase() });
  if (exists) {
    return next(
      new ErrorResponse("An administrator with that email already exists", 400)
    );
  }

  // Always force isSuperAdmin = false — only the seeded Super Admin can be Super Admin.
  const passwordHash = await Admin.hashPassword(password);

  const admin = await Admin.create({
    name,
    email: email.toLowerCase(),
    passwordHash,
    isSuperAdmin: false,
    isActive: true,
  });

  res.status(201).json({
    success: true,
    data: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      isSuperAdmin: admin.isSuperAdmin,
      isActive: admin.isActive,
      createdAt: admin.createdAt,
    },
  });
});

// @desc    Update an administrator (currently supports isActive toggle)
// @route   PATCH /api/admin/administrators/:id
// @access  Super Admin
exports.updateAdministrator = asyncHandler(async (req, res, next) => {
  const target = await Admin.findById(req.params.id);

  if (!target) {
    return next(new ErrorResponse("Administrator not found", 404));
  }

  // Protect the Super Admin from any modification through this endpoint
  if (target.email === SUPER_ADMIN_EMAIL) {
    return next(
      new ErrorResponse(
        "The root Super Admin account cannot be modified",
        403
      )
    );
  }

  const { isActive } = req.body;

  if (typeof isActive !== "boolean") {
    return next(new ErrorResponse("isActive must be a boolean", 400));
  }

  target.isActive = isActive;
  await target.save();

  res.json({
    success: true,
    data: {
      id: target._id,
      name: target.name,
      email: target.email,
      isSuperAdmin: target.isSuperAdmin,
      isActive: target.isActive,
    },
  });
});

// @desc    Deactivate (soft-delete) an administrator
// @route   DELETE /api/admin/administrators/:id
// @access  Super Admin
exports.removeAdministrator = asyncHandler(async (req, res, next) => {
  const target = await Admin.findById(req.params.id);

  if (!target) {
    return next(new ErrorResponse("Administrator not found", 404));
  }

  // Backend-enforced: the Super Admin can never be removed
  if (target.isSuperAdmin || target.email === SUPER_ADMIN_EMAIL) {
    return next(
      new ErrorResponse(
        "The Super Admin account cannot be removed",
        403
      )
    );
  }

  // Deactivate rather than permanently delete to preserve audit history
  target.isActive = false;
  await target.save();

  res.json({
    success: true,
    message: "Administrator has been deactivated",
    data: {
      id: target._id,
      isActive: target.isActive,
    },
  });
});
