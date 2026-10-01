"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
const links = [
  { href: "/#top", label: "home" },
  { href: "/#projects", label: "projects" },
  { href: "/#contact", label: "contact" },
  { href: "/blog", label: "blog" },
  { href: "/about", label: "about" },
  { href: "/recommendations", label: "recommendations" },
];
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState("home");
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
      const old = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = old;
      };
    }
    dialog.current?.close();
  }, [open]);
  useEffect(() => {
    if (pathname !== "/") return;
    const ids = ["top", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting)
            setSection(entry.target.id === "top" ? "home" : entry.target.id);
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);
  function close() {
    setOpen(false);
    trigger.current?.focus();
  }
  const active = (label: string) =>
    pathname === "/"
      ? label === section
      : label === "projects"
        ? pathname.startsWith("/project")
        : pathname === `/${label}` || pathname.startsWith(`/${label}/`);
  return (
    <>
      <header className="site-header">
        <div className="nav-inner">
          <Link href="/" className="brand" aria-label="Kean home">
            <span className="brand-dot" />
            kean<span className="font-normal text-[var(--text-dim)]">.dev</span>
          </Link>
          <nav className="desktop-nav" aria-label="Primary">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={active(l.label) ? "active" : ""}
                aria-current={active(l.label) ? "page" : undefined}
              >
                <span className="opacity-40">~/</span>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              ref={trigger}
              className="menu-toggle"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen(true)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <dialog
        ref={dialog}
        id="mobile-navigation"
        aria-label="Navigation menu"
        className="mobile-dialog"
        onCancel={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        <div className="h-full flex flex-col p-6">
          <div className="flex justify-between items-center pb-6 border-b border-[var(--border)]">
            <span className="brand">
              kean<span className="text-[var(--text-dim)]">.dev</span>
            </span>
            <button className="button" onClick={close} aria-label="Close menu">
              ✕
            </button>
          </div>
          <nav aria-label="Mobile primary" className="flex flex-col gap-2 py-6">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={close}
                className={`p-3 rounded-md font-mono text-sm hover:bg-[var(--surface-2)] ${active(l.label) ? "text-[var(--accent)]" : ""}`}
              >
                <span className="opacity-40">~/</span>
                {l.label}
              </Link>
            ))}
          </nav>
          <p className="mt-auto font-mono text-xs text-[var(--text-dim)]">
            building, one commit at a time.
          </p>
        </div>
      </dialog>
    </>
  );
}
