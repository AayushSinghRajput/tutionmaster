const express = require("express");
const {
  listAdministrators,
  createAdministrator,
  updateAdministrator,
  removeAdministrator,
} = require("../controllers/administratorController");
const { protectAdmin, requireSuperAdmin } = require("../middleware/adminAuth");

const router = express.Router();

// All administrator management requires Super Admin
router.use(protectAdmin, requireSuperAdmin);

// GET  /api/admin/administrators
router.get("/", listAdministrators);

// POST /api/admin/administrators
router.post("/", createAdministrator);

// PATCH /api/admin/administrators/:id
router.patch("/:id", updateAdministrator);

// DELETE /api/admin/administrators/:id  (soft-deactivate)
router.delete("/:id", removeAdministrator);

module.exports = router;
