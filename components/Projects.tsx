import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projects";
import { SectionHeader } from "./SectionHeader";
import { ScrollReveal } from "./ScrollReveal";
import { ProjectMotionLink } from "./ProjectMotionLink";
export function Projects() {
  const featuredProjects = projects.slice(0, 3);
  return (
    <section className="section-shell" id="projects">
      <ScrollReveal>
      <SectionHeader
        number="02"
        label="FROM EXPERIENCE TO APPLICATIONS"
        heading="Selected projects"
        path="~/projects/featured"
        subtitle="Live client work and practical application projects. Browse the full collection for more."
      />
      </ScrollReveal>
      <div className="grid md:grid-cols-2 gap-5">
        {featuredProjects.map((p, i) => (
          <ScrollReveal key={p.slug} delay={(i % 2) * 150} className="h-full">
          <ProjectMotionLink href={`/project/${p.slug}`}>
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
                  className="project-preview object-cover object-top"
                />
              </div>
            )}
            <h3 className="font-mono text-2xl text-[var(--text-bright)] mt-7 mb-2 group-hover:text-[var(--accent)] group-focus-visible:text-[var(--accent)] transition-colors">
              {p.title}{" "}
              <span className="project-arrow float-right text-lg opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
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
          </ProjectMotionLink>
          </ScrollReveal>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 justify-between items-center border-t border-dashed border-[var(--border)] mt-9 pt-6 font-mono text-xs">
        <span>
          Showing {featuredProjects.length} of {projects.length} projects
        </span>
        <Link className="button text-xs" href="/projects">
          View all projects →
        </Link>
      </div>
    </section>
  );
}
