import { experience } from "@/lib/experience";
import { ScrollReveal } from "./ScrollReveal";

export function WorkExperience() {
  return (
    <section id="experience" className="section-shell py-16" aria-labelledby="experience-heading">
      <ScrollReveal className="motion-text-surface">
      <p className="eyebrow">01 / PROFESSIONAL EXPERIENCE</p>
      <h2 id="experience-heading" className="mt-3 mb-5 font-mono text-3xl text-[var(--text-bright)]">The work behind the projects.</h2>
      <p className="max-w-2xl mb-9 leading-7">Building and maintaining client websites since 2017—from design handoffs and storefront launches to the support work that keeps them running.</p>
      </ScrollReveal>
      <div className="grid gap-5">
        <ScrollReveal>
          <article className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
            <p className="eyebrow">CLIENT WORK / LIVE E-COMMERCE</p>
            <h3 className="mt-3 font-mono text-xl text-[var(--text-bright)]">Our Taap</h3>
            <p className="mt-2 text-sm text-[var(--accent)]">UI/UX implementation · Feature delivery · Maintenance</p>
            <p className="mt-5 max-w-3xl text-sm leading-7">
              I deliver and maintain frontend features across much of the Our Taap
              shopping experience, from the storefront through checkout. My work
              focuses on implementing and maintaining the customer-facing UI and UX
              as part of the team supporting the live website.
            </p>
            <a className="button mt-5 text-xs" href="https://ourtaap.com/" target="_blank" rel="noopener noreferrer">
              Visit Our Taap <span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span>
            </a>
          </article>
        </ScrollReveal>
        {experience.map((job, index) => (
          <ScrollReveal key={job.company} delay={index * 80}>
          <article className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
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
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
