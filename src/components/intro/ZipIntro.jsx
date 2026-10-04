import { useEffect, useRef, useState } from 'react';
import {
  motion,
  animate,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from 'motion/react';
import ZipCharacter from './ZipCharacter.jsx';
import ZipTeeth from './ZipTeeth.jsx';
import ZipSparkles from './ZipSparkles.jsx';
import ZipProgress from './ZipProgress.jsx';
import ZipBurst from './ZipBurst.jsx';
import { grunt, zipTick, tada } from './zipSound.js';
import { heroImage } from '../../data/content.js';

const MAX_HALF = 24;

export default function ZipIntro({ onDone }) {
  const reduced = useReducedMotion();
  const [straining, setStraining] = useState(false);
  const [fading, setFading] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [flashing, setFlashing] = useState(false);
  const [bursting, setBursting] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const doneRef = useRef(false);

  const pv = useMotionValue(0);
  const p = useSpring(pv, { stiffness: 140, damping: 22, mass: 0.5 });

  const sy = useTransform(p, (v) => v * 100);
  const leftTop = useTransform(p, (v) => 50 - MAX_HALF * v);
  const rightTop = useTransform(p, (v) => 50 + MAX_HALF * v);
  const leftClip = useMotionTemplate`polygon(0% 0%, ${leftTop}% 0%, 50% ${sy}%, 50% 100%, 0% 100%)`;
  const rightClip = useMotionTemplate`polygon(100% 0%, ${rightTop}% 0%, 50% ${sy}%, 50% 100%, 100% 100%)`;
  const teethTop = useTransform(p, (v) => `${v * 100}%`);
  const teethH = useTransform(p, (v) => `${100 - v * 100}%`);
  const sliderTop = useTransform(p, (v) => `${v * 100}%`);
  const hintTop = useTransform(p, (v) => `calc(${v * 100}% + 220px)`);

  // Hero portrait — same character as the portfolio hero card (calm shot at
  // rest, surprise shot pops in un-mirrored), but driven by unzip progress
  // instead of hover: crossfade + scale(1→1.16) + rise(-12%) as p grows.
  const heroCalmFade = useTransform(p, [0.08, 0.55], [1, 0]);
  const heroPopFade = useTransform(p, [0.15, 0.7], [0, 1]);
  const heroPopScale = useTransform(p, [0.15, 1], [1, 1.16]);
  const heroPopRise = useTransform(p, [0.15, 1], [0, -12]);
  const heroPopTf = useMotionTemplate`translateY(calc(-50% + ${heroPopRise}%)) scale(${heroPopScale})`;

  // Open-V tape edges
  const edge = (v) => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const h = typeof window !== 'undefined' ? window.innerHeight : 800;
    const halfTop = (MAX_HALF / 100) * v * w;
    const syPx = v * h;
    return {
      cx: w / 2, halfTop,
      len: Math.hypot(halfTop, syPx),
      deg: syPx ? (Math.atan2(halfTop, syPx) * 180) / Math.PI : 0,
    };
  };
  const tLeftX = useTransform(p, (v) => edge(v).cx - edge(v).halfTop);
  const tRightX = useTransform(p, (v) => edge(v).cx + edge(v).halfTop);
  const tLen = useTransform(p, (v) => Math.max(0, edge(v).len));
  // CSS rotate() is clockwise, so a POSITIVE angle swings the strip's bottom
  // LEFT. The left tape's bottom must converge right onto the slider → -deg;
  // right tape mirrors it → +deg. (Swapped signs: was diverging from slider.)
  const rotL = useTransform(p, (v) => -edge(v).deg);
  const rotR = useTransform(p, (v) => edge(v).deg);
  const tfL = useMotionTemplate`translateX(-50%) rotate(${rotL}deg)`;
  const tfR = useMotionTemplate`translateX(-50%) rotate(${rotR}deg)`;

  // Teeth ticks + grand reveal
  const lastTick = useRef(0);
  useEffect(() => {
    return p.on('change', (v) => {
      if (v - lastTick.current > 0.035) {
        lastTick.current = v;
        if (v > 0.01 && v < 0.99) zipTick();
      }
      if (v >= 0.995 && !doneRef.current) {
        doneRef.current = true;
        tada();
        setStraining(false);
        setRevealing(true);
        setFlashing(true);
        setBursting(true);
        setTimeout(() => setFading(true), 400);
        setTimeout(onDone, 900);
      }
    });
  }, [p, onDone]);

  const finish = () => {
    if (doneRef.current) return;
    setStraining(true);
    setInteracting(true);
    animate(pv, 1, { duration: 1.1, ease: [0.3, 0.7, 0.2, 1] });
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') finish(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Drag handling
  const drag = useRef(null);
  const onDown = (e) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    drag.current = { startY: e.clientY, startP: pv.get(), moved: 0 };
    setStraining(true);
    setInteracting(true);
    grunt();
  };
  const onMove = (e) => {
    if (!drag.current) return;
    const h = window.innerHeight || 1;
    const d = (e.clientY - drag.current.startY) / h;
    drag.current.moved = Math.max(drag.current.moved, Math.abs(d));
    pv.set(Math.min(1, Math.max(0, drag.current.startP + d * 1.4)));
  };
  const onUp = () => {
    if (!drag.current) return;
    const wasClick = drag.current.moved < 0.02;
    drag.current = null;
    if (wasClick) finish();
    else if (pv.get() > 0.55) finish();
    else setStraining(false);
  };

  // Dynamic blur value kept for API compatibility, but no longer applied:
  // a fullscreen animated backdrop-filter re-reads + re-blurs the whole
  // viewport every frame and was the main source of lag on Vercel. The panels
  // under it are opaque, so it was visually redundant anyway.
  const blurValue = useTransform(p, (v) => `blur(${20 - v * 20}px)`);
  void blurValue;

  if (reduced) {
    return (
      <div className="zipintro zipintro--static">
        <button className="btn btn--primary" onClick={onDone}>
          Enter portfolio
        </button>
      </div>
    );
  }

  const cls = ['zipintro', fading && 'is-fading', revealing && 'is-revealing',
    interacting && 'is-interacting'].filter(Boolean).join(' ');

  return (
    <motion.div className={cls} initial={{ opacity: 1 }}
      animate={{ opacity: fading ? 0 : 1 }} transition={{ duration: 0.65 }}
      aria-label="Intro — unzip to enter"
    >
      <div className="zipintro__light-leak" aria-hidden="true" />
      <ZipSparkles />
      <ZipBurst active={bursting} />
      <div className={`zipintro__flash${flashing ? ' is-active' : ''}`} aria-hidden="true" />

      {/* Panels */}
      <motion.div className="zipintro__panel zipintro__panel--l" style={{ clipPath: leftClip }}>
        <motion.img
          src={heroImage.cutout}
          alt={heroImage.alt}
          className="zipintro__hero-img zipintro__hero-img--calm"
          decoding="async"
          style={{ opacity: heroCalmFade }}
        />
        <motion.img
          src={heroImage.cutoutHover}
          alt=""
          aria-hidden="true"
          className="zipintro__hero-img zipintro__hero-img--pop"
          decoding="async"
          style={{ opacity: heroPopFade, transform: heroPopTf }}
        />
      </motion.div>
      <motion.div className="zipintro__panel zipintro__panel--r" style={{ clipPath: rightClip }}>
        <div className="zipintro__text-block">
          {straining ? (
             <span className="zipintro__strain-text">UNLEASHING...</span>
          ) : (
             <>
               <span className="zipintro__text-line1">Welcome</span>
               <span className="zipintro__text-line2">TO MY TERRITORY</span>
             </>
          )}
        </div>
      </motion.div>

      {/* Tape edges */}
      <motion.div className="zip-open-tape zip-open-tape--l"
        style={{ left: tLeftX, height: tLen, transform: tfL }} aria-hidden="true" />
      <motion.div className="zip-open-tape zip-open-tape--r"
        style={{ left: tRightX, height: tLen, transform: tfR }} aria-hidden="true" />

      {/* Teeth */}
      <motion.div className="zip-teeth" style={{ top: teethTop, height: teethH }} aria-hidden="true">
        <ZipTeeth />
      </motion.div>

      {/* Drag hint */}
      {!interacting && (
        <motion.div className="zipintro__hint" style={{ top: hintTop }}>
          <span className="zipintro__hint-text">Drag to unzip</span>
          <span className="zipintro__hint-arrow" aria-hidden="true" />
        </motion.div>
      )}

      {/* Slider + character */}
      <motion.div className="zip-pull" style={{ top: sliderTop }}
        onPointerDown={onDown} onPointerMove={onMove}
        onPointerUp={onUp} onPointerCancel={onUp}
        role="button" tabIndex={0}
        aria-label="Unzip — drag down or press Enter"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') finish(); }}
      >
        <ZipProgress progress={p} />
        <div className="zip-slider" aria-hidden="true" />
        <ZipCharacter straining={straining} />
      </motion.div>

      <button className="zipintro__skip" onClick={finish}>
        Skip <span className="zipintro__skip-key">Esc</span>
      </button>
    </motion.div>
  );
}
