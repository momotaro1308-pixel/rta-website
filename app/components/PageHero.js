import Image from 'next/image';

const HERO_GRADIENT =
  'linear-gradient(to bottom, rgba(20,26,34,0.35) 0%, rgba(20,26,34,0) 35%, rgba(46,58,74,0.4) 70%, rgba(46,58,74,1) 100%)';

export default function PageHero({
  src,
  alt,
  children,
  className = '',
  contentClassName = '',
  parallax = true,
  priority = false,
}) {
  const image = (
    <Image
      src={src}
      alt={alt}
      fill
      quality={100}
      priority={priority}
      sizes="100vw"
      style={{ objectFit: 'cover', objectPosition: 'center' }}
    />
  );

  return (
    <section
      className={`page-hero ${className}`.trim()}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        background: '#2E3A4A',
        overflow: 'hidden',
      }}
    >
      {parallax ? (
        <div className="about-parallax-wrap hero-image-wrap">
          <div className="parallax-image-inner">{image}</div>
        </div>
      ) : (
        <div className="hero-image-wrap">{image}</div>
      )}

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: HERO_GRADIENT,
          zIndex: 5,
          pointerEvents: 'none',
        }}
      />

      {children ? (
        <div
          className={`page-hero-content about-page-top ${contentClassName}`.trim()}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '180px 80px 80px',
          }}
        >
          {children}
        </div>
      ) : null}
    </section>
  );
}
