"use client";

import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { projects, type Project } from "@/lib/data";

/**
 * Interactive project grid (3D tilt cards + detail modal). Loaded with
 * ssr:false only after the section scrolls into view, so framer-motion
 * never ships in the initial bundle.
 */
export default function ProjectShowcase({
  pendingTitle,
  onConsumed,
}: {
  pendingTitle: string | null;
  onConsumed: () => void;
}) {
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

  // Command palette may fire before this chunk loads — the shell holds the
  // title and hands it over on mount.
  useEffect(() => {
    if (!pendingTitle) return;
    const found = projects.find((p) => p.title === pendingTitle);
    if (found) setSelected(found);
    onConsumed();
  }, [pendingTitle, onConsumed]);

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
    <>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} onSelect={setSelected} />
        ))}
      </div>
      <ProjectModal selected={selected} onClose={() => setSelected(null)} />
    </>
  );
}
