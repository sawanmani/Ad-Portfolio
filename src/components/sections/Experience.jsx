import { timeline } from '../../data/content.js';
import Reveal from '../Reveal.jsx';
import SectionHead from '../SectionHead.jsx';

const KIND_LABEL = { work: 'Role', edu: 'Education', award: 'Award', project: 'Project' };

export default function Experience() {
  return (
    <section className="section" id="experience" aria-label="Experience, education and achievements">
      <div className="container">
        <SectionHead eyebrow="Journey" title="Milestones, wins &" accent="learning." />
        <div className="timeline">
          {[...timeline]
            .sort((a, b) => (a.start ?? 0) - (b.start ?? 0))
            .map((t) => (
            <Reveal
              as="div"
              className={`timeline__item timeline__item--${t.kind}`}
              key={t.title}
            >
              <div className="timeline__when">
                <span className="label">{t.period}</span>
                <span className="timeline__kind">{KIND_LABEL[t.kind] || t.kind}</span>
              </div>
              <div>
                <h3 style={{ marginBottom: '0.25rem' }}>{t.title}</h3>
                <span className="label" style={{ color: 'var(--accent)' }}>
                  {t.org}
                </span>
                <p style={{ color: 'var(--muted)', marginTop: '0.5rem' }}>{t.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
