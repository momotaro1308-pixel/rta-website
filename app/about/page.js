'use client';

import { useLayoutEffect, useRef } from 'react';
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
const MIN_PX = 11;

const GAP = {
  tight: 'clamp(12px, 1.6vw, 16px)',
  near: 'clamp(22px, 3vw, 32px)',
  beat: 'clamp(36px, 4.8vw, 52px)',
  break: 'clamp(52px, 6.5vw, 76px)',
};

const ORIGIN = {
  ja: {
    question: ['レザーは本当に悪い道具なのか'],
    heard: [
      '美容師なら一度は聞いたことがあると思う',
      '「レザーは髪が傷む」',
      '「レザーを使うとスカスカになる」',
      'そう言われることも少なくない',
    ],
    doubt: ['でもそれは本当にレザーそのものの問題なのか'],
    craft: [
      '使い方や髪への入れ方シェイプが違えば仕上がりは大きく変わる',
      'レザーだから傷むわけでもレザーだからスカスカになるわけでもない',
      '正しく使えばレザーでしかつくれない質感や動きがある',
      'シザーだけでは出しにくいものもある',
    ],
    choice: [
      'だからといってレザーを正解にしたいわけではない',
      'シザーなのかレザーなのか、その両方なのか',
      '髪を見てそのとき必要な技術を選べること',
      'シザーだけを使えるよりレザーも使えたほうができることは増える',
      '使える技術が増えればつくれるヘアの幅も広がる',
      'レザーに対する先入観だけでその選択肢がなくなってしまうのはもったいない',
    ],
    know: [
      'まずはレザーという道具を知ること',
      '何ができてどう使えばその良さを引き出せるのかを知ること',
      'そしてシザーとレザーを必要に応じて使い分けられる美容師が増えていくこと',
    ],
    industry: ['それが美容師一人ひとりの技術の幅を広げ結果として美容業界全体の技術の底上げにつながっていくと思っている'],
    closer: 'Razor Tech Archiveはそこから始まった。',
  },
  en: {
    question: ['Is the razor really a bad tool?'],
    heard: [
      'If you are a hairdresser, you have probably heard it at least once',
      '"Razors damage the hair"',
      '"Using a razor makes it look sparse"',
      'It is not uncommon to be told that',
    ],
    doubt: ['But is that really a problem of the razor itself?'],
    craft: [
      'Change how you use it, how you enter the hair, the shape, and the finish changes greatly',
      'It is not that razors damage, nor that razors make the hair sparse',
      'Used correctly, there is texture and movement only a razor can make',
      'There are also things scissors alone struggle to produce',
    ],
    choice: [
      'That does not mean we want to make the razor the right answer',
      'Scissors, or razor, or both',
      'Looking at the hair and choosing the technique needed then',
      'Being able to use a razor as well as scissors means you can do more',
      'The more techniques you can use, the wider the hair you can create',
      'It is a waste if prejudice against razors alone takes that choice away',
    ],
    know: [
      'First, to know the razor as a tool',
      'To know what it can do, and how to draw out its strengths',
      'And for more hairdressers who can use scissors and razor as needed',
    ],
    industry: [
      'That, I believe, widens each hairdresser\'s range of technique and, as a result, raises the technical floor of the industry as a whole',
    ],
    closer: 'Razor Tech Archive began from there.',
  },
  zh: {
    question: ['剃刀真的是坏工具吗'],
    heard: [
      '身为美容师，想必都听过一次',
      '「剃刀会伤头发」',
      '「用剃刀就会变得空疏」',
      '这样被说的也不少',
    ],
    doubt: ['但那真的是剃刀本身的问题吗'],
    craft: [
      '用法、下刀的方式、形状一变，完成效果就会大不相同',
      '并不是因为是剃刀才会伤，也不是因为是剃刀才会空疏',
      '正确使用，就有只有剃刀才能做出的质感与动感',
      '也有剪刀单独难以带出的东西',
    ],
    choice: [
      '但这并不意味着要把剃刀当成正确答案',
      '是剪刀还是剃刀，还是两者都用',
      '看着头发，选出那时需要的技术',
      '比起只会用剪刀，连剃刀也能用，能做的事就会变多',
      '能用的技术增加，能做的发型幅度也会变宽',
      '只因对剃刀的先入之见，就失去这个选择，太可惜',
    ],
    know: [
      '首先是认识剃刀这件工具',
      '知道它能做什么、怎样用才能引出它的长处',
      '并且，能按需要把剪刀与剃刀分开使用的美容师多起来',
    ],
    industry: ['我认为那会拓宽每一位美容师的技术幅度，结果也会把整个美容行业的技术底盘抬高'],
    closer: 'Razor Tech Archive 就是从那里开始的。',
  },
};

function FitLine({ children }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      el.style.fontSize = '';
      el.style.whiteSpace = 'nowrap';
      el.style.wordBreak = 'keep-all';
      el.style.textWrap = 'nowrap';

      const available = el.clientWidth;
      if (available <= 0) return;
      if (el.scrollWidth <= available + 1) return;

      const base = parseFloat(getComputedStyle(el).fontSize);
      let lo = MIN_PX;
      let hi = base;
      let best = MIN_PX;
      for (let i = 0; i < 14; i++) {
        const mid = (lo + hi) / 2;
        el.style.fontSize = `${mid}px`;
        if (el.scrollWidth <= available + 1) {
          best = mid;
          lo = mid;
        } else {
          hi = mid;
        }
      }
      el.style.fontSize = `${best}px`;

      if (el.scrollWidth > available + 1) {
        el.style.whiteSpace = 'normal';
        el.style.textWrap = 'balance';
        el.style.wordBreak = 'auto-phrase';
        el.style.fontSize = '';
      }
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [children]);

  return (
    <span ref={ref} className="about-origin-line" style={{ display: 'block' }}>
      {children}
    </span>
  );
}

function Lines({ lines, gap, style }) {
  return (
    <p style={{ margin: `0 auto ${gap}`, textAlign: 'center', ...style }}>
      {lines.map((line) => (
        <FitLine key={line}>{line}</FitLine>
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

  const origin = ORIGIN[lang] ?? ORIGIN.ja;
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

      {/* ② Origin — why Razor Tech Archive began */}
      <section
        id="intro"
        className="about-statement about-fade-up"
        style={{
          padding: 'clamp(56px, 8vw, 104px) clamp(24px, 5vw, 64px)',
          background: C.bg,
          borderTop: `0.5px solid ${C.border}`,
          textAlign: 'center',
        }}
      >
        <div className="about-statement-inner" style={{ maxWidth: 920, margin: '0 auto' }}>
          <Lines
            lines={origin.question}
            gap={GAP.beat}
            style={{
              fontFamily: MINCHO,
              fontWeight: 500,
              fontSize: 'clamp(18px, 2.6vw, 26px)',
              lineHeight: 1.85,
              letterSpacing: '0.04em',
              color: C.text,
            }}
          />
          <Lines
            lines={origin.heard}
            gap={GAP.break}
            style={{ fontFamily: MINCHO, fontWeight: 400, fontSize: 'clamp(12.5px, 1.5vw, 14px)', lineHeight: 2.15, color: C.muted }}
          />
          <Lines
            lines={origin.doubt}
            gap={GAP.near}
            style={{ fontFamily: MINCHO, fontWeight: 500, fontSize: 'clamp(14px, 1.9vw, 18px)', lineHeight: 1.95, color: C.text }}
          />
          <Lines
            lines={origin.craft}
            gap={GAP.break}
            style={{ fontFamily: MINCHO, fontWeight: 400, fontSize: 'clamp(12.5px, 1.5vw, 14px)', lineHeight: 2.15, color: C.muted }}
          />
          <Lines
            lines={origin.choice}
            gap={GAP.break}
            style={{ fontFamily: MINCHO, fontWeight: 400, fontSize: 'clamp(12.5px, 1.5vw, 14px)', lineHeight: 2.15, color: C.muted }}
          />
          <Lines
            lines={origin.know}
            gap={GAP.near}
            style={{ fontFamily: MINCHO, fontWeight: 400, fontSize: 'clamp(12.5px, 1.5vw, 14px)', lineHeight: 2.15, color: C.muted }}
          />
          <Lines
            lines={origin.industry}
            gap={0}
            style={{ fontFamily: MINCHO, fontWeight: 400, fontSize: 'clamp(12.5px, 1.5vw, 14px)', lineHeight: 2.15, color: C.muted }}
          />

          <p
            className="about-statement-closer"
            style={{
              fontFamily: MINCHO,
              fontWeight: 500,
              fontSize: 'clamp(16px, 2.2vw, 22px)',
              lineHeight: 1.8,
              letterSpacing: '0.04em',
              color: C.text,
              margin: 'clamp(72px, 9vw, 112px) auto 0',
              textAlign: 'center',
            }}
          >
            <FitLine>{origin.closer}</FitLine>
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
