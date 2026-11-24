const express = require("express");
const router = express.Router();
const {
  getLLMKeys,
  createLLMKey,
  updateLLMKey,
  toggleLLMKey,
  testLLMKey,
  resetCooldown,
  deleteLLMKey,
} = require("../controllers/adminLlmKeyController");
const { protectAdmin, requireSuperAdmin } = require("../middleware/adminAuth");

// All routes require authenticated admin
router.use(protectAdmin);

router.route("/")
  .get(getLLMKeys)
  .post(requireSuperAdmin, createLLMKey);

router.post("/test", testLLMKey);

router.route("/:id")
  .put(requireSuperAdmin, updateLLMKey)
  .delete(requireSuperAdmin, deleteLLMKey);

router.patch("/:id/toggle", toggleLLMKey);
router.post("/:id/reset-cooldown", resetCooldown);

module.exports = router;
