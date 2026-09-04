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

// @desc    Update teacher profile (Admin / Super Admin view)
// @route   PUT /api/admin/teachers/:id
// @access  Admin
exports.adminUpdateTeacher = asyncHandler(async (req, res, next) => {
  let teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    return next(new ErrorResponse("Teacher profile not found", 404));
  }

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

  await teacher.save();

  res.json({
    success: true,
    message: "Tutor profile updated successfully",
    data: attachUrls(teacher),
  });
});

const User = require("../../models/User");
const { sendManualTutorOnboardingEmail } = require("../../services/emailService");

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

// @desc    Resend onboarding email notification to a tutor
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

  await sendManualTutorOnboardingEmail({
    user,
    teacher,
    sendNotification: true,
  });

  res.json({
    success: true,
    message: `Notification email successfully resent to ${user.email}`,
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

  if (action === "APPROVE") {
    teacher.isVisible = true;
    teacher.profileStatus = "Active";
    teacher.visibilityUpdatedAt = new Date();
    teacher.visibilityUpdatedBy = req.admin._id;
  } else if (action === "REQUEST_RESUBMISSION") {
    teacher.isVisible = false;
    teacher.profileStatus = "Under Review";
  } else if (action === "REJECT") {
    teacher.isVisible = false;
    teacher.profileStatus = "Draft";
  } else {
    return next(new ErrorResponse("Invalid verification action. Must be APPROVE, REQUEST_RESUBMISSION, or REJECT", 400));
  }

  await teacher.save();

  res.json({
    success: true,
    message:
      action === "APPROVE"
        ? `Tutor profile approved and made publicly visible`
        : action === "REQUEST_RESUBMISSION"
        ? `Resubmission requested with reason: ${reason || "Documents require update"}`
        : `Tutor profile rejected (${reason || "Quality standard not met"})`,
    data: attachUrls(teacher),
    verificationDetails: {
      action,
      reason: reason || null,
      feedbackNotes: feedbackNotes || null,
      verifiedBy: req.admin?.name,
      verifiedAt: new Date(),
    },
  });
});

