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
import { grunt, zipTick, tada } from './zipSound.js';

const MAX_HALF = 24; // % each side the opened wedge reaches at the top

export default function ZipIntro({ onDone }) {
  const reduced = useReducedMotion();
  const [straining, setStraining] = useState(false);
  const [fading, setFading] = useState(false);
  const doneRef = useRef(false);

  const pv = useMotionValue(0); // raw progress 0..1
  const p = useSpring(pv, { stiffness: 140, damping: 22, mass: 0.5 });

  const sy = useTransform(p, (v) => v * 100); // slider Y (%)
  const leftTop = useTransform(p, (v) => 50 - MAX_HALF * v);
  const rightTop = useTransform(p, (v) => 50 + MAX_HALF * v);
  const leftClip = useMotionTemplate`polygon(0% 0%, ${leftTop}% 0%, 50% ${sy}%, 50% 100%, 0% 100%)`;
  const rightClip = useMotionTemplate`polygon(100% 0%, ${rightTop}% 0%, 50% ${sy}%, 50% 100%, 100% 100%)`;
  const teethTop = useTransform(p, (v) => `${v * 100}%`);
  const teethH = useTransform(p, (v) => `${100 - v * 100}%`);
  const sliderTop = useTransform(p, (v) => `${v * 100}%`);

  // Open-V tape edges: position + rotate a strip from the top point down to the slider.
  const edge = (v) => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const h = typeof window !== 'undefined' ? window.innerHeight : 800;
    const halfTop = (MAX_HALF / 100) * v * w;
    const syPx = v * h;
    return { cx: w / 2, halfTop, len: Math.hypot(halfTop, syPx), deg: syPx ? (Math.atan2(halfTop, syPx) * 180) / Math.PI : 0 };
  };
  const tLeftX = useTransform(p, (v) => edge(v).cx - edge(v).halfTop);
  const tRightX = useTransform(p, (v) => edge(v).cx + edge(v).halfTop);
  const tLen = useTransform(p, (v) => Math.max(0, edge(v).len));
  const rotL = useTransform(p, (v) => edge(v).deg);
  const rotR = useTransform(p, (v) => -edge(v).deg);
  const tfL = useMotionTemplate`translateX(-50%) rotate(${rotL}deg)`;
  const tfR = useMotionTemplate`translateX(-50%) rotate(${rotR}deg)`;

  // play teeth ticks as progress increases; finish at the end
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
        setFading(true);
        setTimeout(onDone, 700);
      }
    });
  }, [p, onDone]);

  const finish = () => {
    if (doneRef.current) return;
    setStraining(true);
    animate(pv, 1, { duration: 1.1, ease: [0.3, 0.7, 0.2, 1] });
  };

  // drag handling
  const drag = useRef(null);
  const onDown = (e) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    drag.current = { startY: e.clientY, startP: pv.get(), moved: 0 };
    setStraining(true);
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

  if (reduced) {
    return (
      <div className="zipintro zipintro--static">
        <button className="btn btn--primary" onClick={onDone}>
          Enter portfolio
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className={`zipintro${fading ? ' is-fading' : ''}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 0.65 }}
      aria-label="Intro — unzip to enter"
    >
      {/* the two curtain panels that part as the zip opens; each carries a word */}
      <motion.div className="zipintro__panel zipintro__panel--l" style={{ clipPath: leftClip }}>
        <span className="zipintro__word">{straining ? 'AREY' : 'Bhai khol'}</span>
      </motion.div>
      <motion.div className="zipintro__panel zipintro__panel--r" style={{ clipPath: rightClip }}>
        <span className="zipintro__word">{straining ? 'BHEEEEDDD!!!' : 'de na 🥺'}</span>
      </motion.div>

      {/* open-V fabric tape edges */}
      <motion.div className="zip-open-tape zip-open-tape--l" style={{ left: tLeftX, height: tLen, transform: tfL }} aria-hidden="true" />
      <motion.div className="zip-open-tape zip-open-tape--r" style={{ left: tRightX, height: tLen, transform: tfR }} aria-hidden="true" />

      {/* closed metal teeth below the slider */}
      <motion.div className="zip-teeth" style={{ top: teethTop, height: teethH }} aria-hidden="true">
        <ZipTeeth />
      </motion.div>

      {/* slider + character, draggable */}
      <motion.div
        className="zip-pull"
        style={{ top: sliderTop }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        role="button"
        tabIndex={0}
        aria-label="Unzip — drag down or press Enter"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') finish();
        }}
      >
        <div className="zip-slider" aria-hidden="true" />
        <ZipCharacter straining={straining} />
      </motion.div>

      <button className="zipintro__skip" onClick={finish}>
        Skip
      </button>
    </motion.div>
  );
}
