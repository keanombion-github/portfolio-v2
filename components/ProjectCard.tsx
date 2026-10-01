interface ProjectCardProps {
  index: string;
  title: string;
  year: string;
  role: string;
  description: string;
  stack: string[];
  links?: { label: string; href: string }[];
}

export function ProjectCard({
  index,
  title,
  year,
  role,
  description,
  stack,
  links,
}: ProjectCardProps) {
  return (
    <article className="relative flex flex-col glass rounded-xl p-[22px] min-h-[320px] overflow-hidden transition-[border-color,transform] duration-200 hover:border-[var(--accent)] hover:-translate-y-0.5 after:content-[''] after:absolute after:inset-0 after:rounded-[inherit] after:bg-[radial-gradient(circle_at_100%_0%,var(--accent-dim),transparent_60%)] after:opacity-0 after:transition-opacity after:duration-[250ms] after:pointer-events-none hover:after:opacity-100">
      {/* Corner brackets */}
      <span className="absolute w-[10px] h-[10px] border border-[var(--accent)] opacity-50 top-[-1px] left-[-1px] border-r-0 border-b-0" />
      <span className="absolute w-[10px] h-[10px] border border-[var(--accent)] opacity-50 top-[-1px] right-[-1px] border-l-0 border-b-0" />
      <span className="absolute w-[10px] h-[10px] border border-[var(--accent)] opacity-50 bottom-[-1px] left-[-1px] border-r-0 border-t-0" />
      <span className="absolute w-[10px] h-[10px] border border-[var(--accent)] opacity-50 bottom-[-1px] right-[-1px] border-l-0 border-t-0" />

      {/* Index */}
      <div className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--accent)] tracking-[0.08em]">
        [{index}]
      </div>

      {/* Title */}
      <h3 className="font-[family-name:var(--font-mono)] text-[22px] tracking-[-0.02em] text-[var(--text-bright)] mt-3.5 mb-1.5 font-medium">
        {title}
      </h3>

      {/* Meta */}
      <div className="font-[family-name:var(--font-mono)] text-[11.5px] text-[var(--text-dim)] mb-3.5 flex items-center gap-2">
        <span>{year}</span>
        <span className="text-[var(--text-faint)]">·</span>
        <span>{role}</span>
      </div>

      {/* Description */}
      <p className="text-[14px] text-[var(--text)] leading-[1.55] mb-[18px] text-pretty">
        {description}
      </p>

      {/* Stack pills */}
      <div className="flex flex-wrap gap-1.5 mt-auto mb-3.5">
        {stack.map((tech) => (
          <span
            key={tech}
            className="font-[family-name:var(--font-mono)] text-[11px] py-1 px-2.5 rounded-full border border-[var(--border)] text-[var(--text-dim)] bg-[var(--surface)]"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      {links && links.length > 0 && (
        <div className="flex gap-3.5 pt-3.5 border-t border-dashed border-[var(--border)]">
          {links.map((link) => (
            <a
              key={link.href}
              className="font-[family-name:var(--font-mono)] whitespace-nowrap text-[13px] text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors relative z-[1]"
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              ↗ {link.label}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
