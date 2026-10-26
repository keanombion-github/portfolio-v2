"use client";

import { useEffect, useRef } from "react";

export function CursorTrail() {
  const torchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = torchRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let current: { x: number; y: number } | null = null;
    let target = { x: 0, y: 0 };

    function hide() {
      cancelAnimationFrame(frame);
      frame = 0;
      current = null;
      el?.removeAttribute("data-active");
    }
    function draw() {
      frame = 0;
      if (!current || !el) return;
      current.x += (target.x - current.x) * 0.22;
      current.y += (target.y - current.y) * 0.22;
      const moving = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > 0.3;
      if (!moving) current = { ...target };
      el.style.setProperty("--pointer-x", `${current.x}px`);
      el.style.setProperty("--pointer-y", `${current.y}px`);
      if (moving) frame = requestAnimationFrame(draw);
    }
    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse" || reduced.matches || !finePointer.matches) return;
      target = { x: event.clientX, y: event.clientY };
      if (!current) current = { ...target };
      el?.setAttribute("data-active", "true");
      if (!frame) frame = requestAnimationFrame(draw);
    }
    function visibility() {
      if (document.hidden) hide();
    }
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    document.addEventListener("visibilitychange", visibility);
    reduced.addEventListener("change", hide);
    finePointer.addEventListener("change", hide);
    return () => {
      hide();
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      document.removeEventListener("visibilitychange", visibility);
      reduced.removeEventListener("change", hide);
      finePointer.removeEventListener("change", hide);
    };
  }, []);

  return (
    <>
      <div className="cursor-dots-base" aria-hidden="true" />
      <div ref={torchRef} className="cursor-dots-spotlight" aria-hidden="true" />
    </>
  );
}
