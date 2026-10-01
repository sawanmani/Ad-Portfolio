import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

// Counts a number up when it scrolls into view. Respects reduced motion
// (jumps straight to the final value).
export default function CountUp({
  to,
  decimals = 0,
  suffix = '',
  duration = 1.4,
  className = '',
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  useEffect(() => {
    if (!ref.current) return;
    const fmt = (v) => `${v.toFixed(decimals)}${suffix}`;
    if (reduced) {
      ref.current.textContent = fmt(to);
      return;
    }
    return spring.on('change', (v) => {
      if (ref.current) ref.current.textContent = fmt(v);
    });
  }, [spring, decimals, suffix, reduced, to]);

  return (
    <span ref={ref} className={className}>
      {reduced ? `${to}${suffix}` : `0${suffix}`}
    </span>
  );
}
