const Teacher = require("../models/Teacher");
const ErrorResponse = require("../utils/errorResponse");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const asyncHandler = require("../middleware/asyncHandler");
const withRetry = require("../utils/withRetry");
const logger = require("../utils/logger");
const { PDFDocument } = require("pdf-lib");

// Losslessly re-packs the PDF's internal object streams to shrink file size
// before it's sent to Cloudinary. Falls back to the original buffer if the
// PDF can't be parsed (e.g. encrypted or malformed files).
const compressPdfBuffer = async (buffer) => {
  try {
    const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
    const compressed = await pdfDoc.save({ useObjectStreams: true });
    return Buffer.from(compressed);
  } catch (error) {
    logger.warn(`PDF compression skipped, using original file: ${error.message}`);
    return buffer;
  }
};

const UPLOAD_TIMEOUT_MS = 60000;

const streamUpload = (fileBuffer, options) =>
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });

// @desc    Upload avatar image
// @route   POST /api/upload/avatar
// @access  Private
exports.uploadAvatar = asyncHandler(async (req, res, next) => {
  if (!req.files || !req.files.avatar) {
    return next(new ErrorResponse("Please upload a file", 400));
  }
  const file = req.files.avatar;

  const result = await withRetry(
    () =>
      streamUpload(file.data, {
        folder: "tutionmaster/avatars",
        resource_type: "image",
        timeout: UPLOAD_TIMEOUT_MS,
        transformation: [
          { width: 500, height: 500, crop: "fill" },
          { quality: "auto" },
          { format: "webp" },
        ],
      }),
    { label: "Cloudinary avatar upload" },
  );

  res.json({
    success: true,
    data: {
      publicId: result.public_id,
      url: result.secure_url,
      message: "Avatar uploaded successfully",
    },
  });
});

// @desc    Upload CV document
// @route   POST /api/upload/cv
// @access  Private
exports.uploadCV = asyncHandler(async (req, res, next) => {
  if (!req.files || !req.files.cv) {
    return next(new ErrorResponse("Please upload a file", 400));
  }
  const file = req.files.cv;
  const compressedData = await compressPdfBuffer(file.data);

  const result = await withRetry(
    () =>
      streamUpload(compressedData, {
        folder: "tutionmaster/documents",
        resource_type: "raw",
        public_id: `${Date.now()}-${file.name.replace(/\.[^/.]+$/, "")}`, // Clean filename
        format: "pdf",
        timeout: UPLOAD_TIMEOUT_MS,
      }),
    { label: "Cloudinary CV upload" },
  );

  res.json({
    success: true,
    data: {
      publicId: result.public_id,
      url: result.secure_url,
      message: "CV uploaded successfully",
    },
  });
});

// @desc    Delete file from Cloudinary
// @route   DELETE /api/upload/:publicId
// @access  Private
exports.deleteFile = asyncHandler(async (req, res, next) => {
  const { publicId, resourceType = "image" } = req.body;
  if (!publicId) {
    return next(new ErrorResponse("Public ID is required", 400));
  }

  let fullPublicId = publicId; // already plain string

  // Build search patterns for finding the teacher
  const searchPatterns = [fullPublicId];
  if (resourceType === "raw") {
    if (fullPublicId.endsWith(".pdf"))
      searchPatterns.push(fullPublicId.replace(/\.pdf$/, ""));
    else searchPatterns.push(`${fullPublicId}.pdf`);
  }

  const teacher = await Teacher.findOne({
    userId: req.user.id,
    $or: [
      { avatarPublicId: { $in: searchPatterns } },
      { cvPublicId: { $in: searchPatterns } },
    ],
  });

  if (!teacher)
    return next(new ErrorResponse("File not found or not authorized", 404));

  const actualPublicId = teacher.cvPublicId || teacher.avatarPublicId;
  let cloudinaryResult;
  try {
    cloudinaryResult = await withRetry(
      () =>
        cloudinary.uploader.destroy(actualPublicId, {
          resource_type: resourceType,
          invalidate: true,
        }),
      { label: "Cloudinary file deletion" },
    );
    if (cloudinaryResult.result === "not found" && resourceType === "raw") {
      const altId = actualPublicId.endsWith(".pdf")
        ? actualPublicId.replace(/\.pdf$/, "")
        : `${actualPublicId}.pdf`;
      cloudinaryResult = await withRetry(
        () =>
          cloudinary.uploader.destroy(altId, {
            resource_type: resourceType,
            invalidate: true,
          }),
        { label: "Cloudinary file deletion (alt id)" },
      );
    }
  } catch (err) {
    logger.warn(`Cloudinary deletion failed: ${err.message}`);
  }

  // Clear references without triggering other validations
  const updateQuery = {};
  if (
    teacher.avatarPublicId &&
    searchPatterns.includes(teacher.avatarPublicId)
  )
    updateQuery.avatarPublicId = null;
  if (teacher.cvPublicId && searchPatterns.includes(teacher.cvPublicId))
    updateQuery.cvPublicId = null;

  await Teacher.updateOne(
    { _id: teacher._id },
    { $set: updateQuery },
    { validateBeforeSave: false },
  );

  return res.status(200).json({
    success: true,
    message:
      cloudinaryResult?.result === "ok"
        ? "File deleted successfully"
        : "File reference removed (file may have been already deleted)",
    cloudinaryStatus: cloudinaryResult?.result || "not found",
  });
});

// @desc    Get Cloudinary upload signature
// @route   POST /api/upload/signature
// @access  Private
exports.getSignature = asyncHandler(async (req, res) => {
  const { folder, resourceType = "image" } = req.body;

  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: folder || "tutionmaster/uploads",
    },
    process.env.CLOUDINARY_API_SECRET,
  );

  res.json({
    success: true,
    data: {
      signature,
      timestamp,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      folder: folder || "tutionmaster/uploads",
    },
  });
});
