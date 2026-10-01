import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Shubham — Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#09090b",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.03em",
          }}
        >
          Shubham
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#a1a1aa" }}>
          Full-Stack Developer — Minimal, premium web experiences
        </div>
      </div>
    ),
    { ...size },
  );
}
