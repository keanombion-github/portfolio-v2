"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Akkila-style background dot torch effect.
 * Renders a full-screen dot grid where dots near the mouse cursor
 * "light up" via a radial gradient spotlight that follows the cursor.
 */
export function CursorTrail() {
  const torchRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  const updateTorch = useCallback(() => {
    const el = torchRef.current;
    if (!el) return;
    const { x, y } = mouseRef.current;
    const mask = `radial-gradient(circle 180px at ${x}px ${y}px, black 0%, transparent 100%)`;
    el.style.maskImage = mask;
    el.style.webkitMaskImage = mask;
  }, []);

  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)")
        .matches
    )
      return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateTorch);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updateTorch]);

  return (
    <>
      {/* Base dots — dim dots everywhere */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--border) 1px, transparent 1.4px)",
          backgroundSize: "22px 22px",
          opacity: 0.35,
        }}
        aria-hidden="true"
      />
      {/* Torch — bright dot spotlight that follows the cursor */}
      <div
        ref={torchRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--accent) 1px, transparent 1.4px)",
          backgroundSize: "22px 22px",
          opacity: 0.7,
          maskImage:
            "radial-gradient(circle 180px at -1000px -1000px, black 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle 180px at -1000px -1000px, black 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />
    </>
  );
}
