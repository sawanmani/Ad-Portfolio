import { certifications } from '../../data/content.js';
import Reveal from '../Reveal.jsx';
import SectionHead from '../SectionHead.jsx';

export default function Certifications() {
  return (
    <section className="section" id="certifications" aria-label="Certifications">
      <div className="container">
        <SectionHead eyebrow="Credentials" title="Licenses &" accent="certifications." />
        <div className="certs__grid">
          {certifications.map((c, i) => (
            <Reveal key={c.title} style={{ transitionDelay: `${i * 45}ms` }}>
              <div className="cert glass">
                <span className="cert__year">{c.year}</span>
                <div>
                  <h3 className="cert__title">{c.title}</h3>
                  <p className="cert__issuer">{c.issuer}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
