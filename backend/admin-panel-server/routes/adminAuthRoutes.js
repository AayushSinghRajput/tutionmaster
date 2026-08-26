const express = require("express");
const { adminLogin, getMe } = require("../controllers/adminAuthController");
const { protectAdmin } = require("../middleware/adminAuth");

const router = express.Router();

// POST /api/admin/auth/login
router.post("/login", adminLogin);

// GET /api/admin/auth/me
router.get("/me", protectAdmin, getMe);

module.exports = router;
