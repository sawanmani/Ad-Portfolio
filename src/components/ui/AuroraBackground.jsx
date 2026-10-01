import { motion, useReducedMotion } from 'motion/react';

// Fixed, full-viewport animated aurora: floating gradient blobs + perspective
// grid. Purely decorative, sits behind everything. Static under reduced-motion.
const BLOBS = [
  { cls: 'aurora__blob--1', animate: { x: [0, 60, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.15, 0.95, 1] } },
  { cls: 'aurora__blob--2', animate: { x: [0, -50, 40, 0], y: [0, 30, -50, 0], scale: [1, 1.1, 1.2, 1] } },
  { cls: 'aurora__blob--3', animate: { x: [0, 40, -60, 0], y: [0, 50, -20, 0], scale: [1, 0.9, 1.2, 1] } },
];

export default function AuroraBackground() {
  const reduced = useReducedMotion();
  return (
    <div className="aurora" aria-hidden="true">
      <div className="aurora__grid" />
      {BLOBS.map((b, i) =>
        reduced ? (
          <span key={i} className={`aurora__blob ${b.cls}`} />
        ) : (
          <motion.span
            key={i}
            className={`aurora__blob ${b.cls}`}
            animate={b.animate}
            transition={{ duration: 18 + i * 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        )
      )}
    </div>
  );
}
