const Teacher = require("../models/Teacher");
const ErrorResponse = require("../utils/errorResponse");
const cloudinary = require("../config/cloudinary");
const asyncHandler = require("../middleware/asyncHandler");
const withRetry = require("../utils/withRetry");
const logger = require("../utils/logger");
const escapeRegex = require("../utils/escapeRegex");
const cache = require("../utils/cache");
const { notifyIndexNow, getTeacherUrl } = require("../utils/indexNow");

const SUBJECTS_CACHE_KEY = "subjects";
const SUBJECTS_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

const {
  generateImageUrl,
  generatePdfViewUrl,
  generatePdfUrl,
} = require("../utils/cloudinaryUtils");

// Fields a user is allowed to set directly on their own teacher profile.
// userId/isActive/timestamps etc. are deliberately excluded so a client
// can't reassign a profile to another account or flip moderation flags
// by stuffing extra keys into the request body (mass-assignment).
const ALLOWED_TEACHER_FIELDS = [
  "name",
  "address",
  "qualifications",
  "contact",
  "preferredSubjects",
  "bio",
  "experience",
  "availability",
  "teachingMode",
  "monthlyRate",
  "hourlyRate",
  "avatarPublicId",
  "cvPublicId",
];

function pickAllowedTeacherFields(body) {
  const picked = {};

  for (const field of ALLOWED_TEACHER_FIELDS) {
    if (Object.prototype.hasOwnProperty.call(body, field)) {
      picked[field] = body[field];
    }
  }

  // Ensure two-way rate compatibility
  if (picked.monthlyRate !== undefined && picked.monthlyRate !== null) {
    picked.monthlyRate = Number(picked.monthlyRate);
    if (!picked.hourlyRate) {
      picked.hourlyRate = Math.round(picked.monthlyRate / 20);
    }
  } else if (picked.hourlyRate !== undefined && picked.hourlyRate !== null) {
    picked.hourlyRate = Number(picked.hourlyRate);
    picked.monthlyRate = picked.hourlyRate * 20;
  }

  return picked;
}

// Public list/search endpoints only ever need a handful of results per page;
// without a hard cap a client can request `limit=1000000` and force a huge
// collection scan / response payload.
const MAX_PAGE_LIMIT = 50;

// @desc    Get all teachers (public)
// @route   GET /api/teachers
// @access  Public
exports.getTeachers = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 9,
    subject,
    subjects,
    city,
    teachingMode,
    minExperience,
    maxExperience,
    minRate,
    maxRate,
  } = req.query;

  // Build filter object — only return profiles that are both active AND
  // visible (admin-approved).  The admin API uses a different controller
  // that intentionally skips this visibility filter.
  let filter = { isActive: true, isVisible: true };

  // Handle both single subject and multiple subjects
  if (subject || subjects) {
    const subjectFilters = [];

    // Handle single subject (for backward compatibility)
    if (subject) {
      subjectFilters.push(new RegExp(escapeRegex(subject), "i"));
    }

    // Handle multiple subjects (comma-separated)
    if (subjects) {
      const subjectArray = subjects.split(",");

      subjectArray.forEach((sub) => {
        subjectFilters.push(
          new RegExp(escapeRegex(sub.trim()), "i")
        );
      });
    }

    filter.preferredSubjects = { $in: subjectFilters };
  }

  if (city) {
    filter["address.city"] = new RegExp(escapeRegex(city), "i");
  }

  if (teachingMode) {
    filter.teachingMode = teachingMode;
  }

  if (minExperience || maxExperience) {
    filter.experience = {};

    if (minExperience) {
      filter.experience.$gte = parseInt(minExperience);
    }

    if (maxExperience) {
      filter.experience.$lte = parseInt(maxExperience);
    }
  }

  if (minRate || maxRate) {
    const rateCondition = {};

    if (minRate) {
      rateCondition.$gte = parseInt(minRate);
    }

    if (maxRate) {
      rateCondition.$lte = parseInt(maxRate);
    }

    filter.$or = [
      { monthlyRate: rateCondition },
      {
        monthlyRate: { $exists: false },
        hourlyRate: {
          ...(minRate ? { $gte: Math.round(parseInt(minRate) / 20) } : {}),
          ...(maxRate ? { $lte: Math.round(parseInt(maxRate) / 20) } : {}),
        },
      },
    ];
  }

  const pageNum = Math.max(1, parseInt(page) || 1);

  const limitNum = Math.min(
    MAX_PAGE_LIMIT,
    Math.max(1, parseInt(limit) || 9)
  );

  const skip = (pageNum - 1) * limitNum;

  const teachers = await Teacher.find(filter)
    .populate("userId", "email")
    .sort({ name: 1 })
    .skip(skip)
    .limit(limitNum)
    .collation({ locale: "en", strength: 2 })
    .lean();

  // Add Cloudinary URLs using helper functions
  const teachersWithUrls = teachers.map((teacher) => ({
    ...teacher,

    avatarUrl: teacher.avatarPublicId
      ? generateImageUrl(teacher.avatarPublicId)
      : null,

    cvUrl: teacher.cvPublicId
      ? generatePdfViewUrl(teacher.cvPublicId)
      : null,

    cvDownloadUrl: teacher.cvPublicId
      ? generatePdfUrl(teacher.cvPublicId)
      : null,
  }));

  const total = await Teacher.countDocuments(filter);

  res.json({
    success: true,
    count: teachers.length,
    total,

    pagination: {
      page: pageNum,
      pages: Math.ceil(total / limitNum),
    },

    data: teachersWithUrls,
  });
});

// @desc    Get all subjects
// @route   GET /api/teachers/subject
// @access  Public
exports.getAllSubjects = asyncHandler(async (req, res, next) => {
  const cached = cache.get(SUBJECTS_CACHE_KEY);

  if (cached) {
    return res.status(200).json({
      success: true,
      data: cached,
    });
  }

  const subjects = await Teacher.distinct("preferredSubjects");

  // Teachers may enter the same subject with different casing
  // (e.g. "Computer" vs "computer"), so `distinct` alone can
  // return duplicates.
  const uniqueByLowerCase = new Map();

  subjects.forEach((subject) => {
    if (!subject) return;

    const trimmed = subject.trim();
    const key = trimmed.toLowerCase();

    if (!uniqueByLowerCase.has(key)) {
      uniqueByLowerCase.set(key, trimmed);
    }
  });

  const uniqueSubjects = Array.from(
    uniqueByLowerCase.values()
  ).sort((a, b) => a.localeCompare(b));

  cache.set(
    SUBJECTS_CACHE_KEY,
    uniqueSubjects,
    SUBJECTS_CACHE_TTL_MS
  );

  res.status(200).json({
    success: true,
    data: uniqueSubjects,
  });
});

// @desc    Search teachers
// @route   GET /api/teachers/search
// @access  Public
exports.searchTeachers = asyncHandler(async (req, res) => {
  const { q, subject, city } = req.query;

  let filter = { isActive: true, isVisible: true };

  if (q) {
    const qRegex = new RegExp(escapeRegex(q), "i");

    filter.$or = [
      { name: qRegex },
      { bio: qRegex },
      { "address.city": qRegex },
    ];
  }

  if (subject) {
    filter.preferredSubjects = {
      $in: [new RegExp(escapeRegex(subject), "i")],
    };
  }

  if (city) {
    filter["address.city"] = new RegExp(escapeRegex(city), "i");
  }

  const teachers = await Teacher.find(filter)
    .populate("userId", "email")
    .limit(20)
    .sort({ experience: -1 });

  const teachersWithUrls = teachers.map((teacher) => {
    const teacherObj = teacher.toObject();

    teacherObj.avatarUrl = generateImageUrl(
      teacher.avatarPublicId
    );

    teacherObj.cvUrl = generatePdfViewUrl(
      teacher.cvPublicId
    );

    teacherObj.cvDownloadUrl = generatePdfUrl(
      teacher.cvPublicId
    );

    return teacherObj;
  });

  res.json({
    success: true,
    count: teachers.length,
    data: teachersWithUrls,
  });
});

// @desc    Get single teacher
// @route   GET /api/teachers/:id
// @access  Public
exports.getTeacher = asyncHandler(async (req, res, next) => {
  const teacher = await Teacher.findById(
    req.params.id
  ).populate("userId", "email name");

  if (!teacher) {
    return next(
      new ErrorResponse("Teacher not found", 404)
    );
  }

  // Public access: reject profiles that are not visible
  if (
    (!teacher.isActive || !teacher.isVisible) &&
    req.user?.role !== "admin"
  ) {
    const ownerId = teacher.userId._id ? teacher.userId._id.toString() : teacher.userId.toString();
    if (req.user && req.user.id === ownerId) {
      return next(
        new ErrorResponse(
          "Your profile is under review. It will be verified soon and you can view your public profile.",
          403
        )
      );
    }
    return next(
      new ErrorResponse(
        "Teacher profile is not available",
        404
      )
    );
  }

  // Increment profile views if viewer is not owner and not admin
  const ownerId = teacher.userId._id ? teacher.userId._id.toString() : teacher.userId.toString();
  const isOwner = req.user && req.user.id === ownerId;
  const isAdmin = req.user && req.user.role === 'admin';

  if (!isOwner && !isAdmin) {
    let hasViewed = false;
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.ip;

    if (req.user) {
      // Check if user has already viewed
      if (teacher.viewedByUsers && teacher.viewedByUsers.includes(req.user.id)) {
        hasViewed = true;
      } else {
        teacher.viewedByUsers.push(req.user.id);
      }
    } else if (clientIp) {
      // Check if IP has already viewed
      if (teacher.viewedByIps && teacher.viewedByIps.includes(clientIp)) {
        hasViewed = true;
      } else {
        teacher.viewedByIps.push(clientIp);
      }
    }

    if (!hasViewed) {
      teacher.profileViews = (teacher.profileViews || 0) + 1;
      await teacher.save({ validateBeforeSave: false });
    }
  }

  const teacherObj = teacher.toObject();

  teacherObj.avatarUrl = generateImageUrl(
    teacher.avatarPublicId
  );

  teacherObj.cvUrl = generatePdfViewUrl(
    teacher.cvPublicId
  );

  teacherObj.cvDownloadUrl = generatePdfUrl(
    teacher.cvPublicId
  );

  res.json({
    success: true,
    data: teacherObj,
  });
});

// @desc    Create teacher profile
// @route   POST /api/teachers
// @access  Private
exports.createTeacher = asyncHandler(async (req, res, next) => {
  const existingProfile = await Teacher.findOne({
    userId: req.user.id,
  });

  if (existingProfile) {
    return next(
      new ErrorResponse(
        "Profile already exists for this user",
        400
      )
    );
  }

  const teacher = await Teacher.create({
    ...pickAllowedTeacherFields(req.body),
    userId: req.user.id,
  });

  cache.clear(SUBJECTS_CACHE_KEY);

  // Notify IndexNow about the newly created public profile.
  // Failure must never cause the profile creation request to fail.
  if (teacher.isActive) {
    notifyIndexNow(getTeacherUrl(teacher._id)).catch(
      (error) => {
        logger.warn(
          `IndexNow notification failed: ${error.message}`
        );
      }
    );
  }

  const teacherObj = teacher.toObject();

  teacherObj.avatarUrl = generateImageUrl(
    teacher.avatarPublicId
  );

  teacherObj.cvUrl = generatePdfViewUrl(
    teacher.cvPublicId
  );

  teacherObj.cvDownloadUrl = generatePdfUrl(
    teacher.cvPublicId
  );

  res.status(201).json({
    success: true,
    data: teacherObj,
  });
});

// @desc    Update teacher profile
// @route   PUT /api/teachers/:id
// @access  Private
exports.updateTeacher = asyncHandler(async (req, res, next) => {
  let teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    return next(
      new ErrorResponse("Teacher not found", 404)
    );
  }

  // Check ownership
  if (teacher.userId.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        "Not authorized to update this profile",
        403
      )
    );
  }

  // If the avatar is being replaced or cleared,
  // delete the old Cloudinary asset.
  if (
    "avatarPublicId" in req.body &&
    teacher.avatarPublicId &&
    req.body.avatarPublicId !== teacher.avatarPublicId
  ) {
    try {
      await withRetry(
        () =>
          cloudinary.uploader.destroy(
            teacher.avatarPublicId,
            {
              resource_type: "image",
            }
          ),
        {
          label: "Cloudinary old avatar deletion",
        }
      );
    } catch (err) {
      logger.warn(
        `Failed to delete old avatar from Cloudinary: ${err.message}`
      );
    }
  }

  // If the CV is being replaced or cleared,
  // delete the old Cloudinary asset.
  if (
    "cvPublicId" in req.body &&
    teacher.cvPublicId &&
    req.body.cvPublicId !== teacher.cvPublicId
  ) {
    try {
      await withRetry(
        () =>
          cloudinary.uploader.destroy(
            teacher.cvPublicId,
            {
              resource_type: "raw",
            }
          ),
        {
          label: "Cloudinary old CV deletion",
        }
      );
    } catch (err) {
      logger.warn(
        `Failed to delete old CV from Cloudinary: ${err.message}`
      );
    }
  }

  teacher = await Teacher.findByIdAndUpdate(
    req.params.id,
    pickAllowedTeacherFields(req.body),
    {
      new: true,
      runValidators: true,
    }
  ).populate("userId", "email");

  cache.clear(SUBJECTS_CACHE_KEY);

  // Notify IndexNow about changes to active public profiles.
  if (teacher.isActive) {
    notifyIndexNow(getTeacherUrl(teacher._id)).catch(
      (error) => {
        logger.warn(
          `IndexNow notification failed: ${error.message}`
        );
      }
    );
  }

  const teacherObj = teacher.toObject();

  teacherObj.avatarUrl = generateImageUrl(
    teacher.avatarPublicId
  );

  teacherObj.cvUrl = generatePdfViewUrl(
    teacher.cvPublicId
  );

  teacherObj.cvDownloadUrl = generatePdfUrl(
    teacher.cvPublicId
  );

  res.json({
    success: true,
    data: teacherObj,
  });
});

// @desc    Activate/deactivate a teacher profile (moderation)
// @route   PATCH /api/teachers/:id/status
// @access  Private/Admin
exports.setTeacherStatus = asyncHandler(async (req, res, next) => {
  if (typeof req.body.isActive !== "boolean") {
    return next(
      new ErrorResponse(
        "isActive must be a boolean",
        400
      )
    );
  }

  const teacher = await Teacher.findByIdAndUpdate(
    req.params.id,
    {
      isActive: req.body.isActive,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!teacher) {
    return next(
      new ErrorResponse("Teacher not found", 404)
    );
  }

  // Notify IndexNow only when the profile becomes
  // publicly available.
  if (teacher.isActive) {
    notifyIndexNow(getTeacherUrl(teacher._id)).catch(
      (error) => {
        logger.warn(
          `IndexNow notification failed: ${error.message}`
        );
      }
    );
  }

  res.json({
    success: true,
    data: {
      id: teacher._id,
      isActive: teacher.isActive,
    },
  });
});

// @desc    Delete teacher profile
// @route   DELETE /api/teachers/:id
// @access  Private
exports.deleteTeacher = asyncHandler(async (req, res, next) => {
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    return next(
      new ErrorResponse("Teacher not found", 404)
    );
  }

  // Check ownership
  if (teacher.userId.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        "Not authorized to delete this profile",
        403
      )
    );
  }

  // Save the public URL before deleting the database record.
  const teacherUrl = getTeacherUrl(teacher._id);

  // Delete avatar from Cloudinary if it exists.
  if (teacher.avatarPublicId) {
    await withRetry(
      () =>
        cloudinary.uploader.destroy(
          teacher.avatarPublicId
        ),
      {
        label: "Cloudinary avatar deletion",
      }
    );
  }

  // Delete CV from Cloudinary if it exists.
  if (teacher.cvPublicId) {
    await withRetry(
      () =>
        cloudinary.uploader.destroy(
          teacher.cvPublicId,
          {
            resource_type: "raw",
          }
        ),
      {
        label: "Cloudinary CV deletion",
      }
    );
  }

  await Teacher.findByIdAndDelete(req.params.id);

  cache.clear(SUBJECTS_CACHE_KEY);

  // Notify IndexNow that the public URL has been removed.
  // This is intentionally non-blocking.
  notifyIndexNow(teacherUrl).catch((error) => {
    logger.warn(
      `IndexNow notification failed: ${error.message}`
    );
  });

  res.json({
    success: true,
    message: "Teacher profile deleted successfully",
  });
});

// @desc    Get current teacher's profile
// @route   GET /api/teachers/my-profile
// @access  Private
exports.getMyProfile = asyncHandler(async (req, res, next) => {
  const teacher = await Teacher.findOne({
    userId: req.user.id,
  }).populate("userId", "email");

  if (!teacher) {
    return next(
      new ErrorResponse("Profile not found", 404)
    );
  }

  const teacherObj = teacher.toObject();

  teacherObj.avatarUrl = generateImageUrl(
    teacher.avatarPublicId
  );

  teacherObj.cvUrl = generatePdfViewUrl(
    teacher.cvPublicId
  );

  teacherObj.cvDownloadUrl = generatePdfUrl(
    teacher.cvPublicId
  );

  res.json({
    success: true,
    data: teacherObj,
  });
});

// @desc    Generate share metadata / track share action for a teacher profile
// @route   POST /api/teachers/:id/share
// @access  Private (Profile Owner Only)
exports.shareProfile = asyncHandler(async (req, res, next) => {
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    return next(new ErrorResponse("Teacher profile not found", 404));
  }

  // Strict ownership authorization check
  const teacherUserId = teacher.userId._id ? teacher.userId._id.toString() : teacher.userId.toString();
  if (teacherUserId !== req.user.id.toString() && teacherUserId !== req.user._id.toString()) {
    return next(
      new ErrorResponse("Forbidden: You do not have permission to perform share actions on this profile", 403)
    );
  }

  const shareUrl = `${process.env.CLIENT_URL || 'https://www.tuitionmaster.guru'}/teachers/${teacher._id}`;

  res.status(200).json({
    success: true,
    message: "Profile share link generated successfully",
    data: {
      teacherId: teacher._id,
      shareUrl,
      title: `${teacher.name} - TuitionMaster Tutor Profile`,
      description: `Hire ${teacher.name} for tutoring on TuitionMaster`,
    },
  });
});