import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

export const initGoogleAnalytics = () => {
  if (!GA_MEASUREMENT_ID) {
    console.warn("Google Analytics Measurement ID is not configured.");
    return;
  }

  ReactGA.initialize(GA_MEASUREMENT_ID);
};

export const trackPageView = (path) => {
  if (!GA_MEASUREMENT_ID) return;

  ReactGA.send({
    hitType: "pageview",
    page: path,
  });
};

export const trackEvent = (eventName, eventParams = {}) => {
  if (!GA_MEASUREMENT_ID) return;

  ReactGA.event(eventName, eventParams);
};