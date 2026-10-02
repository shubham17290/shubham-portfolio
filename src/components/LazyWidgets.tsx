"use client";

import dynamic from "next/dynamic";

// Heavy client-only widgets are code-split and never SSR'd,
// so they load after first paint and keep TTI low.
const CommandPalette = dynamic(() => import("@/components/CommandPalette"), {
  ssr: false,
});
const ChatWidget = dynamic(() => import("@/components/ChatWidget"), {
  ssr: false,
});
const ScrollProgress = dynamic(() => import("@/components/ScrollProgress"), {
  ssr: false,
  loading: () => null,
});
const LoadingScreen = dynamic(() => import("@/components/LoadingScreen"), {
  ssr: false,
  loading: () => null,
});
const EasterEggs = dynamic(() => import("@/components/EasterEggs"), {
  ssr: false,
});

export default function LazyWidgets() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <CommandPalette />
      <ChatWidget />
      <EasterEggs />
    </>
  );
}
