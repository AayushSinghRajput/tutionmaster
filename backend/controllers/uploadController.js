const Teacher = require("../models/Teacher");
const ErrorResponse = require("../utils/errorResponse");
const cloudinary = require("../config/cloudinary");
const stream = require("stream");
const streamifier = require("streamifier");

// @desc    Upload avatar image
// @route   POST /api/upload/avatar
// @access  Private
exports.uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new ErrorResponse("Please upload a file", 400));
    }
    // Upload to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "tutionmaster/avatars",
        resource_type: "image",
        transformation: [
          { width: 500, height: 500, crop: "fill" },
          { quality: "auto" },
          { format: "webp" },
        ],
      },
      async (error, result) => {
        if (error) {
          return next(new ErrorResponse("File upload failed", 500));
        }
        res.json({
          success: true,
          data: {
            publicId: result.public_id,
            url: result.secure_url,
            message: "Avatar uploaded successfully",
          },
        });
      },
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
    if (!req.files || !req.files.cv) {
      return res.status(400).json({
        success: false,
        message: "Please upload a file.",
      });
    }
    const file = req.files.cv;

    // Upload to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "tutionmaster/documents",
        resource_type: "raw",
        public_id: `${Date.now()}-${file.name.replace(/\.[^/.]+$/, "")}`, // Clean filename
        format: "pdf",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Error:", error);
          return res.status(500).json({
            success: false,
            message: "Upload failed.",
          });
        }
        res.json({
          success: true,
          data: {
            publicId: result.public_id,
            url: result.secure_url,
            message: "CV uploaded successfully",
          },
        });
      },
    );

    // convert the file buffer into a stream and pipe it to cloudinary
    streamifier.createReadStream(file.data).pipe(uploadStream);
  } catch (error) {
    console.error("Controller Erro:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Delete file from Cloudinary
// @route   DELETE /api/upload/:publicId
// @access  Private
exports.deleteFile = async (req, res, next) => {
  try {
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

    console.log("[DEBUG] Delete request:", {
      fullPublicId,
      resourceType,
      searchPatterns,
    });

    const teacher = await Teacher.findOne({
      userId: req.user.id,
      $or: [
        { avatarPublicId: { $in: searchPatterns } },
        { cvPublicId: { $in: searchPatterns } },
      ],
    });

    console.log("[DEBUG] Teacher found:", !!teacher);
    if (!teacher)
      return next(new ErrorResponse("File not found or not authorized", 404));

    const actualPublicId = teacher.cvPublicId || teacher.avatarPublicId;
    let cloudinaryResult;
    try {
      cloudinaryResult = await cloudinary.uploader.destroy(actualPublicId, {
        resource_type: resourceType,
        invalidate: true,
      });
      if (cloudinaryResult.result === "not found" && resourceType === "raw") {
        const altId = actualPublicId.endsWith(".pdf")
          ? actualPublicId.replace(/\.pdf$/, "")
          : `${actualPublicId}.pdf`;
        cloudinaryResult = await cloudinary.uploader.destroy(altId, {
          resource_type: resourceType,
          invalidate: true,
        });
      }
    } catch (err) {
      console.warn("[WARN] Cloudinary deletion failed:", err.message);
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
  } catch (error) {
    console.error("[ERROR] Delete file error:", error);
    next(error);
  }
};

// @desc    Get Cloudinary upload signature
// @route   POST /api/upload/signature
// @access  Private
exports.getSignature = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};
