import { motion, useReducedMotion } from 'motion/react';

// Scroll-reveal wrapper powered by Motion. Drop-in replacement for the old
// IntersectionObserver version (same `as` / `className` / `style` API), now with
// spring + blur. Respects prefers-reduced-motion.
export default function Reveal({
  as = 'div',
  className = '',
  children,
  delay = 0,
  y = 28,
  blur = 6,
  once = true,
  style,
  ...rest
}) {
  const reduced = useReducedMotion();
  const Comp = (typeof as === 'string' && motion[as]) || motion.div;

  const variants = {
    hidden: {
      opacity: 0,
      y: reduced ? 0 : y,
      filter: reduced ? 'none' : `blur(${blur}px)`,
    },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, delay: reduced ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <Comp
      className={className}
      // Motion's default will-change promotes every Reveal into a containing
      // block (breaks nested 3D/perspective); the animations are cheap, so skip it.
      style={{ willChange: 'auto', ...style }}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-12% 0px' }}
      variants={variants}
      {...rest}
    >
      {children}
    </Comp>
  );
}
