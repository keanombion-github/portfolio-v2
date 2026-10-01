import Link from "next/link";
import { socialLinks } from "@/lib/site";
export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <span>© {new Date().getFullYear()} kean</span>
        <span className="text-[var(--text-faint)]">
          {" "}
          · built with curiosity & Next.js
        </span>
      </div>
      <div className="flex flex-wrap gap-5">
        <a href="/rss.xml">/rss.xml</a>
        <a href="/sitemap.xml">/sitemap.xml</a>
        {socialLinks
          .filter((l) => l.label !== "email")
          .map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {l.label}
            </a>
          ))}
        <Link href="/about">about</Link>
      </div>
    </footer>
  );
}
