import { motion, useReducedMotion } from 'motion/react';
import { certifications, credentialsLink } from '../../data/content.js';
import SectionHead from '../SectionHead.jsx';
import { ExternalLink } from '../ui/Icons.jsx';

// Lightweight reveal that does NOT use filter/blur — filter on an ancestor
// flattens the 3D rendering context and breaks backface-visibility on flip cards.
function CertReveal({ children, delay = 0, ...rest }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      style={{ willChange: 'auto' }}
      initial={reduced ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: 0.6, delay: reduced ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// 3D flip cards: front = credential, back = issuer + verify link.
// Hover/focus flips; linked cards flip and stay flippable via the inner button-less
// anchor, non-linked cards flip on hover to reveal the issuer line.
export default function Certifications() {
  return (
    <section className="section" id="certifications" aria-label="Certifications and badges">
      <div className="container">
        <SectionHead eyebrow="Credentials" title="Licenses &" accent="certifications." />
        <div className="certs__grid">
          {certifications.map((c, i) => {
            const linked = c.link && c.link !== '#';
            return (
              <CertReveal key={c.title} delay={(i % 4) * 0.07} className="flip-cell">
                <div className="flip">
                {/* .flip__inner must NOT have .glass (backdrop-filter forces
                    preserve-3d → flat, breaking backface-visibility). */}
                <div className="flip__inner">
                  <div className="flip__face flip__front">
                    <span className="cert__year">{c.year}</span>
                    <h3 className="cert__title">{c.title}</h3>
                  </div>
                  <div className="flip__face flip__back">
                    <p className="cert__issuer">{c.issuer}</p>
                    {linked ? (
                      <a
                        className="cert__verify"
                        href={c.link}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Verify ${c.title}`}
                      >
                        Verify <ExternalLink size={13} />
                      </a>
                    ) : (
                      <span className="label">Issued &amp; verified</span>
                    )}
                  </div>
                </div>
                </div>
              </CertReveal>
            );
          })}
        </div>
        <p className="certs__more">
          <a href={credentialsLink.href} target="_blank" rel="noreferrer">
            {credentialsLink.label}
          </a>
        </p>
      </div>
    </section>
  );
}
