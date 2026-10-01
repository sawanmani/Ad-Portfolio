import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'motion/react';

// Reusable 3D tilt card. Pointer drives rotateX/rotateY (spring-eased),
// optional moving glare highlight, children can use translateZ for depth.
// Falls back to a flat card under prefers-reduced-motion.
export default function TiltCard({
  children,
  className = '',
  max = 10,
  scale = 1.02,
  glare = true,
  perspective = 900,
  ...rest
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 160, damping: 16, mass: 0.4 };

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const sc = useSpring(1, spring);

  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.28), transparent 45%)`;

  const onMove = (e) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onEnter = () => !reduced && sc.set(scale);
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
    sc.set(1);
  };

  return (
    <div
      ref={ref}
      className={`tilt ${className}`.trim()}
      style={{ perspective: `${perspective}px` }}
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      {...rest}
    >
      <motion.div
        className="tilt__inner"
        style={{ rotateX, rotateY, scale: sc, transformStyle: 'preserve-3d' }}
      >
        {children}
        {glare && !reduced && (
          <motion.span className="tilt__glare" style={{ background: glareBg }} aria-hidden="true" />
        )}
      </motion.div>
    </div>
  );
}
