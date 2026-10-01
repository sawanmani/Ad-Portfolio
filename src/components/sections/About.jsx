import { about } from '../../data/content.js';
import Reveal from '../Reveal.jsx';
import SectionHead from '../SectionHead.jsx';
import TiltCard from '../ui/TiltCard.jsx';
import CountUp from '../ui/CountUp.jsx';

// Split e.g. "100+" -> { num: 100, suffix: '+' }, "9.0" -> { num: 9.0, suffix: '' }
function parseValue(v) {
  const m = String(v).match(/^([\d.]+)(.*)$/);
  if (!m) return null;
  const num = parseFloat(m[1]);
  const decimals = (m[1].split('.')[1] || '').length;
  return { num, decimals, suffix: m[2] };
}

export default function About() {
  return (
    <section className="section" id="about" aria-label="About">
      <div className="container">
        <SectionHead eyebrow="About" title="A developer who sweats the" accent="details." />
        <div className="about__grid">
          <Reveal as="p" className="about__bio">
            {about.bio}
          </Reveal>
          <div className="about__stats">
            {about.stats.map((s, i) => {
              const parsed = parseValue(s.value);
              return (
                <Reveal key={s.label} delay={i * 0.1}>
                  <TiltCard max={10} scale={1.03} glare={false} perspective={700}>
                    <div className="chip-stat glass grad-border">
                      <span className="chip-stat__value tilt__pop">
                        {parsed ? (
                          <CountUp
                            to={parsed.num}
                            decimals={parsed.decimals}
                            suffix={parsed.suffix}
                          />
                        ) : (
                          s.value
                        )}
                      </span>
                      <span className="chip-stat__label">{s.label}</span>
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
