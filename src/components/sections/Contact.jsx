import { contact, socials } from '../../data/content.js';
import Reveal from '../Reveal.jsx';
import SectionHead from '../SectionHead.jsx';
import MagneticButton from '../ui/MagneticButton.jsx';
import { Mail, Github, Linkedin, ArrowUpRight } from '../ui/Icons.jsx';

const SOCIALS = [
  { label: 'Email', href: socials.email, Icon: Mail },
  { label: 'GitHub', href: socials.github, Icon: Github },
  { label: 'LinkedIn', href: socials.linkedin, Icon: Linkedin },
];

export default function Contact() {
  return (
    <section className="section" id="contact" aria-label="Contact">
      <div className="container">
        <SectionHead eyebrow="Contact" title="Let's build something" accent="together." />
        <Reveal as="div" className="contact__box">
          <p className="about__bio">{contact.sub}</p>
          <MagneticButton
            className="btn btn--primary"
            href={socials.email}
            strength={0.3}
          >
            {contact.emailLabel}
            <ArrowUpRight />
          </MagneticButton>
          <ul className="contact__links">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <MagneticButton
                  className="btn btn--ghost contact__icon"
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  strength={0.5}
                  aria-label={label}
                >
                  <Icon />
                  {label}
                </MagneticButton>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
