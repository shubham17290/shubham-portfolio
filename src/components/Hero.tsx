"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowDown,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/data/portfolio";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="bg-glow relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      {/* grid overlay */}
      <div className="bg-grid mask-fade-y absolute inset-0" aria-hidden />
      {/* bottom fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#09090b] to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="max-w-3xl">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-1.5 pr-4 text-[13px] text-zinc-300 backdrop-blur">
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2.5 py-0.5 text-xs font-medium text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Available
              </span>
              <span className="hidden sm:inline">{siteConfig.availability} — let&apos;s build</span>
              <span className="sm:hidden">Open to work</span>
            </p>
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-7 flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.22em] text-zinc-500"
          >
            <MapPin className="h-4 w-4" /> {siteConfig.location}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-4 text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.03em] text-balance sm:text-6xl lg:text-7xl"
          >
            <span className="text-gradient">Crafting minimal,</span>
            <br />
            <span className="text-white">premium web</span>{" "}
            <span className="relative inline-block text-white">
              experiences
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                aria-hidden
              >
                <path
                  d="M2 9C60 3 180 2 298 7"
                  stroke="#34d399"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.7"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-7 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg"
          >
            I&apos;m <span className="font-medium text-zinc-100">{siteConfig.name}</span> —{" "}
            {siteConfig.role.toLowerCase()} focused on Next.js, TypeScript and
            thoughtful design. I help startups ship fast without compromising on quality.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-medium text-black transition-all hover:bg-zinc-200 hover:shadow-[0_0_40px_-8px_rgba(255,255,255,0.4)]"
            >
              View My Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-7 py-3.5 text-[15px] font-medium text-zinc-100 backdrop-blur transition-colors hover:bg-white/[0.08]"
            >
              <Sparkles className="h-4 w-4 text-zinc-400" />
              Get in Touch
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
            className="mt-10 flex items-center gap-3"
          >
            <div className="flex items-center gap-2">
              {[
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Twitter, href: "https://x.com", label: "Twitter" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 transition-all hover:border-white/20 hover:text-white"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
            <span className="h-px w-12 bg-white/10" />
            <p className="font-mono text-xs text-zinc-600">hello@johndoe.dev</p>
          </motion.div>
        </div>

        {/* scroll hint */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-zinc-600 transition-colors hover:text-zinc-300 md:flex"
          aria-label="Scroll to about"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.2em]">Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            <ArrowDown className="h-4 w-4" />
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
}
