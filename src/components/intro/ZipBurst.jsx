// Golden particle burst that fires when the zipper completes.
// Creates an outward explosion of sparkles from the center.
import { useEffect, useState } from 'react';

const COUNT = 30;

function makeBurst() {
  return Array.from({ length: COUNT }, (_, i) => {
    const angle = (360 / COUNT) * i + (Math.random() * 20 - 10);
    const dist = 80 + Math.random() * 200;
    const size = 3 + Math.random() * 5;
    const dur = 0.5 + Math.random() * 0.6;
    const rad = (angle * Math.PI) / 180;
    return {
      i,
      x: Math.cos(rad) * dist,
      y: Math.sin(rad) * dist,
      size,
      dur,
    };
  });
}

export default function ZipBurst({ active }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (active) setParticles(makeBurst());
  }, [active]);

  if (!active || !particles.length) return null;

  return (
    <div className="zip-burst" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.i}
          className="zip-burst__dot"
          style={{
            '--bx': `${p.x}px`,
            '--by': `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.dur}s`,
          }}
        />
      ))}
    </div>
  );
}
