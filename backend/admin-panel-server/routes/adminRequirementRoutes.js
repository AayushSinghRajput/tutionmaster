const express = require("express");
const {
  adminGetRequirements,
  adminGetRequirement,
  adminUpdateRequirement,
  adminDeleteRequirement,
} = require("../controllers/adminRequirementController");
const { protectAdmin } = require("../middleware/adminAuth");

const router = express.Router();

router.use(protectAdmin);

router.get("/", adminGetRequirements);
router.get("/:id", adminGetRequirement);
router.patch("/:id", adminUpdateRequirement);
router.delete("/:id", adminDeleteRequirement);

module.exports = router;
