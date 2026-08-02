const express = require("express");
const {
  uploadAvatar,
  uploadCV,
  deleteFile,
  getSignature,
} = require("../controllers/uploadController");
const { protect } = require("../middleware/auth");


const router = express.Router();

router.use(protect);


router.post("/avatar", protect, uploadAvatar);
router.post("/cv", protect, uploadCV);
router.delete("/", protect, deleteFile);
router.post("/signature", getSignature);

module.exports = router;
