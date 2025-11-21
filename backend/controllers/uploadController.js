const Teacher = require('../models/Teacher');
const ErrorResponse = require('../utils/errorResponse');
const cloudinary = require('../config/cloudinary');
const stream = require('stream');

// @desc    Upload avatar image
// @route   POST /api/upload/avatar
// @access  Private
exports.uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new ErrorResponse('Please upload a file', 400));
    }
    // Upload to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'tutionmaster/avatars',
        resource_type: 'image',
        transformation: [
          { width: 500, height: 500, crop: 'fill' },
          { quality: 'auto' },
          { format: 'webp' }
        ]
      },
      async (error, result) => {
        if (error) {
          return next(new ErrorResponse('File upload failed', 500));
        }
        res.json({
          success: true,
          data: {
            publicId: result.public_id,
            url: result.secure_url,
            message: 'Avatar uploaded successfully'
          }
        });
      }
    );

    // Create stream from buffer and pipe to Cloudinary
    const bufferStream = new stream.PassThrough();
    bufferStream.end(req.file.buffer);
    bufferStream.pipe(uploadStream);
  } catch (error) {
    next(error);
  }
};

// @desc    Upload CV document
// @route   POST /api/upload/cv
// @access  Private
exports.uploadCV = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new ErrorResponse('Please upload a file', 400));
    }
    // Upload to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'tutionmaster/documents',
        resource_type: 'raw',
        format: 'pdf'
      },
      async (error, result) => {
        if (error) {
          return next(new ErrorResponse('File upload failed', 500));
        }
        res.json({
          success: true,
          data: {
            publicId: result.public_id,
            url: result.secure_url,
            message: 'CV uploaded successfully'
          }
        });
      }
    );

    // Create stream from buffer and pipe to Cloudinary
    const bufferStream = new stream.PassThrough();
    bufferStream.end(req.file.buffer);
    bufferStream.pipe(uploadStream);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete file from Cloudinary
// @route   DELETE /api/upload/:publicId
// @access  Private
exports.deleteFile = async (req, res, next) => {
  try {
    const { publicId } = req.params;
    const { resourceType = 'image' } = req.body;

    // Find teacher profile to verify ownership
    const teacher = await Teacher.findOne({ 
      userId: req.user.id,
      $or: [
        { avatarPublicId: publicId },
        { cvPublicId: publicId }
      ]
    });

    if (!teacher) {
      return next(new ErrorResponse('File not found or not authorized', 404));
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });

    // Update teacher profile
    if (teacher.avatarPublicId === publicId) {
      teacher.avatarPublicId = null;
    } else if (teacher.cvPublicId === publicId) {
      teacher.cvPublicId = null;
    }
    await teacher.save();

    res.json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Cloudinary upload signature
// @route   POST /api/upload/signature
// @access  Private
exports.getSignature = async (req, res, next) => {
  try {
    const { folder, resourceType = 'image' } = req.body;

    const timestamp = Math.round(new Date().getTime() / 1000);
    
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder: folder || 'tutionmaster/uploads'
      },
      process.env.CLOUDINARY_API_SECRET
    );

    res.json({
      success: true,
      data: {
        signature,
        timestamp,
        apiKey: process.env.CLOUDINARY_API_KEY,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        folder: folder || 'tutionmaster/uploads'
      }
    });
  } catch (error) {
    next(error);
  }
};