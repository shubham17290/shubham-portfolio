type Blob = {
  size: number;
  left: string;
  top: string;
  background: string;
  duration: number;
  animationName: string;
};

// 3 ambient blobs: primary (white), accent (emerald), purple.
// Rendered fixed behind everything. Pure CSS keyframes (see globals.css)
// so framer-motion stays out of the critical path. Respects
// prefers-reduced-motion via CSS media query.
const BLOBS: Blob[] = [
  {
    size: 520,
    left: "-8%",
    top: "-10%",
    background:
      "radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%)",
    duration: 24,
    animationName: "blob-drift-0",
  },
  {
    size: 560,
    left: "62%",
    top: "22%",
    background:
      "radial-gradient(circle, rgba(52,211,153,0.45) 0%, transparent 70%)",
    duration: 30,
    animationName: "blob-drift-1",
  },
  {
    size: 600,
    left: "8%",
    top: "64%",
    background:
      "radial-gradient(circle, rgba(139,92,246,0.45) 0%, transparent 70%)",
    duration: 20,
    animationName: "blob-drift-2",
  },
];

export default function BackgroundBlobs() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {BLOBS.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-40 blur-3xl"
          style={{
            width: b.size,
            height: b.size,
            left: b.left,
            top: b.top,
            background: b.background,
            animationName: b.animationName,
            animationDuration: `${b.duration}s`,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationDirection: "alternate",
          }}
        />
      ))}
    </div>
  );
}
