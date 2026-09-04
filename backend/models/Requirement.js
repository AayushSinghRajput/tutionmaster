const mongoose = require("mongoose");

const requirementSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    contactName: { type: String },
    contactEmail: { type: String },
    contactPhone: { type: String },
    subject: { type: String, required: true },
    academicLevel: { type: String },
    location: { type: String },
    budget: { type: String },
    teachingMode: { type: String },
    preferredTime: { type: String },
    additionalRequirements: { type: String },
    source: {
      type: String,
      default: "Web Form",
      enum: ["AI Agent", "Web Form", "Direct Inquiry"],
    },
    status: {
      type: String,
      default: "Open",
      enum: ["Open", "Matched", "Connected", "Class Started", "Closed"],
    },
    assignedTutorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      default: null,
    },
    adminNotes: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Requirement", requirementSchema);
