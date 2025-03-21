import { useState, useEffect } from "react";

export function useIntersectionRatio(
  ref: React.RefObject<HTMLElement | null>,
  options?: IntersectionObserverInit
) {
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    // Create an array of thresholds (0, 0.01, …, 1)
    const thresholds = Array.from({ length: 101 }, (_, i) => i / 100);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          setRatio(entries[0].intersectionRatio);
        }
      },
      { threshold: thresholds, ...options }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options]);

  return ratio;
}