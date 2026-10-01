"use client";

import { motion } from "framer-motion";
import { Github, ArrowUpRight, Star, FolderGit2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Featured Projects"
          description="Placeholder projects — swap in your own case studies, repos and live links. Featured cards get extra spotlight."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
              className={`group flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0e0e11] transition-all hover:-translate-y-1 hover:border-white/[0.15] hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] ${
                project.featured ? "md:col-span-1 lg:row-span-1" : ""
              }`}
            >
              {/* Thumbnail placeholder */}
              <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-zinc-800 via-zinc-900 to-black">
                <div className="bg-grid absolute inset-0 opacity-60 transition-transform duration-500 group-hover:scale-105" />
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

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-white/[0.06] px-2 py-1 font-mono text-[11px] text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-2 border-t border-white/[0.06] pt-5">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/[0.08] hover:text-white"
                  >
                    <Github className="h-4 w-4" /> Code
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
                  >
                    Live Demo <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
          >
            <Github className="h-4 w-4" />
            See more on GitHub
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
