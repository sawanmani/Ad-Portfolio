import { motion, useScroll, useSpring } from 'motion/react';

// Thin gradient bar pinned to the top that tracks page scroll progress.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  return <motion.span className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}
