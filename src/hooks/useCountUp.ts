"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1600;

/**
 * Boolean that flips to true once the referenced element enters the viewport.
 * Use it to start effects (e.g. count-ups) without framer-motion.
 */
export function useInViewState<T extends HTMLElement = HTMLParagraphElement>(
  threshold = 0.5
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/**
 * Eased count-up from 0 to `target`, starting when `started` is true.
 * Matches the previous 1.6s ease-out counters.
 */
export function useCountUp(target: number, started: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!started || Number.isNaN(target)) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / DURATION_MS);
      // easeOutExpo — fast start, soft landing (same feel as before)
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target]);

  return value;
}
