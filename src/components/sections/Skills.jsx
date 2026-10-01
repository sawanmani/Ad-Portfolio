import { motion, useReducedMotion } from 'motion/react';
import { skills } from '../../data/content.js';
import SectionHead from '../SectionHead.jsx';

// 3D dual marquee: two counter-rotating rows on tilted planes (parallax "ring").
// Each track renders the list twice so translateX(-50%) loops seamlessly.
function Track({ items, reverse = false }) {
  const run = reverse ? 'marquee-rev' : 'marquee';
  return (
    <div className="marquee__track" style={{ animationName: run }}>
      {[0, 1].map((dup) => (
        <div className="marquee__half" key={dup}>
          {items.map((s) => (
            <span className="tag glass" key={s}>
              {s}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Skills() {
  const reduced = useReducedMotion();
  const half = Math.ceil(skills.marquee.length / 2);
  const rowA = skills.marquee.slice(0, half);
  const rowB = skills.marquee.slice(half);

  return (
    <section className="section" id="skills" aria-label="Skills">
      <div className="container">
        <SectionHead eyebrow="Skills" title="Tools I reach for" accent="daily." />
      </div>

      <motion.div
        className="marquee-stack"
        aria-hidden="true"
        initial={reduced ? false : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="marquee marquee--left">
          <Track items={rowA} />
        </div>
        <div className="marquee marquee--right">
          <Track items={rowB} reverse />
        </div>
      </motion.div>

      {/* accessible, non-animated list for screen readers */}
      <ul className="container skills__list">
        {skills.marquee.map((s) => (
          <li key={s} className="tag glass">
            {s}
          </li>
        ))}
      </ul>
    </section>
  );
}
