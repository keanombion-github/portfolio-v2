"use client";

import { useState } from "react";
import type { Post } from "@/lib/posts";

function CodeBlock({
  code,
}: {
  code: NonNullable<Post["sections"][number]["code"]>;
}) {
  const [status, setStatus] = useState("Copy");
  async function copy() {
    try {
      await navigator.clipboard.writeText(code.content);
      setStatus("Copied!");
    } catch {
      setStatus("Copy unavailable");
    }
  }
  return (
    <div className="my-7 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
      <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2 font-mono text-xs text-[var(--text-dim)]">
        <span>{code.language}</span>
        <button
          type="button"
          onClick={copy}
          aria-live="polite"
          className="px-2 py-1 hover:text-[var(--accent)]"
        >
          {status}
        </button>
      </div>
      <pre className="overflow-x-auto p-5 text-xs leading-7 text-[var(--text-bright)] sm:text-sm">
        <code>{code.content}</code>
      </pre>
    </div>
  );
}

export default function ArticleBody({ post }: { post: Post }) {
  return (
    <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_210px]">
      <div className="min-w-0">
        {post.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="mb-12 scroll-mt-28"
          >
            <h2 className="mb-5 text-xl font-semibold tracking-tight text-[var(--text-bright)] sm:text-2xl">
              <a href={`#${section.id}`} className="hover:text-[var(--accent)]">
                <span className="mr-2 font-mono text-[var(--accent)]">#</span>
                {section.title}
              </a>
            </h2>
            {section.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="mb-5 text-[15px] leading-8 text-[var(--text)]"
              >
                {paragraph}
              </p>
            ))}
            {section.code && <CodeBlock code={section.code} />}
          </section>
        ))}
      </div>
      <aside className="order-first rounded-lg border border-[var(--border)] p-5 lg:sticky lg:top-28 lg:order-last">
        <nav aria-label="Table of contents">
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-dim)]">
            On this page
          </p>
          <ol className="space-y-4">
            {post.sections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="flex gap-3 text-xs leading-5 text-[var(--text)] hover:text-[var(--accent)]"
                >
                  <span className="font-mono text-[var(--text-dim)]">
                    0{index + 1}
                  </span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </aside>
    </div>
  );
}
