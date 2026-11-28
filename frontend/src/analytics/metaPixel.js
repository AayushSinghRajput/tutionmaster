export const META_PIXEL_ID =
  process.env.REACT_APP_META_PIXEL_ID || "1089127377466763";

const canTrack = () =>
  typeof window !== "undefined" && typeof window.fbq === "function";

/**
 * Track a Meta Pixel PageView on SPA route transitions.
 */
export const trackMetaPageView = () => {
  if (!canTrack()) return;

  window.fbq("track", "PageView");
};

/**
 * Track a standard Meta Pixel event (e.g., Lead, CompleteRegistration, Contact).
 */
export const trackMetaEvent = (eventName, eventParams = {}) => {
  if (!canTrack()) return;

  window.fbq("track", eventName, eventParams);
};

/**
 * Track a custom Meta Pixel event.
 */
export const trackMetaCustomEvent = (eventName, eventParams = {}) => {
  if (!canTrack()) return;

  window.fbq("trackCustom", eventName, eventParams);
};
