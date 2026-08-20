const Teacher = require("../../../models/Teacher");
const { generateImageUrl, generatePdfViewUrl } = require("../../../utils/cloudinaryUtils");

const getMyProfile = {
  definition: {
    name: "getMyProfile",
    description:
      "Get the currently logged-in tutor's own TuitionMaster profile. Only usable when the user is authenticated — never for looking up someone else.",
    parametersJsonSchema: { type: "object", properties: {}, required: [] },
  },
  requiresAuth: true,
  async execute(_args, context) {
    // context.user is set by the backend from the verified JWT — never from
    // anything the model or the request body claims.
    const teacherDoc = await Teacher.findOne({ userId: context.user._id });

    if (!teacherDoc) {
      return {
        forModel: {
          hasProfile: false,
          message: "This user is registered but hasn't created a tutor profile yet.",
        },
      };
    }

    const teacher = teacherDoc.toObject();
    const enriched = {
      ...teacher,
      avatarUrl: generateImageUrl(teacher.avatarPublicId),
      cvUrl: generatePdfViewUrl(teacher.cvPublicId),
    };

    return {
      forModel: {
        hasProfile: true,
        profile: {
          id: enriched._id,
          name: enriched.name,
          bio: enriched.bio,
          contact: enriched.contact,
          address: enriched.address,
          preferredSubjects: enriched.preferredSubjects,
          experience: enriched.experience,
          hourlyRate: enriched.hourlyRate,
          teachingMode: enriched.teachingMode,
          availability: enriched.availability,
          isActive: enriched.isActive,
        },
      },
      publicResults: [
        {
          type: "profile",
          _id: enriched._id,
          name: enriched.name,
          avatarUrl: enriched.avatarUrl,
          address: enriched.address,
          bio: enriched.bio,
          experience: enriched.experience,
          hourlyRate: enriched.hourlyRate,
          preferredSubjects: enriched.preferredSubjects,
          teachingMode: enriched.teachingMode,
        },
      ],
    };
  },
};

module.exports = { getMyProfile };
