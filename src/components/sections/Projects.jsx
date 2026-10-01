import { projects } from '../../data/content.js';
import Reveal from '../Reveal.jsx';
import SectionHead from '../SectionHead.jsx';
import TiltCard from '../ui/TiltCard.jsx';
import { ArrowUpRight } from '../ui/Icons.jsx';

export default function Projects() {
  return (
    <section className="section" id="projects" aria-label="Projects">
      <div className="container">
        <SectionHead eyebrow="Projects" title="Selected" accent="work." />
        <div className="projects__grid">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="pcard-cell">
              <TiltCard max={8} scale={1.02} glare>
                <a
                  className="pcard glass grad-border"
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="pcard__thumb tilt__pop">
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
                  <h3 className="pcard__title">
                    {p.title}
                    <ArrowUpRight size={16} className="pcard__go" />
                  </h3>
                  <p className="pcard__sub">{p.subtitle}</p>
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
