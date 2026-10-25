import Link from "next/link";
import { StatusBadge } from "./StatusBadge";
import { ChatWidget } from "./ChatWidget";
import { site, socialLinks } from "@/lib/site";
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
          Frontend Developer · E-commerce experience · Full-stack projects
        </p>
        <p className="text-[17px] leading-[1.8] max-w-[54ch]">
          I&apos;ve built and maintained client websites since 2017, including
          BigCommerce storefronts and custom JavaScript/React widgets. I&apos;m expanding into{" "}
          <em className="text-[var(--text-bright)] not-italic">full-stack</em>:
          React and Next.js on the frontend, .NET and PostgreSQL behind it.
          BigCommerce work and support for live websites taught me to care
          about the details people use every day.{" "}
          <span className="text-[var(--text-bright)]">
            I&apos;m putting that experience into storefronts, order fulfillment,
            and practical tools for business owners.
          </span>
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-9">
          <Link className="button button-primary" href="/#contact">
            → get in touch
          </Link>
          <Link className="button" href="/#projects">
            <span className="text-[var(--text-faint)]">$</span> ls projects/
          </Link>
          <a className="button" href={site.resume} target="_blank" rel="noopener noreferrer">
            View résumé (PDF) ↗
          </a>
        </div>
        <div className="mt-5 flex flex-wrap gap-4" aria-label="Professional profiles and email">
          {socialLinks.map((l) => (
            <a
              key={l.label}
              className="inline-flex min-h-11 items-center font-mono text-sm text-[var(--text-bright)] hover:text-[var(--accent)]"
              href={l.href}
              target={l.label === "Email" ? undefined : "_blank"}
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
