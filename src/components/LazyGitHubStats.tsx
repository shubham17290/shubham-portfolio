"use client";

import dynamic from "next/dynamic";

// GitHub stats are below the fold and fetch live data client-side,
// so they never SSR and never block initial render.
const GitHubStats = dynamic(() => import("@/components/GitHubStats"), {
  ssr: false,
  loading: () => (
    <div className="py-20 text-center text-sm text-white/60">
      Loading GitHub stats...
    </div>
  ),
});

export default function LazyGitHubStats() {
  return <GitHubStats />;
}
