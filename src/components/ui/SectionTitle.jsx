/**
 * SectionTitle — heading seksi mewah editorial
 * Mengadopsi desain luxury: label mono uppercase emas, heading DM Serif Display warna emas,
 * garis pembatas vertikal, dan deskripsi elegan dengan garis pemisah horizontal di bagian bawah.
 */
export default function SectionTitle({
  title,
  subtitle,
  label,
  className = '',
}) {
  return (
    <div className={`mb-12 lg:mb-16 border-b border-border/70 pb-8 sm:pb-10 ${className}`}>
      {/* Eyebrow Label di atas */}
      {label && (
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          <span className="font-mono text-xs font-bold text-gold-text uppercase tracking-[0.24em]">
            {label}
          </span>
        </div>
      )}

      {/* Kontainer Judul & Deskripsi dengan Pembatas Vertikal */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 lg:gap-12">
        {/* Judul Utama Serif Mewah */}
        <div className="lg:max-w-2xl">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-heading font-normal text-gold leading-[1.16] tracking-tight">
            {title}
          </h2>
        </div>

        {/* Deskripsi dengan divider vertikal */}
        {subtitle && (
          <div className="lg:max-w-md border-l-2 lg:border-l border-gold/40 lg:border-border/80 pl-4 lg:pl-8 py-0.5">
            <p className="text-muted text-sm sm:text-base font-light leading-relaxed">
              {subtitle}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
