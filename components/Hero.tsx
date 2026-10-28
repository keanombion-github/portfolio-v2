import Link from "next/link";
import { StatusBadge } from "./StatusBadge";
import { ChatWidget } from "./ChatWidget";
import { site, socialLinks } from "@/lib/site";
import { ScrollReveal } from "./ScrollReveal";
export function Hero() {
  return (
    <section id="top" className="hero-grid">
      <div className="hero-copy motion-text-surface">
        <ScrollReveal><StatusBadge /></ScrollReveal>
        <ScrollReveal delay={90}>
        <h1 className="hero-title">
          <span className="text-[var(--text-faint)] font-light">$ </span>hi,
          I&apos;m <span className="text-[var(--accent)]">Kean</span>
          <span className="terminal-cursor" aria-hidden="true" />
        </h1>
        </ScrollReveal>
        <ScrollReveal delay={170}>
        <p className="font-mono text-sm text-[var(--text-dim)] mb-7">
          Frontend Developer · BigCommerce · React / Next.js
        </p>
        <p className="mb-6 text-sm leading-6 text-[var(--text-dim)]">
          Based in the Philippines · Open to remote work
        </p>
        </ScrollReveal>
        <ScrollReveal delay={250}>
        <p className="text-[17px] leading-[1.8] max-w-[54ch]">
          I&apos;ve built and maintained client websites since 2017. My professional
          work includes responsive BigCommerce storefronts, Figma-to-code delivery,
          JavaScript/React widgets, REST API integration, and support for live stores.{" "}
          <span className="text-[var(--text-bright)]">
            I help teams turn designs into usable interfaces and keep their
            websites working. My portfolio projects extend that foundation with
            React, Next.js, .NET, and PostgreSQL.
          </span>
        </p>
        </ScrollReveal>
        <ScrollReveal delay={330}>
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
        </ScrollReveal>
        <ScrollReveal delay={410}>
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
        </ScrollReveal>
      </div>
      <ScrollReveal delay={220} className="h-full [&>div]:h-full"><ChatWidget /></ScrollReveal>
    </section>
  );
}
