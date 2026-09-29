import { useRef } from 'react';
import { profile } from '../data/content.js';
import { usePointerParallax } from '../hooks/usePointerParallax.js';
import HeroCard from './HeroCard.jsx';
import FeaturedCard from './FeaturedCard.jsx';
import FloatingBits from './FloatingBits.jsx';

export default function Hero() {
  const heroRef = useRef(null);
  usePointerParallax(heroRef);

  return (
    <section className="hero" id="top" ref={heroRef} aria-label="Intro">
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__vignette" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />
      <FloatingBits />

      <div className="container hero__grid">
        <div className="hero__left">
          <span className="status-pill glass">
            <span className="dot" aria-hidden="true" />
            {profile.status}
          </span>

          <h1 className="hero__h1">
            {profile.headline.line1}
            <span className="accent">{profile.headline.accent}</span>
          </h1>

          <p className="hero__intro">{profile.intro}</p>

          <div className="hero__cta">
            <a className="btn btn--primary" href={profile.primaryCta.href}>
              {profile.primaryCta.label}
              <span className="chip" aria-hidden="true">
                ↗
              </span>
            </a>
            <a className="btn btn--ghost" href={profile.secondaryCta.href}>
              {profile.secondaryCta.label} ↓
            </a>
          </div>
        </div>

        <div className="hero__right">
          <HeroCard />
        </div>
      </div>

      <FeaturedCard />
    </section>
  );
}
