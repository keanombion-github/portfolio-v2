"use client";

import { useState } from "react";

export function ShareButtons({ title }: { title?: string }) {
  const [status, setStatus] = useState("Copy link");
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus("Link copied!");
    } catch {
      setStatus("Unable to copy link");
    }
  }
  function share(network: "linkedin" | "x") {
    const url = encodeURIComponent(window.location.href);
    const destination =
      network === "linkedin"
        ? `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
        : `https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(title ?? document.title)}`;
    window.open(destination, "_blank", "noopener,noreferrer");
  }
  return (
    <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
      <span className="mr-1 text-[var(--text-dim)]">share note</span>
      <button
        className="rounded border border-[var(--border)] px-3 py-2 hover:text-[var(--accent)]"
        onClick={copyLink}
        aria-live="polite"
      >
        {status}
      </button>
      <button
        className="rounded border border-[var(--border)] px-3 py-2 hover:text-[var(--accent)]"
        onClick={() => share("linkedin")}
        aria-label="Share on LinkedIn"
      >
        LinkedIn ↗
      </button>
      <button
        className="rounded border border-[var(--border)] px-3 py-2 hover:text-[var(--accent)]"
        onClick={() => share("x")}
        aria-label="Share on X"
      >
        X ↗
      </button>
    </div>
  );
}

export default ShareButtons;
