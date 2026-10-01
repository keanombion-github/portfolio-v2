"use client";

import { useState, type FormEvent } from "react";

const fieldClass =
  "mt-2 w-full rounded-lg border border-[var(--border-strong)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text-bright)] placeholder:text-[var(--text-dim)]";

export function RecommendationForm() {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setPending(true);
    setResult(null);
    try {
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
        signal: AbortSignal.timeout(15000),
      });
      const payload = await response.json();
      if (!response.ok)
        throw new Error(
          payload.error ||
            "Your recommendation could not be sent. Please try again.",
        );
      setResult({
        success: true,
        message: "Thank you. Your recommendation was sent for review.",
      });
      form.reset();
    } catch (error) {
      setResult({
        success: false,
        message:
          error instanceof Error &&
          (error.name === "TimeoutError" || error.name === "AbortError")
            ? "The request timed out. Delivery could not be confirmed. Please wait before trying again."
            : error instanceof Error
              ? error.message
              : "Unable to connect. Please try again.",
      });
    } finally {
      setPending(false);
    }
  }
  return (
    <form
      onSubmit={submit}
      className="space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm">
          Your name
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            className={fieldClass}
          />
        </label>
        <label className="text-sm">
          Email <span className="muted">(private)</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            className={fieldClass}
          />
        </label>
      </div>
      <label className="block text-sm">
        Role or company <span className="muted">(optional)</span>
        <input
          name="role"
          autoComplete="organization-title"
          maxLength={150}
          className={fieldClass}
          placeholder="e.g. Designer, project collaborator"
        />
      </label>
      <label className="block text-sm">
        How have we worked together?
        <input
          name="relationship"
          required
          maxLength={200}
          className={fieldClass}
          placeholder="e.g. We collaborated on a storefront"
        />
      </label>
      <label className="block text-sm">
        Your recommendation
        <textarea
          name="quote"
          required
          minLength={30}
          maxLength={3000}
          rows={6}
          className={`${fieldClass} resize-y`}
          placeholder="What stood out about working together?"
        />
        <span className="muted mt-1 block text-xs">30–3,000 characters</span>
      </label>
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="flex items-start gap-3 text-xs leading-6">
        <input
          type="checkbox"
          name="consent"
          value="yes"
          required
          className="mt-1.5 accent-[var(--accent)]"
        />
        <span>
          I’m happy for my recommendation, name, role, and working relationship
          to be published on this portfolio after review.
        </span>
      </label>
      <button
        type="submit"
        disabled={pending}
        className="button button-primary disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send for review"}
        <span aria-hidden="true">↗</span>
      </button>
      <div aria-live="polite" role="status">
        {result && (
          <p
            className={`text-sm leading-6 ${result.success ? "text-[var(--accent)]" : "text-[var(--text-bright)]"}`}
          >
            {result.message}
          </p>
        )}
      </div>
    </form>
  );
}
