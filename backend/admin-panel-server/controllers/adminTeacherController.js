const Teacher = require("../../models/Teacher");
const Admin = require("../models/Admin");
const ErrorResponse = require("../../utils/errorResponse");
const asyncHandler = require("../../middleware/asyncHandler");
const escapeRegex = require("../../utils/escapeRegex");
const {
  generateImageUrl,
  generatePdfViewUrl,
  generatePdfUrl,
} = require("../../utils/cloudinaryUtils");

const MAX_PAGE_LIMIT = 50;

function attachUrls(teacher) {
  const obj = typeof teacher.toObject === "function" ? teacher.toObject() : teacher;
  obj.avatarUrl = generateImageUrl(obj.avatarPublicId);
  obj.cvUrl = generatePdfViewUrl(obj.cvPublicId);
  obj.cvDownloadUrl = generatePdfUrl(obj.cvPublicId);
  return obj;
}

// @desc    Get all teachers (admin view — includes hidden profiles)
// @route   GET /api/admin/teachers
// @access  Admin
exports.adminGetTeachers = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    search,
    isVisible,
    isActive,
    sortBy = "createdAt",
    order = "desc",
  } = req.query;

  const filter = {};

  // Search across name, email (contact), subject
  if (search) {
    const searchRegex = new RegExp(escapeRegex(search), "i");
    filter.$or = [
      { name: searchRegex },
      { "contact.email": searchRegex },
      { preferredSubjects: searchRegex },
      { "address.city": searchRegex },
    ];
  }

  // Filter by visibility
  if (isVisible === "true") filter.isVisible = true;
  else if (isVisible === "false") filter.isVisible = false;

  // Filter by isActive
  if (isActive === "true") filter.isActive = true;
  else if (isActive === "false") filter.isActive = false;

  const pageNum = Math.max(1, parseInt(page) || 1);
  const limitNum = Math.min(MAX_PAGE_LIMIT, Math.max(1, parseInt(limit) || 20));
  const skip = (pageNum - 1) * limitNum;

  const sortDir = order === "asc" ? 1 : -1;
  const sortObj = { [sortBy]: sortDir };

  const [teachers, total] = await Promise.all([
    Teacher.find(filter)
      .populate("userId", "email username")
      .sort(sortObj)
      .skip(skip)
      .limit(limitNum)
      .lean(),
    Teacher.countDocuments(filter),
  ]);

  const data = teachers.map(attachUrls);

  res.json({
    success: true,
    count: data.length,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
    data,
  });
});

// @desc    Get single teacher (admin view — ignores visibility)
// @route   GET /api/admin/teachers/:id
// @access  Admin
exports.adminGetTeacher = asyncHandler(async (req, res, next) => {
  const teacher = await Teacher.findById(req.params.id).populate(
    "userId",
    "email username"
  );

  if (!teacher) {
    return next(new ErrorResponse("Teacher not found", 404));
  }

  res.json({
    success: true,
    data: attachUrls(teacher),
  });
});

// @desc    Toggle teacher profile visibility
// @route   PATCH /api/admin/teachers/:id/visibility
// @access  Admin
exports.adminSetVisibility = asyncHandler(async (req, res, next) => {
  const { isVisible } = req.body;

  if (typeof isVisible !== "boolean") {
    return next(new ErrorResponse("isVisible must be a boolean", 400));
  }

  const teacher = await Teacher.findByIdAndUpdate(
    req.params.id,
    {
      isVisible,
      visibilityUpdatedAt: new Date(),
      visibilityUpdatedBy: req.admin._id,
    },
    { new: true, runValidators: false }
  );

  if (!teacher) {
    return next(new ErrorResponse("Teacher not found", 404));
  }

  res.json({
    success: true,
    data: {
      id: teacher._id,
      name: teacher.name,
      isVisible: teacher.isVisible,
      visibilityUpdatedAt: teacher.visibilityUpdatedAt,
    },
  });
});
