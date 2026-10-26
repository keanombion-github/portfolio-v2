"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function ScrollReveal({ children, className, delay = 0 }: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const animation = useRef<Animation | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    function stop() {
      observer?.disconnect();
      animation.current?.cancel();
      animation.current = null;
    }
    function setup() {
      stop();
      if (reduced.matches || !("IntersectionObserver" in window) || !el?.animate) return;
      observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting) || el.dataset.revealed === "true") return;
        el.dataset.revealed = "true";
        observer?.disconnect();
        // Animate on entry; never hide server-rendered content while waiting for JS.
        animation.current = el.animate(
          [{ opacity: 0, transform: "translateY(28px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 650, delay, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" },
        );
      }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
      observer.observe(el);
    }
    setup();
    reduced.addEventListener("change", setup);
    return () => {
      stop();
      reduced.removeEventListener("change", setup);
    };
  }, [delay]);

  function revealOnFocus() {
    if (ref.current) ref.current.dataset.revealed = "true";
    animation.current?.cancel();
  }

  return <div ref={ref} className={className} data-reveal="" onFocusCapture={revealOnFocus}>{children}</div>;
}
