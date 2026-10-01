import { ImageResponse } from "next/og";
export const alt = "Kean — frontend developer, full-stack in progress";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#090b0a",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        color: "#f1f4f2",
        fontFamily: "monospace",
      }}
    >
      <div style={{ display: "flex", fontSize: 24, color: "#00e88a" }}>
        ● kean.dev
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 80, letterSpacing: -5 }}>
          $ hi, I&apos;m Kean
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 29,
            color: "#aab8af",
            marginTop: 28,
          }}
        >
          Frontend developer. Full-stack in progress.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #28372e",
          paddingTop: 26,
          fontSize: 22,
          color: "#00e88a",
        }}
      >
        React / Next.js · .NET · PostgreSQL · AWS
      </div>
    </div>,
    size,
  );
}
