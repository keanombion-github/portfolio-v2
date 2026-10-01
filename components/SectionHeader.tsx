interface SectionHeaderProps {
  number: string;
  label: string;
  heading: string;
  path: string;
  subtitle?: string;
}

export function SectionHeader({
  number,
  label,
  heading,
  path,
  subtitle,
}: SectionHeaderProps) {
  return (
    <div className="flex items-baseline justify-between gap-6 mb-9 pb-5 border-b border-[var(--border)]">
      <div>
        <div className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--text-dim)] tracking-[0.05em]">
          <span className="text-[var(--accent)] mr-2">{number}</span>
          {label}
        </div>
        <h2 className="font-[family-name:var(--font-mono)] font-medium text-[clamp(28px,3.5vw,40px)] tracking-[-0.03em] text-[var(--text-bright)] mt-2 mb-0">
          {heading}
        </h2>
      </div>
      <div className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--text-dim)] text-right hidden sm:block">
        {path}
        {subtitle && (
          <>
            <br />
            <span className="text-[var(--text-faint)]">{subtitle}</span>
          </>
        )}
      </div>
    </div>
  );
}
