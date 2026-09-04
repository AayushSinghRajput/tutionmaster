const Requirement = require("../../models/Requirement");
const Teacher = require("../../models/Teacher");
const asyncHandler = require("../../middleware/asyncHandler");
const ErrorResponse = require("../../utils/errorResponse");
const escapeRegex = require("../../utils/escapeRegex");

// @desc    Get all student requirements / leads
// @route   GET /api/admin/requirements
// @access  Admin
exports.adminGetRequirements = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    search,
    status,
    academicLevel,
    teachingMode,
    sortBy = "createdAt",
    order = "desc",
  } = req.query;

  const filter = {};

  if (search) {
    const searchRegex = new RegExp(escapeRegex(search), "i");
    filter.$or = [
      { subject: searchRegex },
      { contactName: searchRegex },
      { contactEmail: searchRegex },
      { contactPhone: searchRegex },
      { location: searchRegex },
      { additionalRequirements: searchRegex },
    ];
  }

  if (status && status !== "ALL") {
    filter.status = status;
  }

  if (academicLevel && academicLevel !== "ALL") {
    filter.academicLevel = academicLevel;
  }

  if (teachingMode && teachingMode !== "ALL") {
    filter.teachingMode = teachingMode;
  }

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10) || 20));
  const skip = (pageNum - 1) * limitNum;

  const sortDir = order === "asc" ? 1 : -1;
  const sortObj = { [sortBy]: sortDir };

  const [requirements, total] = await Promise.all([
    Requirement.find(filter)
      .populate("userId", "name username email")
      .populate("assignedTutorId", "name contact hourlyRate address preferredSubjects avatarPublicId")
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Requirement.countDocuments(filter),
  ]);

  res.json({
    success: true,
    count: requirements.length,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
    data: requirements,
  });
});

// @desc    Get single requirement
// @route   GET /api/admin/requirements/:id
// @access  Admin
exports.adminGetRequirement = asyncHandler(async (req, res, next) => {
  const requirement = await Requirement.findById(req.params.id)
    .populate("userId", "name username email")
    .populate("assignedTutorId", "name contact hourlyRate address preferredSubjects avatarPublicId");

  if (!requirement) {
    return next(new ErrorResponse("Requirement not found", 404));
  }

  res.json({
    success: true,
    data: requirement,
  });
});

// @desc    Update requirement status or details
// @route   PATCH /api/admin/requirements/:id
// @access  Admin
exports.adminUpdateRequirement = asyncHandler(async (req, res, next) => {
  const { status, assignedTutorId, adminNotes, contactPhone, contactEmail, budget } = req.body;

  const updateFields = {};
  if (status !== undefined) updateFields.status = status;
  if (assignedTutorId !== undefined) updateFields.assignedTutorId = assignedTutorId || null;
  if (adminNotes !== undefined) updateFields.adminNotes = adminNotes;
  if (contactPhone !== undefined) updateFields.contactPhone = contactPhone;
  if (contactEmail !== undefined) updateFields.contactEmail = contactEmail;
  if (budget !== undefined) updateFields.budget = budget;

  const requirement = await Requirement.findByIdAndUpdate(
    req.params.id,
    updateFields,
    { new: true, runValidators: true }
  )
    .populate("userId", "name username email")
    .populate("assignedTutorId", "name contact hourlyRate address preferredSubjects");

  if (!requirement) {
    return next(new ErrorResponse("Requirement not found", 404));
  }

  res.json({
    success: true,
    message: "Requirement updated successfully",
    data: requirement,
  });
});

// @desc    Delete a requirement
// @route   DELETE /api/admin/requirements/:id
// @access  Admin
exports.adminDeleteRequirement = asyncHandler(async (req, res, next) => {
  const requirement = await Requirement.findByIdAndDelete(req.params.id);

  if (!requirement) {
    return next(new ErrorResponse("Requirement not found", 404));
  }

  res.json({
    success: true,
    message: "Requirement deleted successfully",
  });
});
