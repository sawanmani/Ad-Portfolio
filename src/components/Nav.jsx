import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { nav as links, profile } from '../data/content.js';
import { useActiveSection } from '../hooks/useActiveSection.js';
import MagneticButton from './ui/MagneticButton.jsx';
import { ArrowUpRight } from './ui/Icons.jsx';

const SECTION_IDS = links.map((l) => l.href.replace('#', ''));

export default function Nav() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const btnRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const onClickAway = (e) => {
      if (!e.target.closest('.nav')) setOpen(false);
    };
    document.addEventListener('keydown', onEsc);
    document.addEventListener('pointerdown', onClickAway);
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.removeEventListener('pointerdown', onClickAway);
    };
  }, [open]);

  return (
    <nav className="nav glass" aria-label="Primary">
      <a className="nav__brand" href="#" aria-label="Adarsh Mani Tripathi — home">
        <svg
          className="nav__logo"
          viewBox="0 0 40 40"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <linearGradient id="av-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="var(--accent)" />
              <stop offset="1" stopColor="var(--bg-2)" />
            </linearGradient>
          </defs>
          {/* Avengers-style "A": bold arch legs with an upward arrow in the counter */}
          <path d="M20 3 L36 37 H29.6 L20 18.4 L10.4 37 H4 Z" fill="url(#av-grad)" />
          <path d="M20 11 l6.2 9.2 h-3.4 v6.4 h-5.6 v-6.4 h-3.4 Z" fill="var(--bg-0)" />
        </svg>
        {profile.wordmark}
      </a>

      <button
        ref={btnRef}
        className="nav__toggle"
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen((o) => !o)}
      >
        <svg width="22" height="22" viewBox="0 0 22 22">
          {open ? (
            <path
              d="M4 4l14 14M18 4L4 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M3 7h16M3 12h16M3 17h10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      <ul
        id="nav-links"
        ref={listRef}
        className={`nav__links${open ? ' is-open' : ''}`}
      >
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className={`nav__link${
                active === l.href.slice(1) ? ' is-active' : ''
              }`}
              onClick={() => setOpen(false)}
            >
              {active === l.href.slice(1) && (
                <motion.span
                  className="nav__pill"
                  layoutId="nav-pill"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  aria-hidden="true"
                />
              )}
              <span className="nav__link-text">{l.label}</span>
            </a>
          </li>
        ))}
        <li className="nav__mobile-cta">
          <a
            className="btn btn--primary"
            href={profile.primaryCta.href}
            onClick={() => setOpen(false)}
          >
            {profile.primaryCta.label} ↗
          </a>
        </li>
      </ul>

      <MagneticButton
        href={profile.primaryCta.href}
        className="nav__cta"
        strength={0.5}
      >
        {profile.primaryCta.label}
        <ArrowUpRight size={15} />
      </MagneticButton>
    </nav>
  );
}
