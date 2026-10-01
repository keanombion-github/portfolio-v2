import Link from "next/link";
export default function NotFound() {
  return (
    <section className="page-shell min-h-[65vh]">
      <p className="eyebrow">exit code: 404</p>
      <h1 className="page-heading">
        <span className="text-[var(--text-faint)]">$ </span>page{" "}
        <span className="text-[var(--accent)]">not found</span>
      </h1>
      <p className="page-intro">
        That path doesn&apos;t exist. Let&apos;s get you back to familiar
        ground.
      </p>
      <Link href="/" className="button button-primary">
        ← cd ~
      </Link>
      <Link href="/projects" className="button ml-3">
        ls projects/
      </Link>
    </section>
  );
}
