'use client';

import Nav from '../components/Nav';
import AboutHeroFrame from '../components/AboutHeroFrame';
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

// Portrait aspect-ratio cell, caption sits below the image as plain text (no heavy bordered bar)
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
  const midBody = isEn
    ? 'Much beauty education teaches cutting methods, procedures, and styles. What RTA wants to preserve is how you see hair.'
    : '多くの美容教育は、切り方・手順・スタイルを教える。しかしRTAが保存したいのは、髪の見方。';
  const observationBody = isEn
    ? 'At RTA, we theorize natural growth, hair flow, root direction, fall position, texture, and airiness—and translate them into reproducibility.'
    : 'RTAでは、生え癖・毛流れ・根元方向・落下位置・質感・空気感を理論化し、再現性へ落とし込む。';
  const pullQuote = isEn
    ? 'We do not let technique end as "sensation".'
    : '技術を"感覚"で終わらせない。';
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

      {/* ① Hero ticket frame */}
      <AboutHeroFrame isEn={isEn} />

      {/* ② Centered title */}
      <section
        className="about-title-block"
        style={{
          padding: 'clamp(72px, 10vw, 130px) 24px',
          textAlign: 'center',
          background: C.bg,
          borderTop: `0.5px solid ${C.border}`,
        }}
      >
        <h2
          className="about-fade-up"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 300,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: C.text,
            margin: 0,
          }}
        >
          The Art of <em style={{ fontStyle: 'italic' }}>Stealth</em> Cut.
        </h2>
      </section>

      {/* ③ Intro row */}
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

      {/* ④ Photo grid */}
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

      {/* ⑤ Mid — text + portrait */}
      <section
        className="about-mid"
        style={{
          padding: 'clamp(64px, 9vw, 110px) 24px',
          background: C.panel,
          borderTop: `0.5px solid ${C.border}`,
          textAlign: 'center',
        }}
      >
        <SectionLabel className="about-fade-up" style={{ display: 'block', marginBottom: 28 }}>
          {gridSectionLabel}
        </SectionLabel>
        <p
          className="about-fade-up"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(20px, 3vw, 30px)',
            fontWeight: 300,
            lineHeight: 1.6,
            color: C.text,
            maxWidth: 620,
            margin: '0 auto 48px',
          }}
        >
          {midBody}
        </p>
        <div
          className="about-fade-up"
          style={{ margin: '0 auto 40px', width: 'min(360px, 72%)', aspectRatio: '3 / 4', overflow: 'hidden' }}
        >
          <img
            src="/about-1.jpg"
            alt={isEn ? 'Archive portrait' : 'アーカイブポートレート'}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
            draggable={false}
          />
        </div>
        <p
          className="about-fade-up"
          style={{
            fontFamily: "'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif",
            fontSize: 10,
            lineHeight: 2,
            color: C.muted,
            maxWidth: 480,
            margin: '0 auto 36px',
          }}
        >
          {observationBody}
        </p>
        <TextButton href="#philosophy">Philosophy</TextButton>
      </section>

      {/* ⑥ Editorial split */}
      <section
        id="philosophy"
        className="about-editorial"
        style={{
          padding: 'clamp(64px, 9vw, 110px) clamp(24px, 5vw, 64px)',
          background: C.bg,
          borderTop: `0.5px solid ${C.border}`,
          display: 'flex',
          gap: 'clamp(32px, 5vw, 72px)',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        <div
          className="about-fade-up"
          style={{ width: 'clamp(180px, 26vw, 300px)', aspectRatio: '3 / 4', flexShrink: 0, overflow: 'hidden' }}
        >
          <img
            src="/about-2.jpg"
            alt={isEn ? 'Technique detail' : '技術のディテール'}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
            draggable={false}
          />
        </div>
        <div className="about-fade-up" style={{ flex: '1 1 280px', minWidth: 0 }}>
          <SectionLabel style={{ display: 'block', marginBottom: 24, color: C.text }}>
            RTA Subscription Philosophy
          </SectionLabel>
          <p
            style={{
              fontFamily: "'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif",
              fontSize: 12,
              lineHeight: 2,
              color: C.text,
              margin: '0 0 32px',
            }}
          >
            {pullQuote}
          </p>
          <div style={{ width: 180, aspectRatio: '4 / 3', overflow: 'hidden', marginBottom: 32 }}>
            <img
              src="/about-3.jpg"
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              draggable={false}
            />
          </div>
          <blockquote
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(20px, 3.2vw, 32px)',
              fontStyle: 'italic',
              fontWeight: 300,
              lineHeight: 1.45,
              color: C.text,
              margin: '0 0 20px',
              padding: 0,
              border: 'none',
              maxWidth: 720,
            }}
          >
            {manifestoQuote}
          </blockquote>
          <SectionLabel>— RTA Manifesto, 2026</SectionLabel>
        </div>
      </section>

      {/* ⑦ RTA Subscription accordion */}
      <RtaSubscriptionAccordion isEn={isEn} />

      {/* ⑧ Footer */}
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
          .about-intro-row {
            flex-direction: column;
            align-items: flex-start !important;
            padding-top: 40px !important;
            padding-bottom: 40px !important;
          }
          /* In column flex, 'flex: 1 1 240px' was treating 240px as a HEIGHT
             basis and stretching the paragraph — reset it so it hugs content. */
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
          .about-editorial {
            flex-direction: column;
            align-items: center;
          }
          /* Same flex-basis-as-height fix for the editorial text column */
          .about-editorial > div:last-child {
            flex: 0 0 auto !important;
            width: 100% !important;
          }
          .about-page .site-footer {
            flex-direction: column;
            align-items: flex-start;
          }
          /* Trim the desktop-scale vertical air so it isn't excessive on a phone */
          .about-title-block { padding-top: 56px !important; padding-bottom: 56px !important; }
          .about-grid-section { padding-top: 44px !important; padding-bottom: 44px !important; }
          .about-mid { padding-top: 56px !important; padding-bottom: 56px !important; }
          .about-editorial { padding-top: 56px !important; padding-bottom: 56px !important; }
        }
      `}</style>
    </main>
  );
}
