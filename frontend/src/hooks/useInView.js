import { useEffect, useRef, useState } from "react";

export const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || isInView) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(node);
      }
    }, { threshold });

    observer.observe(node);
    return () => observer.disconnect();
  }, [isInView, threshold]);

  return [ref, isInView];
};
