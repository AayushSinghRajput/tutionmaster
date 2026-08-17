const STORAGE_KEY_PREFIX = "teacherProfileDraft:";
const DRAFT_TTL_MS = 24 * 60 * 60 * 1000;

const draftKey = (userId) => `${STORAGE_KEY_PREFIX}${userId || "guest"}`;

export const loadTeacherProfileDraft = (userId) => {
  try {
    const raw = localStorage.getItem(draftKey(userId));
    if (!raw) return null;

    const saved = JSON.parse(raw);
    if (!saved?.savedAt || Date.now() - saved.savedAt > DRAFT_TTL_MS) {
      localStorage.removeItem(draftKey(userId));
      return null;
    }
    return saved;
  } catch {
    localStorage.removeItem(draftKey(userId));
    return null;
  }
};

export const saveTeacherProfileDraft = (userId, values, step) => {
  try {
    localStorage.setItem(
      draftKey(userId),
      JSON.stringify({ values, step, savedAt: Date.now() })
    );
  } catch {
    // Storage full/unavailable — draft saving is best-effort, never critical.
  }
};

export const clearTeacherProfileDraft = (userId) => {
  localStorage.removeItem(draftKey(userId));
};
