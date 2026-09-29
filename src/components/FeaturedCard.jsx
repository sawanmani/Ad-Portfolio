import { useEffect, useState } from 'react';
import { featured } from '../data/content.js';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

// Small glass "featured project" card that auto-rotates every 4s.
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
    <a
      className="featured glass"
      href={p.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Featured: ${p.title}`}
    >
      <span className="label">{featured.title}</span>
      <div className="featured__top">
        <span className="featured__thumb" aria-hidden="true" />
        <span>
          <span className="label">{p.tag}</span>
          <div className="featured__title">{p.title}</div>
          <div className="featured__sub">{p.subtitle}</div>
        </span>
      </div>
      {!reduced && (
        <span className="featured__bar" key={i}>
          <span />
        </span>
      )}
    </a>
  );
}
