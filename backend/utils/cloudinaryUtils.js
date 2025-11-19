const cloudinary = require('../config/cloudinary');

exports.generateImageUrl = (publicId, transformations = {}) => {
  if (!publicId) return null;
  
  return cloudinary.url(publicId, {
    width: transformations.width || 500,
    height: transformations.height || 500,
    crop: transformations.crop || 'fill',
    format: transformations.format || 'webp',
    quality: transformations.quality || 'auto',
    ...transformations
  });
};

exports.generatePdfUrl = (publicId) => {
  if (!publicId) return null;
  
  return cloudinary.url(publicId, {
    resource_type: 'raw',
    flags: 'attachment'
  });
};

exports.deleteCloudinaryFile = async (publicId, resourceType = 'image') => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    return true;
  } catch (error) {
    console.error('Error deleting Cloudinary file:', error);
    return false;
  }
};