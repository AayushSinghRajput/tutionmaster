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

/**
 * @openapi
 * /upload/avatar:
 *   post:
 *     summary: Upload a teacher avatar image to Cloudinary
 *     tags: [Upload]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Uploaded
 */
router.post("/avatar", protect, uploadAvatar);

/**
 * @openapi
 * /upload/cv:
 *   post:
 *     summary: Upload a teacher CV/resume to Cloudinary
 *     tags: [Upload]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Uploaded
 */
router.post("/cv", protect, uploadCV);

/**
 * @openapi
 * /upload:
 *   delete:
 *     summary: Delete a previously uploaded file from Cloudinary
 *     tags: [Upload]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete("/", protect, deleteFile);

/**
 * @openapi
 * /upload/signature:
 *   post:
 *     summary: Get a signed Cloudinary upload signature for direct client uploads
 *     tags: [Upload]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Signature payload
 */
router.post("/signature", getSignature);

module.exports = router;
