"use client";

import { motion, useReducedMotion } from "motion/react";
import { HERO, SOCIAL_LINKS } from "@/data/content";
import { MOTION } from "@/styles/tokens";
import { OperatorArtefact } from "./OperatorArtefact";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const entrance = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section id="top" className="hero-section" aria-labelledby="hero-heading">
      <div className="container">
        <div className="hero-grid">
          <motion.div
            className="hero-copy"
            {...entrance}
            transition={{
              duration: MOTION.duration.slow,
              ease: MOTION.ease.emphasized,
            }}
          >
            <h1 id="hero-heading" className="hero-headline">
              {HERO.headline}
            </h1>
            <p className="hero-subline">{HERO.subline}</p>
          </motion.div>

          <motion.div
            className="hero-artefact-wrap"
            {...entrance}
            transition={{
              duration: MOTION.duration.slow,
              delay: prefersReducedMotion ? 0 : 0.08,
              ease: MOTION.ease.emphasized,
            }}
          >
            <OperatorArtefact />
          </motion.div>

          <motion.div
            className="hero-actions"
            {...entrance}
            transition={{
              duration: MOTION.duration.slow,
              delay: prefersReducedMotion ? 0 : 0.14,
              ease: MOTION.ease.emphasized,
            }}
          >
            <motion.a
              href={HERO.primaryCta.href}
              className="cta-primary"
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              {HERO.primaryCta.label}
            </motion.a>

            <div className="hero-secondary-links" aria-label="Direct links">
              <a
                href={SOCIAL_LINKS.linkedin.href}
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                {SOCIAL_LINKS.linkedin.label}
              </a>
              <a
                href={SOCIAL_LINKS.github.href}
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                {SOCIAL_LINKS.github.label}
              </a>
              <a href={SOCIAL_LINKS.email.href} className="text-link">
                {SOCIAL_LINKS.email.label}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
