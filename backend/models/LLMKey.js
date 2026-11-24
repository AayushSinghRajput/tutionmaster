const mongoose = require("mongoose");

const LLMKeySchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      enum: ["gemini", "openai", "deepseek", "groq", "claude"],
      required: [true, "Provider is required"],
      index: true,
    },
    label: {
      type: String,
      required: [true, "Label is required"],
      trim: true,
      maxlength: [100, "Label cannot exceed 100 characters"],
    },
    encryptedKey: {
      type: String,
      required: [true, "Encrypted key is required"],
      select: false, // Never return in standard find queries unless explicitly requested
    },
    keyMasked: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: [true, "Model identifier is required"],
      trim: true,
    },
    baseUrl: {
      type: String,
      trim: true,
      default: null,
    },
    priority: {
      type: Number,
      default: 1,
      min: [1, "Priority must be at least 1"],
      index: true,
    },
    weight: {
      type: Number,
      default: 1,
      min: [1, "Weight must be at least 1"],
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["active", "rate_limited", "quota_exceeded", "invalid", "error"],
      default: "active",
      index: true,
    },
    cooldownUntil: {
      type: Date,
      default: null,
      index: true,
    },
    stats: {
      totalCalls: { type: Number, default: 0 },
      successCalls: { type: Number, default: 0 },
      failedCalls: { type: Number, default: 0 },
      lastUsedAt: { type: Date, default: null },
      lastSuccessAt: { type: Date, default: null },
      lastError: {
        message: { type: String, default: null },
        category: { type: String, default: null },
        at: { type: Date, default: null },
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient key selection: active keys sorted by priority
LLMKeySchema.index({ isActive: 1, cooldownUntil: 1, priority: 1 });

module.exports = mongoose.model("LLMKey", LLMKeySchema);
