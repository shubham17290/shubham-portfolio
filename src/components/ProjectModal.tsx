"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Github, ArrowUpRight, X } from "lucide-react";
import type { Project } from "@/lib/data";

export default function ProjectModal({
  selected,
  onClose,
}: {
  selected: Project | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
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
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset]"
          >
            <button
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-colors hover:text-white active:scale-95"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="font-mono text-xs uppercase tracking-wider text-zinc-500">
              {selected.year} {selected.featured ? "· Featured" : ""}
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {selected.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              {selected.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {selected.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-white/[0.06] px-2 py-1 font-mono text-xs text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-6">
              <a
                href={selected.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Github className="h-4 w-4" /> Code
              </a>
              {selected.liveUrl ? (
                <a
                  href={selected.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium bg-primary text-black hover:bg-primary/90 transition-colors"
                >
                  Live Demo <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
