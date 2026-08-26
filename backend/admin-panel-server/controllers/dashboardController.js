const Teacher = require("../../models/Teacher");
const Admin = require("../models/Admin");
const asyncHandler = require("../../middleware/asyncHandler");

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard/stats
// @access  Admin
exports.getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalTeachers,
    visibleTeachers,
    hiddenTeachers,
    activeTeachers,
    inactiveTeachers,
    totalAdmins,
    activeAdmins,
  ] = await Promise.all([
    Teacher.countDocuments({}),
    Teacher.countDocuments({ isVisible: true }),
    Teacher.countDocuments({ isVisible: false }),
    Teacher.countDocuments({ isActive: true }),
    Teacher.countDocuments({ isActive: false }),
    Admin.countDocuments({}),
    Admin.countDocuments({ isActive: true }),
  ]);

  // "Pending review" = profiles that are active but not yet made visible
  const pendingReview = await Teacher.countDocuments({
    isActive: true,
    isVisible: false,
  });

  // Recently added teachers (last 7 days)
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recentTeachers = await Teacher.countDocuments({
    createdAt: { $gte: sevenDaysAgo },
  });

  res.json({
    success: true,
    data: {
      teachers: {
        total: totalTeachers,
        visible: visibleTeachers,
        hidden: hiddenTeachers,
        active: activeTeachers,
        inactive: inactiveTeachers,
        pendingReview,
        recentlyAdded: recentTeachers,
      },
      admins: {
        total: totalAdmins,
        active: activeAdmins,
      },
    },
  });
});
