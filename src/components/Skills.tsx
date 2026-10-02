"use client";

import { motion, type Variants } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { skillCategories } from "@/lib/data";

const container: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
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

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-20 border-t border-white/10 bg-white/[0.01] py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-6xl px-6 sm:px-8"
      >
        <SectionHeading
          eyebrow="Skills"
          title="What I work with"
          description="Three core areas — replace with your own stack. Hover to feel the interaction."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillCategories.slice(0, 3).map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                variants={item}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset] transition-colors duration-300 hover:border-white/20"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-zinc-200 transition-colors group-hover:border-transparent group-hover:bg-[var(--accent)] group-hover:text-black">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-white sm:text-2xl">{cat.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                  {cat.description}
                </p>

                <div className="mt-5 space-y-4">
                  {cat.skills.map((skill, i) => (
                    <div key={skill.name}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="text-zinc-300">{skill.name}</span>
                        <span className="font-mono text-xs text-zinc-500">
                          {skill.level}%
                        </span>
                      </div>
                      <div
                        className="h-1.5 overflow-hidden rounded-full bg-white/10"
                        role="progressbar"
                        aria-valuenow={skill.level}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={skill.name}
                      >
                        <motion.div
                          initial={{ width: "0%" }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{
                            duration: 1,
                            delay: i * 0.1,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
