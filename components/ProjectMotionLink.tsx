"use client";

import Link from "next/link";
import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";

export function ProjectMotionLink({ href, children }: { href: string; children: ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const frame = useRef(0);

  function reset() {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    const el = ref.current;
    for (const property of ["--card-rotate-x", "--card-rotate-y", "--card-x", "--card-y"]) el?.style.removeProperty(property);
  }

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)");
    media.addEventListener("change", reset);
    return () => {
      media.removeEventListener("change", reset);
      reset();
    };
  }, []);

  function move(event: PointerEvent<HTMLAnchorElement>) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce), (hover: none), (pointer: coarse)").matches) return;
    const { clientX, clientY } = event;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
      el.style.setProperty("--card-rotate-x", `${(0.5 - y) * 6}deg`);
      el.style.setProperty("--card-rotate-y", `${(x - 0.5) * 6}deg`);
      el.style.setProperty("--card-x", `${x * 100}%`);
      el.style.setProperty("--card-y", `${y * 100}%`);
    });
  }

  return <Link ref={ref} href={href} className="project-card group h-full" onPointerMove={move} onPointerLeave={reset} onBlur={reset}>{children}</Link>;
}
