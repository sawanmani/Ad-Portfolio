import { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { profile } from '../data/content.js';
import { usePointerParallax } from '../hooks/usePointerParallax.js';
import HeroCard from './HeroCard.jsx';
import FeaturedCard from './FeaturedCard.jsx';
import FloatingBits from './FloatingBits.jsx';
import MagneticButton from './ui/MagneticButton.jsx';
import { ArrowUpRight, ArrowDown } from './ui/Icons.jsx';

export default function Hero() {
  const heroRef = useRef(null);
  usePointerParallax(heroRef);
  const reduced = useReducedMotion();

  const words = profile.headline.line1.split(' ');
  const rise = (d) => ({
    initial: reduced ? false : { opacity: 0, y: 26, filter: 'blur(6px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: reduced
      ? { duration: 0 }
      : { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="hero" id="top" ref={heroRef} aria-label="Intro">
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__vignette" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />
      <FloatingBits />

      <div className="container hero__grid">
        <div className="hero__left">
          <motion.span className="status-pill glass" {...rise(0.1)}>
            <span className="dot" aria-hidden="true" />
            {profile.status}
          </motion.span>

          <h1 className="hero__h1">
            {words.map((w, i) => (
              <span className="hero__word-wrap" key={i}>
                <motion.span className="hero__word" {...rise(0.2 + i * 0.08)}>
                  {w}
                </motion.span>
              </span>
            ))}
            <motion.span className="accent" {...rise(0.2 + words.length * 0.08)}>
              {profile.headline.accent}
            </motion.span>
          </h1>

          <motion.p className="hero__intro" {...rise(0.55)}>
            {profile.intro}
          </motion.p>

          <motion.div className="hero__cta" {...rise(0.7)}>
            <MagneticButton className="btn btn--primary" href={profile.primaryCta.href}>
              {profile.primaryCta.label}
              <ArrowUpRight />
            </MagneticButton>
            <MagneticButton className="btn btn--ghost" href={profile.secondaryCta.href}>
              {profile.secondaryCta.label}
              <ArrowDown />
            </MagneticButton>
          </motion.div>

          {/* in-flow so it can never overlap the headline/CTAs */}
          <motion.div {...rise(0.85)}>
            <FeaturedCard />
          </motion.div>
        </div>

        <div className="hero__right">
          <HeroCard />
        </div>
      </div>
    </section>
  );
}
