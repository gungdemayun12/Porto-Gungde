/**
 * CubeLoader — 3D breathing cube loader.
 *
 * Adapted for this Vite + React (JSX) project:
 * - no `"use client"` directive (not a Next.js app)
 * - no `cn` helper / path alias required
 * - styles live in CubeLoader.css instead of `<style jsx>`
 *
 * Keep it as a decorative compact mark inside the intro loader, or show the
 * full version with its label and subtitle for async screens.
 */
import './CubeLoader.css';

const FACES = ['front', 'back', 'right', 'left', 'top', 'bottom'];

export default function CubeLoader({
  label = 'Loading',
  subtitle = 'Preparing your experience, please wait…',
  compact = false,
  tone = 'brand',
  className = '',
}) {
  const classes = [
    'cube-loader',
    `cube-loader--${tone}`,
    compact ? 'cube-loader--compact' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      role={compact ? undefined : 'status'}
      aria-live={compact ? undefined : 'polite'}
      aria-hidden={compact || undefined}
      aria-label={compact ? undefined : `${label}. ${subtitle}`}
    >
      <div className="cube-loader__scene" aria-hidden="true">
        <div className="cube-loader__cube">
          <span className="cube-loader__core" />

          {FACES.map((face) => (
            <span
              key={face}
              className={`cube-loader__side cube-loader__side--${face}`}
            >
              <span className={`cube-loader__face cube-loader__face--${face}`} />
            </span>
          ))}
        </div>

        <span className="cube-loader__shadow" />
      </div>

      {!compact && (
        <div className="cube-loader__copy">
          <h3 className="cube-loader__label">{label}</h3>
          <p className="cube-loader__subtitle">{subtitle}</p>
        </div>
      )}

      {compact && <span className="cube-loader__sr">{label}</span>}
    </div>
  );
}
