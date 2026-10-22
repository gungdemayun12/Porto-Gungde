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
  onPointerMove,
  onPointerLeave,
  ...props
}) {
  // Kelas dasar sesuai varian
  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-outline';
  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const angle = (Math.atan2(y - rect.height / 2, x - rect.width / 2) * 180 / Math.PI + 90 + 360) % 360;

    event.currentTarget.style.setProperty('--specular-angle', `${angle}deg`);
    event.currentTarget.style.setProperty('--specular-x', `${x}px`);
    event.currentTarget.style.setProperty('--specular-y', `${y}px`);
    onPointerMove?.(event);
  };

  const handlePointerLeave = (event) => {
    event.currentTarget.style.setProperty('--specular-angle', '0deg');
    event.currentTarget.style.setProperty('--specular-x', '50%');
    event.currentTarget.style.setProperty('--specular-y', '50%');
    onPointerLeave?.(event);
  };

  // Jika ada href, render sebagai <a>
  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
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
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`${baseClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
}
