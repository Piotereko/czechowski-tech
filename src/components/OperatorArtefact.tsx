"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { MOTION } from "@/styles/tokens";

type DeltaPhase = "synced" | "drift" | "reconcile";

export function OperatorArtefact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<DeltaPhase>("synced");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const depthShiftY = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  useEffect(() => {
    if (prefersReducedMotion || !isInView) {
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const runCycle = () => {
      if (cancelled) return;
      setPhase("synced");

      timers.push(
        setTimeout(() => {
          if (!cancelled) setPhase("drift");
        }, 2400)
      );

      timers.push(
        setTimeout(() => {
          if (!cancelled) setPhase("reconcile");
        }, 4200)
      );

      timers.push(
        setTimeout(() => {
          if (!cancelled) runCycle();
        }, 6800)
      );
    };

    runCycle();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [isInView, prefersReducedMotion]);

  const effectivePhase: DeltaPhase = prefersReducedMotion ? "drift" : phase;
  const isDrift = effectivePhase === "drift";
  const isPulseActive =
    effectivePhase === "drift" || effectivePhase === "reconcile";

  const predictedOffsetX = isDrift ? -22 : 0;
  const predictedOffsetY = isDrift ? -12 : 0;

  return (
    <figure
      ref={containerRef}
      className="operator-frame"
      data-testid="operator-artefact"
      aria-label="Operator spatial reconstruction view illustrating predicted state versus observed scene delta and compact telemetry update"
    >
      <div className="operator-topbar">
        <span>operator view · spatial delta</span>
        <span className="operator-status">
          <span
            className="operator-dot"
            data-drift={isDrift ? "true" : "false"}
            aria-hidden="true"
          />
          <span>
            {isDrift
              ? "state drift · sending update"
              : "predicted = observed"}
          </span>
        </span>
      </div>

      <div className="operator-viewport">
        <svg
          viewBox="0 0 640 400"
          role="img"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <linearGradient id="depthFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#171e27" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#090c10" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Subtle instrument grid */}
          <g stroke="#212a35" strokeWidth="1" opacity="0.55">
            <line x1="80" y1="0" x2="80" y2="400" />
            <line x1="160" y1="0" x2="160" y2="400" />
            <line x1="240" y1="0" x2="240" y2="400" />
            <line x1="320" y1="0" x2="320" y2="400" />
            <line x1="400" y1="0" x2="400" y2="400" />
            <line x1="480" y1="0" x2="480" y2="400" />
            <line x1="560" y1="0" x2="560" y2="400" />
            <line x1="0" y1="80" x2="640" y2="80" />
            <line x1="0" y1="160" x2="640" y2="160" />
            <line x1="0" y1="240" x2="640" y2="240" />
            <line x1="0" y1="320" x2="640" y2="320" />
          </g>

          {/* Architectural corridor / field perspective */}
          <g stroke="#324050" strokeWidth="1" fill="none" opacity="0.75">
            <polygon points="110,28 530,28 420,142 220,142" fill="url(#depthFade)" stroke="none" />
            <line x1="110" y1="28" x2="220" y2="142" />
            <line x1="530" y1="28" x2="420" y2="142" />
            <line x1="110" y1="372" x2="220" y2="258" />
            <line x1="530" y1="372" x2="420" y2="258" />
            <rect x="220" y="142" width="200" height="116" />
            <rect x="260" y="168" width="120" height="64" opacity="0.6" />
            <line x1="110" y1="372" x2="530" y2="372" opacity="0.45" />
          </g>

          {/* Depth contour field with subtle scroll parallax */}
          <motion.g
            style={prefersReducedMotion ? undefined : { y: depthShiftY }}
            fill="none"
            stroke="#8e9baa"
            strokeWidth="1"
          >
            <path
              d="M 136 332 C 198 310, 232 276, 294 270 C 362 264, 412 228, 492 206 C 538 194, 572 184, 608 176"
              opacity="0.55"
            />
            <path
              d="M 152 344 C 214 322, 248 290, 310 282 C 378 274, 428 242, 506 218 C 546 206, 580 198, 612 190"
              opacity="0.45"
            />
            <path
              d="M 176 354 C 234 332, 268 302, 326 294 C 392 286, 442 256, 518 232 C 554 220, 584 214, 616 206"
              opacity="0.38"
            />
            <path
              d="M 204 364 C 258 344, 290 318, 346 310 C 408 300, 456 272, 532 248"
              opacity="0.3"
            />
            <path
              d="M 332 232 C 388 216, 434 190, 498 172 C 538 160, 572 152, 604 146"
              opacity="0.5"
            />
            <path
              d="M 358 214 C 410 198, 452 174, 510 156 C 546 146, 578 138, 604 132"
              opacity="0.42"
            />
            <path
              d="M 382 198 C 430 182, 468 160, 522 144 C 554 134, 580 128, 602 122"
              opacity="0.32"
            />
            {/* Sparse depth sample points */}
            <g fill="#7dd3e8" opacity="0.65" stroke="none">
              <circle cx="294" cy="270" r="1.5" />
              <circle cx="366" cy="248" r="1.5" />
              <circle cx="436" cy="224" r="1.5" />
              <circle cx="492" cy="206" r="1.5" />
              <circle cx="412" cy="184" r="1.5" />
              <circle cx="478" cy="162" r="1.5" />
              <circle cx="242" cy="288" r="1.5" />
            </g>
          </motion.g>

          {/* Target A — settled object (predicted aligns with observed) */}
          <g>
            <rect
              x="194"
              y="162"
              width="74"
              height="104"
              fill="rgba(237, 241, 245, 0.025)"
              stroke="#edf1f5"
              strokeWidth="1.5"
            />
            <rect
              x="202"
              y="170"
              width="58"
              height="88"
              fill="none"
              stroke="#8e9baa"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.7"
            />
            <text
              x="194"
              y="154"
              fill="#93a1b0"
              fontSize="10"
              fontFamily="var(--font-mono)"
            >
              obs · synced
            </text>
          </g>

          {/* Target B — active delta subject (predicted dashed reconciles to observed solid) */}
          <g>
            {/* Predicted ghost frame */}
            <motion.g
              animate={{
                x: predictedOffsetX,
                y: predictedOffsetY,
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : MOTION.duration.slow,
                ease: MOTION.ease.emphasized,
              }}
            >
              <rect
                x="376"
                y="148"
                width="98"
                height="136"
                fill="rgba(125, 211, 232, 0.04)"
                stroke="#7dd3e8"
                strokeWidth="1.25"
                strokeDasharray="5 4"
              />
              <text
                x="376"
                y="140"
                fill="#7dd3e8"
                fontSize="10"
                fontFamily="var(--font-mono)"
              >
                predicted
              </text>
            </motion.g>

            {/* Observed solid frame */}
            <rect
              x="376"
              y="148"
              width="98"
              height="136"
              fill="rgba(237, 241, 245, 0.03)"
              stroke="#edf1f5"
              strokeWidth="1.6"
            />
            {/* Corner brackets on observed frame */}
            <g stroke="#7dd3e8" strokeWidth="2" fill="none">
              <path d="M 376 160 V 148 H 388" />
              <path d="M 462 148 H 474 V 160" />
              <path d="M 376 272 V 284 H 388" />
              <path d="M 462 284 H 474 V 272" />
            </g>

            {/* Delta vector arrow shown during drift */}
            <motion.g
              initial={false}
              animate={{ opacity: isDrift ? 1 : 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : MOTION.duration.base }}
            >
              <line
                x1="404"
                y1="204"
                x2="425"
                y2="216"
                stroke="#7dd3e8"
                strokeWidth="1.5"
              />
              <circle cx="404" cy="204" r="2.5" fill="#7dd3e8" />
              <circle cx="425" cy="216" r="2.5" fill="#edf1f5" />
            </motion.g>

            <text
              x="474"
              y="298"
              textAnchor="end"
              fill="#edf1f5"
              fontSize="10"
              fontFamily="var(--font-mono)"
            >
              observed
            </text>
          </g>

          {/* Corner registration crosshairs */}
          <g stroke="#8e9baa" strokeWidth="1" opacity="0.7">
            <path d="M 20 26 H 32 M 26 20 V 32" />
            <path d="M 608 26 H 620 M 614 20 V 32" />
            <path d="M 20 374 H 32 M 26 368 V 380" />
            <path d="M 608 374 H 620 M 614 368 V 380" />
          </g>
        </svg>
      </div>

      {/* Integrated signature telemetry line */}
      <div className="operator-telemetry">
        <div className="operator-telemetry-head">
          <span>delta link · update on surprise</span>
          <span className="operator-telemetry-state">
            {isPulseActive ? "delta packet" : "idle"}
          </span>
        </div>

        <div className="operator-waveform">
          <svg
            viewBox="0 0 600 44"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            {/* Baseline */}
            <line
              x1="0"
              y1="22"
              x2="600"
              y2="22"
              stroke="#212a35"
              strokeWidth="1"
            />

            {/* Quiet resting line */}
            <path
              d="M 0 22 L 600 22"
              fill="none"
              stroke="#324050"
              strokeWidth="1.5"
            />

            {/* Single sharp ice-cyan telemetry signal line */}
            <motion.path
              d="M 0 22 L 246 22 L 260 19 L 270 26 L 282 6 L 294 38 L 306 15 L 316 25 L 328 22 L 600 22"
              fill="none"
              stroke="#7dd3e8"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={
                prefersReducedMotion
                  ? { pathLength: 1, opacity: 1 }
                  : { pathLength: 0, opacity: 0.4 }
              }
              animate={
                prefersReducedMotion
                  ? { pathLength: 1, opacity: 1 }
                  : isPulseActive
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: 1, opacity: 0.35 }
              }
              transition={{
                duration: prefersReducedMotion ? 0 : MOTION.duration.narrative,
                ease: MOTION.ease.standard,
              }}
            />
          </svg>
        </div>
      </div>
    </figure>
  );
}
