import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../../analytics/googleAnalytics";

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

export default AnalyticsTracker;