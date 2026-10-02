"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Github, ArrowUpRight, Star, FolderGit2 } from "lucide-react";
import type { Project } from "@/lib/data";

const badgeContainer = {
  rest: { transition: { staggerChildren: 0.02 } },
  hover: { transition: { staggerChildren: 0.06 } },
};

const badgeItem = {
  rest: { opacity: 0.75, y: 0 },
  hover: {
    opacity: 1,
    y: -2,
    transition: { duration: 0.2 },
  },
};

export default function ProjectCard({
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      style={{
        rotateX: springRX,
        rotateY: springRY,
        transformPerspective: 1000,
      }}
      whileHover={{ y: -6, scale: 1.02 }}
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
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset] transition-colors hover:border-white/20 active:scale-95"
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
            <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-medium uppercase tracking-wider text-black">
              <Star className="h-3 w-3 fill-black" /> Featured
            </span>
          )}
          <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 font-mono text-xs uppercase tracking-wider text-zinc-400 backdrop-blur">
            {project.year}
          </span>
          {/* hover overlay */}
          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-zinc-100 sm:text-2xl">
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
                className="rounded-md bg-white/[0.06] px-2 py-1 font-mono text-xs text-zinc-400"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          <div
            className="mt-5 flex items-center gap-2 border-t border-white/10 pt-5"
            onClick={(e) => e.stopPropagation()}
          >
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Github className="h-4 w-4" /> Code
            </a>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium bg-primary text-black hover:bg-primary/90 transition-colors"
              >
                Live Demo <ArrowUpRight className="h-4 w-4" />
              </a>
            ) : (
              <span className="inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium bg-primary text-black hover:bg-primary/90 transition-colors">
                View Details <ArrowUpRight className="h-4 w-4" />
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
