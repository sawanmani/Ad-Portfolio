import { useEffect, useRef, useState } from 'react';
import { getDirection, dotPos } from '../utils/direction.js';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

const MOODS = ['Curious', 'Focused', 'Playful', 'Analytical', 'Dreaming'];
const DIRS = ['Up-Left', 'Up-Right', 'Down-Left', 'Down-Right', 'Center'];

// "Live Readings" glass HUD: radar dot follows cursor relative to the hero image,
// label shows the look direction, mood cycles over time.
export default function Hud() {
  const dotRef = useRef(null);
  const radarRef = useRef(null);
  const [looking, setLooking] = useState('Center');
  const [mood, setMood] = useState(MOODS[0]);
  const last = useRef({ x: 0, y: 0 });
  const reduced = useReducedMotion();

  useEffect(() => {
    // Mood cycles every 5s (unless motion reduced).
    let moodTimer;
    if (!reduced) {
      moodTimer = setInterval(() => {
        setMood((m) => MOODS[(MOODS.indexOf(m) + 1) % MOODS.length]);
      }, 5000);
    }

    const target = () => document.querySelector('.hero-card');

    // Touch / no-pointer devices: auto-cycle directions every 2s.
    const coarse = window.matchMedia('(hover: none)').matches;
    let cycleTimer;
    if (coarse) {
      let i = 0;
      cycleTimer = setInterval(() => {
        i = (i + 1) % DIRS.length;
        setLooking(DIRS[i]);
      }, 2000);
    }

    let raf = 0;
    const onMove = (e) => {
      last.current = { x: e.clientX, y: e.clientY };
      if (!raf) raf = requestAnimationFrame(render);
    };

    function render() {
      raf = 0;
      const el = target();
      const radar = radarRef.current;
      if (!el || !radar) return;
      const r = el.getBoundingClientRect();
      const dx = last.current.x - (r.left + r.width / 2);
      const dy = last.current.y - (r.top + r.height / 2);
      const dir = getDirection(el, last.current.x, last.current.y);
      setLooking((prev) => (prev === dir ? prev : dir));
      const radius = radar.clientWidth / 2 - 8;
      const p = dotPos(dx, dy, radius);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${p.x}px, ${p.y}px)`;
      }
    }

    if (!coarse && !reduced) {
      window.addEventListener('pointermove', onMove, { passive: true });
    }

    return () => {
      clearInterval(moodTimer);
      clearInterval(cycleTimer);
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <aside className="hud glass" aria-label="Live readings">
      <span className="label">Live Readings</span>
      <div className="hud__row">
        <div className="hud__radar" ref={radarRef}>
          <span className="hud__dot" ref={dotRef} />
        </div>
        <div className="hud__meta">
          <span className="label">Looking</span>
          <span className="hud__value">{looking}</span>
        </div>
      </div>
      <div className="hud__meta">
        <span className="label">Mood</span>
        <span className="hud__value">{mood}</span>
      </div>
    </aside>
  );
}
