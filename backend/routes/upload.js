const express = require('express');
const {
  uploadAvatar,
  uploadCV,
  deleteFile,
  getSignature
} = require('../controllers/uploadController');
const { protect } = require('../middleware/auth');
// const { uploadAvatar: multerAvatar, uploadCV: multerCV } = require('../middleware/upload');

const router = express.Router();

router.use(protect);

// router.post('/avatar',protect, multerAvatar, uploadAvatar);
// router.post('/cv', multerCV, uploadCV);
router.post('/avatar',protect, uploadAvatar);
router.post('/cv',  uploadCV);
router.delete('/:publicId', deleteFile);
router.post('/signature', getSignature);

module.exports = router;