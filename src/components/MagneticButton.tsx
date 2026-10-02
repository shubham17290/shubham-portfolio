"use client";

import { useEffect, useRef, type ReactNode } from "react";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Cursor-proximity pull without framer-motion: the wrapper translates up to
 * 15px toward the cursor within 100px, with a CSS transition for smoothing.
 * Same thresholds as the previous spring version.
 */
export default function MagneticButton({ children, className }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setShift = (x: number, y: number) => {
      const el = ref.current;
      if (el) el.style.transform = `translate(${x}px, ${y}px)`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 100) {
        // Translate slightly toward cursor, max 15px shift
        const shiftX = Math.max(-15, Math.min(15, dx * 0.2));
        const shiftY = Math.max(-15, Math.min(15, dy * 0.2));
        setShift(shiftX, shiftY);
      } else {
        setShift(0, 0);
      }
    };

    const handleMouseLeave = () => setShift(0, 0);

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
      }}
      style={{ transition: "transform 0.25s ease-out" }}
      className={className ?? "inline-block"}
    >
      {children}
    </div>
  );
}
