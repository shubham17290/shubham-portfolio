"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import profileImage from "../../public/profile.webp";
import { Download } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { aboutParagraphs, stats, siteConfig } from "@/lib/data";
import { useInViewClass } from "@/hooks/useInViewClass";
import { useCountUp, useInViewState } from "@/hooks/useCountUp";

// 3 stat cards as per spec: years, projects, clients
const statCards = stats.slice(0, 3);

const stagger = (i: number): CSSProperties =>
  ({
    "--reveal-delay": `${i * 80}ms`,
  }) as CSSProperties;

function StatValue({ value }: { value: string }) {
  const { ref, inView } = useInViewState<HTMLParagraphElement>();
  const numeric = parseInt(value, 10);
  const display = useCountUp(Number.isNaN(numeric) ? 0 : numeric, inView);

  if (Number.isNaN(numeric)) return <span ref={ref}>{value}</span>;
  return (
    <p ref={ref} className="text-xl font-semibold text-white sm:text-2xl">
      {display}
    </p>
  );
}

export default function About() {
  const sectionRef = useInViewClass<HTMLDivElement>();
  const gridRef = useInViewClass<HTMLDivElement>();
  const statsRef = useInViewClass<HTMLDivElement>();

  return (
    <section id="about" className="relative scroll-mt-20 py-24">
      <div ref={sectionRef} className="reveal mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="About"
          title="A little about me"
          description="Developer with a designer eye — I care about speed, clarity, and the details."
        />

        <div
          ref={gridRef}
          className="reveal-group mt-12 grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]"
        >
          {/* Left: profile image placeholder */}
          <div
            style={stagger(0)}
            className="reveal-child relative mx-auto w-full max-w-sm lg:mx-0"
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset]">
              <Image
                src={profileImage}
                alt={`${siteConfig.name} — profile photo`}
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                quality={85}
                className="object-cover"
                priority
                placeholder="blur"
              />
              {/* accent corner */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(400px_circle_at_50%_0%,rgba(52,211,153,0.12),transparent_70%)]"
              />
            </div>
            <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset]">
              <div>
                <p className="text-sm font-semibold text-white">{siteConfig.name}</p>
                <p className="text-xs text-zinc-500">
                  {siteConfig.location ? `${siteConfig.role} · ${siteConfig.location}` : siteConfig.role}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Open
              </span>
            </div>
          </div>

          {/* Right: about text */}
          <div style={stagger(1)} className="reveal-child">
            <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              I build minimal, premium web experiences.
            </h3>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-zinc-400">
              {aboutParagraphs.slice(0, 3).map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            {/* Stat cards with stagger */}
            <div
              ref={statsRef}
              className="reveal-group mt-8 grid grid-cols-3 gap-6"
            >
              {statCards.map((s, i) => (
                <div
                  key={s.label}
                  style={stagger(i)}
                  className="reveal-child rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset] transition-colors hover:border-white/20"
                >
                  <StatValue value={s.value} />
                  <p className="mt-1 text-xs uppercase tracking-wider text-zinc-500">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <a
              href={siteConfig.resumeUrl}
              download
              className="mt-7 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium bg-primary text-black hover:bg-primary/90 transition-colors"
            >
              <Download className="h-4 w-4" /> Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
