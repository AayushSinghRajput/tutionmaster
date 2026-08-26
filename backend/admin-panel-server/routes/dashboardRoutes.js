const express = require("express");
const { getDashboardStats } = require("../controllers/dashboardController");
const { protectAdmin } = require("../middleware/adminAuth");

const router = express.Router();

router.use(protectAdmin);

// GET /api/admin/dashboard/stats
router.get("/stats", getDashboardStats);

module.exports = router;
