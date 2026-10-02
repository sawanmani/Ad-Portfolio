import { skills } from '../../data/content.js';
import Reveal from '../Reveal.jsx';
import SectionHead from '../SectionHead.jsx';
import TiltCard from '../ui/TiltCard.jsx';

// Tools grouped into category cards — each card's accent colour comes from its
// `kind` (same colour language as the timeline dots). Same tile character as
// projects/stats: 3D pointer tilt + glare + animated gradient-border on hover.
export default function Skills() {
  return (
    <section className="section" id="skills" aria-label="Skills">
      <div className="container">
        <SectionHead eyebrow="Skills" title="Tools I reach for" accent="daily." />

        <div className="skills__grid">
          {skills.categories.map((cat, i) => (
            <Reveal key={cat.kind} delay={i * 0.08} className="skills__cell">
              <TiltCard max={8} scale={1.02} glare className="skills__tilt">
                <article className={`skillcat glass grad-border skillcat--${cat.kind}`}>
                  <header className="skillcat__head">
                    <span className="skillcat__dot" aria-hidden="true" />
                    <h3 className="skillcat__label">{cat.label}</h3>
                    <span className="skillcat__count">{cat.items.length}</span>
                  </header>
                  <ul className="skillcat__tags">
                    {cat.items.map((s) => (
                      <li key={s} className="tag glass tag--sm">
                        {s}
                      </li>
                    ))}
                  </ul>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
