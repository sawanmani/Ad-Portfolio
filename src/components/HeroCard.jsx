import { useRef, useState } from 'react';
import { heroImage } from '../data/content.js';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

// 3D pop-out hero card with pointer-driven tilt.
// Touch fallback: tap toggles the "popped" state via .is-active.
export default function HeroCard() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);
  const frame = useRef(0);
  const [bgOk, setBgOk] = useState(true);

  const setVars = (rx, ry, px, py) => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', `${rx}deg`);
    el.style.setProperty('--ry', `${ry}deg`);
    el.style.setProperty('--px', `${px}px`);
    el.style.setProperty('--py', `${py}px`);
  };

  const onMove = (e) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
    const cy = (e.clientY - r.top) / r.height - 0.5;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      setVars(-cy * 8, cx * 8, cx * 14, cy * 10); // tilt max 8deg, follow a few px
    });
  };

  const onLeave = () => {
    cancelAnimationFrame(frame.current);
    setVars(0, 0, 0, 0);
  };

  return (
    <figure
      ref={ref}
      className={`hero-card${active ? ' is-active' : ''}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={() => setActive((a) => !a)}
    >
      <div
        className={`hero-card__bg${bgOk ? '' : ' hero-card__bg--fallback'}`}
        style={
          bgOk
            ? { backgroundImage: `url(${heroImage.cardBg})` }
            : undefined
        }
        onError={() => setBgOk(false)}
        aria-hidden="true"
      />
      <img
        className="hero-card__img"
        src={heroImage.cutout}
        alt={heroImage.alt}
        onError={(e) => {
          e.currentTarget.style.opacity = '0';
        }}
      />
      {/* Mirrored surprise shot — revealed only on hover */}
      <img
        className="hero-card__img hero-card__img--hover"
        src={heroImage.cutoutHover}
        alt=""
        aria-hidden="true"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      <figcaption className="hero-card__caption">
        <div className="hero-card__name">{heroImage.captionName}</div>
        <div className="hero-card__role">{heroImage.captionRole}</div>
      </figcaption>
    </figure>
  );
}
