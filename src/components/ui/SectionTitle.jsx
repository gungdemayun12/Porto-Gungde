/**
 * SectionTitle — dual-mode safe editorial heading component.
 * CSS vars for all colors — crisp and visible in both light and dark mode.
 */
export default function SectionTitle({ title, subtitle, label, className = '' }) {
  return (
    <div className={`mb-12 lg:mb-16 ${className}`}>
      {/* Eyebrow label */}
      {label && (
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8" style={{ background: 'var(--color-gold)' }} />
          <span
            className="font-mono text-xs font-bold uppercase tracking-[0.25em]"
            style={{ color: 'var(--color-gold-text)' }}
          >
            {label}
          </span>
        </div>
      )}

      {/* Title + subtitle layout */}
      <div
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 lg:gap-16 pb-8 sm:pb-10"
        style={{ borderBottom: '1.5px solid var(--color-border)' }}
      >
        <div className="lg:max-w-xl">
          <h2
            className="text-3xl sm:text-[2.4rem] lg:text-[2.75rem] font-bold leading-[1.1] tracking-[-0.03em]"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
          >
            {title}
          </h2>
        </div>

        {subtitle && (
          <div className="lg:max-w-sm lg:text-right">
            <p
              className="text-sm sm:text-[0.9375rem] leading-relaxed font-medium"
              style={{ color: 'var(--color-muted)' }}
            >
              {subtitle}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}