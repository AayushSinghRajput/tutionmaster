const CACHE_PREFIX = "tuitionmaster_teachers_";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const getCacheKey = (params = {}) => {
  const normalizedParams = Object.keys(params)
    .sort()
    .reduce((acc, key) => {
      const value = params[key];

      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        acc[key] = value;
      }

      return acc;
    }, {});

  return `${CACHE_PREFIX}${JSON.stringify(normalizedParams)}`;
};

export const getCachedTeachers = (params) => {
  try {
    const key = getCacheKey(params);
    const cached = sessionStorage.getItem(key);

    if (!cached) {
      return null;
    }

    const parsed = JSON.parse(cached);

    // Cache expired
    if (Date.now() - parsed.timestamp > CACHE_TTL) {
      sessionStorage.removeItem(key);
      return null;
    }

    return parsed.data;
  } catch (error) {
    console.error("Error reading teacher cache:", error);
    return null;
  }
};

export const setCachedTeachers = (params, data) => {
  try {
    const key = getCacheKey(params);

    sessionStorage.setItem(
      key,
      JSON.stringify({
        timestamp: Date.now(),
        data,
      }),
    );
  } catch (error) {
    // Storage can fail because of quota/privacy settings.
    // Caching should never break the application.
    console.error("Error saving teacher cache:", error);
  }
};

export const clearTeacherCache = () => {
  try {
    Object.keys(sessionStorage)
      .filter((key) => key.startsWith(CACHE_PREFIX))
      .forEach((key) => sessionStorage.removeItem(key));
  } catch (error) {
    console.error("Error clearing teacher cache:", error);
  }
};
