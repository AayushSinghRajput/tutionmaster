const teacherTools = require("./teacherTools");
const userTools = require("./userTools");
const knowledgeTools = require("./knowledgeTools");
const insightTools = require("./insightTools");
const logger = require("../../../utils/logger");

const ALL_TOOLS = {
  ...teacherTools,
  ...userTools,
  ...knowledgeTools,
  ...insightTools,
};

// What we hand to Gemini as function declarations.
const definitions = Object.values(ALL_TOOLS).map((tool) => tool.definition);

/**
 * Runs one tool call. Never lets a tool implementation's error reach Gemini
 * directly — the model only ever sees a normalized shape, so it can tell the
 * user "I couldn't check that" instead of leaking a stack trace or a raw
 * Mongo error.
 *
 * @param {string} name
 * @param {object} args
 * @param {{ user?: object }} context - context.user is the authenticated
 *   User document (or undefined for a guest), set by the controller from the
 *   verified JWT — never trust anything the model/args claim about identity.
 * @returns {Promise<{ forModel: object, publicResults?: Array<object> }>}
 */
async function execute(name, args, context = {}) {
  const tool = ALL_TOOLS[name];

  if (!tool) {
    return { forModel: { error: "UNKNOWN_TOOL", message: `No tool named "${name}" exists.` } };
  }

  if (tool.requiresAuth && !context.user) {
    return {
      forModel: {
        error: "AUTH_REQUIRED",
        message: "This information requires the user to be logged in. Ask them to log in first.",
      },
    };
  }

  try {
    return await tool.execute(args || {}, context);
  } catch (error) {
    logger.error(`AI tool "${name}" failed: ${error.stack || error.message}`);
    return {
      forModel: {
        error: "TOOL_FAILED",
        message: "This lookup failed on our end. Tell the user it could not be checked right now.",
      },
    };
  }
}

module.exports = { definitions, execute };
