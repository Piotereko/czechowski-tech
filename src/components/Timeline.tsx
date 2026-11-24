"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { TIMELINE, type TimelineEntry } from "@/data/content";
import { MOTION } from "@/styles/tokens";

function isExpandableEntry(entry: TimelineEntry): boolean {
  return Boolean(
    (entry.bullets && entry.bullets.length > 0) ||
      (entry.links && entry.links.length > 0)
  );
}

export function Timeline() {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set());
  const prefersReducedMotion = useReducedMotion();

  const toggleEntry = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section
      id="timeline"
      className="page-section"
      aria-labelledby="timeline-heading"
    >
      <div className="container">
        <div className="section-header">
          <h2 id="timeline-heading" className="section-title">
            Timeline
          </h2>
        </div>

        <ol className="timeline-list">
          {TIMELINE.map((entry) => {
            const expandable = isExpandableEntry(entry);
            const isOpen = openIds.has(entry.id);
            const buttonId = `timeline-trigger-${entry.id}`;
            const panelId = `timeline-panel-${entry.id}`;

            if (!expandable) {
              return (
                <li key={entry.id} className="timeline-item">
                  <div className="timeline-row timeline-row--static">
                    <span className="timeline-period">{entry.period}</span>
                    <div className="timeline-main">
                      <span className="timeline-title">{entry.title}</span>
                      <span className="timeline-summary">{entry.summary}</span>
                    </div>
                  </div>
                </li>
              );
            }

            return (
              <li
                key={entry.id}
                className="timeline-item"
                data-expanded={isOpen ? "true" : "false"}
              >
                <button
                  type="button"
                  id={buttonId}
                  className="timeline-row timeline-trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleEntry(entry.id)}
                >
                  <span className="timeline-period">{entry.period}</span>
                  <span className="timeline-main">
                    <span className="timeline-title">{entry.title}</span>
                    <span className="timeline-summary">{entry.summary}</span>
                  </span>
                  <span className="timeline-chevron" aria-hidden="true">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      focusable="false"
                    >
                      <path
                        d="M4 6l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                <div id={panelId} className="timeline-panel-host">
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        className="timeline-panel"
                        initial={
                          prefersReducedMotion
                            ? { opacity: 1, height: "auto" }
                            : { opacity: 0, height: 0 }
                        }
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{
                          duration: prefersReducedMotion
                            ? 0
                            : MOTION.duration.base,
                          ease: MOTION.ease.standard,
                        }}
                      >
                        <div className="timeline-panel-inner">
                          {entry.bullets && entry.bullets.length > 0 && (
                            <ul className="timeline-bullets">
                              {entry.bullets.map((bullet, idx) => (
                                <li key={idx}>{bullet}</li>
                              ))}
                            </ul>
                          )}
                          {entry.links && entry.links.length > 0 && (
                            <div className="timeline-links">
                              {entry.links.map((link) => (
                                <a
                                  key={link.href}
                                  href={link.href}
                                  className="text-link"
                                  {...(link.external
                                    ? { target: "_blank", rel: "noreferrer" }
                                    : {})}
                                >
                                  {link.label}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
