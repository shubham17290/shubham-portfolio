"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import { Github, ArrowUpRight, Star, FolderGit2, X } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { projects, type Project } from "@/lib/data";

const container: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const badgeContainer: Variants = {
  rest: { transition: { staggerChildren: 0.02 } },
  hover: { transition: { staggerChildren: 0.06 } },
};

const badgeItem: Variants = {
  rest: { opacity: 0.75, y: 0 },
  hover: {
    opacity: 1,
    y: -2,
    transition: { duration: 0.2 },
  },
};

function ProjectCard({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: (p: Project) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRX = useSpring(rotateX, { stiffness: 150, damping: 18 });
  const springRY = useSpring(rotateY, { stiffness: 150, damping: 18 });
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-py * 10);
    rotateY.set(px * 10);
    setGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setGlow((g) => ({ ...g, opacity: 0 }));
  };

  return (
    <motion.article
      variants={item}
      style={{
        rotateX: springRX,
        rotateY: springRY,
        transformPerspective: 1000,
      }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSelect(project);
      }}
      tabIndex={0}
      role="button"
      aria-label={`Open ${project.title} details`}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0e0e11] transition-colors hover:border-white/[0.15] hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]"
    >
      <div ref={ref as React.RefObject<HTMLDivElement>} className="contents">
        {/* Thumbnail placeholder */}
        <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-zinc-800 via-zinc-900 to-black">
          <div className="bg-grid absolute inset-0 opacity-60 transition-transform duration-500 group-hover:scale-105" />
          {/* radial glow that follows cursor */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: glow.opacity,
              background: `radial-gradient(300px circle at ${glow.x}% ${glow.y}%, rgba(52,211,153,0.18), transparent 70%)`,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur transition-transform group-hover:scale-110">
              <FolderGit2 className="h-6 w-6 text-zinc-300" />
            </span>
          </div>
          {project.featured && (
            <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-black">
              <Star className="h-3 w-3 fill-black" /> Featured
            </span>
          )}
          <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 font-mono text-[11px] text-zinc-400 backdrop-blur">
            {project.year}
          </span>
          {/* hover overlay */}
          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-lg font-semibold tracking-tight text-white transition-colors group-hover:text-zinc-100">
            {project.title}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">
            {project.description}
          </p>

          <motion.div
            variants={badgeContainer}
            initial="rest"
            whileHover="hover"
            className="mt-4 flex flex-wrap gap-1.5"
          >
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                variants={badgeItem}
                className="rounded-md bg-white/[0.06] px-2 py-1 font-mono text-[11px] text-zinc-400"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          <div
            className="mt-5 flex items-center gap-2 border-t border-white/[0.06] pt-5"
            onClick={(e) => e.stopPropagation()}
          >
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/[0.08] hover:text-white"
            >
              <Github className="h-4 w-4" /> Code
            </a>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
              >
                Live Demo <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : (
              <span className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-zinc-200">
                View Details <ArrowUpRight className="h-4 w-4" />
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    const onOpenProject = (e: Event) => {
      const title = (e as CustomEvent<string>).detail;
      const found = projects.find((p) => p.title === title);
      if (found) setSelected(found);
    };
    window.addEventListener("open-project", onOpenProject);
    return () => window.removeEventListener("open-project", onOpenProject);
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section id="projects" className="relative scroll-mt-20 py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-6xl px-5 sm:px-8"
      >
        <SectionHeading
          eyebrow="Projects"
          title="Featured Projects"
          description="Placeholder projects — swap in your own case studies, repos and live links. Featured cards get extra spotlight."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} onSelect={setSelected} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mt-10 text-center"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
          >
            <Github className="h-4 w-4" />
            See more on GitHub
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </motion.div>

      {/* Full-screen modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.title} details`}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0e0e11] p-6 sm:p-8"
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="Close project details"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-colors hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                {selected.year} {selected.featured ? "· Featured" : ""}
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                {selected.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {selected.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {selected.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-white/[0.06] px-2 py-1 font-mono text-[11px] text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 border-t border-white/[0.06] pt-6">
                <a
                  href={selected.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/[0.08] hover:text-white"
                >
                  <Github className="h-4 w-4" /> Code
                </a>
                {selected.liveUrl ? (
                  <a
                    href={selected.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
                  >
                    Live Demo <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
