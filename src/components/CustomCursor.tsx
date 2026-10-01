"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Dot: tight spring (slight lag). Ring: looser spring (more lag).
  const dotX = useSpring(x, { stiffness: 550, damping: 45, mass: 0.4 });
  const dotY = useSpring(y, { stiffness: 550, damping: 45, mass: 0.4 });
  const ringX = useSpring(x, { stiffness: 220, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 220, damping: 28, mass: 0.6 });

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;
    // One-time mount enable based on device capabilities (not derived data).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      setHovering(!!target?.closest?.("a, button, [data-cursor='hover']"));
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* 8px dot */}
      <motion.div
        aria-hidden
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full bg-white"
        style={{ x: dotX, y: dotY, marginLeft: -4, marginTop: -4 }}
        animate={{ scale: hovering ? 0.5 : 1 }}
        transition={{ duration: 0.2 }}
      />
      {/* 32px ring */}
      <motion.div
        aria-hidden
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[100] h-8 w-8 rounded-full border border-white/50"
        style={{ x: ringX, y: ringY, marginLeft: -16, marginTop: -16 }}
        animate={{ scale: hovering ? 2 : 1, opacity: hovering ? 0.9 : 0.6 }}
        transition={{ duration: 0.25 }}
      />
    </>
  );
}
