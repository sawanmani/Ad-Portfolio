import { useMemo, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { timeline } from '../../data/content.js';
import Reveal from '../Reveal.jsx';
import SectionHead from '../SectionHead.jsx';

const KIND_LABEL = { work: 'Role', edu: 'Education', award: 'Award', project: 'Project' };

// Minimal inline SVG icons per milestone kind
const KIND_ICON = {
  work: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
  ),
  edu: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10L12 5 2 10l10 5z"/><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/></svg>
  ),
  award: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.5 13l1.5 8-5-3-5 3 1.5-8"/></svg>
  ),
  project: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
  ),
};

// Scroll-driven "spine": the accent line draws top→bottom as the list
// scrolls through the viewport, then fades out when the section leaves.
function useSpine() {
  const [node, setNode] = useState(null);
  // Stable RefObject identity per node so useScroll re-binds only when the
  // timeline element actually mounts.
  const target = useMemo(() => ({ current: node }), [node]);
  const { scrollYProgress } = useScroll({
    target,
    offset: ['start 70%', 'end 40%'],
  });
  const reduced = useReducedMotion();
  const scale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.04, 0.96, 1], [0, 1, 1, 0.35]);
  return {
    setNode,
    style: reduced ? { scaleY: 1, opacity: 1 } : { scaleY: scale, opacity },
  };
}

export default function Experience() {
  const { setNode, style } = useSpine();
  const items = [...timeline].sort((a, b) => (a.start ?? 0) - (b.start ?? 0));

  return (
    <section className="section" id="experience" aria-label="Experience, education and achievements">
      <div className="container">
        <SectionHead eyebrow="Journey" title="Milestones, wins &" accent="learning." />
        <div className="timeline" ref={setNode}>
          <motion.span className="timeline__spine" style={style} aria-hidden="true" />
          {items.map((t, i) => (
            <Reveal
              as="div"
              className={`timeline__item timeline__item--${t.kind}`}
              key={t.title}
              delay={i * 0.05}
            >
              <div className="timeline__when">
                <span className="timeline__period">{t.period}</span>
                <span className={`timeline__kind timeline__kind--${t.kind}`}>
                  {KIND_ICON[t.kind]}
                  {KIND_LABEL[t.kind] || t.kind}
                </span>
              </div>
              <div className="timeline__body">
                <h3 style={{ marginBottom: '0.25rem' }}>{t.title}</h3>
                <span className="label" style={{ color: 'var(--accent)' }}>
                  {t.org}
                </span>
                <p style={{ color: 'var(--muted)', marginTop: '0.5rem' }}>{t.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
