import { about } from '../../data/content.js';
import Reveal from '../Reveal.jsx';
import SectionHead from '../SectionHead.jsx';

export default function About() {
  return (
    <section className="section" id="about" aria-label="About">
      <div className="container">
        <SectionHead eyebrow="About" title="A developer who sweats the" accent="details." />
        <div className="about__grid">
          <Reveal as="p" className="about__bio">
            {about.bio}
          </Reveal>
          <Reveal as="div" className="about__stats">
            {about.stats.map((s) => (
              <div className="chip-stat glass" key={s.label}>
                <span className="chip-stat__value">{s.value}</span>
                <span className="chip-stat__label">{s.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
