const cloudinary = require('../config/cloudinary');
const logger = require('./logger');

exports.generateImageUrl = (publicId, transformations = {}) => {
  if (!publicId) return 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg';
  try {
    const url = cloudinary.url(publicId, {
      width: transformations.width || 500,
      height: transformations.height || 500,
      crop: transformations.crop || 'fill',
      format: transformations.format || 'webp',
      quality: transformations.quality || 'auto',
      secure: true,
      ...transformations
    });
    return url;
  } catch (err) {
    logger.warn('Failed to generate Cloudinary image URL:', err.message);
    return 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg';
  }
};

exports.generatePdfUrl = (publicId) => {
  if (!publicId) return null;
  try {
    const url = cloudinary.url(publicId, {
      resource_type: 'raw',
      secure: true,
      flags: 'attachment'
    });
    return url;
  } catch (err) {
    logger.warn('Failed to generate Cloudinary PDF URL:', err.message);
    return null;
  }
};

// Function specifically for PDF viewing (without attachment flag)
exports.generatePdfViewUrl = (publicId) => {
  if (!publicId) return null;
  try {
    const url = cloudinary.url(publicId, {
      resource_type: 'raw',
      secure: true
    });
    return url;
  } catch (err) {
    logger.warn('Failed to generate Cloudinary PDF View URL:', err.message);
    return null;
  }
};

// Generic function to generate Cloudinary URLs (legacy support)
exports.generateCloudinaryUrl = (publicId, resourceType = 'image') => {
  if (!publicId) return null;
  
  
  if (resourceType === 'image') {
    const url = cloudinary.url(publicId, {
      width: 500,
      height: 500,
      crop: 'fill',
      format: 'webp',
      quality: 'auto',
      secure:true
    });
    return url;
  } else {
    const url = cloudinary.url(publicId, {
      resource_type: 'raw',
      flags: 'attachment'
    });
    return url;
  }
};

exports.deleteCloudinaryFile = async (publicId, resourceType = 'image') => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    return true;
  } catch (error) {
    logger.error(`Error deleting Cloudinary file: ${error.message}`);
    return false;
  }
};