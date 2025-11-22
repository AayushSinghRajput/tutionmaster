const Teacher = require('../models/Teacher');
const ErrorResponse = require('../utils/errorResponse');
const cloudinary = require('../config/cloudinary');

// Helper function to generate Cloudinary URLs
const generateCloudinaryUrl = (publicId, resourceType = 'image') => {
  if (!publicId) return null;
  
  if (resourceType === 'image') {
    return cloudinary.url(publicId, {
      width: 500,
      height: 500,
      crop: 'fill',
      format: 'webp',
      quality: 'auto'
    });
  } else {
    return cloudinary.url(publicId, {
      resource_type: 'raw',
      flags: 'attachment'
    });
  }
};

// @desc    Get all teachers (public)
// @route   GET /api/teachers
// @access  Public
exports.getTeachers = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      subject,
      city,
      teachingMode,
      minExperience,
      maxExperience,
      minRate,
      maxRate
    } = req.query;

    // Build filter object
    let filter = { isActive: true };
    
    if (subject) {
      filter.preferredSubjects = { $in: [new RegExp(subject, 'i')] };
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

    // Add Cloudinary URLs
    const teachersWithUrls = teachers.map(teacher => {
      const teacherObj = teacher.toObject();
      teacherObj.avatarUrl = generateCloudinaryUrl(teacher.avatarPublicId, 'image');
      teacherObj.cvUrl = generateCloudinaryUrl(teacher.cvPublicId, 'raw');
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
  } catch (error) {
    next(error);
  }
};

// @desc    Search teachers
// @route   GET /api/teachers/search
// @access  Public
exports.searchTeachers = async (req, res, next) => {
  try {
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
      teacherObj.avatarUrl = generateCloudinaryUrl(teacher.avatarPublicId, 'image');
      teacherObj.cvUrl = generateCloudinaryUrl(teacher.cvPublicId, 'raw');
      return teacherObj;
    });

    res.json({
      success: true,
      count: teachers.length,
      data: teachersWithUrls
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single teacher
// @route   GET /api/teachers/:id
// @access  Public
exports.getTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .populate('userId', 'email');

    if (!teacher || !teacher.isActive) {
      return next(new ErrorResponse('Teacher not found', 404));
    }

    const teacherObj = teacher.toObject();
    teacherObj.avatarUrl = generateCloudinaryUrl(teacher.avatarPublicId, 'image');
    teacherObj.cvUrl = generateCloudinaryUrl(teacher.cvPublicId, 'raw');

    res.json({
      success: true,
      data: teacherObj
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create teacher profile
// @route   POST /api/teachers
// @access  Private
exports.createTeacher = async (req, res, next) => {
  try {
    const existingProfile = await Teacher.findOne({ userId: req.user.id });
    if (existingProfile) {
      return next(new ErrorResponse('Profile already exists for this user', 400));
    }

    const teacher = await Teacher.create({
      userId: req.user.id,
      ...req.body
    });

    const teacherObj = teacher.toObject();

    teacherObj.avatarUrl = teacher.avatarPublicId
      ? generateCloudinaryUrl(teacher.avatarPublicId, 'image')
      : null;

    teacherObj.cvUrl = teacher.cvPublicId
      ? generateCloudinaryUrl(teacher.cvPublicId, 'raw')
      : null;

    res.status(201).json({
      success: true,
      data: teacherObj
    });
  } catch (error) {
    next(error);
  }
};


// @desc    Update teacher profile
// @route   PUT /api/teachers/:id
// @access  Private
exports.updateTeacher = async (req, res, next) => {
  try {
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
    teacherObj.avatarUrl = generateCloudinaryUrl(teacher.avatarPublicId, 'image');
    teacherObj.cvUrl = generateCloudinaryUrl(teacher.cvPublicId, 'raw');

    res.json({
      success: true,
      data: teacherObj
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete teacher profile
// @route   DELETE /api/teachers/:id
// @access  Private
exports.deleteTeacher = async (req, res, next) => {
  try {
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
      await cloudinary.uploader.destroy(teacher.avatarPublicId);
    }
    if (teacher.cvPublicId) {
      await cloudinary.uploader.destroy(teacher.cvPublicId, { resource_type: 'raw' });
    }

    await Teacher.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Teacher profile deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current teacher's profile
// @route   GET /api/teachers/my-profile
// @access  Private
//Fetches the logged-in teacher
exports.getMyProfile = async (req, res, next) => {
  try {
    const teacher = await Teacher.findOne({ userId: req.user.id })
      .populate('userId', 'email');

    if (!teacher) {
      return next(new ErrorResponse('Profile not found', 404));
    }

    const teacherObj = teacher.toObject();
    teacherObj.avatarUrl = generateCloudinaryUrl(teacher.avatarPublicId, 'image');
    teacherObj.cvUrl = generateCloudinaryUrl(teacher.cvPublicId, 'raw');

    res.json({
      success: true,
      data: teacherObj
    });
  } catch (error) {
    next(error);
  }
};