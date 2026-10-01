import { SectionHeader } from "./SectionHeader";

const stackItems = [
  "React",
  "Next.js",
  ".NET",
  "PostgreSQL",
  "AWS",
  "TanStack Query",
  "Zustand",
  "SignalR",
  "Redis",
  "Stripe",
];

export function About() {
  return (
    <section className="relative py-20" id="about">
      <SectionHeader
        number="03"
        label="ABOUT"
        heading="$ whoami"
        path="~/about"
      />

      <div className="max-w-[680px] space-y-6">
        <p className="text-[16px] leading-[1.7] text-[var(--text)] text-pretty">
          I started as a frontend developer, working across BigCommerce
          storefronts, Figma-to-code handoffs, and day-to-day support/operations
          work — SLA ticket management, cross-functional troubleshooting, the
          stuff that keeps a product running. Along the way I picked up AWS S3
          workflows and got fluent in turning designs into shippable code.
        </p>

        <p className="text-[16px] leading-[1.7] text-[var(--text)] text-pretty">
          Right now I&apos;m upskilling into full-stack:{" "}
          <em className="text-[var(--accent)] not-italic">.NET</em> on the
          backend,{" "}
          <em className="text-[var(--accent)] not-italic">React/Next.js</em> on
          the front,{" "}
          <em className="text-[var(--accent)] not-italic">
            PostgreSQL and AWS
          </em>{" "}
          tooling tying it together. Two side projects are where that&apos;s
          coming together —
        </p>

        <ul className="space-y-3 text-[15px] leading-[1.6] text-[var(--text)] list-none pl-0">
          <li>
            <span className="text-[var(--accent)] font-[family-name:var(--font-mono)] text-[13px] mr-2">
              →
            </span>
            <strong className="text-[var(--text-bright)]">BoardSync</strong> — a
            real-time collaborative Kanban board, built to demonstrate hireable
            full-stack skills end-to-end.
          </li>
          <li>
            <span className="text-[var(--accent)] font-[family-name:var(--font-mono)] text-[13px] mr-2">
              →
            </span>
            <strong className="text-[var(--text-bright)]">
              Invoice Reminder
            </strong>{" "}
            — a lean micro-SaaS experiment: escalating payment reminder emails
            with embedded Stripe Payment Links.
          </li>
        </ul>

        {/* Current stack */}
        <div className="pt-6">
          <h3 className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--text-dim)] tracking-[0.05em] mb-4">
            CURRENT STACK
          </h3>
          <div className="flex flex-wrap gap-2">
            {stackItems.map((tech) => (
              <span
                key={tech}
                className="font-[family-name:var(--font-mono)] text-[12px] py-1.5 px-3 rounded-full border border-[var(--border)] text-[var(--text-dim)] bg-[var(--surface)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-[border-color,color] duration-150"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="pt-4">
          <h3 className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--text-dim)] tracking-[0.05em] mb-3">
            TOOLS I WORK IN
          </h3>
          <p className="text-[14px] text-[var(--text-dim)] font-[family-name:var(--font-mono)]">
            Fork (Git GUI) · Antigravity (IDE) · figma-developer-mcp
          </p>
        </div>
      </div>
    </section>
  );
}
