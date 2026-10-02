// Floating golden sparkle particles around the zipper area.
// Each particle has randomized position, size, speed and delay.
const PARTICLES = 18;

export default function ZipSparkles() {
  const sparkles = Array.from({ length: PARTICLES }, (_, i) => {
    const left = 40 + Math.random() * 20;         // cluster near center
    const top = 10 + Math.random() * 80;           // spread vertically
    const size = 2 + Math.random() * 4;            // 2-6px
    const dur = 4 + Math.random() * 6;             // 4-10s
    const delay = Math.random() * 5;               // stagger up to 5s
    return { left, top, size, dur, delay, i };
  });

  return (
    <div className="zipintro__sparkles" aria-hidden="true">
      {sparkles.map((s) => (
        <span
          key={s.i}
          className="sparkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            '--dur-s': `${s.dur}s`,
            '--delay-s': `${s.delay}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
