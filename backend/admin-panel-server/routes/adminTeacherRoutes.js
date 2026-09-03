const express = require("express");
const {
  adminGetTeachers,
  adminGetTeacher,
  adminUpdateTeacher,
  adminSetVisibility,
  getUnonboardedUsers,
  createManualTeacher,
  resendTutorNotification,
} = require("../controllers/adminTeacherController");
const { protectAdmin, requireSuperAdmin } = require("../middleware/adminAuth");

const router = express.Router();

router.use(protectAdmin);

// GET  /api/admin/teachers/unonboarded-users
router.get("/unonboarded-users", requireSuperAdmin, getUnonboardedUsers);

// POST /api/admin/teachers/create-manual
router.post("/create-manual", requireSuperAdmin, createManualTeacher);

// POST /api/admin/teachers/:id/resend-notification
router.post("/:id/resend-notification", requireSuperAdmin, resendTutorNotification);

// GET  /api/admin/teachers
router.get("/", adminGetTeachers);

// GET  /api/admin/teachers/:id
router.get("/:id", adminGetTeacher);

// PUT  /api/admin/teachers/:id
router.put("/:id", adminUpdateTeacher);

// PATCH /api/admin/teachers/:id/visibility
router.patch("/:id/visibility", adminSetVisibility);

module.exports = router;
