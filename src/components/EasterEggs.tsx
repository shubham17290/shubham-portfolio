"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function EasterEggs() {
  const [found, setFound] = useState(false);
  const progress = useRef(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    console.log(
      "%c👋 Hey there, curious dev!",
      "font-size: 16px; font-weight: bold; color: #34d399;"
    );
    console.log(
      "%cBuilt by Shubham Maurya — Full-Stack Developer & AI Intern at IBM",
      "font-size: 12px; color: #a1a1aa;"
    );
    console.log(
      "%cLet's connect: smourya1046@gmail.com",
      "font-size: 12px; color: #ffffff;"
    );
  }, []);

  useEffect(() => {
    const onKeyDown = async (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[progress.current]) {
        progress.current += 1;
        if (progress.current === KONAMI.length) {
          progress.current = 0;
          setFound(true);
          if (hideTimer.current) clearTimeout(hideTimer.current);
          hideTimer.current = setTimeout(() => setFound(false), 4000);
          try {
            const { default: confetti } = await import("canvas-confetti");
            confetti({ particleCount: 120, spread: 75, origin: { y: 0.6 } });
            setTimeout(() => confetti({ particleCount: 60, angle: 60, spread: 60, origin: { x: 0 } }), 250);
            setTimeout(() => confetti({ particleCount: 60, angle: 120, spread: 60, origin: { x: 1 } }), 400);
          } catch {
            /* confetti unavailable */
          }
        }
      } else {
        progress.current = key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {found && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          role="status"
          className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-full border border-emerald-400/30 bg-emerald-950/90 px-5 py-3 text-sm font-medium text-emerald-100 shadow-2xl backdrop-blur-xl"
        >
          🎉 You found the secret! Now hire me 😉
        </motion.div>
      )}
    </AnimatePresence>
  );
}
