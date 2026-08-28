const mongoose = require("mongoose");

const requirementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  contactEmail: { type: String },
  contactPhone: { type: String },
  subject: { type: String, required: true },
  academicLevel: { type: String },
  location: { type: String },
  budget: { type: String },
  teachingMode: { type: String },
  preferredTime: { type: String },
  additionalRequirements: { type: String },
  status: { type: String, default: "Open", enum: ["Open", "Closed"] }
}, { timestamps: true });

module.exports = mongoose.model("Requirement", requirementSchema);
