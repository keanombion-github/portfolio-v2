import Link from "next/link";
import { StatusBadge } from "./StatusBadge";
import { ChatWidget } from "./ChatWidget";
import { socialLinks } from "@/lib/site";
export function Hero() {
  return (
    <section id="top" className="hero-grid">
      <div className="hero-copy">
        <StatusBadge />
        <h1 className="hero-title">
          <span className="text-[var(--text-faint)] font-light">$ </span>hi,
          I&apos;m <span className="text-[var(--accent)]">Kean</span>
          <span className="terminal-cursor" aria-hidden="true" />
        </h1>
        <p className="font-mono text-sm text-[var(--text-dim)] mb-7">
          Frontend Developer · Full-Stack in progress · Remote
        </p>
        <p className="text-[17px] leading-[1.8] max-w-[54ch]">
          I build interfaces that ship, and I&apos;m expanding into{" "}
          <em className="text-[var(--text-bright)] not-italic">full-stack</em>:
          .NET on the backend, React on the front, PostgreSQL and AWS tying it
          together. From BigCommerce storefronts to day-to-day support, I care
          about software that works for the people using it.{" "}
          <span className="text-[var(--text-bright)]">
            Now building BoardSync.
          </span>
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-9">
          <Link className="button button-primary" href="/#contact">
            → get in touch
          </Link>
          <Link className="button" href="/#projects">
            <span className="text-[var(--text-faint)]">$</span> ls projects/
          </Link>
          {socialLinks.map((l) => (
            <a
              key={l.label}
              className="text-xs font-mono text-[var(--text-dim)] hover:text-[var(--accent)]"
              href={l.href}
              target={l.label === "email" ? undefined : "_blank"}
              rel="noopener noreferrer"
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      </div>
      <ChatWidget />
    </section>
  );
}
