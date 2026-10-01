import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

// Button/link that gently pulls toward the cursor (magnetic), then springs back.
export default function MagneticButton({
  href,
  className = '',
  strength = 0.35,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 12, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 200, damping: 12, mass: 0.3 });

  const onMove = (e) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Comp = href ? motion.a : motion.button;
  return (
    <Comp
      ref={ref}
      href={href}
      className={`magnetic ${className}`.trim()}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      {...rest}
    >
      {children}
    </Comp>
  );
}
