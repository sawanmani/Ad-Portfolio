import { projects } from '../../data/content.js';
import Reveal from '../Reveal.jsx';
import SectionHead from '../SectionHead.jsx';

export default function Projects() {
  return (
    <section className="section" id="projects" aria-label="Projects">
      <div className="container">
        <SectionHead eyebrow="Projects" title="Selected" accent="work." />
        <div className="projects__grid">
          {projects.map((p, i) => (
            <Reveal key={p.title} style={{ transitionDelay: `${i * 60}ms` }}>
              <a className="pcard glass" href={p.href} target="_blank" rel="noreferrer">
                <div className="pcard__thumb">
                  <img
                    src={p.thumb}
                    alt={`${p.title} preview`}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.opacity = '0';
                    }}
                  />
                </div>
                <span className="pcard__tag">{p.tag}</span>
                <h3 className="pcard__title">{p.title}</h3>
                <p className="pcard__sub">{p.subtitle}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
