const Teacher = require('../models/Teacher');
const ErrorResponse = require('../utils/errorResponse');
const cloudinary = require('../config/cloudinary');
const asyncHandler = require('../middleware/asyncHandler');
const withRetry = require('../utils/withRetry');
const {
  generateImageUrl,
  generatePdfViewUrl,
  generatePdfUrl,
} = require('../utils/cloudinaryUtils');

// @desc    Get all teachers (public)
// @route   GET /api/teachers
// @access  Public
exports.getTeachers = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    subject,
    subjects,
    city,
    teachingMode,
    minExperience,
    maxExperience,
    minRate,
    maxRate
  } = req.query;

  // Build filter object
  let filter = { isActive: true };

  // Handle both single subject and multiple subjects
  if (subject || subjects) {
    let subjectFilters = [];

    // Handle single subject (for backward compatibility)
    if (subject) {
      subjectFilters.push(new RegExp(subject, 'i'));
    }

    // Handle multiple subjects (comma-separated)
    if (subjects) {
      const subjectArray = subjects.split(',');
      subjectArray.forEach(sub => {
        subjectFilters.push(new RegExp(sub.trim(), 'i'));
      });
    }

    filter.preferredSubjects = { $in: subjectFilters };
  }

  if (city) {
    filter['address.city'] = new RegExp(city, 'i');
  }
  if (teachingMode) {
    filter.teachingMode = teachingMode;
  }
  if (minExperience || maxExperience) {
    filter.experience = {};
    if (minExperience) filter.experience.$gte = parseInt(minExperience);
    if (maxExperience) filter.experience.$lte = parseInt(maxExperience);
  }
  if (minRate || maxRate) {
    filter.hourlyRate = {};
    if (minRate) filter.hourlyRate.$gte = parseInt(minRate);
    if (maxRate) filter.hourlyRate.$lte = parseInt(maxRate);
  }



  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const teachers = await Teacher.find(filter)
    .populate('userId', 'email')
    .skip(skip)
    .limit(limitNum)
    .sort({ createdAt: -1 });

  // Add Cloudinary URLs using helper functions
  const teachersWithUrls = teachers.map(teacher => {
    const teacherObj = teacher.toObject();
    teacherObj.avatarUrl = generateImageUrl(teacher.avatarPublicId);
    teacherObj.cvUrl = generatePdfViewUrl(teacher.cvPublicId); // Use viewing URL
    teacherObj.cvDownloadUrl = generatePdfUrl(teacher.cvPublicId); // Add download URL separately
    return teacherObj;
  });

  const total = await Teacher.countDocuments(filter);

  res.json({
    success: true,
    count: teachers.length,
    total,
    pagination: {
      page: pageNum,
      pages: Math.ceil(total / limitNum)
    },
    data: teachersWithUrls
  });
});

// @desc    Search teachers
// @route   GET /api/teachers/search
// @access  Public
exports.searchTeachers = asyncHandler(async (req, res) => {
  const { q, subject, city } = req.query;

  let filter = { isActive: true };

  if (q) {
    filter.$or = [
      { name: new RegExp(q, 'i') },
      { bio: new RegExp(q, 'i') },
      { 'address.city': new RegExp(q, 'i') }
    ];
  }

  if (subject) {
    filter.preferredSubjects = { $in: [new RegExp(subject, 'i')] };
  }

  if (city) {
    filter['address.city'] = new RegExp(city, 'i');
  }

  const teachers = await Teacher.find(filter)
    .populate('userId', 'email')
    .limit(20)
    .sort({ experience: -1 });

  const teachersWithUrls = teachers.map(teacher => {
    const teacherObj = teacher.toObject();
    teacherObj.avatarUrl = generateImageUrl(teacher.avatarPublicId);
    teacherObj.cvUrl = generatePdfViewUrl(teacher.cvPublicId); // Use viewing URL
    teacherObj.cvDownloadUrl = generatePdfUrl(teacher.cvPublicId); // Add download URL
    return teacherObj;
  });

  res.json({
    success: true,
    count: teachers.length,
    data: teachersWithUrls
  });
});

// @desc    Get single teacher
// @route   GET /api/teachers/:id
// @access  Public
exports.getTeacher = asyncHandler(async (req, res, next) => {
  const teacher = await Teacher.findById(req.params.id).populate('userId', 'email name');

  if (!teacher) {
    return next(new ErrorResponse('Teacher not found', 404));
  }

  if (!teacher.isActive && req.user?.role !== 'admin') {
    return next(new ErrorResponse('Teacher profile is not available', 404));
  }

  const teacherObj = teacher.toObject();

  teacherObj.avatarUrl = generateImageUrl(teacher.avatarPublicId);
  teacherObj.cvUrl = generatePdfViewUrl(teacher.cvPublicId); // Use viewing URL
  teacherObj.cvDownloadUrl = generatePdfUrl(teacher.cvPublicId); // Add download URL separately

  res.json({
    success: true,
    data: teacherObj
  });
});

// @desc    Create teacher profile
// @route   POST /api/teachers
// @access  Private
exports.createTeacher = asyncHandler(async (req, res, next) => {
  const existingProfile = await Teacher.findOne({ userId: req.user.id });
  if (existingProfile) {
    return next(new ErrorResponse('Profile already exists for this user', 400));
  }

  const teacher = await Teacher.create({
    userId: req.user.id,
    ...req.body
  });

  const teacherObj = teacher.toObject();
  teacherObj.avatarUrl = generateImageUrl(teacher.avatarPublicId);
  teacherObj.cvUrl = generatePdfViewUrl(teacher.cvPublicId);
  teacherObj.cvDownloadUrl = generatePdfUrl(teacher.cvPublicId);

  res.status(201).json({
    success: true,
    data: teacherObj
  });
});

// @desc    Update teacher profile
// @route   PUT /api/teachers/:id
// @access  Private
exports.updateTeacher = asyncHandler(async (req, res, next) => {
  let teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    return next(new ErrorResponse('Teacher not found', 404));
  }

  // Check ownership
  if (teacher.userId.toString() !== req.user.id) {
    return next(new ErrorResponse('Not authorized to update this profile', 403));
  }

  teacher = await Teacher.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  ).populate('userId', 'email');

  const teacherObj = teacher.toObject();
  teacherObj.avatarUrl = generateImageUrl(teacher.avatarPublicId);
  teacherObj.cvUrl = generatePdfViewUrl(teacher.cvPublicId);
  teacherObj.cvDownloadUrl = generatePdfUrl(teacher.cvPublicId);

  res.json({
    success: true,
    data: teacherObj
  });
});

// @desc    Delete teacher profile
// @route   DELETE /api/teachers/:id
// @access  Private
exports.deleteTeacher = asyncHandler(async (req, res, next) => {
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    return next(new ErrorResponse('Teacher not found', 404));
  }

  // Check ownership
  if (teacher.userId.toString() !== req.user.id) {
    return next(new ErrorResponse('Not authorized to delete this profile', 403));
  }

  // Delete from Cloudinary if files exist
  if (teacher.avatarPublicId) {
    await withRetry(() => cloudinary.uploader.destroy(teacher.avatarPublicId), {
      label: 'Cloudinary avatar deletion',
    });
  }
  if (teacher.cvPublicId) {
    await withRetry(
      () => cloudinary.uploader.destroy(teacher.cvPublicId, { resource_type: 'raw' }),
      { label: 'Cloudinary CV deletion' },
    );
  }

  await Teacher.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: 'Teacher profile deleted successfully'
  });
});

// @desc    Get current teacher's profile
// @route   GET /api/teachers/my-profile
// @access  Private
// Fetches the logged-in teacher
exports.getMyProfile = asyncHandler(async (req, res, next) => {
  const teacher = await Teacher.findOne({ userId: req.user.id })
    .populate('userId', 'email');

  if (!teacher) {
    return next(new ErrorResponse('Profile not found', 404));
  }

  const teacherObj = teacher.toObject();
  teacherObj.avatarUrl = generateImageUrl(teacher.avatarPublicId);
  teacherObj.cvUrl = generatePdfViewUrl(teacher.cvPublicId);
  teacherObj.cvDownloadUrl = generatePdfUrl(teacher.cvPublicId);

  res.json({
    success: true,
    data: teacherObj
  });
});

// @desc    Update teacher avatar
// @route   PUT /api/teachers/:id/avatar
// @access  Private
exports.updateTeacherAvatar = asyncHandler(async (req, res, next) => {
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    return next(new ErrorResponse('Teacher not found', 404));
  }

  // Make sure user is teacher owner or admin
  if (teacher.userId.toString() !== req.user.id) {
    return next(new ErrorResponse('Not authorized to update this teacher profile', 401));
  }

  if (req.body.avatarPublicId) {
    // Delete old avatar from Cloudinary if exists
    if (teacher.avatarPublicId) {
      await withRetry(
        () => cloudinary.uploader.destroy(teacher.avatarPublicId, { resource_type: 'image' }),
        { label: 'Cloudinary avatar deletion' },
      );
    }
    teacher.avatarPublicId = req.body.avatarPublicId;
  }

  await teacher.save();

  const teacherObj = teacher.toObject();
  teacherObj.avatarUrl = generateImageUrl(teacher.avatarPublicId);

  res.json({
    success: true,
    data: teacherObj
  });
});

// @desc    Update teacher CV
// @route   PUT /api/teachers/:id/cv
// @access  Private
exports.updateTeacherCV = asyncHandler(async (req, res, next) => {
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    return next(new ErrorResponse('Teacher not found', 404));
  }

  // Make sure user is teacher owner or admin
  if (teacher.userId.toString() !== req.user.id) {
    return next(new ErrorResponse('Not authorized to update this teacher profile', 401));
  }

  if (req.body.cvPublicId) {
    // Delete old CV from Cloudinary if exists
    if (teacher.cvPublicId) {
      await withRetry(
        () => cloudinary.uploader.destroy(teacher.cvPublicId, { resource_type: 'raw' }),
        { label: 'Cloudinary CV deletion' },
      );
    }
    teacher.cvPublicId = req.body.cvPublicId;
  }

  await teacher.save();

  const teacherObj = teacher.toObject();
  teacherObj.cvUrl = generatePdfViewUrl(teacher.cvPublicId);
  teacherObj.cvDownloadUrl = generatePdfUrl(teacher.cvPublicId);

  res.json({
    success: true,
    data: teacherObj
  });
});
