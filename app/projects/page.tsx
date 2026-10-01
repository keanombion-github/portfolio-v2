import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { ProjectList } from "@/components/ProjectList";
import { projects } from "@/lib/projects";
export const metadata = pageMetadata(
  "Projects",
  "Work in progress: BoardSync and early experiments in full-stack development.",
  "/projects",
);
export default function ProjectsPage() {
  return (
    <section className="page-shell">
      <div className="eyebrow">
        <Link href="/">~</Link> / projects{" "}
        <span className="opacity-50">· {projects.length} entries</span>
      </div>
      <h1 className="page-heading">
        <span className="text-[var(--text-faint)]">$ </span>ls -al{" "}
        <span className="text-[var(--accent)]">~/projects</span>
        <span className="terminal-cursor" aria-hidden="true" />
      </h1>
      <p className="page-intro">
        A workbench for products, tools, and experiments. Follow along as ideas
        become working software.
      </p>
      <ProjectList />
    </section>
  );
}
