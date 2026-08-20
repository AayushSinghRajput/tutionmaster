const mongoose = require("mongoose");
const Teacher = require("../../../models/Teacher");
const escapeRegex = require("../../../utils/escapeRegex");
const { generateImageUrl, generatePdfViewUrl } = require("../../../utils/cloudinaryUtils");

const TEACHING_MODES = ["Online", "In-person", "Both"];
const CHAT_RESULT_LIMIT = 6;

function withUrls(teacherDoc) {
  const teacher = teacherDoc.toObject ? teacherDoc.toObject() : teacherDoc;
  return {
    ...teacher,
    avatarUrl: generateImageUrl(teacher.avatarPublicId),
    cvUrl: generatePdfViewUrl(teacher.cvPublicId),
  };
}

function toPublicCard(teacher) {
  return {
    type: "teacher",
    _id: teacher._id,
    name: teacher.name,
    avatarUrl: teacher.avatarUrl,
    address: teacher.address,
    bio: teacher.bio,
    experience: teacher.experience,
    hourlyRate: teacher.hourlyRate,
    preferredSubjects: teacher.preferredSubjects,
    teachingMode: teacher.teachingMode,
  };
}

function toModelSummary(teacher) {
  return {
    id: teacher._id,
    name: teacher.name,
    city: teacher.address?.city,
    subjects: teacher.preferredSubjects,
    experience: teacher.experience,
    hourlyRate: teacher.hourlyRate,
    teachingMode: teacher.teachingMode,
  };
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
        city: { type: "string", description: "City the tutor is located in, e.g. 'Dharan'." },
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
    const filter = { isActive: true };

    if (query && query.trim()) {
      const regex = new RegExp(escapeRegex(query.trim()), "i");
      filter.$or = [{ name: regex }, { bio: regex }, { "address.city": regex }];
    }

    if (subject && subject.trim()) {
      filter.preferredSubjects = { $in: [new RegExp(escapeRegex(subject.trim()), "i")] };
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
      filter.hourlyRate = {};
      if (minRate !== undefined) filter.hourlyRate.$gte = Number(minRate);
      if (maxRate !== undefined) filter.hourlyRate.$lte = Number(maxRate);
    }

    const matches = await Teacher.find(filter)
      .collation({ locale: "en", strength: 2 })
      .sort({ experience: -1 })
      .limit(CHAT_RESULT_LIMIT);

    const teachers = matches.map(withUrls);

    return {
      forModel: { count: teachers.length, teachers: teachers.map(toModelSummary) },
      publicResults: teachers.map(toPublicCard),
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
      match = await Teacher.findOne({ _id: id, isActive: true });
    } else if (name && name.trim()) {
      match = await Teacher.findOne({ isActive: true, name: new RegExp(escapeRegex(name.trim()), "i") });
    } else {
      return { forModel: { error: "INVALID_ARGS", message: "Either id or name is required." } };
    }

    if (!match) {
      return { forModel: { found: false } };
    }

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

const getSubjects = {
  definition: {
    name: "getSubjects",
    description: "List the distinct subjects actually taught by active tutors on TuitionMaster right now.",
    parametersJsonSchema: { type: "object", properties: {}, required: [] },
  },
  requiresAuth: false,
  async execute() {
    const raw = await Teacher.distinct("preferredSubjects", { isActive: true });
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
    const raw = await Teacher.distinct("address.city", { isActive: true });
    const cities = raw
      .filter(Boolean)
      .map((city) => city.trim())
      .sort((a, b) => a.localeCompare(b));
    return { forModel: { cities } };
  },
};

module.exports = { checkTeacherExists, searchTeachers, getTeacherProfile, getSubjects, getLocations };
