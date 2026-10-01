"use client";

import Link from "next/link";
import { useState } from "react";
import { posts, formatPostDate } from "@/lib/posts";

export default function BlogIndex() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("all");
  const tags = ["all", ...new Set(posts.flatMap((post) => post.tags))];
  const filtered = posts.filter(
    (post) =>
      (tag === "all" || post.tags.includes(tag)) &&
      `${post.title} ${post.description} ${post.tags.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <div>
      <label className="mt-10 flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
        <span className="text-[var(--accent)]" aria-hidden="true">
          ❯
        </span>
        <span className="sr-only">Search posts</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="grep posts…"
          className="min-w-0 flex-1 bg-transparent font-mono text-sm outline-none"
        />
        <span className="hidden text-xs text-[var(--text-dim)] sm:block">
          {posts.length} notes
        </span>
      </label>
      <div
        aria-label="Filter posts by tag"
        className="my-5 flex flex-wrap gap-2"
      >
        {tags.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={tag === item}
            onClick={() => setTag(item)}
            className={`rounded border px-3 py-1.5 font-mono text-xs transition-colors ${tag === item ? "border-[var(--accent)] bg-[var(--accent-dim)] text-[var(--accent)]" : "border-[var(--border)] text-[var(--text-dim)] hover:text-[var(--text-bright)]"}`}
          >
            {item}{" "}
            <span className="ml-1 opacity-60">
              {item === "all"
                ? posts.length
                : posts.filter((post) => post.tags.includes(item)).length}
            </span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {filtered.length} posts found
      </p>
      <div className="mt-8 grid gap-6">
        {filtered.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] transition-colors hover:border-[var(--accent)]"
          >
            <div className="grid md:grid-cols-[0.8fr_1.2fr]">
              <div className="flex min-h-52 flex-col justify-center border-b border-[var(--border)] bg-[var(--surface-2)] p-6 font-mono md:border-r md:border-b-0 sm:p-8">
                <span className="mb-6 text-xs text-[var(--text-dim)]">
                  $ cat note.md
                </span>
                <span className="break-words text-lg leading-relaxed text-[var(--accent)]">
                  # {post.slug}
                </span>
                <span className="mt-6 text-xs text-[var(--text-dim)]">
                  read: ~{post.readingMinutes}min
                </span>
              </div>
              <div className="p-6 sm:p-8">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">
                  {post.slug === posts[0].slug
                    ? "★ Featured · architecture note"
                    : "Design notebook"}
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-bright)]">
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[var(--text)]">
                  {post.description}
                </p>
                <p className="mt-5 font-mono text-[10px] uppercase tracking-wider text-[var(--text-dim)]">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>{" "}
                  · {post.readingMinutes} min read
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-[var(--text-dim)]">
                  {post.tags.map((item) => (
                    <span key={item}>#{item}</span>
                  ))}
                </div>
                <span className="mt-6 inline-block font-mono text-xs text-[var(--accent)]">
                  read note{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="rounded-lg border border-dashed border-[var(--border)] p-10 text-center">
            <p>No notes match that search.</p>
            <button
              className="mt-4 text-sm text-[var(--accent)]"
              onClick={() => {
                setQuery("");
                setTag("all");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
