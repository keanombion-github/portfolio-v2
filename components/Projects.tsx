import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projects";
import { SectionHeader } from "./SectionHeader";
export function Projects() {
  return (
    <section className="section-shell" id="projects">
      <SectionHeader
        number="02"
        label="FROM EXPERIENCE TO APPLICATIONS"
        heading="Selected projects"
        path="~/projects/featured"
        subtitle="Attendance, storefronts, fulfillment, and billing: practical workflows you can explore."
      />
      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((p, i) => (
          <Link
            href={`/project/${p.slug}`}
            className="project-card group"
            key={p.slug}
          >
            <div className="flex justify-between font-mono text-xs">
              <span className="text-[var(--accent)]">[0{i + 1}]</span>
              <span className="flex flex-wrap justify-end gap-2">
                {p.demoUrl && <span className="status-chip">{p.demoLabel || "Live demo available"}</span>}
                <span className="status-chip">{p.status}</span>
              </span>
            </div>
            {p.screenshots?.[0] && (
              <div className="relative mt-6 aspect-video overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
                <Image
                  src={p.screenshots[0].src}
                  alt={p.screenshots[0].alt}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 540px"
                  className="object-cover object-top"
                />
              </div>
            )}
            <h3 className="font-mono text-2xl text-[var(--text-bright)] mt-7 mb-2 group-hover:text-[var(--accent)] transition-colors">
              {p.title}{" "}
              <span className="float-right text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                ↗
              </span>
            </h3>
            <p className="font-mono text-xs text-[var(--text-dim)] mb-5">
              {p.role}
            </p>
            <p className="text-sm leading-7">{p.summary}</p>
            <div className="flex flex-wrap gap-2 mt-7">
              {p.stack.map((s) => (
                <span key={s} className="tag">
                  {s}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-between items-center border-t border-dashed border-[var(--border)] mt-9 pt-6 font-mono text-xs">
        <span>
          <span className="text-[var(--text-faint)]">$ </span>ls -al /projects{" "}
          <span className="hidden sm:inline text-[var(--text-faint)] ml-3">
            {"// follow the progress"}
          </span>
        </span>
        <Link className="button text-xs" href="/projects">
          $ view all →
        </Link>
      </div>
    </section>
  );
}
