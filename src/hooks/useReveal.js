import { useEffect, useRef, useState } from 'react';

// Reveal-on-scroll: fires once, then unobserves.
// Returns [ref, isVisible].
export function useReveal(options) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, ...options }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, visible];
}
