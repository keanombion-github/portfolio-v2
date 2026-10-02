import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { ShareButtons } from "@/components/ShareButtons";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return p ? pageMetadata(p.title, p.summary, `/project/${p.slug}`) : { title: "Project not found" };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <article className="page-shell">
      <Link href="/projects" className="eyebrow hover:text-[var(--accent)]">
        ← cd ../projects
      </Link>
      <div className="mt-10 flex gap-3">
        <span className="status-chip">{p.status}</span>
        <span className="eyebrow">{p.role}</span>
      </div>
      <h1 className="page-heading max-w-4xl">{p.title}</h1>
      <p className="page-intro">
        {p.subtitle}. {p.summary}
      </p>
      {p.demoUrl && (
        <a
          className="button button-primary mb-8"
          href={p.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${p.title} live demo in a new tab`}
        >
          ↗ Open live demo
        </a>
      )}
      <div className="flex flex-wrap gap-2 mb-12">
        {p.stack.map((s) => (
          <span key={s} className="tag">
            {s}
          </span>
        ))}
      </div>
      <div className="grid lg:grid-cols-[1fr_230px] gap-14">
        <div className="prose-content">
          {p.sections.map((s) => (
            <section key={s.id} id={s.id} className="mb-12">
              <h2>
                <span className="text-[var(--accent)]">## </span>
                {s.title}
              </h2>
              <p>{s.body}</p>
            </section>
          ))}
          <ShareButtons />
        </div>
        <aside className="hidden lg:block">
          <nav
            aria-label="On this page"
            className="sticky top-28 border-l border-[var(--border)] pl-6 font-mono text-xs"
          >
            <p className="text-[var(--text-bright)] mb-5">## ON THIS PAGE</p>
            {p.sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="block py-2 hover:text-[var(--accent)]"
              >
                {s.title}
              </a>
            ))}
          </nav>
        </aside>
      </div>
    </article>
  );
}

