import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { featured } from '../data/content.js';
import TiltCard from './ui/TiltCard.jsx';
import MagneticButton from './ui/MagneticButton.jsx';
import { ArrowUpRight } from './ui/Icons.jsx';

// Glass "featured project" HUD card — auto-rotates every 4s with a spring swap,
// 3D tilt, real thumbnail, and a magnetic "view" chip. Anchored bottom-left so
// it no longer sits locked beside the avatar.
export default function FeaturedCard() {
  const items = featured.items;
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced || items.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % items.length), 4000);
    return () => clearInterval(t);
  }, [reduced, items.length]);

  const p = items[i % items.length];

  return (
    <TiltCard
      className="featured"
      max={7}
      scale={1.02}
      perspective={800}
      role="group"
      aria-label={featured.title}
    >
      <div className="featured__card glass">
        <span className="label">{featured.title}</span>

        <div className="featured__top">
          <span className="featured__thumb-wrap">
            <motion.img
              key={p.thumb}
              className="featured__thumb"
              src={p.thumb}
              alt={`${p.title} preview`}
              initial={reduced ? false : { opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </span>
          <motion.span
            className="featured__meta"
            key={i}
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span className="label">{p.tag}</motion.span>
            <motion.span className="featured__title">{p.title}</motion.span>
            <motion.span className="featured__sub">{p.subtitle}</motion.span>
          </motion.span>
        </div>

        <div className="featured__foot">
          {!reduced && (
            <span className="featured__bar" key={i}>
              <span />
            </span>
          )}
          <MagneticButton
            className="featured__view"
            href={p.href}
            target="_blank"
            rel="noreferrer"
            strength={0.4}
            aria-label={`Open ${p.title}`}
          >
            View
            <ArrowUpRight size={14} />
          </MagneticButton>
        </div>
      </div>
    </TiltCard>
  );
}
