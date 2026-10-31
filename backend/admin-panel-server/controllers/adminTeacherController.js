const Teacher = require("../../models/Teacher");
const User = require("../../models/User");
const Admin = require("../models/Admin");
const ErrorResponse = require("../../utils/errorResponse");
const asyncHandler = require("../../middleware/asyncHandler");
const escapeRegex = require("../../utils/escapeRegex");
const cloudinary = require("../../config/cloudinary");
const streamifier = require("streamifier");
const withRetry = require("../../utils/withRetry");
const logger = require("../../utils/logger");
const { PDFDocument } = require("pdf-lib");
const {
  generateImageUrl,
  generatePdfViewUrl,
  generatePdfUrl,
} = require("../../utils/cloudinaryUtils");
const {
  sendManualTutorOnboardingEmail,
  sendTutorProfileApprovedEmail,
  sendTutorResubmissionEmail,
  sendTutorRejectionEmail,
} = require("../../services/emailService");

const MAX_PAGE_LIMIT = 50;
const UPLOAD_TIMEOUT_MS = 60000;

const compressPdfBuffer = async (buffer) => {
  try {
    const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
    const compressed = await pdfDoc.save({ useObjectStreams: true });
    return Buffer.from(compressed);
  } catch (error) {
    return buffer;
  }
};

const streamUpload = (fileBuffer, options) =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });

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
    limit = 10,
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

  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(MAX_PAGE_LIMIT, Math.max(1, parseInt(limit, 10) || 10));
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
  const { isVisible, notifyTutor = true } = req.body;

  if (typeof isVisible !== "boolean") {
    return next(new ErrorResponse("isVisible must be a boolean", 400));
  }

  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    return next(new ErrorResponse("Teacher not found", 404));
  }

  const wasVisible = teacher.isVisible;
  teacher.isVisible = isVisible;
  teacher.visibilityUpdatedAt = new Date();
  teacher.visibilityUpdatedBy = req.admin._id;

  // If toggling on to public and hasn't received approval email yet, notify them
  if (isVisible && !wasVisible && notifyTutor && !teacher.approvalEmailSentAt) {
    teacher.approvalEmailSentAt = new Date();
    teacher.lastNotificationSentAt = new Date();
    if (teacher.profileStatus !== "Active") {
      teacher.profileStatus = "Active";
    }

    User.findById(teacher.userId)
      .then((user) => {
        if (user) {
          sendTutorProfileApprovedEmail({ user, teacher }).catch((err) =>
            logger.error(`[EMAIL] Error sending approval notification on visibility toggle: ${err.message}`)
          );
        }
      })
      .catch((err) =>
        logger.error(`[EMAIL] Error looking up user for visibility toggle notification: ${err.message}`)
      );
  }

  await teacher.save();

  res.json({
    success: true,
    data: {
      id: teacher._id,
      name: teacher.name,
      isVisible: teacher.isVisible,
      profileStatus: teacher.profileStatus,
      visibilityUpdatedAt: teacher.visibilityUpdatedAt,
      approvalEmailSentAt: teacher.approvalEmailSentAt,
    },
  });
});

// @desc    Update teacher profile (Admin / Super Admin view)
// @route   PUT /api/admin/teachers/:id
// @access  Admin
exports.adminUpdateTeacher = asyncHandler(async (req, res, next) => {
  let teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    return next(new ErrorResponse("Teacher profile not found", 404));
  }

  const oldAvatarPublicId = teacher.avatarPublicId;
  const oldCvPublicId = teacher.cvPublicId;

  const {
    name,
    street,
    city,
    state,
    qualifications,
    email,
    phone,
    preferredSubjects,
    bio,
    experience,
    availability,
    teachingMode,
    monthlyRate,
    hourlyRate,
    avatarPublicId,
    cvPublicId,
    isVisible,
    isActive,
  } = req.body;

  if (name !== undefined) teacher.name = name;
  if (street !== undefined || city !== undefined || state !== undefined) {
    teacher.address = {
      street: street !== undefined ? street : teacher.address?.street,
      city: city !== undefined ? city : teacher.address?.city,
      state: state !== undefined ? state : teacher.address?.state,
    };
  }
  if (email !== undefined || phone !== undefined) {
    teacher.contact = {
      email: email !== undefined ? email : teacher.contact?.email,
      phone: phone !== undefined ? phone : teacher.contact?.phone,
    };
  }
  if (qualifications !== undefined) teacher.qualifications = qualifications;
  if (preferredSubjects !== undefined) {
    teacher.preferredSubjects = Array.isArray(preferredSubjects)
      ? preferredSubjects
      : preferredSubjects.split(",").map((s) => s.trim()).filter(Boolean);
  }
  if (bio !== undefined) teacher.bio = bio;
  if (experience !== undefined) teacher.experience = Number(experience);
  if (availability !== undefined) {
    if (typeof availability === "string") {
      try {
        teacher.availability = JSON.parse(availability);
      } catch (e) {
        teacher.availability = availability.split(",").map((s) => s.trim()).filter(Boolean);
      }
    } else {
      teacher.availability = availability;
    }
  }
  if (teachingMode !== undefined) teacher.teachingMode = teachingMode;
  if (monthlyRate !== undefined) {
    teacher.monthlyRate = Number(monthlyRate);
    teacher.hourlyRate = Math.round(Number(monthlyRate) / 20);
  } else if (hourlyRate !== undefined) {
    teacher.hourlyRate = Number(hourlyRate);
    teacher.monthlyRate = Number(hourlyRate) * 20;
  }
  if (avatarPublicId !== undefined) teacher.avatarPublicId = avatarPublicId;
  if (cvPublicId !== undefined) teacher.cvPublicId = cvPublicId;
  if (isVisible !== undefined) teacher.isVisible = Boolean(isVisible);
  if (isActive !== undefined) teacher.isActive = Boolean(isActive);

  // Handle direct file uploads (Avatar image & CV PDF)
  if (req.files) {
    if (req.files.avatar) {
      const avatarFile = req.files.avatar;
      const avatarResult = await withRetry(
        () =>
          streamUpload(avatarFile.data, {
            folder: "tutionmaster/avatars",
            resource_type: "image",
            timeout: UPLOAD_TIMEOUT_MS,
            transformation: [
              { width: 500, height: 500, crop: "fill" },
              { quality: "auto" },
              { format: "webp" },
            ],
          }),
        { label: "Cloudinary admin avatar upload" }
      );
      teacher.avatarPublicId = avatarResult.public_id;
    }

    if (req.files.cv) {
      const cvFile = req.files.cv;
      const compressedData = await compressPdfBuffer(cvFile.data);
      const cvResult = await withRetry(
        () =>
          streamUpload(compressedData, {
            folder: "tutionmaster/documents",
            resource_type: "raw",
            public_id: `${Date.now()}-${cvFile.name.replace(/\.[^/.]+$/, "")}`,
            format: "pdf",
            timeout: UPLOAD_TIMEOUT_MS,
          }),
        { label: "Cloudinary admin CV upload" }
      );
      teacher.cvPublicId = cvResult.public_id;
    }
  }

  // If avatar was replaced or cleared, destroy the old asset to save Cloudinary storage
  if (oldAvatarPublicId && teacher.avatarPublicId !== oldAvatarPublicId) {
    try {
      await withRetry(
        () =>
          cloudinary.uploader.destroy(oldAvatarPublicId, {
            resource_type: "image",
          }),
        { label: "Cloudinary old avatar deletion" }
      );
    } catch (err) {
      logger.warn(`Failed to delete old avatar from Cloudinary: ${err.message}`);
    }
  }

  // If CV was replaced or cleared, destroy the old raw asset to save Cloudinary storage
  if (oldCvPublicId && teacher.cvPublicId !== oldCvPublicId) {
    try {
      await withRetry(
        () =>
          cloudinary.uploader.destroy(oldCvPublicId, {
            resource_type: "raw",
          }),
        { label: "Cloudinary old CV deletion" }
      );
    } catch (err) {
      logger.warn(`Failed to delete old CV from Cloudinary: ${err.message}`);
    }
  }

  await teacher.save();

  res.json({
    success: true,
    message: "Tutor profile updated successfully",
    data: attachUrls(teacher),
  });
});

// @desc    Get unonboarded users (registered users without a Tutor profile)
// @route   GET /api/admin/teachers/unonboarded-users
// @access  Super Admin
exports.getUnonboardedUsers = asyncHandler(async (req, res) => {
  const { search } = req.query;

  // Find all user IDs that already have a Teacher profile
  const existingTeacherUserIds = await Teacher.find().distinct("userId");

  const query = {
    _id: { $nin: existingTeacherUserIds },
  };

  if (search) {
    const searchRegex = new RegExp(escapeRegex(search), "i");
    query.$or = [{ name: searchRegex }, { username: searchRegex }, { email: searchRegex }];
  }

  const users = await User.find(query).select("username email googleId role createdAt").sort({ createdAt: -1 }).lean();

  const data = users.map((u) => ({
    id: u._id,
    name: u.username || u.email.split("@")[0],
    email: u.email,
    authProvider: u.googleId ? "google" : "email",
    googleId: u.googleId || null,
    createdAt: u.createdAt,
  }));

  res.json({
    success: true,
    count: data.length,
    data,
  });
});

// @desc    Manually create & publish a tutor profile for an unonboarded user
// @route   POST /api/admin/teachers/create-manual
// @access  Super Admin
exports.createManualTeacher = asyncHandler(async (req, res, next) => {
  const {
    userId,
    name,
    street,
    city,
    state,
    qualifications,
    email,
    phone,
    preferredSubjects,
    bio,
    experience,
    availability,
    teachingMode,
    hourlyRate,
    publishImmediately = true,
    sendNotification = true,
  } = req.body;

  if (!userId) {
    return next(new ErrorResponse("User ID is required", 400));
  }

  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorResponse("Registered user not found", 404));
  }

  const existingProfile = await Teacher.findOne({ userId });
  if (existingProfile) {
    return next(new ErrorResponse("This user already has a Tutor profile", 400));
  }

  const teacherData = {
    userId: user._id,
    name: name || user.username,
    address: {
      street: street || "N/A",
      city: city || "Kathmandu",
      state: state || "Bagmati",
    },
    qualifications: qualifications && qualifications.length > 0 ? qualifications : [{ degree: "Bachelors", institution: "Tribhuvan University", year: 2022 }],
    contact: {
      email: email || user.email,
      phone: phone || null,
    },
    preferredSubjects: preferredSubjects || ["Mathematics"],
    bio: bio || "Experienced tutor dedicated to helping students build strong academic foundations and achieve their goals.",
    experience: Number(experience) || 1,
    availability: availability || ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    teachingMode: teachingMode || "In-person",
    monthlyRate: Number(req.body.monthlyRate) || (Number(hourlyRate) ? Number(hourlyRate) * 20 : 8000),
    hourlyRate: Number(hourlyRate) || (Number(req.body.monthlyRate) ? Math.round(Number(req.body.monthlyRate) / 20) : 400),
    isVisible: Boolean(publishImmediately),
    isManuallyCreatedByAdmin: true,
    profileStatus: publishImmediately ? "Published" : "Draft",
    onboardingCompleted: true,
    visibilityUpdatedAt: publishImmediately ? new Date() : null,
    visibilityUpdatedBy: req.admin._id,
  };

  const teacher = await Teacher.create(teacherData);

  // Update User role to teacher
  if (user.role !== "teacher") {
    user.role = "teacher";
    await user.save();
  }

  // Trigger automated notification email (non-blocking for DB transaction)
  if (sendNotification) {
    sendManualTutorOnboardingEmail({
      user,
      teacher,
      sendNotification: true,
    }).catch((err) => console.error("Email send error:", err));
  }

  res.status(201).json({
    success: true,
    message: "Tutor profile manually created successfully",
    data: attachUrls(teacher),
  });
});

// @desc    Resend email notification to a tutor (approval or onboarding)
// @route   POST /api/admin/teachers/:id/resend-notification
// @access  Super Admin
exports.resendTutorNotification = asyncHandler(async (req, res, next) => {
  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) {
    return next(new ErrorResponse("Teacher not found", 404));
  }

  const user = await User.findById(teacher.userId);
  if (!user) {
    return next(new ErrorResponse("Associated user account not found", 404));
  }

  const recipientEmail = teacher.contact?.email || user.email;

  if (teacher.isManuallyCreatedByAdmin && !teacher.isVisible) {
    await sendManualTutorOnboardingEmail({
      user,
      teacher,
      sendNotification: true,
    });
  } else {
    // Send live profile approved notification with public profile link
    await sendTutorProfileApprovedEmail({
      user,
      teacher,
    });
    teacher.approvalEmailSentAt = new Date();
  }

  teacher.lastNotificationSentAt = new Date();
  await teacher.save();

  res.json({
    success: true,
    message: `Notification email successfully sent to ${recipientEmail}`,
    approvalEmailSentAt: teacher.approvalEmailSentAt,
  });
});

// @desc    1-Click Tutor Document & Profile Verification
// @route   PATCH /api/admin/teachers/:id/verification
// @access  Admin
exports.adminVerifyTeacher = asyncHandler(async (req, res, next) => {
  const { action, reason, feedbackNotes } = req.body;

  const teacher = await Teacher.findById(req.params.id);
  if (!teacher) {
    return next(new ErrorResponse("Teacher not found", 404));
  }

  const now = new Date();

  if (action === "APPROVE") {
    teacher.isVisible = true;
    teacher.profileStatus = "Active";
    teacher.visibilityUpdatedAt = now;
    teacher.visibilityUpdatedBy = req.admin._id;
    teacher.approvalEmailSentAt = now;
    teacher.lastNotificationSentAt = now;

    // Send approved & live email notification
    User.findById(teacher.userId)
      .then((user) => {
        if (user) {
          sendTutorProfileApprovedEmail({ user, teacher }).catch((err) =>
            logger.error(`[EMAIL] Failed to send approval email to tutor ${teacher._id}: ${err.message}`)
          );
        }
      })
      .catch((err) =>
        logger.error(`[EMAIL] Failed to find user for tutor approval email: ${err.message}`)
      );
  } else if (action === "REQUEST_RESUBMISSION") {
    teacher.isVisible = false;
    teacher.profileStatus = "Under Review";
    teacher.lastNotificationSentAt = now;

    // Send action required / resubmission email notification
    User.findById(teacher.userId)
      .then((user) => {
        if (user) {
          sendTutorResubmissionEmail({ user, teacher, reason, feedbackNotes }).catch((err) =>
            logger.error(`[EMAIL] Failed to send resubmission email to tutor ${teacher._id}: ${err.message}`)
          );
        }
      })
      .catch((err) =>
        logger.error(`[EMAIL] Failed to find user for tutor resubmission email: ${err.message}`)
      );
  } else if (action === "REJECT") {
    teacher.isVisible = false;
    teacher.profileStatus = "Draft";
    teacher.lastNotificationSentAt = now;

    // Send application status / rejection email notification
    User.findById(teacher.userId)
      .then((user) => {
        if (user) {
          sendTutorRejectionEmail({ user, teacher, reason, feedbackNotes }).catch((err) =>
            logger.error(`[EMAIL] Failed to send rejection email to tutor ${teacher._id}: ${err.message}`)
          );
        }
      })
      .catch((err) =>
        logger.error(`[EMAIL] Failed to find user for tutor rejection email: ${err.message}`)
      );
  } else {
    return next(new ErrorResponse("Invalid verification action. Must be APPROVE, REQUEST_RESUBMISSION, or REJECT", 400));
  }

  await teacher.save();

  res.json({
    success: true,
    message:
      action === "APPROVE"
        ? `Tutor profile approved, published, and notification email sent`
        : action === "REQUEST_RESUBMISSION"
        ? `Resubmission requested and notification email sent (Reason: ${reason || "Documents require update"})`
        : `Tutor profile rejected and notification email sent (${reason || "Quality standard not met"})`,
    data: attachUrls(teacher),
    verificationDetails: {
      action,
      reason: reason || null,
      feedbackNotes: feedbackNotes || null,
      verifiedBy: req.admin?.name,
      verifiedAt: now,
      notificationSent: true,
    },
  });
});

// @desc    Get count of verified/active tutors who haven't received approval email
// @route   GET /api/admin/teachers/bulk-notify-stats
// @access  Admin
exports.getBulkNotifyStats = asyncHandler(async (req, res) => {
  const pendingCount = await Teacher.countDocuments({
    isVisible: true,
    isActive: true,
    approvalEmailSentAt: null,
  });

  const totalVerifiedCount = await Teacher.countDocuments({
    isVisible: true,
    isActive: true,
  });

  res.json({
    success: true,
    data: {
      pendingCount,
      totalVerifiedCount,
      notifiedCount: totalVerifiedCount - pendingCount,
    },
  });
});

// @desc    Trigger bulk email notification for verified tutors who haven't been notified yet
// @route   POST /api/admin/teachers/bulk-notify-verified
// @access  Admin
exports.bulkNotifyVerifiedTeachers = asyncHandler(async (req, res) => {
  const { force = false } = req.body;

  const query = {
    isVisible: true,
    isActive: true,
  };

  if (!force) {
    query.approvalEmailSentAt = null;
  }

  const teachers = await Teacher.find(query).populate("userId", "email username");

  if (teachers.length === 0) {
    return res.json({
      success: true,
      message: "No pending verified tutors to notify",
      sentCount: 0,
      failedCount: 0,
    });
  }

  let sentCount = 0;
  let failedCount = 0;

  for (const teacher of teachers) {
    const user = teacher.userId;
    const recipient = teacher.contact?.email || user?.email;

    if (!recipient) {
      failedCount++;
      continue;
    }

    try {
      await sendTutorProfileApprovedEmail({ user, teacher });
      teacher.approvalEmailSentAt = new Date();
      teacher.lastNotificationSentAt = new Date();
      await teacher.save();
      sentCount++;

      // Small throttling delay to stay comfortably under Resend limits
      await new Promise((r) => setTimeout(r, 300));
    } catch (err) {
      logger.error(`[BULK_NOTIFY] Failed to notify tutor ${teacher._id}: ${err.message}`);
      failedCount++;
    }
  }

  res.json({
    success: true,
    message: `Successfully sent live profile notifications to ${sentCount} tutor(s)${failedCount > 0 ? ` (${failedCount} failed/skipped)` : ""}`,
    sentCount,
    failedCount,
  });
});

