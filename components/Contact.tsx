"use client";

import { useRef, useState, type FormEvent } from "react";
import { SectionHeader } from "./SectionHeader";
import { site } from "@/lib/site";
import { submitNetlifyForm } from "@/lib/netlify-form";

const fieldClass =
  "w-full rounded-md border border-[var(--border-strong)] bg-[var(--bg)] px-3 py-3 text-[13px] text-[var(--text-bright)] outline-none transition-colors focus:border-[var(--accent)] disabled:opacity-60";
const labelClass =
  "mb-2 block font-[family-name:var(--font-mono)] text-[10px] tracking-wider text-[var(--text-dim)]";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [feedback, setFeedback] = useState("");
  const submitting = useRef(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    const form = e.currentTarget;
    setStatus("sending");
    setFeedback("Sending your message…");
    try {
      await submitNetlifyForm(form, "contact", 20000);
      setStatus("sent");
      setFeedback("Thanks — your message has been submitted.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error && error.name !== "TimeoutError"
          ? error.message
          : "We couldn't confirm delivery. Please try again later or use a direct contact link.",
      );
    } finally {
      submitting.current = false;
    }
  }
  const links = [
    { label: "GitHub", href: site.github },
    { label: "LinkedIn", href: site.linkedin },
    { label: "Book a conversation", href: site.booking },
  ].filter((link) => link.href);
  return (
    <section className="relative py-16 sm:py-20" id="contact">
      <SectionHeader
        number="03"
        label="GET IN TOUCH"
        heading="Let's build something."
        path="~/contact"
      />
      <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
        <div>
          <p className="max-w-sm text-[15px] leading-relaxed text-[var(--text)]">
            Have a project in mind, a role to discuss, or just want to say
            hello? I&apos;d love to hear what you&apos;re working on.
          </p>
          <p className="mt-5 font-[family-name:var(--font-mono)] text-xs leading-relaxed text-[var(--text-dim)]">
            React / Next.js · .NET
            <br />
            PostgreSQL · AWS
          </p>
          {site.email && (
            <a
              className="mt-7 inline-block break-all border-b border-dashed border-[var(--border-strong)] pb-1 font-[family-name:var(--font-mono)] text-[var(--text-bright)] hover:text-[var(--accent)]"
              href={`mailto:${site.email}`}
            >
              {site.email} ↗
            </a>
          )}
          {links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-4">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[family-name:var(--font-mono)] text-xs text-[var(--text-dim)] hover:text-[var(--accent)]"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
        <form name="contact" method="POST" onSubmit={submit} className="glass rounded-xl p-5 sm:p-6">
          <input type="hidden" name="form-name" value="contact" />
          <fieldset disabled={status === "sending"} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="contact-name">
                  NAME *
                </label>
                <input
                  className={fieldClass}
                  id="contact-name"
                  name="name"
                  required
                  maxLength={100}
                  autoComplete="name"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="contact-email">
                  EMAIL *
                </label>
                <input
                  className={fieldClass}
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div>
              <label className={labelClass} htmlFor="contact-message">
                MESSAGE *
              </label>
              <textarea
                className={`${fieldClass} min-h-[130px] resize-y`}
                id="contact-message"
                name="message"
                required
                minLength={10}
                maxLength={2000}
                placeholder="Tell me a little about your project…"
              />
            </div>
            <div className="hidden" aria-hidden="true">
              <label htmlFor="contact-website">Leave this empty</label>
              <input
                id="contact-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--text-faint)]">
                a good conversation starts here.
              </span>
              <button
                className="cursor-pointer rounded-md border border-[var(--accent)] bg-[var(--accent)] px-4 py-2.5 font-[family-name:var(--font-mono)] text-xs font-semibold text-[var(--on-accent)] transition-colors hover:bg-transparent hover:text-[var(--accent)] disabled:opacity-50"
                type="submit"
              >
                {status === "sending" ? "sending…" : "send message ↗"}
              </button>
            </div>
          </fieldset>
          <p
            role={status === "error" ? "alert" : "status"}
            aria-live="polite"
            className={`mt-3 text-xs leading-relaxed ${status === "error" ? "text-[var(--text)]" : "text-[var(--accent)]"}`}
          >
            {feedback}
          </p>
        </form>
      </div>
    </section>
  );
}
