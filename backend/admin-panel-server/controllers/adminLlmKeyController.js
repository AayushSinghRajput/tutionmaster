const LLMKey = require("../../models/LLMKey");
const { encrypt, decrypt, maskApiKey } = require("../../utils/cryptoUtils");
const keyRouter = require("../../services/ai/keyRouter");
const asyncHandler = require("../../middleware/asyncHandler");
const ErrorResponse = require("../../utils/errorResponse");
const logger = require("../../utils/logger");

// @desc    Get all configured LLM keys
// @route   GET /api/admin/llm-keys
// @access  Private (Admin)
exports.getLLMKeys = asyncHandler(async (req, res) => {
  const keys = await LLMKey.find()
    .sort({ priority: 1, createdAt: 1 })
    .populate("createdBy", "name email");

  res.status(200).json({
    success: true,
    count: keys.length,
    data: keys,
  });
});

// @desc    Add a new LLM provider key
// @route   POST /api/admin/llm-keys
// @access  Private (Super Admin only)
exports.createLLMKey = asyncHandler(async (req, res, next) => {
  const { provider, label, apiKey, model, baseUrl, priority, weight, isActive } = req.body;

  if (!provider || !label || !apiKey || !model) {
    return next(new ErrorResponse("Provider, label, apiKey, and model are required", 400));
  }

  const validProviders = ["gemini", "openai", "deepseek", "groq", "claude"];
  if (!validProviders.includes(provider)) {
    return next(new ErrorResponse(`Invalid provider. Must be one of: ${validProviders.join(", ")}`, 400));
  }

  const encryptedKey = encrypt(apiKey.trim());
  const keyMasked = maskApiKey(apiKey.trim());

  const newKey = await LLMKey.create({
    provider,
    label: label.trim(),
    encryptedKey,
    keyMasked,
    model: model.trim(),
    baseUrl: baseUrl ? baseUrl.trim() : null,
    priority: Number(priority) || 1,
    weight: Number(weight) || 1,
    isActive: typeof isActive === "boolean" ? isActive : true,
    createdBy: req.admin._id,
  });

  keyRouter.invalidateCache();
  logger.info(`SuperAdmin "${req.admin.name}" created new LLM key: ${label} (${provider})`);

  res.status(201).json({
    success: true,
    message: "LLM Key added successfully",
    data: newKey,
  });
});

// @desc    Update an existing LLM key configuration
// @route   PUT /api/admin/llm-keys/:id
// @access  Private (Super Admin only)
exports.updateLLMKey = asyncHandler(async (req, res, next) => {
  const keyDoc = await LLMKey.findById(req.params.id);
  if (!keyDoc) {
    return next(new ErrorResponse("LLM Key configuration not found", 404));
  }

  const { label, model, baseUrl, priority, weight, isActive, apiKey } = req.body;

  if (label) keyDoc.label = label.trim();
  if (model) keyDoc.model = model.trim();
  if (baseUrl !== undefined) keyDoc.baseUrl = baseUrl ? baseUrl.trim() : null;
  if (priority !== undefined) keyDoc.priority = Number(priority) || 1;
  if (weight !== undefined) keyDoc.weight = Number(weight) || 1;
  if (isActive !== undefined) keyDoc.isActive = Boolean(isActive);

  // If superadmin entered a new API key string, re-encrypt it
  if (apiKey && apiKey.trim() && !apiKey.includes("...")) {
    keyDoc.encryptedKey = encrypt(apiKey.trim());
    keyDoc.keyMasked = maskApiKey(apiKey.trim());
    keyDoc.status = "active";
    keyDoc.cooldownUntil = null;
  }

  await keyDoc.save();
  keyRouter.invalidateCache();

  logger.info(`SuperAdmin "${req.admin.name}" updated LLM key: ${keyDoc.label}`);

  res.status(200).json({
    success: true,
    message: "LLM Key updated successfully",
    data: keyDoc,
  });
});

// @desc    Quick toggle active / inactive status
// @route   PATCH /api/admin/llm-keys/:id/toggle
// @access  Private (Admin)
exports.toggleLLMKey = asyncHandler(async (req, res, next) => {
  const keyDoc = await LLMKey.findById(req.params.id);
  if (!keyDoc) {
    return next(new ErrorResponse("LLM Key not found", 404));
  }

  keyDoc.isActive = !keyDoc.isActive;
  await keyDoc.save();
  keyRouter.invalidateCache();

  res.status(200).json({
    success: true,
    message: `LLM Key ${keyDoc.isActive ? "enabled" : "disabled"}`,
    data: { id: keyDoc._id, isActive: keyDoc.isActive },
  });
});

// @desc    Test connection for a new (unsaved) or existing key
// @route   POST /api/admin/llm-keys/test
// @access  Private (Admin)
exports.testLLMKey = asyncHandler(async (req, res, next) => {
  const { id, provider, apiKey, model, baseUrl } = req.body;

  let testParams = {};

  if (id) {
    const keyDoc = await LLMKey.findById(id).select("+encryptedKey");
    if (!keyDoc) {
      return next(new ErrorResponse("LLM Key not found", 404));
    }
    testParams = {
      provider: keyDoc.provider,
      apiKey: decrypt(keyDoc.encryptedKey),
      model: keyDoc.model,
      baseUrl: keyDoc.baseUrl,
    };
  } else {
    if (!provider || !apiKey || !model) {
      return next(new ErrorResponse("Provider, apiKey, and model are required for test", 400));
    }
    testParams = {
      provider,
      apiKey: apiKey.trim(),
      model: model.trim(),
      baseUrl: baseUrl ? baseUrl.trim() : null,
    };
  }

  const result = await keyRouter.testKeyConnection(testParams);

  if (result.success && id) {
    // If testing an existing key succeeds, reset any previous rate limit/error status
    await LLMKey.findByIdAndUpdate(id, {
      status: "active",
      cooldownUntil: null,
    });
    keyRouter.invalidateCache();
  }

  res.status(200).json({
    success: result.success,
    data: result,
  });
});

// @desc    Manually reset cooldown/error for an existing key
// @route   POST /api/admin/llm-keys/:id/reset-cooldown
// @access  Private (Admin)
exports.resetCooldown = asyncHandler(async (req, res, next) => {
  const keyDoc = await LLMKey.findById(req.params.id);
  if (!keyDoc) {
    return next(new ErrorResponse("LLM Key not found", 404));
  }

  keyDoc.status = "active";
  keyDoc.cooldownUntil = null;
  await keyDoc.save();

  keyRouter.invalidateCache();

  res.status(200).json({
    success: true,
    message: "Cooldown and status reset to active",
    data: keyDoc,
  });
});

// @desc    Delete an LLM key
// @route   DELETE /api/admin/llm-keys/:id
// @access  Private (Super Admin only)
exports.deleteLLMKey = asyncHandler(async (req, res, next) => {
  const keyDoc = await LLMKey.findById(req.params.id);
  if (!keyDoc) {
    return next(new ErrorResponse("LLM Key not found", 404));
  }

  await keyDoc.deleteOne();
  keyRouter.invalidateCache();

  logger.info(`SuperAdmin "${req.admin.name}" deleted LLM key: ${keyDoc.label}`);

  res.status(200).json({
    success: true,
    message: "LLM Key deleted successfully",
  });
});
