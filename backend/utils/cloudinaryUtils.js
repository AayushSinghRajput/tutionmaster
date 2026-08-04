const cloudinary = require('../config/cloudinary');
const logger = require('./logger');

exports.generateImageUrl = (publicId, transformations = {}) => {
  if (!publicId) return null;
  
  const url = cloudinary.url(publicId, {
    width: transformations.width || 500,
    height: transformations.height || 500,
    crop: transformations.crop || 'fill',
    format: transformations.format || 'webp',
    quality: transformations.quality || 'auto',
    secure:true,
    ...transformations
  });
  return url;
};

exports.generatePdfUrl = (publicId) => {
  if (!publicId) return null;
  
  const url = cloudinary.url(publicId, {
    resource_type: 'raw',
    secure: true,
    flags: 'attachment'
  });
  return url;
};

// Function specifically for PDF viewing (without attachment flag)
exports.generatePdfViewUrl = (publicId) => {
  if (!publicId) return null;

  
  // REMOVE the format: 'pdf' parameter as it's causing double extension
  const url = cloudinary.url(publicId, {
    resource_type: 'raw',
    secure: true
    // Remove: format: 'pdf' - this causes the double .pdf.pdf extension
  });
  
  return url;
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