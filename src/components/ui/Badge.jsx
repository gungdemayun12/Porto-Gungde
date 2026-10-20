/**
 * Badge — label kecil dengan styling konsisten
 * Digunakan untuk status, tag, dll.
 */

export default function Badge({ children, variant = 'default', className = '', dot = false }) {
  const variants = {
    default: 'bg-surface text-muted border border-border',
    gold: 'bg-gold/10 text-gold-text border border-gold/20',
    success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium
        ${variants[variant] || variants.default} ${className}`}
    >
      {/* Dot animasi (opsional, misal untuk "Available") */}
      {dot && (
        <span className="relative flex h-2 w-2">
          <span className="dot-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
      )}
      {children}
    </span>
  );
}
