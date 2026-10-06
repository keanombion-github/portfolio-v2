import { experience } from "@/lib/experience";

export function WorkExperience() {
  return (
    <section id="experience" className="section-shell py-16" aria-labelledby="experience-heading">
      <p className="eyebrow">01 / PROFESSIONAL EXPERIENCE</p>
      <h2 id="experience-heading" className="mt-3 mb-5 font-mono text-3xl text-[var(--text-bright)]">The work behind the projects.</h2>
      <p className="max-w-2xl mb-9 leading-7">Building and maintaining client websites since 2017—from design handoffs and storefront launches to the support work that keeps them running.</p>
      <div className="grid gap-5">
        {experience.map((job) => (
          <article key={job.company} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-mono text-xl text-[var(--text-bright)]">{job.company}</h3>
                <p className="mt-2 text-sm text-[var(--accent)]">{job.role}</p>
              </div>
              <p className="font-mono text-xs leading-6 text-[var(--text-dim)]">{job.dates}</p>
            </div>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-7">
              {job.responsibilities.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
