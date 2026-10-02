"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants, useInView, animate } from "framer-motion";
import Image from "next/image";
import profileImage from "../../public/profile.webp";
import { Download } from "lucide-react";
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

function StatValue({ value }: { value: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);
  const numeric = parseInt(value, 10);

  useEffect(() => {
    if (!inView || Number.isNaN(numeric)) return;
    const controls = animate(0, numeric, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, numeric]);

  if (Number.isNaN(numeric)) return <span ref={ref}>{value}</span>;
  return (
    <p ref={ref} className="text-xl font-semibold text-white sm:text-2xl">
      {display}
    </p>
  );
}

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-20 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-6xl px-6 sm:px-8"
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
          className="mt-12 grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]"
        >
          {/* Left: profile image placeholder */}
          <motion.div
            variants={item}
            className="relative mx-auto w-full max-w-sm lg:mx-0"
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset]">
              <Image
                src={profileImage}
                alt={`${siteConfig.name} — profile photo`}
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover"
                priority
                placeholder="blur"
              />
              {/* accent corner */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(400px_circle_at_50%_0%,rgba(52,211,153,0.12),transparent_70%)]"
              />
            </div>
            <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset]">
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
            <div className="mt-4 space-y-4 text-base leading-relaxed text-zinc-400">
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
              className="mt-8 grid grid-cols-3 gap-6"
            >
              {statCards.map((s) => (
                <motion.div
                  key={s.label}
                  variants={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset] transition-colors hover:border-white/20"
                >
                  <StatValue value={s.value} />
                  <p className="mt-1 text-xs uppercase tracking-wider text-zinc-500">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <a
              href={siteConfig.resumeUrl}
              download
              className="mt-7 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium bg-primary text-black hover:bg-primary/90 transition-colors"
            >
              <Download className="h-4 w-4" /> Download CV
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
