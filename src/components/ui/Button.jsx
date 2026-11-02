/**
 * Button — clean, simple button component
 * Supports primary (gold bg) and outline (border) variants.
 * No specular effects, no shine sweep — just clean hover transitions.
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
  const baseClass = variant === 'primary' ? 'btn-primary' : 'btn-outline';

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
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
