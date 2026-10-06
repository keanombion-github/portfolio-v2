import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { ProjectList } from "@/components/ProjectList";
import { projects } from "@/lib/projects";
export const metadata = pageMetadata(
  "Projects",
  "Explore OrderPilot, K3 Billing Tracker, StoreCraft, and BoardSync: commerce, operations, and business workflows.",
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
