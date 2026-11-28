import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../../analytics/googleAnalytics";
import { trackMetaPageView } from "../../analytics/metaPixel";

const AnalyticsTracker = () => {
  const location = useLocation();
  const lastTrackedPathRef = useRef(null);

  useEffect(() => {
    const currentPath = location.pathname + location.search;
    trackPageView(currentPath);

    // index.html triggers the initial Meta Pixel PageView on document load;
    // only fire subsequent PageView events when the SPA route changes.
    if (lastTrackedPathRef.current === null) {
      lastTrackedPathRef.current = currentPath;
      return;
    }

    if (lastTrackedPathRef.current !== currentPath) {
      lastTrackedPathRef.current = currentPath;
      trackMetaPageView();
    }
  }, [location]);

  return null;
};

export default AnalyticsTracker;