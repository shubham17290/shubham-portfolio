"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="pop-in fixed bottom-5 left-5 z-[65] flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-[0_8px_30px_-6px_rgba(0,0,0,0.6)] transition-all hover:scale-105 hover:bg-zinc-200 active:scale-95 sm:bottom-6 sm:left-6"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
