const multer = require('multer');
const ErrorResponse = require('../utils/errorResponse');

// Configure multer for memory storage
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Check file type
  if (file.mimetype.startsWith('image/')) {
    // Validate image types
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) {
      return cb(new ErrorResponse('Only JPEG, PNG, and WebP images are allowed', 400), false);
    }
    // Validate file size (5MB max for images)
    if (file.size > 5 * 1024 * 1024) {
      return cb(new ErrorResponse('Image size must be less than 5MB', 400), false);
    }
    cb(null, true);
  } else if (file.mimetype === 'application/pdf') {
    // Validate PDF size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      return cb(new ErrorResponse('PDF size must be less than 10MB', 400), false);
    }
    cb(null, true);
  } else {
    cb(new ErrorResponse('Only images and PDF files are allowed', 400), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max
  }
});

exports.uploadAvatar = upload.single('avatar');
exports.uploadCV = upload.single('cv');