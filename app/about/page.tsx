import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { WorkExperience } from "@/components/WorkExperience";

export const metadata = pageMetadata(
  "About",
  "Kean's path from frontend and ecommerce work to full-stack development.",
  "/about",
);

const progression = [
  {
    label: "THE FOUNDATION",
    title: "Making designs work in the browser",
    text: "Frontend development across BigCommerce storefronts and Figma-to-code handoffs. Turning visual details into responsive, usable interfaces.",
  },
  {
    label: "THE REAL-WORLD CONTEXT",
    title: "Keeping things running",
    text: "Support and operations brought SLA ticket management, cross-functional troubleshooting, and AWS S3 workflows into the picture. The work continues after a feature ships.",
  },
  {
    label: "THE NEXT CHAPTER",
    title: "Connecting the whole application",
    text: "Building on that foundation with .NET, React and Next.js, PostgreSQL, and AWS. Learning by putting the pieces together in personal projects.",
  },
];

export default function AboutPage() {
  return (
    <div className="section-shell py-12 sm:py-20">
      <header className="mb-10 sm:mb-14">
        <p className="mb-6 font-mono text-xs text-[var(--text-dim)]">
          <Link href="/" className="hover:text-[var(--accent)]">
            ~
          </Link>{" "}
          / about
        </p>
        <h1 className="page-heading font-mono">
          <span className="text-[var(--accent)]">$</span> whoami
        </h1>
        <p className="muted mt-4 max-w-xl text-lg leading-relaxed">
          The work, the learning, and the person connecting the dots.
        </p>
      </header>
      <div className="grid items-start gap-8 md:grid-cols-[0.8fr_1.2fr]">
        <aside className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <div className="relative flex min-h-64 flex-col justify-between bg-[var(--accent-dim)] p-8 sm:min-h-80">
            <p className="font-mono text-xs tracking-widest text-[var(--accent)]">
              DEVELOPER / ALWAYS LEARNING
            </p>
            <div>
              <span
                aria-hidden="true"
                className="text-[100px] font-semibold leading-none tracking-[-0.09em] text-[var(--text-bright)]"
              >
                k<span className="text-[var(--accent)]">.</span>
              </span>
              <p className="mt-5 text-2xl font-semibold text-[var(--text-bright)]">
                Kean
              </p>
            </div>
            <span
              aria-hidden="true"
              className="absolute right-7 bottom-8 font-mono text-4xl text-[var(--accent)]"
            >
              &lt;/&gt;
            </span>
          </div>
          <dl className="space-y-5 p-7 text-sm">
            {[
              ["Background", "Frontend & ecommerce"],
              ["Perspective", "Design, code & operations"],
              ["Direction", "Full-stack development"],
            ].map(([key, value]) => (
              <div key={key} className="flex flex-wrap justify-between gap-2">
                <dt className="muted">{key}</dt>
                <dd className="text-[var(--text-bright)]">{value}</dd>
              </div>
            ))}
          </dl>
        </aside>
        <div>
          <div className="terminal-panel mb-7 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
            <div className="border-b border-[var(--border)] px-5 py-3 font-mono text-xs text-[var(--text-dim)]">
              ~/about
            </div>
            <div className="p-5 font-mono text-sm leading-7">
              <p>
                <span className="text-[var(--accent)]">❯</span> whoami
              </p>
              <p className="mt-2 text-[var(--text-bright)]">
                Kean — frontend developer, growing into full-stack.
              </p>
              <p className="mt-2 text-[var(--text-dim)]">
                Design experience. Operational context. Working applications.
              </p>
            </div>
          </div>
          <div className="prose-content space-y-5 leading-8">
            <p>
              I started on the frontend: BigCommerce storefronts, Figma
              handoffs, and the careful work of turning a design into something
              people can actually use.
            </p>
            <p>
              Alongside that came support and operations — managing SLA tickets,
              troubleshooting across teams, and working with AWS S3. It gave me
              a broader view of software: the details on the screen matter, and
              so does everything that keeps it working.
            </p>
            <p>
              Now I’m working toward full-stack development. I’m learning .NET,
              deepening my React and Next.js skills, and bringing PostgreSQL and
              Supabase into the picture. BoardSync gives me a collaboration
              workflow to explore; StoreCraft brings me back to e-commerce,
              this time connecting a merchant workspace to the storefront.
            </p>
          </div>
          <Link href="/projects" className="button mt-7 inline-flex">
            Explore my projects <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
      <WorkExperience />
      <section className="mt-20" aria-labelledby="education-title">
        <p className="eyebrow">EDUCATION</p>
        <h2 id="education-title" className="mt-3 text-2xl text-[var(--text-bright)]">Bachelor of Science in Computer Science</h2>
        <p className="mt-3 text-[var(--text-dim)]">DCLC · 2011–2015</p>
      </section>
      <section className="mt-20" aria-labelledby="journey-title">
        <p className="eyebrow">01 / EXPERIENCE &amp; LEARNING</p>
        <h2
          id="journey-title"
          className="mt-3 font-mono text-2xl font-semibold tracking-tight text-[var(--text-bright)]"
        >
          A foundation to build on.
        </h2>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {progression.map((item, i) => (
            <article
              key={item.label}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6"
            >
              <span className="font-mono text-sm text-[var(--accent)]">
                0{i + 1}
              </span>
              <p className="mt-6 font-mono text-[10px] tracking-widest text-[var(--text-dim)]">
                {item.label}
              </p>
              <h3 className="mt-3 text-xl font-medium text-[var(--text-bright)]">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="mt-16" aria-labelledby="currently-title">
        <p className="eyebrow">02 / CURRENTLY</p>
        <h2
          id="currently-title"
          className="mt-3 font-mono text-2xl font-semibold tracking-tight text-[var(--text-bright)]"
        >
          Currently.
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <article className="rounded-xl border border-[var(--border)] p-6">
            <p className="font-mono text-xs text-[var(--accent)]">
              BUILDING · IN PROGRESS
            </p>
            <h3 className="mt-3 text-xl text-[var(--text-bright)]">
              BoardSync
            </h3>
            <p className="mt-3 text-sm leading-7">
              A collaborative Kanban board to practice building a full-stack
              application, including real-time collaboration.
            </p>
          </article>
          <article className="rounded-xl border border-[var(--border)] p-6">
            <p className="font-mono text-xs text-[var(--accent)]">
              BUILDING · EXPERIMENTAL MVP
            </p>
            <h3 className="mt-3 text-xl text-[var(--text-bright)]">
              StoreCraft
            </h3>
            <p className="mt-3 text-sm leading-7">
              An e-commerce workspace with products, orders, shipping settings,
              and a visual storefront builder. The public demo uses fictional
              data and simulated payments.
            </p>
          </article>
        </div>
        <p className="mt-6 text-sm leading-7">ShiftLedger explores attendance review and approved-hours exports. OrderPilot extends this work into fulfillment, while K3 Billing Tracker addresses a friend&apos;s payment-tracking problem. These projects connect my frontend foundation to the operations and everyday tasks behind a business.</p>
        <Link href="/blog/from-storefront-work-to-full-stack-projects" className="button mt-7 inline-flex">
          Read how these projects connect →
        </Link>
      </section>
    </div>
  );
}
