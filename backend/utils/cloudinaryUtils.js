const cloudinary = require('../config/cloudinary');

exports.generateImageUrl = (publicId, transformations = {}) => {
  if (!publicId) return null;
  
  console.log('[DEBUG] Generating image URL for publicId:', publicId);
  const url = cloudinary.url(publicId, {
    width: transformations.width || 500,
    height: transformations.height || 500,
    crop: transformations.crop || 'fill',
    format: transformations.format || 'webp',
    quality: transformations.quality || 'auto',
    secure:true,
    ...transformations
  });
  console.log('[DEBUG] Generated image URL:', url);
  return url;
};

exports.generatePdfUrl = (publicId) => {
  if (!publicId) return null;
  
  console.log('[DEBUG] Generating PDF download URL for publicId:', publicId);
  const url = cloudinary.url(publicId, {
    resource_type: 'raw',
    secure: true,
    flags: 'attachment'
  });
  console.log('[DEBUG] Generated PDF download URL:', url);
  return url;
};

// Function specifically for PDF viewing (without attachment flag)
exports.generatePdfViewUrl = (publicId) => {
  if (!publicId) return null;

  console.log('[DEBUG] Generating PDF view URL for publicId:', publicId);
  
  // REMOVE the format: 'pdf' parameter as it's causing double extension
  const url = cloudinary.url(publicId, {
    resource_type: 'raw',
    secure: true
    // Remove: format: 'pdf' - this causes the double .pdf.pdf extension
  });
  
  console.log('[DEBUG] Generated PDF view URL:', url);
  return url;
};

// Generic function to generate Cloudinary URLs (legacy support)
exports.generateCloudinaryUrl = (publicId, resourceType = 'image') => {
  if (!publicId) return null;
  
  console.log(`[DEBUG] Generating Cloudinary URL for publicId: ${publicId}, type: ${resourceType}`);
  
  if (resourceType === 'image') {
    const url = cloudinary.url(publicId, {
      width: 500,
      height: 500,
      crop: 'fill',
      format: 'webp',
      quality: 'auto',
      secure:true
    });
    console.log('[DEBUG] Generated image URL:', url);
    return url;
  } else {
    const url = cloudinary.url(publicId, {
      resource_type: 'raw',
      flags: 'attachment'
    });
    console.log('[DEBUG] Generated raw/PDF URL:', url);
    return url;
  }
};

exports.deleteCloudinaryFile = async (publicId, resourceType = 'image') => {
  try {
    console.log(`[DEBUG] Deleting Cloudinary file: ${publicId}, type: ${resourceType}`);
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    console.log(`[DEBUG] Successfully deleted: ${publicId}`);
    return true;
  } catch (error) {
    console.error('Error deleting Cloudinary file:', error);
    return false;
  }
};