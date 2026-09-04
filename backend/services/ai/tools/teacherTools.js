const mongoose = require("mongoose");
const Teacher = require("../../../models/Teacher");
const User = require("../../../models/User");
const Requirement = require("../../../models/Requirement");
const AnalyticsEvent = require("../../../models/AnalyticsEvent");
const escapeRegex = require("../../../utils/escapeRegex");
const { generateImageUrl, generatePdfViewUrl } = require("../../../utils/cloudinaryUtils");

const TEACHING_MODES = ["Online", "In-person", "Both"];
const CHAT_RESULT_LIMIT = 5;

function withUrls(teacherDoc) {
  const teacher = teacherDoc.toObject ? teacherDoc.toObject() : teacherDoc;
  return {
    ...teacher,
    avatarUrl: generateImageUrl(teacher.avatarPublicId),
    cvUrl: generatePdfViewUrl(teacher.cvPublicId),
  };
}

function toPublicCard(teacher, matchScore = null) {
  const card = {
    type: "teacher",
    _id: teacher._id,
    name: teacher.name,
    avatarUrl: teacher.avatarUrl,
    address: teacher.address,
    bio: teacher.bio,
    experience: teacher.experience,
    monthlyRate: teacher.monthlyRate || (teacher.hourlyRate ? teacher.hourlyRate * 20 : 0),
    hourlyRate: teacher.hourlyRate,
    preferredSubjects: teacher.preferredSubjects,
    teachingMode: teacher.teachingMode,
    isVisible: teacher.isVisible,
    averageRating: teacher.averageRating,
    totalReviews: teacher.totalReviews,
  };
  if (matchScore !== null) {
    card.matchScore = matchScore;
  }
  return card;
}

function toModelSummary(teacher, matchScore = null) {
  const summary = {
    id: teacher._id,
    name: teacher.name,
    city: teacher.address?.city,
    subjects: teacher.preferredSubjects,
    experience: teacher.experience,
    monthlyRate: teacher.monthlyRate || (teacher.hourlyRate ? teacher.hourlyRate * 20 : 0),
    hourlyRate: teacher.hourlyRate,
    teachingMode: teacher.teachingMode,
    isVisible: teacher.isVisible,
    averageRating: teacher.averageRating,
    totalReviews: teacher.totalReviews,
  };
  if (matchScore !== null) {
    summary.matchScore = matchScore;
  }
  return summary;
}

function calculateMatchScore(teacher) {
  let score = 80; // Base score for meeting hard requirements
  if (teacher.experience) {
    score += Math.min(teacher.experience, 10); // Up to 10 points for experience
  }
  if (teacher.avatarPublicId) score += 5; // 5 points for having a profile picture
  if (teacher.bio && teacher.bio.length > 50) score += 5; // 5 points for a detailed bio
  return Math.min(score, 100);
}

const checkTeacherExists = {
  definition: {
    name: "checkTeacherExists",
    description:
      "Check whether a tutor with a given (or similar) name is registered on TuitionMaster. Use this for existence questions like 'is there a teacher named X'.",
    parametersJsonSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "The tutor's name to look up, as given by the user." },
      },
      required: ["name"],
    },
  },
  requiresAuth: false,
  async execute({ name }) {
    if (!name || !name.trim()) {
      return { forModel: { error: "INVALID_ARGS", message: "A name is required." } };
    }

    const match = await Teacher.findOne({
      isActive: true,
      isVisible: true,
      name: new RegExp(escapeRegex(name.trim()), "i"),
    });

    if (!match) {
      return { forModel: { exists: false } };
    }

    const teacher = withUrls(match);
    return {
      forModel: { exists: true, teacher: toModelSummary(teacher) },
      publicResults: [toPublicCard(teacher)],
    };
  },
};

const searchTeachers = {
  definition: {
    name: "searchTeachers",
    description:
      "Search the real TuitionMaster tutor directory. Use this whenever a user wants to find tutors, e.g. by subject, city, teaching mode, experience, or budget. Supports free-text search across name/bio/city via 'query'.",
    parametersJsonSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Free-text search across tutor name, bio, and city." },
        subject: { type: "string", description: "A subject the tutor should teach, e.g. 'Mathematics'." },
        city: { type: "string", description: "City the tutor is located in, e.g. 'Kathmandu'." },
        teachingMode: { type: "string", enum: TEACHING_MODES, description: "Preferred teaching mode." },
        minExperience: { type: "number", description: "Minimum years of experience." },
        maxExperience: { type: "number", description: "Maximum years of experience." },
        minRate: { type: "number", description: "Minimum hourly rate in NPR." },
        maxRate: { type: "number", description: "Maximum hourly rate in NPR." },
      },
      required: [],
    },
  },
  requiresAuth: false,
  async execute(args) {
    const { query, subject, city, teachingMode, minExperience, maxExperience, minRate, maxRate } = args || {};
    const filter = { isActive: true, isVisible: true };

    // Apply Hard Constraints First
    if (query && query.trim()) {
      const q = query.trim();
      const regexList = [new RegExp(escapeRegex(q), "i")];

      // Handle common educational synonyms (e.g. Mathematics <-> Math)
      if (/^math(?:ematics)?$/i.test(q)) {
        regexList.push(new RegExp("math", "i"));
        regexList.push(new RegExp("mathematics", "i"));
      } else if (/^comp(?:uter)?(?:\s*science)?$/i.test(q)) {
        regexList.push(new RegExp("computer", "i"));
      }

      filter.$or = [
        { name: { $in: regexList } },
        { bio: { $in: regexList } },
        { "address.city": { $in: regexList } },
        { preferredSubjects: { $in: regexList } },
      ];
    }

    if (subject && subject.trim()) {
      const sub = subject.trim();
      const subRegexList = [new RegExp(escapeRegex(sub), "i")];
      if (/^math(?:ematics)?$/i.test(sub)) {
        subRegexList.push(new RegExp("math", "i"));
        subRegexList.push(new RegExp("mathematics", "i"));
      }
      filter.preferredSubjects = { $in: subRegexList };
    }

    if (city && city.trim()) {
      filter["address.city"] = new RegExp(escapeRegex(city.trim()), "i");
    }

    if (teachingMode && TEACHING_MODES.includes(teachingMode)) {
      filter.teachingMode = teachingMode;
    }

    if (minExperience !== undefined || maxExperience !== undefined) {
      filter.experience = {};
      if (minExperience !== undefined) filter.experience.$gte = Number(minExperience);
      if (maxExperience !== undefined) filter.experience.$lte = Number(maxExperience);
    }

    if (minRate !== undefined || maxRate !== undefined) {
      const rateCondition = {};
      if (minRate !== undefined) rateCondition.$gte = Number(minRate);
      if (maxRate !== undefined) rateCondition.$lte = Number(maxRate);

      filter.$or = [
        { monthlyRate: rateCondition },
        {
          monthlyRate: { $exists: false },
          hourlyRate: {
            ...(minRate !== undefined ? { $gte: Math.round(Number(minRate) / 20) } : {}),
            ...(maxRate !== undefined ? { $lte: Math.round(Number(maxRate) / 20) } : {}),
          },
        },
      ];
    }

    const matches = await Teacher.find(filter).collation({ locale: "en", strength: 2 });
    
    // Calculate Match Scores
    let scoredTeachers = matches.map(match => {
      const teacher = withUrls(match);
      const score = calculateMatchScore(teacher);
      return { teacher, score };
    });

    // Rank from highest to lowest compatibility
    scoredTeachers.sort((a, b) => b.score - a.score);
    
    // Limit results
    const topMatches = scoredTeachers.slice(0, CHAT_RESULT_LIMIT);

    // Log Analytics Event (Fire and forget)
    AnalyticsEvent.create({
      eventType: "AI_SEARCH",
      searchContext: args,
      metadata: { resultsCount: topMatches.length }
    }).catch(() => {});

    return {
      forModel: { count: topMatches.length, teachers: topMatches.map(item => toModelSummary(item.teacher, item.score)) },
      publicResults: topMatches.map(item => toPublicCard(item.teacher, item.score)),
    };
  },
};

const getTeacherProfile = {
  definition: {
    name: "getTeacherProfile",
    description: "Get the full public profile of one specific tutor by their id or exact name.",
    parametersJsonSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "The tutor's TuitionMaster id, if known (e.g. from a prior search result)." },
        name: { type: "string", description: "The tutor's name, if id is not known." },
      },
      required: [],
    },
  },
  requiresAuth: false,
  async execute({ id, name } = {}) {
    let match = null;

    if (id && mongoose.isValidObjectId(id)) {
      match = await Teacher.findOne({ _id: id, isActive: true, isVisible: true });
    } else if (name && name.trim()) {
      match = await Teacher.findOne({ isActive: true, isVisible: true, name: new RegExp(escapeRegex(name.trim()), "i") });
    } else {
      return { forModel: { error: "INVALID_ARGS", message: "Either id or name is required." } };
    }

    if (!match) {
      return { forModel: { found: false } };
    }

    // Log Analytics Event (Fire and forget)
    AnalyticsEvent.create({
      eventType: "PROFILE_VIEWED",
      tutorId: match._id,
      metadata: { requestedId: id, requestedName: name }
    }).catch(() => {});

    const teacher = withUrls(match);
    return {
      forModel: {
        found: true,
        teacher: {
          ...toModelSummary(teacher),
          bio: teacher.bio,
          qualifications: teacher.qualifications,
          availability: teacher.availability,
          contact: teacher.contact,
        },
      },
      publicResults: [toPublicCard(teacher)],
    };
  },
};

const getSimilarTutors = {
  definition: {
    name: "getSimilarTutors",
    description: "Find tutors similar to a specific tutor based on subject, location, and rate.",
    parametersJsonSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "The ID of the tutor to find similarities for." },
      },
      required: ["id"],
    },
  },
  requiresAuth: false,
  async execute({ id }) {
    if (!id || !mongoose.isValidObjectId(id)) {
      return { forModel: { error: "INVALID_ARGS", message: "A valid tutor id is required." } };
    }

    const sourceTeacher = await Teacher.findById(id);
    if (!sourceTeacher) {
      return { forModel: { error: "NOT_FOUND", message: "Tutor not found." } };
    }

    // Similarity logic: Same subjects, or same city, slightly flexible rate
    const filter = {
      _id: { $ne: sourceTeacher._id },
      isActive: true,
      isVisible: true,
      $or: [
        { preferredSubjects: { $in: sourceTeacher.preferredSubjects } },
        { "address.city": sourceTeacher.address.city }
      ]
    };

    const matches = await Teacher.find(filter).limit(CHAT_RESULT_LIMIT);
    
    let scoredTeachers = matches.map(match => {
      const teacher = withUrls(match);
      const score = calculateMatchScore(teacher);
      return { teacher, score };
    });
    
    scoredTeachers.sort((a, b) => b.score - a.score);
    const topMatches = scoredTeachers.slice(0, 3); // Return top 3 similar

    return {
      forModel: { count: topMatches.length, teachers: topMatches.map(item => toModelSummary(item.teacher, item.score)) },
      publicResults: topMatches.map(item => toPublicCard(item.teacher, item.score)),
    };
  }
};

const shortlistTutor = {
  definition: {
    name: "shortlistTutor",
    description: "Save or shortlist a tutor to the user's profile. Use this when the user says 'Save this tutor' or 'Shortlist Aayush'.",
    parametersJsonSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "The ID of the tutor to save." },
      },
      required: ["id"],
    },
  },
  requiresAuth: true,
  async execute({ id }, { user }) {
    if (!user) {
      return { forModel: { error: "AUTH_REQUIRED", message: "You must be logged in to save a tutor." } };
    }
    if (!id || !mongoose.isValidObjectId(id)) {
      return { forModel: { error: "INVALID_ARGS", message: "A valid tutor id is required." } };
    }

    const dbUser = await User.findById(user._id);
    if (!dbUser) return { forModel: { error: "NOT_FOUND", message: "User not found." } };

    if (dbUser.savedTutors && dbUser.savedTutors.includes(id)) {
       return { forModel: { success: true, message: "Tutor was already saved in your shortlist." } };
    }

    if (!dbUser.savedTutors) dbUser.savedTutors = [];
    dbUser.savedTutors.push(id);
    await dbUser.save();

    // Log Analytics Event
    AnalyticsEvent.create({
      eventType: "TUTOR_SHORTLISTED",
      userId: user._id,
      tutorId: id
    }).catch(() => {});

    return { forModel: { success: true, message: "Tutor successfully saved to your shortlist." } };
  }
};

const getShortlistedTutors = {
  definition: {
    name: "getShortlistedTutors",
    description: "Get the user's saved or shortlisted tutors.",
    parametersJsonSchema: { type: "object", properties: {}, required: [] },
  },
  requiresAuth: true,
  async execute(args, { user }) {
    if (!user) {
      return { forModel: { error: "AUTH_REQUIRED", message: "You must be logged in to view saved tutors." } };
    }
    
    const dbUser = await User.findById(user._id).populate("savedTutors");
    if (!dbUser || !dbUser.savedTutors || dbUser.savedTutors.length === 0) {
      return { forModel: { count: 0, teachers: [] } };
    }

    const teachers = dbUser.savedTutors.filter(t => t.isActive && t.isVisible).map(withUrls);
    
    return {
      forModel: { count: teachers.length, teachers: teachers.map(t => toModelSummary(t)) },
      publicResults: teachers.map(t => toPublicCard(t)),
    };
  }
};

const postRequirement = {
  definition: {
    name: "postRequirement",
    description: "Post a tutoring requirement when a student cannot find a suitable tutor.",
    parametersJsonSchema: {
      type: "object",
      properties: {
        subject: { type: "string" },
        academicLevel: { type: "string" },
        location: { type: "string" },
        budget: { type: "string" },
        teachingMode: { type: "string" },
        preferredTime: { type: "string" },
        additionalRequirements: { type: "string" },
        contactEmail: { type: "string", description: "Email address if user is a guest." },
        contactPhone: { type: "string", description: "Phone number if user is a guest." },
      },
      required: ["subject", "location", "budget"],
    },
  },
  requiresAuth: false,
  async execute(args, { user }) {
    try {
      const newRequirement = new Requirement({
        ...args,
        userId: user ? user._id : null
      });
      await newRequirement.save();

      // Log Analytics Event
      AnalyticsEvent.create({
        eventType: "REQUIREMENT_POSTED",
        userId: user ? user._id : null,
        metadata: { subject: args.subject, location: args.location }
      }).catch(() => {});

      return { forModel: { success: true, requirementId: newRequirement._id } };
    } catch (error) {
      return { forModel: { error: "SERVER_ERROR", message: "Failed to post requirement." } };
    }
  }
};

const getSubjects = {
  definition: {
    name: "getSubjects",
    description: "List the distinct subjects actually taught by active tutors on TuitionMaster right now.",
    parametersJsonSchema: { type: "object", properties: {}, required: [] },
  },
  requiresAuth: false,
  async execute() {
    const raw = await Teacher.distinct("preferredSubjects", { isActive: true, isVisible: true });
    const seen = new Map();
    for (const subject of raw) {
      const key = subject.trim().toLowerCase();
      if (!seen.has(key)) seen.set(key, subject.trim());
    }
    const subjects = Array.from(seen.values()).sort((a, b) => a.localeCompare(b));
    return { forModel: { subjects } };
  },
};

const getLocations = {
  definition: {
    name: "getLocations",
    description: "List the distinct cities where active tutors are currently located on TuitionMaster.",
    parametersJsonSchema: { type: "object", properties: {}, required: [] },
  },
  requiresAuth: false,
  async execute() {
    const raw = await Teacher.distinct("address.city", { isActive: true, isVisible: true });
    const cities = raw
      .filter(Boolean)
      .map((city) => city.trim())
      .sort((a, b) => a.localeCompare(b));
    return { forModel: { cities } };
  },
};

module.exports = { 
  checkTeacherExists, 
  searchTeachers, 
  getTeacherProfile, 
  getSubjects, 
  getLocations,
  getSimilarTutors,
  shortlistTutor,
  getShortlistedTutors,
  postRequirement
};
