import { footer } from '../../data/content.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="label">{footer.note}</span>
        <a className="label" href="#top" style={{ color: 'var(--accent)' }}>
          {footer.backToTop}
        </a>
      </div>
    </footer>
  );
}
