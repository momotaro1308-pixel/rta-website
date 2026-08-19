'use client';

import Nav from '../components/Nav';
import HeroImage from '../components/HeroImage';
import RtaAboutContents from '../components/RtaAboutContents';
import { useLang } from '../context/LangContext';
import { useGsapPageScroll } from '../hooks/useGsapPageScroll';

const C = {
  bg: '#2E3A4A',
  panel: '#354656',
  panelAlt: '#323E4D',
  text: '#EDEBE5',
  muted: 'rgba(237,235,229,0.6)',
  border: 'rgba(237,235,229,0.15)',
  accent: '#C9956A',
};

const MINCHO = "'Shippori Mincho', 'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif";

// 意味の塊ごとに配列を分け、塊の内側は改行・塊の外側は余白として描画する
const STATEMENT = {
  ja: {
    title: '感覚を理論にする',
    lead: ['「ここにはこの切り方」——そう覚える技術はそこで終わってしまう', 'なぜ、そう切るのか'],
    problem: ['多くの教育は「答え」を教える', 'ここにはこの切り方、ここにはこの技法と'],
    limit: ['だから生え癖が強い。量が多い。骨格が難しい。', '——そんな髪を前にすると再現できない'],
    turn: ['だがなぜそう切るのかという原理を掴めば技術は応用へと開かれる'],
    open: [
      'この人のこのセクションにはこの技術を',
      'この生え癖・髪質・骨格だからこの切り方を',
      'そうして組み合わせ展開し自分の頭で新しい答えを導ける',
    ],
  },
  en: {
    title: 'Turning sensation into theory',
    lead: ['"This cut goes here" — technique memorized that way ends right there', 'Why cut it that way?'],
    problem: ['Most education teaches the "answer"', 'this cut here, this technique there'],
    limit: [
      'So the growth pattern is strong. The density is heavy. The bone structure is difficult.',
      '— faced with such hair, nothing can be reproduced',
    ],
    turn: ['But grasp the principle of why you cut that way, and technique opens into application'],
    open: [
      'This technique for this section of this person',
      'This cut, because of this growth pattern, this hair, this bone structure',
      'Combining and expanding, you draw new answers with your own mind',
    ],
  },
  zh: {
    title: '把感觉变成理论',
    lead: ['「这里就用这种剪法」——这样记住的技术，到此就结束了', '为什么要那样剪'],
    problem: ['多数教育教的是「答案」', '这里用这种剪法，那里用那种技法'],
    limit: ['所以发旋强。发量多。骨骼难。', '——面对这样的头发便无法复现'],
    turn: ['但若掌握「为何这样剪」的原理，技术就会向应用敞开'],
    open: [
      '为这个人的这个区域，选择这个技术',
      '因为是这样的发旋、发质、骨骼，所以用这样的剪法',
      '如此组合、展开，便能用自己的头脑导出新的答案',
    ],
  },
};

const STATEMENT_CLOSER = '" From instinct to intention "';

function StatementLines({ lines, style }) {
  return (
    <p style={{ margin: 0, ...style }}>
      {lines.map((line) => (
        <span key={line} style={{ display: 'block' }}>
          {line}
        </span>
      ))}
    </p>
  );
}

const labelStyle = {
  fontFamily: 'DM Sans, sans-serif',
  fontSize: 8,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: C.muted,
};

const gridPhotos = [
  { src: '/about-1.jpg', captionEn: 'Observation', captionJa: '観察', captionZh: '观察', flex: 1.15 },
  { src: '/about-2.jpg', captionEn: 'Flow', captionJa: '毛流れ', captionZh: '发流', flex: 0.9 },
  { src: '/about-3.jpg', captionEn: 'Texture', captionJa: '質感', captionZh: '质感', flex: 1 },
  { src: '/about-hero.jpg', captionEn: 'Stillness', captionJa: '静寂', captionZh: '静谧', flex: 0.9 },
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

export default function AboutPage() {
  const mainRef = useGsapPageScroll();
  const { lang } = useLang();

  const statement = STATEMENT[lang] ?? STATEMENT.ja;
  const gridSectionLabel =
    lang === 'zh'
      ? '何为 RTA Subscription'
      : lang === 'en'
      ? 'What is RTA Subscription'
      : 'RTA Subscriptionとは';
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
              'linear-gradient(to bottom, rgba(20,26,34,0.35) 0%, rgba(20,26,34,0) 35%, rgba(46,58,74,0.4) 70%, rgba(46,58,74,1) 100%)',
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

      {/* ② Statement — RTA philosophy */}
      <section
        id="intro"
        className="about-statement about-fade-up"
        style={{
          padding: 'clamp(56px, 8vw, 104px) clamp(24px, 5vw, 64px)',
          background: C.panelAlt,
          borderTop: `0.5px solid ${C.border}`,
        }}
      >
        <div className="about-statement-inner" style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2
            className="about-statement-title"
            style={{
              fontFamily: MINCHO,
              fontSize: 'clamp(26px, 4vw, 40px)',
              fontWeight: 500,
              lineHeight: 1.45,
              letterSpacing: '0.03em',
              color: C.text,
              margin: '0 0 clamp(30px, 4vw, 44px)',
            }}
          >
            {statement.title}
          </h2>

          <StatementLines
            lines={statement.lead}
            style={{
              fontFamily: MINCHO,
              fontSize: 'clamp(14px, 1.7vw, 17px)',
              lineHeight: 2.05,
              color: C.text,
              marginBottom: 'clamp(30px, 4vw, 42px)',
            }}
          />

          <StatementLines
            lines={statement.problem}
            style={{ fontFamily: MINCHO, fontSize: 13, lineHeight: 2.15, color: C.muted, marginBottom: 16 }}
          />
          <StatementLines
            lines={statement.limit}
            style={{ fontFamily: MINCHO, fontSize: 13, lineHeight: 2.15, color: C.muted }}
          />

          <StatementLines
            lines={statement.turn}
            style={{
              fontFamily: MINCHO,
              fontSize: 'clamp(15px, 1.9vw, 19px)',
              lineHeight: 1.95,
              color: C.text,
              margin: 'clamp(34px, 4.6vw, 50px) 0 clamp(22px, 3vw, 28px)',
            }}
          />
          <StatementLines
            lines={statement.open}
            style={{ fontFamily: MINCHO, fontSize: 13, lineHeight: 2.15, color: C.muted }}
          />

          <p
            className="about-statement-closer"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(12px, 1.4vw, 14px)',
              fontStyle: 'italic',
              fontWeight: 300,
              letterSpacing: '0.16em',
              color: C.accent,
              margin: 'clamp(40px, 5.5vw, 60px) 0 0',
            }}
          >
            {STATEMENT_CLOSER}
          </p>
        </div>
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
                caption={lang === 'zh' ? photo.captionZh : lang === 'en' ? photo.captionEn : photo.captionJa}
                alt={lang === 'zh' ? photo.captionZh : lang === 'en' ? photo.captionEn : photo.captionJa}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ④ RTA process contents — all explanatory text consolidated here */}
      <RtaAboutContents lang={lang} />

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
          <a href="https://www.instagram.com/razor_techarchive" target="_blank" rel="noopener noreferrer" style={{ ...labelStyle, fontSize: 7, letterSpacing: '0.24em', color: C.muted, textDecoration: 'none' }}>
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
          background: rgba(46, 58, 74, 0.72) !important;
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

        @media (max-width: 768px) {
          .about-hero-content {
            padding: 140px 24px 40px !important;
          }
          .about-statement {
            padding-top: 56px !important;
            padding-bottom: 56px !important;
          }
          .about-statement-inner {
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
