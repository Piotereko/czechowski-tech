export const MOTION = {
  duration: {
    fast: 0.15,
    base: 0.28,
    slow: 0.52,
    narrative: 1.2,
  },
  ease: {
    standard: [0.22, 1, 0.36, 1] as const,
    emphasized: [0.16, 1, 0.3, 1] as const,
  },
} as const;
