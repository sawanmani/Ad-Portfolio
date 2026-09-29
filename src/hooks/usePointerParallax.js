import { useEffect } from 'react';
import { useReducedMotion } from './useReducedMotion.js';

// Smoothly tracks the pointer and writes eased CSS variables onto `ref`:
//   --mx / --my : -1..1 offset from element centre (for parallax layers)
//   --gx / --gy : pointer position in px within the element (for the glow)
// A single rAF loop with linear interpolation gives the "premium" trailing feel.
export function usePointerParallax(ref) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (window.matchMedia('(hover: none)').matches) return; // touch: skip

    const target = { x: 0.5, y: 0.5 }; // normalised pointer within element
    const eased = { ...target };
    let raf = 0;
    let running = false;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = (e.clientY - r.top) / r.height;
      el.classList.add('is-pointing');
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    const loop = () => {
      // lerp toward target
      eased.x += (target.x - eased.x) * 0.09;
      eased.y += (target.y - eased.y) * 0.09;

      const mx = Math.max(-1, Math.min(1, (eased.x - 0.5) * 2));
      const my = Math.max(-1, Math.min(1, (eased.y - 0.5) * 2));
      el.style.setProperty('--mx', mx.toFixed(4));
      el.style.setProperty('--my', my.toFixed(4));
      el.style.setProperty('--gx', `${(eased.x * 100).toFixed(2)}%`);
      el.style.setProperty('--gy', `${(eased.y * 100).toFixed(2)}%`);

      const settled =
        Math.abs(target.x - eased.x) < 0.001 &&
        Math.abs(target.y - eased.y) < 0.001;
      if (settled || document.hidden) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const reset = () => {
      el.classList.remove('is-pointing');
      target.x = 0.5;
      target.y = 0.5;
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    const onLeave = () => reset();
    // If the pointer leaves the window entirely, still fade the glow out.
    const onWinOut = (e) => {
      if (!e.relatedTarget) reset();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);
    window.addEventListener('blur', reset);
    document.addEventListener('pointerout', onWinOut);
    return () => {
      window.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('blur', reset);
      document.removeEventListener('pointerout', onWinOut);
      cancelAnimationFrame(raf);
    };
  }, [ref, reduced]);
}
