"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants, useInView, animate } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { BookMarked, Star, Flame } from "lucide-react";
import SectionHeading from "./SectionHeading";

const USERNAME = "shubham17290";

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

function StatNumber({ value }: { value: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <p ref={ref} className="text-2xl font-semibold text-white sm:text-3xl">
      {display}
    </p>
  );
}

function computeStreakFromEvents(events: Array<{ type: string; created_at: string }>) {
  const pushDays = new Set<string>();
  for (const e of events) {
    if (e.type === "PushEvent") {
      pushDays.add(new Date(e.created_at).toISOString().slice(0, 10));
    }
  }
  if (pushDays.size === 0) return 0;
  let streak = 0;
  const d = new Date();
  // Allow streak to start yesterday if nothing pushed today yet
  const todayStr = d.toISOString().slice(0, 10);
  if (!pushDays.has(todayStr)) d.setDate(d.getDate() - 1);
  while (true) {
    const key = d.toISOString().slice(0, 10);
    if (pushDays.has(key)) {
      streak += 1;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
    if (streak > 365) break;
  }
  return streak;
}

export default function GitHubStats() {
  const [repos, setRepos] = useState(0);
  const [stars, setStars] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const userRes = await fetch(`https://api.github.com/users/${USERNAME}`);
        if (userRes.ok) {
          const user = await userRes.json();
          if (!cancelled && typeof user.public_repos === "number") {
            setRepos(user.public_repos);
          }
        }
        const reposRes = await fetch(
          `https://api.github.com/users/${USERNAME}/repos?per_page=100`
        );
        if (reposRes.ok) {
          const list = (await reposRes.json()) as Array<{ stargazers_count?: number }>;
          if (!cancelled && Array.isArray(list)) {
            setStars(list.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0));
          }
        }
        const eventsRes = await fetch(
          `https://api.github.com/users/${USERNAME}/events/public?per_page=100`
        );
        if (eventsRes.ok) {
          const events = await eventsRes.json();
          if (!cancelled && Array.isArray(events)) {
            setStreak(computeStreakFromEvents(events));
          }
        }
      } catch {
        /* offline or rate-limited: keep counters at 0 */
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const cards = [
    { label: "Total Repos", value: repos, Icon: BookMarked },
    { label: "Total Stars", value: stars, Icon: Star },
    { label: "Current Streak", value: streak, Icon: Flame, suffix: streak === 1 ? " day" : " days" },
  ];

  return (
    <section
      id="github"
      className="relative scroll-mt-20 border-t border-white/[0.06] bg-white/[0.01] py-20 sm:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-6xl px-5 sm:px-8"
      >
        <SectionHeading
          eyebrow="GitHub"
          title="Contribution graph"
          description="Live activity pulled from the GitHub API with a dark theme to match the site."
        />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-5 sm:grid-cols-3 lg:mt-16"
        >
          {cards.map(({ label, value, Icon, suffix }) => (
            <motion.div
              key={label}
              variants={item}
              className="rounded-2xl border border-white/[0.07] bg-[#0e0e11] p-6 text-center"
            >
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-zinc-200">
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-4">
                <StatNumber value={value} />
                {suffix ? (
                  <span className="text-xs text-zinc-500">{suffix}</span>
                ) : null}
              </div>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-zinc-500">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={item}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-5 overflow-x-auto rounded-2xl border border-white/[0.07] bg-[#0e0e11] p-6"
        >
          <GitHubCalendar
            username={USERNAME}
            colorScheme="dark"
            blockSize={12}
            blockMargin={4}
            fontSize={12}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
