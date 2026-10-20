/**
 * Button — komponen tombol yang bisa dikustomisasi
 * Mendukung varian primary (emas) dan outline.
 */

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  ariaLabel,
  ...props
}) {
  // Kelas dasar sesuai varian
  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-outline';

  // Jika ada href, render sebagai <a>
  if (href) {
    return (
      <a
        href={href}
        className={`${baseClass} ${className}`}
        aria-label={ariaLabel}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
}
