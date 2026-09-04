const aiConfig = require("../../config/aiConfig");
const GeminiProvider = require("./providers/geminiProvider");
const { buildSystemPrompt } = require("./systemPrompt");
const { searchKnowledgeBase } = require("./knowledgeBase");
const toolRegistry = require("./tools");
const AIProviderError = require("./AIProviderError");
const logger = require("../../utils/logger");

const MAX_TOOL_ITERATIONS = 4;
const MAX_HISTORY_MESSAGES = 20;

let cachedProvider = null;

function getDefaultProvider() {
  if (!aiConfig.isEnabled) return null;
  if (!cachedProvider) {
    cachedProvider = new GeminiProvider({
      apiKey: aiConfig.apiKey,
      model: aiConfig.model,
      temperature: aiConfig.temperature,
      maxOutputTokens: aiConfig.maxOutputTokens,
    });
  }
  return cachedProvider;
}

function toGeminiRole(role) {
  return role === "assistant" || role === "model" ? "model" : "user";
}

function buildContents(history, message) {
  const trimmedHistory = (history || []).slice(-MAX_HISTORY_MESSAGES);
  const historyContents = trimmedHistory
    .filter((turn) => turn && typeof turn.content === "string" && turn.content.trim())
    .map((turn) => ({ role: toGeminiRole(turn.role), parts: [{ text: turn.content }] }));

  return [...historyContents, { role: "user", parts: [{ text: message }] }];
}

const OFF_TOPIC_DECLINE_MESSAGE =
  "I am the TuitionMaster Assistant, designed specifically to help you find verified tutors, browse tuition jobs, post tutoring requirements, and navigate the TuitionMaster platform in Nepal. I cannot solve general programming or homework problems directly, but I would be glad to help you find an expert tutor for JavaScript, Mathematics, or any other subject on TuitionMaster!";

function isOffTopicQuery(message) {
  const msg = (message || "").toLowerCase().trim();
  if (!msg) return false;

  // If user query mentions platform domain terms, let it pass to agent/tools
  const hasPlatformIntent =
    /\b(tutor|tutors|teacher|teachers|tuition|tuitions|class|classes|hire|find|rate|rates|hourly|budget|npr|nepal|kathmandu|lalitpur|bhaktapur|pokhara|job|jobs|vacancy|vacancies|requirement|requirements|profile|login|signup|register|support|contact|subject|subjects|curriculum|see|neb|ioe|iost|tu)\b/i.test(
      msg
    );
  if (hasPlatformIntent) return false;

  // Patterns for generic coding, homework problem solving, or unrelated non-platform requests
  const offTopicPatterns = [
    /\b(write|give|generate|create|provide|show)\s+(me\s+)?(the\s+)?(code|program|script|function|algorithm|class|regex|sql|query|html|css)\b/i,
    /\b(how to|code to)\s+(sum|add|multiply|divide|sort|reverse|loop|fetch|print|implement|calculate|merge|find the)\b/i,
    /\b(sum\s+(the\s+)?(two|2)?\s*integers?|sum\s+of\s+two\s+numbers|fibonacci|factorial|palindrome|bubble\s*sort|binary\s*search)\b/i,
    /\b(solve|calculate)\s+([0-9\+\-\*\/\^\(\)\=\.\,]{3,}|this\s+equation|this\s+math\s+problem)\b/i,
    /\b(write\s+(an?\s+)?(essay|poem|story|song|article|letter|email\s+to\s+my))\b/i,
  ];

  for (const pattern of offTopicPatterns) {
    if (pattern.test(msg)) return true;
  }
  return false;
}

/**
 * Intelligent Local Fallback Engine
 * Shielding users from Gemini Free API rate limits (HTTP 429) & network errors.
 */
async function fallbackLocalChat(message, user) {
  if (isOffTopicQuery(message)) {
    return {
      message: OFF_TOPIC_DECLINE_MESSAGE,
      results: [],
    };
  }

  const msgLower = (message || "").toLowerCase();
  const collectedResults = [];

  // 1. Query teacher search if user asks to find/search tutors OR asks about teacher/tutor attributes
  const isExplicitTeacherSearch =
    msgLower.includes("tutor") ||
    msgLower.includes("teacher") ||
    msgLower.includes("engineer") ||
    msgLower.includes("rate") ||
    msgLower.includes("experience") ||
    msgLower.includes("subject") ||
    msgLower.includes("faculty") ||
    msgLower.includes("looking for");

  if (isExplicitTeacherSearch) {
    try {
      const searchArgs = {};

      // 1. Dynamic budget parsing (look for rate context or 700/hr, Rs 700, under 700)
      const rateMatch = message.match(/(?:less than|under|below|max|<|=|rate is|rate of|budget|hourly rate|\/hr|\/hour|rs\.?|npr)\s*(\d{3,4})|(\d{3,4})\s*(?:\/|\s*per)?\s*(?:hr|hour)/i);
      const extractedRate = rateMatch ? (rateMatch[1] || rateMatch[2]) : null;
      if (extractedRate) {
        searchArgs.maxRate = Number(extractedRate);
      }

      // 2. Dynamic experience parsing: "1 year experience", "2+ years", "at least 3 years"
      const expMatch = message.match(/(\d+)\s*(?:\+|\s*plus|\s*year|\s*yrs|\s*years)/i);
      if (expMatch && expMatch[1]) {
        searchArgs.minExperience = Number(expMatch[1]);
      }

      // 3. Robust domain keyword extraction: filter out natural language stopwords & number patterns
      const stopwords = new Set([
        "find", "a", "an", "the", "tutor", "teacher", "who", "teaches", "teach", "is", "there", "any", "looking", "for", "with",
        "at", "least", "more", "than", "less", "under", "below", "above", "rate", "of", "budget", "hourly", "hr", "hour", "hours",
        "year", "years", "yrs", "experience", "exp", "in", "available", "can", "please", "show", "me", "give", "list", "and", "or",
        "has", "have", "per", "npr", "rs", "kathmandu", "pokhara", "lalitpur", "bhaktapur"
      ]);

      // If user specified location, set city
      if (msgLower.includes("kathmandu")) searchArgs.city = "Kathmandu";
      else if (msgLower.includes("lalitpur")) searchArgs.city = "Lalitpur";
      else if (msgLower.includes("bhaktapur")) searchArgs.city = "Bhaktapur";
      else if (msgLower.includes("pokhara")) searchArgs.city = "Pokhara";

      const words = msgLower
        .replace(/[^\w\s]/g, " ")
        .split(/\s+/)
        .filter(w => w.length > 1 && !stopwords.has(w) && !/^\d+$/.test(w));

      if (words.length > 0) {
        searchArgs.query = words.join(" ");
      }

      const searchRes = await toolRegistry.execute("searchTeachers", searchArgs, { user });
      if (searchRes.publicResults?.length) {
        collectedResults.push(...searchRes.publicResults);
      }
    } catch (e) {
      // Ignore
    }
  }

  // 2. Only query jobs if user EXPLICITLY asks for job vacancies
  const isExplicitJobSearch =
    msgLower.includes("job vacancy") ||
    msgLower.includes("job vacancies") ||
    msgLower.includes("tuition vacancy") ||
    msgLower.includes("tuition vacancies") ||
    msgLower.includes("teaching jobs") ||
    msgLower.includes("available jobs");

  if (isExplicitJobSearch) {
    try {
      const jobRes = await toolRegistry.execute("searchJobs", {}, { user });
      if (jobRes.publicResults?.length) {
        collectedResults.push(...jobRes.publicResults);
      }
    } catch (e) {
      // Ignore
    }
  }

  // 3. Search local static knowledge base entries ONLY if no direct DB results found AND query is not a tutor/job search
  let kbResponse = "";
  if (collectedResults.length === 0 && !isExplicitTeacherSearch && !isExplicitJobSearch) {
    const kbMatches = searchKnowledgeBase(message, 2);
    if (kbMatches.length > 0) {
      kbResponse = kbMatches.map((m) => `**${m.title}**\n${m.content}`).join("\n\n");
    }
  }

  if (collectedResults.length > 0 || kbResponse) {
    let reply = "";
    if (kbResponse) {
      reply += `${kbResponse}\n\n`;
    }
    if (collectedResults.length > 0) {
      reply += `Here are matching tutors/jobs found on TuitionMaster:`;
    }
    return {
      message: reply.trim(),
      results: collectedResults,
    };
  }

  if (isExplicitTeacherSearch) {
    return {
      message: "No verified tutors matching those exact criteria (subject, rate, location, experience) were found right now. You can browse all available tutors at [/teachers](/teachers) or submit a custom tuition request.",
      results: [],
    };
  }

  return {
    message:
      "I'm receiving high traffic right now — please try again in a moment, or browse our verified tutors at [/teachers](/teachers) or tuition jobs at [/jobs](/jobs). You can also contact support directly on **WhatsApp (+977 980-5981168)**.",
    results: [],
  };
}

async function chat({ message, history, user, provider } = {}) {
  if (isOffTopicQuery(message)) {
    return {
      message: OFF_TOPIC_DECLINE_MESSAGE,
      results: [],
    };
  }

  const activeProvider = provider || getDefaultProvider();

  if (!activeProvider) {
    return {
      message: "The AI assistant isn't configured yet. Please try again later.",
      results: [],
    };
  }

  const contents = buildContents(history, message);
  const systemInstruction = buildSystemPrompt({ user });
  const collectedResults = [];

  for (let iteration = 0; iteration < MAX_TOOL_ITERATIONS; iteration += 1) {
    let response;
    try {
      // eslint-disable-next-line no-await-in-loop
      response = await activeProvider.generate({
        systemInstruction,
        contents,
        tools: toolRegistry.definitions,
      });
    } catch (error) {
      logger.warn(`AI Provider rate-limited or failed (${error.message}). Invoking fallback local chat.`);
      return fallbackLocalChat(message, user);
    }

    if (!response.functionCalls.length) {
      return {
        message: response.text || "I'm not sure how to help with that — could you rephrase?",
        results: collectedResults,
      };
    }

    contents.push({
      role: "model",
      parts: response.parts || response.functionCalls.map((call) => ({
        functionCall: { name: call.name, args: call.args },
      })),
    });

    const responseParts = [];
    for (const call of response.functionCalls) {
      // eslint-disable-next-line no-await-in-loop
      const result = await toolRegistry.execute(call.name, call.args, { user });
      if (result.publicResults?.length) collectedResults.push(...result.publicResults);
      responseParts.push({
        functionResponse: { id: call.id, name: call.name, response: result.forModel },
      });
    }

    contents.push({ role: "user", parts: responseParts });
  }

  return {
    message: "That request needed more steps than I can safely take at once — could you narrow it down?",
    results: collectedResults,
  };
}

module.exports = { chat };
