"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowDown,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  Sparkles,
  Download,
} from "lucide-react";
import { siteConfig } from "@/lib/data";
import MagneticButton from "@/components/MagneticButton";

const ROLES = [
  "Full-Stack Developer",
  "AI Enthusiast",
  "React Developer",
  "Problem Solver",
];

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex === currentWord.length) {
      // Pause for 2 seconds when word is complete
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex === 0) {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }, 300);
    } else {
      const speed = isDeleting ? 40 : 80;
      timeout = setTimeout(() => {
        const nextChar = isDeleting ? charIndex - 1 : charIndex + 1;
        setCharIndex(nextChar);
        setText(currentWord.slice(0, nextChar));
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words]);

  return text;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const TERMINAL_LINES = [
  "$ whoami",
  "→ Shubham Maurya — Full-Stack Developer",
  "$ cat skills.txt",
  "→ Next.js, React, TypeScript, Node.js, AI",
  "$ status",
  "→ AI Intern @ IBM | Open to opportunities ✅",
];

function TerminalCard() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    if (lineIndex >= TERMINAL_LINES.length) return;
    const currentLine = TERMINAL_LINES[lineIndex];
    if (charIndex < currentLine.length) {
      const t = setTimeout(() => {
        setCharIndex((c) => c + 1);
      }, 32);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setDone((d) => [...d, currentLine]);
      setLineIndex((i) => i + 1);
      setCharIndex(0);
    }, 380);
    return () => clearTimeout(t);
  }, [lineIndex, charIndex]);

  const currentText =
    lineIndex < TERMINAL_LINES.length
      ? TERMINAL_LINES[lineIndex].slice(0, charIndex)
      : "";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      custom={6}
      className="w-full"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0e]/95 shadow-[0_0_50px_-12px_rgba(255,255,255,0.2)] backdrop-blur"
      >
        <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 rounded-full bg-green-500" />
          <span className="ml-2 font-mono text-xs text-zinc-500">terminal</span>
        </div>
        <div className="min-h-[228px] p-5 font-mono text-[13px] leading-relaxed">
          {done.map((line) => (
            <p
              key={line}
              className={
                line.startsWith("$")
                  ? "text-emerald-300"
                  : "text-zinc-400"
              }
            >
              {line}
            </p>
          ))}
          {lineIndex < TERMINAL_LINES.length && (
            <p
              className={
                TERMINAL_LINES[lineIndex].startsWith("$")
                  ? "text-emerald-300"
                  : "text-zinc-400"
              }
            >
              {currentText}
              <span aria-hidden className="ml-0.5 inline-block animate-pulse text-emerald-400">
                ▊
              </span>
            </p>
          )}
          {lineIndex >= TERMINAL_LINES.length && (
            <p className="text-emerald-300">
              <span aria-hidden className="inline-block animate-pulse text-emerald-400">
                ▊
              </span>
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const typedRole = useTypewriter(ROLES);

  return (
    <section
      id="home"
      className="bg-glow relative flex min-h-screen scroll-mt-20 items-center overflow-hidden pt-16"
    >
      {/* grid overlay */}
      <div className="bg-grid mask-fade-y absolute inset-0" aria-hidden />
      {/* bottom fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#09090b] to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
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

          {siteConfig.location ? (
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="mt-7 flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.22em] text-zinc-500"
            >
              <MapPin className="h-4 w-4" /> {siteConfig.location}
            </motion.p>
          ) : null}

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
            <span className="font-medium text-zinc-100">{typedRole}</span>
            <span
              aria-hidden
              className="ml-0.5 inline-block animate-pulse font-medium text-emerald-400"
            >
              |
            </span>{" "}
            focused on Next.js, TypeScript and thoughtful design. I help
            startups ship fast without compromising on quality.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <MagneticButton>
              <a
                href="#projects"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-medium text-black transition-all hover:bg-zinc-200 hover:shadow-[0_0_40px_-8px_rgba(255,255,255,0.4)] active:scale-95"
              >
                View My Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </MagneticButton>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-7 py-3.5 text-[15px] font-medium text-zinc-100 backdrop-blur transition-colors hover:bg-white/[0.08] active:scale-95"
            >
              <Sparkles className="h-4 w-4 text-zinc-400" />
              Get in Touch
            </a>
            <MagneticButton>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-transparent px-7 py-3.5 text-[15px] font-medium text-zinc-300 transition-colors hover:border-white/25 hover:text-white active:scale-95"
              >
                <Download className="h-4 w-4" />
                Resume
              </a>
            </MagneticButton>
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
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3, transition: { duration: 0.15, repeat: 1, repeatType: "reverse" } }}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </motion.a>
              ))}
            </div>
            <span className="h-px w-12 bg-white/10" />
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-mono text-xs text-zinc-400 transition-colors hover:text-zinc-300"
            >
              {siteConfig.email}
            </a>
          </motion.div>
          </div>
          <TerminalCard />
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
