import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

// Site-wide soft spotlight that trails the cursor. Skipped on touch/reduced-motion.
export default function CursorGlow() {
  const reduced = useReducedMotion();
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 250, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 250, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia('(hover: none)').matches) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [reduced, x, y]);

  if (reduced) return null;
  return <motion.div className="cursor-glow" style={{ x: sx, y: sy }} aria-hidden="true" />;
}
