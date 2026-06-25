'use client';

import Nav from '../components/Nav';
import HeroImage from '../components/HeroImage';
import RtaSubscriptionAccordion from '../components/RtaSubscriptionAccordion';
import { useLang } from '../context/LangContext';
import { useGsapPageScroll } from '../hooks/useGsapPageScroll';

const C = {
  bg: '#F4F0E8',
  panel: '#EAE4DC',
  panelAlt: '#EDE7DF',
  text: '#2C2823',
  muted: '#8A8278',
  border: '#C8C0B4',
};

const labelStyle = {
  fontFamily: 'DM Sans, sans-serif',
  fontSize: 8,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: C.muted,
};

const gridPhotos = [
  { src: '/about-1.jpg', captionEn: 'Observation', captionJa: '観察', flex: 1.15 },
  { src: '/about-2.jpg', captionEn: 'Flow', captionJa: '毛流れ', flex: 0.9 },
  { src: '/about-3.jpg', captionEn: 'Texture', captionJa: '質感', flex: 1 },
  { src: '/about-hero.jpg', captionEn: 'Stillness', captionJa: '静寂', flex: 0.9 },
];

function SectionLabel({ children, style, className }) {
  return (
    <span className={className} style={{ ...labelStyle, ...style }}>
      {children}
    </span>
  );
}

// Portrait aspect-ratio cell, caption sits below the image as plain text
function GridCell({ src, caption, alt }) {
  return (
    <div style={{ minWidth: 0 }}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 5', overflow: 'hidden' }}>
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
          draggable={false}
        />
      </div>
      <span style={{ ...labelStyle, fontSize: 8, display: 'block', marginTop: 10, color: C.text }}>
        {caption}
      </span>
    </div>
  );
}

// Minimal underline link instead of a bordered box
function TextButton({ href, children }) {
  return (
    <a
      href={href}
      style={{
        ...labelStyle,
        fontSize: 8,
        color: C.text,
        textDecoration: 'none',
        borderBottom: `0.5px solid ${C.border}`,
        paddingBottom: 4,
        display: 'inline-block',
      }}
    >
      {children}
    </a>
  );
}

export default function AboutPage() {
  const mainRef = useGsapPageScroll();
  const { lang } = useLang();
  const isEn = lang === 'en';

  const heroTagline = isEn
    ? '"An Archive that Preserves Sensation"'
    : '"感覚を保存するArchive"';
  const introLine = isEn
    ? 'RTA Subscription is not simply an online salon.'
    : 'RTA Subscriptionは、単なるオンラインサロンではない。';
  const gridSectionLabel = isEn ? 'What is RTA Subscription' : 'RTA Subscriptionとは';
  const manifestoQuote =
    'The blade does not cut hair. It listens to the weight that asks to fall.';

  return (
    <main
      ref={mainRef}
      className="about-page"
      style={{
        background: C.bg,
        minHeight: '100vh',
        fontFamily: 'DM Sans, sans-serif',
        fontWeight: 200,
        color: C.text,
      }}
    >
      <Nav />

      {/* ① Hero — standard full-bleed photo hero (matches Members etc.) */}
      <section
        className="about-hero"
        style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', borderBottom: `0.5px solid ${C.border}` }}
      >
        <HeroImage src="/about-hero.jpg" alt="Razor Tech Archive — About" parallax priority />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(28,26,23,0.2) 0%, rgba(28,26,23,0) 35%, rgba(244,240,232,0.3) 70%, rgba(244,240,232,1) 100%)',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        />
        <div
          className="about-hero-content about-page-top"
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
          <div
            className="about-fade-up"
            style={{
              fontSize: 8,
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              marginBottom: 36,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              opacity: 0.85,
            }}
          >
            <span style={{ width: 18, height: 1, background: '#FFFFFF', display: 'inline-block', opacity: 0.7 }} />
            About — Manifesto
          </div>
          <h1
            className="page-heading about-animate-title"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(32px, 4vw, 56px)',
              fontWeight: 200,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginBottom: 20,
              color: '#FFFFFF',
            }}
          >
            About<br />
            <em style={{ fontStyle: 'italic', color: '#FFFFFF' }}>RTA</em>
          </h1>
          <p
            className="about-fade-up"
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 10,
              letterSpacing: '0.38em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              opacity: 0.85,
            }}
          >
            An Archive of Sensation
          </p>
        </div>
      </section>

      {/* ② Intro row */}
      <section
        id="intro"
        className="about-intro-row about-fade-up"
        style={{
          padding: 'clamp(40px, 6vw, 72px) clamp(24px, 5vw, 64px)',
          background: C.panelAlt,
          borderTop: `0.5px solid ${C.border}`,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 24,
          flexWrap: 'wrap',
        }}
      >
        <p
          style={{
            fontFamily: "'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif",
            fontSize: 11,
            lineHeight: 2,
            color: C.muted,
            margin: 0,
            flex: '1 1 240px',
            maxWidth: 480,
          }}
        >
          {introLine} {heroTagline}
        </p>
        <TextButton href="#grid">View All</TextButton>
      </section>

      {/* ③ Photo grid */}
      <section
        id="grid"
        className="about-grid-section"
        style={{
          padding: 'clamp(48px, 7vw, 88px) clamp(24px, 5vw, 64px)',
          background: C.bg,
          borderTop: `0.5px solid ${C.border}`,
        }}
      >
        <div
          className="about-fade-up"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, gap: 16 }}
        >
          <SectionLabel>{gridSectionLabel}</SectionLabel>
          <a href="/members" style={{ ...labelStyle, color: C.muted, textDecoration: 'none' }}>
            More
          </a>
        </div>
        <div className="about-photo-grid about-fade-up" style={{ display: 'flex', gap: 8, marginBottom: 0, alignItems: 'flex-start' }}>
          {gridPhotos.map((photo) => (
            <div key={photo.src} style={{ flex: photo.flex, minWidth: 0 }}>
              <GridCell
                src={photo.src}
                caption={isEn ? photo.captionEn : photo.captionJa}
                alt={isEn ? photo.captionEn : photo.captionJa}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ④ RTA Subscription accordion — all explanatory text consolidated here */}
      <RtaSubscriptionAccordion isEn={isEn} />

      {/* ⑤ Manifesto — small standalone closer */}
      <section
        id="manifesto"
        className="about-manifesto"
        style={{
          padding: 'clamp(56px, 8vw, 96px) clamp(24px, 5vw, 64px)',
          background: C.bg,
          borderTop: `0.5px solid ${C.border}`,
          textAlign: 'center',
        }}
      >
        <blockquote
          className="about-fade-up"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(16px, 2.4vw, 24px)',
            fontStyle: 'italic',
            fontWeight: 300,
            lineHeight: 1.5,
            color: C.text,
            margin: '0 auto 16px',
            padding: 0,
            border: 'none',
            maxWidth: 560,
          }}
        >
          {manifestoQuote}
        </blockquote>
        <SectionLabel className="about-fade-up" style={{ display: 'block' }}>
          — RTA Manifesto, 2026
        </SectionLabel>
      </section>

      {/* ⑥ Footer */}
      <footer
        className="site-footer about-fade-up"
        style={{
          padding: '22px 24px',
          borderTop: `0.5px solid ${C.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
          background: C.bg,
        }}
      >
        <span style={{ ...labelStyle, color: C.text, fontSize: 7, letterSpacing: '0.24em' }}>
          Razor Tech Archive
        </span>
        <div style={{ display: 'flex', gap: 20 }}>
          <a href="#" style={{ ...labelStyle, fontSize: 7, letterSpacing: '0.24em', color: C.muted, textDecoration: 'none' }}>
            Instagram
          </a>
          <span style={{ ...labelStyle, fontSize: 7, color: C.border }}>/</span>
          <a href="#" style={{ ...labelStyle, fontSize: 7, letterSpacing: '0.24em', color: C.muted, textDecoration: 'none' }}>
            YouTube
          </a>
        </div>
      </footer>

      <style>{`
        .about-page .site-nav {
          background: rgba(244, 240, 232, 0.72) !important;
          backdrop-filter: blur(6px) !important;
          border-bottom: 0.5px solid ${C.border} !important;
        }
        .about-page .site-nav .site-logo,
        .about-page .site-nav button span {
          color: ${C.text} !important;
        }
        .about-page .site-nav button span {
          background: ${C.text} !important;
        }
        .about-page .site-nav svg {
          stroke: ${C.text} !important;
        }
        .about-page .site-nav > div:nth-of-type(2) button[aria-label="Account"],
        .about-page .site-nav > div:nth-of-type(2) a[aria-label="Cart"] {
          display: none !important;
        }

        @media (max-width: 768px) {
          .about-hero-content {
            padding: 140px 24px 40px !important;
          }
          .about-intro-row {
            flex-direction: column;
            align-items: flex-start !important;
            padding-top: 40px !important;
            padding-bottom: 40px !important;
          }
          .about-intro-row > p {
            flex: 0 0 auto !important;
            max-width: 100% !important;
          }
          .about-photo-grid {
            flex-wrap: wrap;
          }
          .about-photo-grid > div {
            flex: 1 1 calc(50% - 4px) !important;
            min-width: calc(50% - 4px);
          }
          .about-page .site-footer {
            flex-direction: column;
            align-items: flex-start;
          }
          .about-grid-section { padding-top: 44px !important; padding-bottom: 44px !important; }
          .about-manifesto { padding-top: 56px !important; padding-bottom: 56px !important; }
        }
      `}</style>
    </main>
  );
}
