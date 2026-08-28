const mongoose = require("mongoose");
const AnalyticsEvent = require("../../../models/AnalyticsEvent");
const Teacher = require("../../../models/Teacher");

const getMarketplaceAnalytics = {
  definition: {
    name: "getMarketplaceAnalytics",
    description: "Get aggregated marketplace insights such as search trends, supply/demand gaps, and engagement. Restricted to Admins.",
    parametersJsonSchema: { type: "object", properties: {}, required: [] },
  },
  requiresAuth: true,
  async execute(args, { user }) {
    if (user.role !== "admin") {
      return { forModel: { error: "FORBIDDEN", message: "Only admins can access marketplace analytics." } };
    }

    // Aggregate AI Searches to find the most common requested subjects
    const popularSearches = await AnalyticsEvent.aggregate([
      { $match: { eventType: "AI_SEARCH" } },
      { $match: { "searchContext.subject": { $exists: true, $ne: null } } },
      { $group: { _id: "$searchContext.subject", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Aggregate No-Result Searches to find Supply-Demand Gaps
    const noResultSearches = await AnalyticsEvent.aggregate([
      { $match: { eventType: "AI_SEARCH", "metadata.resultsCount": 0 } },
      { $group: { _id: { subject: "$searchContext.subject", city: "$searchContext.city" }, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Total Tutors
    const activeTutorsCount = await Teacher.countDocuments({ isActive: true });

    return {
      forModel: {
        success: true,
        popularSearches: popularSearches.map(s => ({ subject: s._id, count: s.count })),
        supplyDemandGaps: noResultSearches.map(s => ({ subject: s._id.subject, city: s._id.city, count: s.count })),
        activeTutorsCount
      }
    };
  }
};

const analyzeMyProfile = {
  definition: {
    name: "analyzeMyProfile",
    description: "Analyze the logged-in tutor's profile to suggest improvements (e.g. missing bio, missing avatar). Restricted to Tutors.",
    parametersJsonSchema: { type: "object", properties: {}, required: [] },
  },
  requiresAuth: true,
  async execute(args, { user }) {
    if (user.role !== "teacher") {
      return { forModel: { error: "FORBIDDEN", message: "Only tutors can analyze their own profiles." } };
    }

    const teacher = await Teacher.findOne({ userId: user._id });
    if (!teacher) {
      return { forModel: { error: "NOT_FOUND", message: "Tutor profile not found for this user." } };
    }

    const missingFields = [];
    if (!teacher.bio || teacher.bio.length < 50) missingFields.push("detailed bio");
    if (!teacher.avatarPublicId) missingFields.push("profile picture");
    if (!teacher.experience) missingFields.push("teaching experience");

    const completeness = 100 - (missingFields.length * 15); // Simple completeness score

    return {
      forModel: {
        success: true,
        profileCompletenessScore: Math.max( completeness, 0 ),
        missingFields,
        recommendation: missingFields.length > 0 
          ? `You can improve your profile by adding a ${missingFields.join(', ')}.`
          : "Your profile is excellent and fully complete!"
      }
    };
  }
};

module.exports = { getMarketplaceAnalytics, analyzeMyProfile };
