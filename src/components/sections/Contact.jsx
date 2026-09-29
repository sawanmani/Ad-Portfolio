import { contact, socials } from '../../data/content.js';
import Reveal from '../Reveal.jsx';
import SectionHead from '../SectionHead.jsx';

const LINKS = [
  { label: 'Email', href: socials.email },
  { label: 'GitHub', href: socials.github },
  { label: 'LinkedIn', href: socials.linkedin },
];

export default function Contact() {
  return (
    <section className="section" id="contact" aria-label="Contact">
      <div className="container">
        <SectionHead eyebrow="Contact" title="Let's build something" accent="together." />
        <Reveal as="div" className="contact__box">
          <p className="about__bio">{contact.sub}</p>
          <a className="btn btn--primary" href={socials.email}>
            {contact.emailLabel}
            <span className="chip" aria-hidden="true">
              ↗
            </span>
          </a>
          <ul className="contact__links">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  className="btn btn--ghost"
                  href={l.href}
                  target={l.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
