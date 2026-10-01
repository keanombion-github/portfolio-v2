import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import BlogIndex from "@/components/BlogIndex";
import { posts } from "@/lib/posts";

export const metadata = pageMetadata(
  "Developer notes",
  "Notes on portfolio architecture, full-stack development, and planning BoardSync.",
  "/blog",
);

export default function BlogPage() {
  return (
    <div className="page-shell">
      <nav
        aria-label="Breadcrumb"
        className="mb-10 font-mono text-xs text-[var(--text-dim)]"
      >
        <Link href="/" className="hover:text-[var(--accent)]">
          ~
        </Link>{" "}
        <span className="mx-2">/</span> <span aria-current="page">blog</span>
        <span className="ml-3 text-[var(--text-faint)]">
          · {posts.length} entries
        </span>
      </nav>
      <h1 className="page-heading font-mono text-4xl font-bold tracking-tight text-[var(--text-bright)] sm:text-5xl">
        <span className="text-[var(--text-dim)]">$</span> cat{" "}
        <span className="text-[var(--accent)]">~/notes</span>
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--text)]">
        Short notes on building for the web. Architecture decisions, project
        plans, and the details worth writing down along the way.
      </p>
      <BlogIndex />
      <div className="terminal-panel mt-10 flex flex-wrap items-center justify-between gap-5 p-6">
        <div>
          <h2 className="font-mono text-sm text-[var(--text-bright)]">
            Subscribe via RSS
          </h2>
          <p className="mt-2 text-sm text-[var(--text-dim)]">
            Follow new notes in your feed reader.
          </p>
        </div>
        <a href="/rss.xml" className="button font-mono text-xs">
          /rss.xml →
        </a>
      </div>
    </div>
  );
}
