const express = require("express");
const {
  adminGetTeachers,
  adminGetTeacher,
  adminSetVisibility,
} = require("../controllers/adminTeacherController");
const { protectAdmin } = require("../middleware/adminAuth");

const router = express.Router();

router.use(protectAdmin);

// GET  /api/admin/teachers
router.get("/", adminGetTeachers);

// GET  /api/admin/teachers/:id
router.get("/:id", adminGetTeacher);

// PATCH /api/admin/teachers/:id/visibility
router.patch("/:id/visibility", adminSetVisibility);

module.exports = router;
