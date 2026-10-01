"use client";

import { motion, type Variants } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { skillCategories } from "@/lib/data";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
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
      className="relative scroll-mt-20 border-t border-white/[0.06] bg-white/[0.01] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Skills"
          title="What I work with"
          description="Three core areas — replace with your own stack. Hover to feel the interaction."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
        >
          {skillCategories.slice(0, 3).map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                variants={item}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group rounded-2xl border border-white/[0.07] bg-[#0e0e11] p-6 transition-shadow duration-300 hover:border-[var(--accent)]/40 hover:shadow-[0_0_40px_-12px_var(--accent)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-zinc-200 transition-colors group-hover:border-transparent group-hover:bg-[var(--accent)] group-hover:text-black">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-[17px] font-semibold text-white">{cat.title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-zinc-500">
                  {cat.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[13px] text-zinc-300 transition-colors group-hover:border-white/[0.14]"
                    >
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
