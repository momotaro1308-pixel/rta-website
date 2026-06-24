'use client';

import { useState } from 'react';

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

const items = [
  {
    no: '01',
    src: '/about-1.jpg',
    titleEn: 'Observation',
    titleJa: '観察',
    bodyEn:
      'We begin by reading the hair as it is—natural growth, flow, root direction, and the way it falls. Before any technique, there is seeing.',
    bodyJa:
      'まず、髪をありのままに読む。生え癖・毛流れ・根元方向・落下位置。技術の前に、見ることがある。',
  },
  {
    no: '02',
    src: '/about-2.jpg',
    titleEn: 'Theory',
    titleJa: '理論',
    bodyEn:
      'Sensation alone cannot be shared. RTA translates texture, weight, and airiness into language and structure that can be taught.',
    bodyJa:
      '感覚だけでは共有できない。RTAは質感・重さ・空気感を、伝えられる言葉と構造へ翻訳する。',
  },
  {
    no: '03',
    src: '/about-3.jpg',
    titleEn: 'Reproducibility',
    titleJa: '再現性',
    bodyEn:
      'A cut should not depend on a single pair of hands. Theory is distilled into steps that any stylist can reproduce.',
    bodyJa:
      '一人の手に依存しないカットへ。理論は、誰もが再現できる手順へと落とし込まれる。',
  },
  {
    no: '04',
    src: '/about-hero.jpg',
    titleEn: 'Archive',
    titleJa: 'アーカイブ',
    bodyEn:
      'Each insight is preserved—an archive of sensation that grows with every member, ready to be revisited at any time.',
    bodyJa:
      '得られた知見は保存される。メンバーとともに育つ感覚のアーカイブを、いつでも見返せる。',
  },
];

function AccordionRow({ item, isEn, isOpen, onToggle }) {
  const title = isEn ? item.titleEn : item.titleJa;
  const body = isEn ? item.bodyEn : item.bodyJa;

  return (
    <div style={{ borderTop: `0.5px solid ${C.border}` }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(12px, 2vw, 28px)',
          padding: 'clamp(20px, 2.6vw, 32px) 0',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            ...labelStyle,
            fontSize: 'clamp(8px, 0.9vw, 10px)',
            color: C.muted,
            flexShrink: 0,
            width: 28,
          }}
        >
          {item.no}
        </span>
        <span
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(20px, 3vw, 34px)',
            fontWeight: 300,
            letterSpacing: '0.01em',
            color: C.text,
            flex: 1,
            minWidth: 0,
          }}
        >
          {title}
        </span>
        <span
          aria-hidden="true"
          style={{
            position: 'relative',
            width: 14,
            height: 14,
            flexShrink: 0,
            color: C.muted,
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              width: '100%',
              height: '0.5px',
              background: C.text,
              transform: 'translateY(-50%)',
            }}
          />
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              width: '100%',
              height: '0.5px',
              background: C.text,
              transform: `translateY(-50%) rotate(${isOpen ? 0 : 90}deg)`,
              transition: 'transform 0.3s ease',
            }}
          />
        </span>
      </button>

      <div
        style={{
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.35s ease',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div
            className="rta-accordion-panel"
            style={{
              display: 'flex',
              gap: 'clamp(20px, 3vw, 44px)',
              alignItems: 'flex-start',
              paddingBottom: 'clamp(24px, 3vw, 40px)',
              paddingLeft: 44,
            }}
          >
            <div
              style={{
                width: 'clamp(120px, 18vw, 200px)',
                aspectRatio: '4 / 5',
                flexShrink: 0,
                overflow: 'hidden',
              }}
            >
              <img
                src={item.src}
                alt={title}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                draggable={false}
              />
            </div>
            <p
              style={{
                fontFamily: "'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif",
                fontSize: 12,
                lineHeight: 2,
                color: C.text,
                margin: 0,
                maxWidth: 520,
              }}
            >
              {body}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RtaSubscriptionAccordion({ isEn }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      className="rta-accordion-section"
      style={{
        padding: 'clamp(64px, 9vw, 110px) clamp(24px, 5vw, 64px)',
        background: C.panelAlt,
        borderTop: `0.5px solid ${C.border}`,
      }}
    >
      <div
        className="about-fade-up"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 'clamp(20px, 3vw, 36px)',
        }}
      >
        <span style={{ ...labelStyle }}>{isEn ? 'What is RTA Subscription' : 'RTA Subscriptionとは'}</span>
        <span style={{ ...labelStyle, color: C.text }}>01 — 04</span>
      </div>

      <div className="about-fade-up" style={{ borderBottom: `0.5px solid ${C.border}` }}>
        {items.map((item, i) => (
          <AccordionRow
            key={item.no}
            item={item}
            isEn={isEn}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .rta-accordion-panel {
            flex-direction: column;
            padding-left: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
