"use client";

import { motion, useReducedMotion } from "framer-motion";

type Blob = {
  size: number;
  left: string;
  top: string;
  background: string;
  duration: number;
  x: number[];
  y: number[];
};

// 3 ambient blobs: primary (white), accent (emerald), purple.
// Rendered fixed behind everything (parent paints its bg underneath).
const BLOBS: Blob[] = [
  {
    size: 520,
    left: "-8%",
    top: "-10%",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)",
    duration: 24,
    x: [0, 60, -20, 0],
    y: [0, 40, 70, 0],
  },
  {
    size: 560,
    left: "62%",
    top: "22%",
    background:
      "radial-gradient(circle, rgba(52,211,153,0.45) 0%, transparent 70%)",
    duration: 30,
    x: [0, -70, -30, 0],
    y: [0, 50, -40, 0],
  },
  {
    size: 600,
    left: "8%",
    top: "64%",
    background:
      "radial-gradient(circle, rgba(139,92,246,0.45) 0%, transparent 70%)",
    duration: 20,
    x: [0, 50, 90, 0],
    y: [0, -60, -20, 0],
  },
];

export default function BackgroundBlobs() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-40 blur-3xl"
          style={{
            width: b.size,
            height: b.size,
            left: b.left,
            top: b.top,
            background: b.background,
          }}
          animate={reduce ? undefined : { x: b.x, y: b.y }}
          transition={
            reduce
              ? undefined
              : {
                  duration: b.duration,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }
          }
        />
      ))}
    </div>
  );
}
