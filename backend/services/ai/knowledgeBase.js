// Trusted, hand-maintained static knowledge about TuitionMaster the platform
// itself — NOT about live data (teachers, subjects, etc; those come from
// tools that query MongoDB). Deliberately excludes anything resembling a
// statistic ("500+ tutors", "10,000 students") since the AI must never
// present a number as fact unless a tool actually counted it.
//
// This is a lightweight keyword-scored retrieval, not a vector-embedding
// RAG pipeline — appropriate for a handful of static topics. If the topic
// list grows large enough that keyword matching stops being precise, that's
// the signal to introduce embeddings, not before.
const ENTRIES = [
  {
    id: "what-is-tuitionmaster",
    title: "What TuitionMaster is",
    keywords: ["what is tuitionmaster", "about tuitionmaster", "platform", "what does tuitionmaster do"],
    content:
      "TuitionMaster is a tutoring marketplace built for Nepal that connects students with qualified private tutors. Tutors create a public profile with their qualifications, subjects, availability, hourly rate, and CV. Students and visitors can browse or search that directory without needing to create an account themselves.",
  },
  {
    id: "how-it-works-student",
    title: "How students find a tutor",
    keywords: ["how does it work", "find a tutor", "hire a tutor", "search for tutor", "browse tutors", "student"],
    content:
      "Visitors can browse the tutor directory at /teachers without signing up. They can filter by subject, city, teaching mode (Online, In-person, or Both), years of experience, and hourly rate, or use free-text search. Selecting a tutor opens their full profile, including their CV.",
  },
  {
    id: "how-to-register-tutor",
    title: "How to become a tutor / register",
    keywords: ["become a tutor", "become a teacher", "register as tutor", "sign up as teacher", "create account", "how to teach"],
    content:
      "To become a tutor, register for an account (username, email, password) at /register, or sign in with Google. After registering, go to /create-profile and fill in your qualifications, subjects taught, years of experience, hourly rate, weekly availability, a bio, and upload a profile picture and CV — all of these are required to publish a profile. Once created, your profile becomes visible in the public tutor directory.",
  },
  {
    id: "profile-requirements",
    title: "What a tutor profile requires",
    keywords: ["profile requirements", "what do i need", "required fields", "cv", "profile picture", "avatar", "requirements", "create profile", "register profile"],
    content:
      "A complete tutor profile requires: full name, contact email and phone, address (street, city, state, ZIP), at least one qualification (degree, institution, year), at least one subject taught, a bio of 50-1000 characters, years of experience, hourly rate, teaching mode, at least one weekly availability slot, a profile picture, and a CV (PDF).",
  },
  {
    id: "home-vs-online-tuition",
    title: "Home Tuition vs Online Tuition Comparison",
    keywords: ["home tuition vs online", "online vs home", "compare home tuition", "online tuition benefits", "home tuition benefits", "grade 10", "tuition mode", "in-person vs online"],
    content:
      "### Home Tuition (In-Person)\n- **Pros:** High personal interaction, direct supervision, better focus for practical subjects (e.g., Grade 10 Math & Science), and hands-on paper problem solving.\n- **Cons:** Higher cost, schedule inflexibility, and travel requirements.\n\n### Online Tuition\n- **Pros:** Flexible scheduling, access to top tutors nationwide without geographic limits, screen sharing/digital whiteboards, and recorded sessions for review.\n- **Cons:** Requires stable internet & device, potential screen fatigue, and requires student self-discipline.\n\n**Recommendation for Grade 10:** For board exam preparation (SEE/Grade 10), Home Tuition is recommended for difficult subjects like Science and Math, while Online Tuition is excellent for language, revision, or flexible practice.",
  },
  {
    id: "accounts-and-roles",
    title: "Accounts and roles",
    keywords: ["account types", "roles", "student account", "admin", "who can sign up"],
    content:
      "TuitionMaster accounts are for tutors — every registered account is a tutor account. Students and parents do not need an account to browse or search the tutor directory. There is also an admin role used internally for platform moderation.",
  },
  {
    id: "newsletter",
    title: "Newsletter",
    keywords: ["newsletter", "subscribe", "updates"],
    content:
      "Visitors can subscribe to the TuitionMaster newsletter with just an email address to receive updates about new tutors and educational resources.",
  },
  {
    id: "contact-info",
    title: "Contact TuitionMaster",
    keywords: ["contact", "support", "email", "phone number", "reach you", "help"],
    content:
      "You can reach TuitionMaster at hello.tuitionmaster@gmail.com or +977 (980) 598-1168, or through the contact form at /contact.",
  },
  {
    id: "policies",
    title: "Policies",
    keywords: ["privacy policy", "terms of service", "terms and conditions", "cookie policy", "legal"],
    content:
      "TuitionMaster's Privacy Policy is at /privacy-policy, Terms of Service at /terms-of-service, and Cookie Policy at /cookie-policy. Refer users there for the full legal text rather than summarizing specific clauses.",
  },
];

function score(entry, queryLower) {
  let points = 0;
  // 1. Phrase matching
  for (const keyword of entry.keywords) {
    if (queryLower.includes(keyword)) points += keyword.split(" ").length * 3;
  }
  // 2. Token / word matching for multi-word prompts
  const queryTokens = queryLower.split(/\s+/).filter(t => t.length > 2);
  for (const keyword of entry.keywords) {
    const kwTokens = keyword.toLowerCase().split(/\s+/);
    for (const token of queryTokens) {
      if (kwTokens.includes(token)) points += 1;
    }
  }
  return points;
}

/**
 * Keyword-ranked lookup over the static knowledge base.
 * @param {string} query
 * @param {number} limit
 * @returns {Array<{id: string, title: string, content: string}>}
 */
function searchKnowledgeBase(query, limit = 3) {
  const queryLower = (query || "").toLowerCase();
  if (!queryLower.trim()) return [];

  return ENTRIES.map((entry) => ({ entry, points: score(entry, queryLower) }))
    .filter(({ points }) => points > 0)
    .sort((a, b) => b.points - a.points)
    .slice(0, limit)
    .map(({ entry }) => ({ id: entry.id, title: entry.title, content: entry.content }));
}

module.exports = { searchKnowledgeBase, ENTRIES };
