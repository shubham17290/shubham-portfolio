"use client";

import { useEffect, useRef } from "react";

type Options = {
  /** Disconnect after first entry (default true). Set false to re-toggle. */
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
};

/**
 * Adds an `in-view` class to the referenced element when it enters the
 * viewport. Pair with `.reveal` / `.reveal-group` classes in globals.css.
 * Falls back to visible immediately when IntersectionObserver is unavailable.
 */
export function useInViewClass<T extends HTMLElement = HTMLDivElement>(
  options?: Options
) {
  const ref = useRef<T>(null);
  const optsRef = useRef(options);
  optsRef.current = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { once = true, threshold = 0.2, rootMargin } = optsRef.current ?? {};
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("in-view");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("in-view");
            if (once) io.disconnect();
          } else if (!once) {
            el.classList.remove("in-view");
          }
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}
