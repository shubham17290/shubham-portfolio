import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

// Below-the-fold sections are code-split (SSR preserved for SEO),
// so the initial bundle only ships what's needed for first paint.
const About = dynamic(() => import("@/components/About"));
const Skills = dynamic(() => import("@/components/Skills"));
const GitHubStats = dynamic(() => import("@/components/GitHubStats"), {
  loading: () => (
    <div className="py-20 text-center text-sm text-white/40">Loading GitHub stats...</div>
  ),
});
const Projects = dynamic(() => import("@/components/Projects"));
const Contact = dynamic(() => import("@/components/Contact"));

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <GitHubStats />
      <Projects />
      <Contact />
    </>
  );
}
