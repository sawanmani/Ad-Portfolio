import { skills } from '../../data/content.js';
import Reveal from '../Reveal.jsx';
import SectionHead from '../SectionHead.jsx';

function Track() {
  return (
    <div className="marquee__track">
      {skills.marquee.map((s) => (
        <span className="tag glass" key={s}>
          {s}
        </span>
      ))}
    </div>
  );
}

export default function Skills() {
  return (
    <section className="section" id="skills" aria-label="Skills">
      <div className="container">
        <SectionHead eyebrow="Skills" title="Tools I reach for" accent="daily." />
      </div>
      <Reveal as="div" className="marquee" aria-hidden="true">
        <Track />
        <Track />
      </Reveal>
      {/* accessible, non-animated list for screen readers */}
      <ul className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
        {skills.marquee.map((s) => (
          <li key={s} className="label">
            {s}
          </li>
        ))}
      </ul>
    </section>
  );
}
