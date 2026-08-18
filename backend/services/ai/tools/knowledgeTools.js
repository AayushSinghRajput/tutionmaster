const { searchKnowledgeBase } = require("../knowledgeBase");

const searchPlatformKnowledge = {
  definition: {
    name: "searchPlatformKnowledge",
    description:
      "Look up static TuitionMaster platform information — what the platform is, how registration/tutor-profile creation works, policies, contact info. Use this for 'how does X work' / 'what is TuitionMaster' style questions, NOT for live data like specific teachers or subjects.",
    parametersJsonSchema: {
      type: "object",
      properties: {
        topic: { type: "string", description: "The user's question or topic, in their own words." },
      },
      required: ["topic"],
    },
  },
  requiresAuth: false,
  async execute({ topic }) {
    const entries = searchKnowledgeBase(topic);
    if (!entries.length) {
      return { forModel: { found: false, message: "No matching platform information was found for this topic." } };
    }
    return { forModel: { found: true, entries } };
  },
};

module.exports = { searchPlatformKnowledge };
