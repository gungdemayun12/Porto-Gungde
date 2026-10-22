import { Rocket } from 'lucide-react';

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
  scrollDirection,
  ...props
}) {
  // Kelas dasar sesuai varian
  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-outline';
  const motionClass = scrollDirection === 'down' ? 'button-scroll-down' : '';

  // Jika ada href, render sebagai <a>
  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={`${baseClass} ${motionClass} ${className}`}
        aria-label={ariaLabel}
        {...props}
      >
        {children}
        {scrollDirection === 'down' && (
          <span className="button-rocket" aria-hidden="true">
            <Rocket size={15} />
          </span>
        )}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${motionClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
      {scrollDirection === 'down' && (
        <span className="button-rocket" aria-hidden="true">
          <Rocket size={15} />
        </span>
      )}
    </button>
  );
}
