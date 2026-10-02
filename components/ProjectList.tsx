"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/projects";
export function ProjectList() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("all");
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    function shortcut(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        input.current?.focus();
      }
    }
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, []);
  const tags = ["all", "React", "Next.js", ".NET", "PostgreSQL"];
  const filtered = projects.filter(
    (p) =>
      (tag === "all" || p.stack.includes(tag)) &&
      [p.title, p.summary, ...p.stack]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase().trim()),
  );
  return (
    <>
      <div className="search-bar">
        <span aria-hidden="true" className="text-[var(--accent)]">
          ›
        </span>
        <input
          ref={input}
          aria-label="Search projects"
          placeholder="grep projects…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button aria-label="Clear search" onClick={() => setQuery("")}>
            ✕
          </button>
        )}
        <kbd>⌘/Ctrl K</kbd>
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map((t) => (
          <button
            key={t}
            aria-pressed={tag === t}
            className={`filter-chip ${tag === t ? "selected" : ""}`}
            onClick={() => setTag(t)}
          >
            {t}{" "}
            <span className="opacity-50">
              {t === "all"
                ? projects.length
                : projects.filter((p) => p.stack.includes(t)).length}
            </span>
          </button>
        ))}
      </div>
      <p aria-live="polite" className="sr-only">
        {filtered.length} projects found
      </p>
      <div>
        {filtered.map((p) => (
          <Link
            key={p.slug}
            href={`/project/${p.slug}`}
            className="project-row group"
          >
            <span className="font-mono text-xs text-[var(--text-dim)]">
              {p.status}
              {p.demoUrl && (
                <span className="mt-2 block text-[var(--accent)]">Live demo ↗</span>
              )}
            </span>
            <div>
              <h2 className="font-mono text-xl text-[var(--text-bright)] group-hover:text-[var(--accent)] mb-3">
                {p.title} <span className="opacity-40">→</span>
              </h2>
              <p className="text-sm leading-7 max-w-2xl">{p.summary}</p>
            </div>
            <div className="text-xs font-mono md:text-right">
              <span className="text-[var(--accent)]">{p.role}</span>
              <p className="mt-2 text-[var(--text-dim)]">
                {p.stack.slice(0, 3).join(" / ")}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="terminal-panel text-center py-16">
          <p className="font-mono text-[var(--text-bright)]">
            No matching projects.
          </p>
          <p className="mt-3 text-sm">
            Try a different search or reset your filters.
          </p>
          <button
            className="button mt-5"
            onClick={() => {
              setQuery("");
              setTag("all");
            }}
          >
            reset filters
          </button>
        </div>
      )}
    </>
  );
}
