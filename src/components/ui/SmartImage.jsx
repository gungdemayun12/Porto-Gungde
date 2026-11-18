/**
 * SmartImage — image with a shimmer skeleton and a soft fade-in.
 * Keeps layout stable, shows progress on slow connections, and works with
 * cached images (checks `complete` on mount).
 */
import { useEffect, useRef, useState } from 'react';

export default function SmartImage({
  src,
  alt = '',
  className = '',
  wrapperClassName = '',
  loading = 'lazy',
  decoding = 'async',
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, [src]);

  return (
    <span className={`smart-image ${wrapperClassName}`} data-loaded={loaded ? '' : undefined}>
      {!loaded && <span className="smart-image__shimmer" aria-hidden="true" />}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        onLoad={() => setLoaded(true)}
        className={className}
        {...props}
      />
    </span>
  );
}
