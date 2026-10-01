"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { skillCategories } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-20 border-t border-white/[0.06] bg-white/[0.01] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="A toolkit built for quality & speed"
          description="Placeholder skills — replace levels and stacks with your own. Grouped so clients see outcomes, not just buzzwords."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 xl:grid-cols-4">
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: idx * 0.08 }}
                className="group rounded-2xl border border-white/[0.07] bg-[#0e0e11] p-6 transition-all hover:-translate-y-1 hover:border-white/[0.14]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-zinc-200 transition-colors group-hover:bg-white group-hover:text-black">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-[17px] font-semibold text-white">{cat.title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-zinc-500">{cat.description}</p>

                <div className="mt-5 space-y-4">
                  {cat.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="mb-1.5 flex items-center justify-between text-[13px]">
                        <span className="text-zinc-300">{skill.name}</span>
                        <span className="font-mono text-[11px] text-zinc-600">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full rounded-full bg-gradient-to-r from-zinc-100 to-zinc-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Marquee-ish tech pills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 flex flex-wrap justify-center gap-2.5"
        >
          {[
            "Next.js 16",
            "React 19",
            "TypeScript",
            "Tailwind v4",
            "Framer Motion",
            "Node.js",
            "PostgreSQL",
            "Prisma",
            "Vercel",
            "Figma",
          ].map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-1.5 font-mono text-xs text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
            >
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
