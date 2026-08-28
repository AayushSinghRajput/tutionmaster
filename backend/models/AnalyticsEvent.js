const mongoose = require("mongoose");

const analyticsEventSchema = new mongoose.Schema({
  eventType: {
    type: String,
    enum: [
      "AI_SEARCH",
      "TUTOR_RECOMMENDED",
      "PROFILE_VIEWED",
      "TUTOR_SHORTLISTED",
      "REQUIREMENT_POSTED",
      "TUTOR_CONTACTED"
    ],
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false
  },
  tutorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: false
  },
  searchContext: {
    type: Object, // Stores search parameters for AI_SEARCH
    required: false
  },
  metadata: {
    type: Object, // Any extra data like match score, response time
    required: false
  }
}, { timestamps: true });

// Indexes for fast aggregation by admins
analyticsEventSchema.index({ eventType: 1, createdAt: -1 });
analyticsEventSchema.index({ tutorId: 1, eventType: 1 });

module.exports = mongoose.model("AnalyticsEvent", analyticsEventSchema);
