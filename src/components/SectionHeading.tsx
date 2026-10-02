"use client";

import { useInViewClass } from "@/hooks/useInViewClass";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: Props) {
  const centered = align === "center";
  const ref = useInViewClass<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal max-w-2xl ${centered ? "mx-auto text-center" : "text-left"}`}
    >
      <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs uppercase tracking-wider text-zinc-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        {eyebrow}
      </p>
      <h2 className="text-gradient mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-zinc-400">
          {description}
        </p>
      )}
    </div>
  );
}
