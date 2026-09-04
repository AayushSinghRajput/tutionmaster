import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const scrollToTarget = () => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };

      const rafId = requestAnimationFrame(scrollToTarget);
      const timerId = setTimeout(scrollToTarget, 300);

      return () => {
        cancelAnimationFrame(rafId);
        clearTimeout(timerId);
      };
    } else {
      // Whenever navigating to a page or back to home without a hash, scroll window to top
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
