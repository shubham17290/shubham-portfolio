import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import LazyGitHubStats from "@/components/LazyGitHubStats";

// Below-the-fold sections are code-split (SSR preserved for SEO),
// so the initial bundle only ships what's needed for first paint.
// GitHub stats are client-only (live API fetch) via LazyGitHubStats.
const About = dynamic(() => import("@/components/About"));
const Skills = dynamic(() => import("@/components/Skills"));
const Projects = dynamic(() => import("@/components/Projects"));
const Contact = dynamic(() => import("@/components/Contact"));

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <LazyGitHubStats />
      <Projects />
      <Contact />
    </>
  );
}
