"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Github, ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { useInViewClass } from "@/hooks/useInViewClass";
import { useInViewState } from "@/hooks/useCountUp";

// Interactive grid (tilt + modal) loads client-only after scroll into view,
// keeping framer-motion out of the initial bundle.
const ProjectShowcase = dynamic(() => import("@/components/ProjectShowcase"), {
  ssr: false,
  loading: () => <ProjectGridSkeleton />,
});

function ProjectGridSkeleton() {
  return (
    <div aria-hidden className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]"
        >
          <div className="aspect-[16/9] animate-pulse bg-white/[0.04]" />
          <div className="space-y-3 p-6">
            <div className="h-5 w-2/3 animate-pulse rounded-md bg-white/10" />
            <div className="h-4 w-full animate-pulse rounded-md bg-white/[0.06]" />
            <div className="h-4 w-5/6 animate-pulse rounded-md bg-white/[0.06]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Projects() {
  const [pendingTitle, setPendingTitle] = useState<string | null>(null);
  const sectionRef = useInViewClass<HTMLDivElement>();
  const ctaRef = useInViewClass<HTMLDivElement>();
  const { ref: gridRef, inView: gridInView } = useInViewState<HTMLDivElement>(0.1);

  // Shell-level listener so palette requests arriving before the lazy chunk
  // loads are held and handed over on mount.
  useEffect(() => {
    const onOpenProject = (e: Event) => {
      setPendingTitle((e as CustomEvent<string>).detail);
    };
    window.addEventListener("open-project", onOpenProject);
    return () => window.removeEventListener("open-project", onOpenProject);
  }, []);

  const consumePending = useCallback(() => setPendingTitle(null), []);

  return (
    <section id="projects" className="relative scroll-mt-20 py-24">
      <div ref={sectionRef} className="reveal mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Featured Projects"
          description="Placeholder projects — swap in your own case studies, repos and live links. Featured cards get extra spotlight."
        />

        <div ref={gridRef}>
          {gridInView ? (
            <ProjectShowcase pendingTitle={pendingTitle} onConsumed={consumePending} />
          ) : (
            <ProjectGridSkeleton />
          )}
        </div>

        <div ref={ctaRef} className="reveal mt-10 text-center">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <Github className="h-4 w-4" />
            See more on GitHub
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
