"use client";

import { motion } from "framer-motion";
import { Download, Briefcase, GraduationCap } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { aboutParagraphs, experience, stats, siteConfig } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="About"
          title="Designer mindset, engineer precision"
          description="I care about the details most people never notice — spacing, timing, performance — because that's what makes products feel premium."
        />

        <div className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          {/* Left: bio card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 sm:p-9"
          >
            <div className="flex items-center gap-5">
              {/* Avatar placeholder — replace with next/image */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-900 text-3xl font-bold text-white ring-1 ring-white/10">
                J
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{siteConfig.name}</h3>
                <p className="mt-0.5 text-sm text-zinc-400">{siteConfig.role} · {siteConfig.location}</p>
                <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Open to opportunities
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-zinc-400">
              {aboutParagraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={siteConfig.resumeUrl}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
              >
                <Download className="h-4 w-4" /> Download CV
              </a>
              <a
                href="#experience"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-zinc-200 transition-colors hover:bg-white/[0.07]"
              >
                <Briefcase className="h-4 w-4" /> My Journey
              </a>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-[#0e0e11] px-4 py-5 text-center">
                  <p className="text-xl font-semibold text-white sm:text-2xl">{s.value}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-wider text-zinc-500">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: experience timeline */}
          <motion.div
            id="experience"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center gap-2 px-1">
              <GraduationCap className="h-4 w-4 text-zinc-500" />
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
                Experience
              </h3>
            </div>
            {experience.map((item, i) => (
              <motion.div
                key={item.company}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-colors hover:border-white/[0.14] hover:bg-white/[0.04]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-medium text-white">{item.role}</h4>
                    <p className="mt-0.5 text-sm text-zinc-400">{item.company}</p>
                  </div>
                  <span className="shrink-0 rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-zinc-500">
                    {item.period}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-500">{item.description}</p>
              </motion.div>
            ))}

            <div className="rounded-2xl border border-dashed border-white/10 p-6 text-center text-sm text-zinc-500">
              Want the full story?{" "}
              <a href="#contact" className="font-medium text-zinc-200 underline underline-offset-4 hover:text-white">
                Let&apos;s chat
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
