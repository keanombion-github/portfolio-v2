import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { RecommendationForm } from "@/components/RecommendationForm";
import { recommendations } from "@/lib/recommendations";

export const metadata = pageMetadata(
  "Recommendations",
  "Perspectives from people who have worked with Kean.",
  "/recommendations",
);

export default function RecommendationsPage() {
  return (
    <div className="section-shell py-12 sm:py-20">
      <header className="mb-12">
        <p className="mb-6 font-mono text-xs text-[var(--text-dim)]">
          <Link href="/" className="hover:text-[var(--accent)]">
            ~
          </Link>{" "}
          / recommendations
        </p>
        <h1 className="page-heading font-mono">
          <span className="text-[var(--accent)]">$</span> cat ~/references
        </h1>
        <p className="muted mt-4 max-w-xl text-lg leading-relaxed">
          Good work is collaborative. This is a space for the people who have
          been part of mine.
        </p>
      </header>
      {recommendations.length ? (
        <div className="mb-14 grid gap-5 sm:grid-cols-2">
          {recommendations.map((item) => (
            <figure
              key={item.id}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7"
            >
              <span
                aria-hidden="true"
                className="font-serif text-5xl text-[var(--accent)]"
              >
                “
              </span>
              <blockquote className="text-lg leading-8 text-[var(--text-bright)]">
                {item.quote}
              </blockquote>
              <figcaption className="mt-7 border-t border-[var(--border)] pt-5">
                <strong className="text-[var(--text-bright)]">
                  {item.name}
                </strong>
                <p className="muted mt-1 text-sm">{item.role}</p>
                <p className="mt-2 font-mono text-xs text-[var(--accent)]">
                  {item.relationship}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <section className="mb-14 rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface)] px-6 py-12 text-center">
          <span
            aria-hidden="true"
            className="font-serif text-6xl leading-none text-[var(--accent)]"
          >
            “
          </span>
          <h2 className="mt-3 text-xl font-medium text-[var(--text-bright)]">
            The first words are still to come.
          </h2>
          <p className="muted mx-auto mt-3 max-w-md text-sm leading-7">
            No recommendations have been published yet. If we’ve worked
            together, I’d love to hear about your experience.
          </p>
          <a href="#write-recommendation" className="button mt-6 inline-flex">
            Write a recommendation <span aria-hidden="true">↓</span>
          </a>
        </section>
      )}
      <section
        id="write-recommendation"
        className="grid scroll-mt-24 gap-9 border-t border-[var(--border)] pt-12 md:grid-cols-[0.8fr_1.2fr]"
      >
        <div>
          <p className="eyebrow">WORKED TOGETHER?</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-bright)]">
            Share your perspective.
          </h2>
          <p className="muted mt-5 text-sm leading-7">
            A project we collaborated on, a problem we solved, or what it was
            like working together — a few honest sentences go a long way.
          </p>
          <p className="muted mt-5 text-sm leading-7">
            Submissions are reviewed before publishing. Your email is used only
            for follow-up and is never displayed publicly.
          </p>
        </div>
        <div>
          <RecommendationForm />
        </div>
      </section>
    </div>
  );
}
