export function StatusBadge() {
  return (
    <div className="glass inline-flex items-center gap-2.5 font-[family-name:var(--font-mono)] text-[12px] tracking-[0.04em] text-[var(--text-dim)] py-1.5 px-3 rounded-full mb-7 max-w-full">
      <span
        className="rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent-glow)] animate-[blip-pulse_1.6s_ease-in-out_infinite] inline-block shrink-0"
        style={{ width: 7, height: 7 }}
        aria-hidden="true"
      />
      <span>AVAILABLE · open to freelance &amp; full-time</span>
    </div>
  );
}
