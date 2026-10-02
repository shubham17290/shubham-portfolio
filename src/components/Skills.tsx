"use client";

import type { CSSProperties } from "react";
import SectionHeading from "./SectionHeading";
import { skillCategories } from "@/lib/data";
import { useInViewClass } from "@/hooks/useInViewClass";

const stagger = (i: number): CSSProperties =>
  ({
    "--reveal-delay": `${i * 80}ms`,
  }) as CSSProperties;

export default function Skills() {
  const sectionRef = useInViewClass<HTMLDivElement>();
  const gridRef = useInViewClass<HTMLDivElement>();

  return (
    <section
      id="skills"
      className="relative scroll-mt-20 border-t border-white/10 bg-white/[0.01] py-24"
    >
      <div ref={sectionRef} className="reveal mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="What I work with"
          description="Three core areas — replace with your own stack. Hover to feel the interaction."
        />

        <div
          ref={gridRef}
          className="reveal-group mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillCategories.slice(0, 3).map((cat, ci) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                style={stagger(ci)}
                className="reveal-child group rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset] transition-all duration-300 hover:-translate-y-2 hover:border-white/20"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-zinc-200 transition-colors group-hover:border-transparent group-hover:bg-[var(--accent)] group-hover:text-black">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-white sm:text-2xl">{cat.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                  {cat.description}
                </p>

                <div className="mt-5 space-y-4">
                  {cat.skills.map((skill, i) => (
                    <div key={skill.name}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="text-zinc-300">{skill.name}</span>
                        <span className="font-mono text-xs text-zinc-500">
                          {skill.level}%
                        </span>
                      </div>
                      <div
                        className="h-1.5 overflow-hidden rounded-full bg-white/10"
                        role="progressbar"
                        aria-valuenow={skill.level}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={skill.name}
                      >
                        <div
                          style={
                            {
                              "--level": `${skill.level}%`,
                              "--bar-delay": `${i * 100}ms`,
                            } as CSSProperties
                          }
                          className="skill-bar-fill h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
