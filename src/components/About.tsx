"use client";

import { motion, type Variants } from "framer-motion";
import { User, Download } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { aboutParagraphs, stats, siteConfig } from "@/lib/data";

// 3 stat cards as per spec: years, projects, clients
const statCards = stats.slice(0, 3);

const container: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
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

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-20 py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-6xl px-5 sm:px-8"
      >
        <SectionHeading
          eyebrow="About"
          title="A little about me"
          description="Developer with a designer eye — I care about speed, clarity, and the details."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid items-start gap-8 lg:mt-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12"
        >
          {/* Left: profile image placeholder */}
          <motion.div
            variants={item}
            className="relative mx-auto w-full max-w-sm lg:mx-0"
          >
            <div className="bg-grid relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
              {/* Replace with next/image later */}
              <div className="flex flex-col items-center gap-3 text-zinc-600">
                <span className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                  <User className="h-10 w-10" />
                </span>
                <p className="font-mono text-xs">profile.jpg — 800×800</p>
              </div>
              {/* accent corner */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(400px_circle_at_50%_0%,rgba(52,211,153,0.12),transparent_70%)]"
              />
            </div>
            <div className="mt-4 flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
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
          </motion.div>

          {/* Right: about text */}
          <motion.div variants={item}>
            <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              I build minimal, premium web experiences.
            </h3>
            <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-zinc-400">
              {aboutParagraphs.slice(0, 3).map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            {/* Stat cards with stagger */}
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-8 grid grid-cols-3 gap-3 sm:gap-4"
            >
              {statCards.map((s) => (
                <motion.div
                  key={s.label}
                  variants={item}
                  className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-5 text-center transition-colors hover:border-white/[0.14]"
                >
                  <p className="text-xl font-semibold text-white sm:text-2xl">{s.value}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-wider text-zinc-500">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <a
              href={siteConfig.resumeUrl}
              download
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
            >
              <Download className="h-4 w-4" /> Download CV
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
