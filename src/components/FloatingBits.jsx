// Decorative floating yellow shapes drifting across the hero.
const BITS = [
  { glyph: '✦', top: '18%', left: '12%', delay: '0s', size: '20px' },
  { glyph: '☾', top: '70%', left: '8%', delay: '2.5s', size: '26px' },
  { glyph: '✧', top: '28%', left: '52%', delay: '4s', size: '16px' },
  { glyph: '★', top: '80%', left: '46%', delay: '1.5s', size: '18px' },
];

export default function FloatingBits() {
  return (
    <div className="bits" aria-hidden="true">
      {BITS.map((b, i) => (
        <span
          key={i}
          className="bit"
          style={{
            top: b.top,
            left: b.left,
            fontSize: b.size,
            animationDelay: b.delay,
          }}
        >
          {b.glyph}
        </span>
      ))}
    </div>
  );
}
