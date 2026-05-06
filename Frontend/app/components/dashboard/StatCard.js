"use client";

/**
 * StatCard — displays a single KPI metric.
 * Props: label, value, icon (ReactNode), accent (tailwind color classes), isLoading
 */
export default function StatCard({ label, value, icon, accentBg, accentText, isLoading }) {
  return (
    <div className="bg-white rounded-xl border border-[var(--color-border)] p-5 flex items-center gap-4 shadow-xs">
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${accentBg}`}
      >
        <span className={accentText}>{icon}</span>
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] truncate">
          {label}
        </p>
        <p className="text-2xl font-bold text-[var(--color-text-primary)] mt-0.5 tabular-nums">
          {isLoading ? (
            <span className="inline-block w-10 h-6 bg-[var(--color-border)] rounded animate-pulse" />
          ) : (
            value ?? 0
          )}
        </p>
      </div>
    </div>
  );
}
