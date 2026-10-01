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

export default function LazyWidgets() {
  return (
    <>
      <CommandPalette />
      <ChatWidget />
    </>
  );
}
