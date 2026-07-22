'use client';

import { useState } from 'react';

const C = {
  bg: '#2E3A4A',
  ink: '#EDEBE5',
  muted: 'rgba(237,235,229,0.6)',
  line: 'rgba(237,235,229,0.15)',
  accent: '#C9956A',
};

const SANS = 'DM Sans, sans-serif';
const MINCHO = "'Shippori Mincho', 'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif";
const SERIF = 'Cormorant Garamond, serif';

const CHAPTERS = [
  {
    no: '01', en: 'Observation', kanji: { ja: '観察', en: 'Observation' },
    items: [
      { jp: { ja: '生え癖・毛流れ', en: 'Growth & Flow' }, romaji: 'Growth & Flow' },
      { jp: { ja: '根元方向・落下位置', en: 'Root & Fall' }, romaji: 'Root & Fall' },
    ],
    body: { ja: '髪をありのままに読む。技術の前に、見ることがある。', en: 'Read hair as it is. Before technique, there is seeing.' },
  },
  {
    no: '02', en: 'Theory', kanji: { ja: '理論', en: 'Theory' },
    items: [
      { jp: { ja: '感覚の翻訳', en: 'Translation' }, romaji: 'Translation' },
      { jp: { ja: '原理化', en: 'Principle' }, romaji: 'Principle' },
    ],
    body: { ja: '見えたものを、言葉と原理へ。感覚を再現可能な理論に翻訳する。', en: 'Turn what is seen into words and principle—translating sensation into reproducible theory.' },
  },
  {
    no: '03', en: 'Structure', kanji: { ja: '構造', en: 'Structure' },
    items: [
      { jp: { ja: '質感・空気感', en: 'Texture & Air' }, romaji: 'Texture & Air' },
      { jp: { ja: '骨格との関係', en: 'Form' }, romaji: 'Form' },
    ],
    body: { ja: '質感・空気感・骨格との関係を、ひとつの構造として捉え直す。', en: 'Reframe texture, air, and form as a single structure.' },
  },
  {
    no: '04', en: 'Reproduction', kanji: { ja: '再現', en: 'Reproduction' },
    items: [
      { jp: { ja: '再現性', en: 'Reproducibility' }, romaji: 'Reproducibility' },
      { jp: { ja: '意図の共有', en: 'Intention' }, romaji: 'Intention' },
    ],
    body: { ja: '理論を手に戻す。誰が切っても、同じ意図に届くように。', en: 'Return theory to the hands—so anyone reaches the same intention.' },
  },
];

export default function RtaAboutContents({ isEn = false }) {
  const [active, setActive] = useState(-1);
  const t = (o) => (o ? (isEn ? o.en : o.ja) : '');

  return (
    <section className="rta-contents-wrap" style={{ background: C.bg }}>
      <div className="rta-contents-head">
        <span className="rc-lbl">— The Process</span>
        <span className="rc-idx">{isEn ? 'Contents' : '目次 / Contents'}</span>
      </div>

      <div className="rta-chapters">
        {CHAPTERS.map((c, i) => (
          <div
            key={c.no}
            className={`rc-chapter c${i + 1}${active === i ? ' is-active' : ''}`}
            onClick={() => setActive((prev) => (prev === i ? -1 : i))}
          >
            <div className="rc-headrow">
              <span className="rc-en">{c.en}</span>
              <span className="rc-kanji">{t(c.kanji)}</span>
            </div>
            <div className="rc-items">
              {c.items.map((it, k) => (
                <div key={k} className="rc-item">
                  <span className="rc-dot" />
                  <span className="rc-jp">{t(it.jp)}</span>
                  <span className="rc-sep">/</span>
                  <span className="rc-romaji">{it.romaji}</span>
                </div>
              ))}
            </div>
            <p className="rc-body">{t(c.body)}</p>
            <div className="rc-sidetag" aria-hidden="true">
              <span className="rc-vt">RTA</span>
              <span className="rc-vline" />
              <span className="rc-vno">{c.no}</span>
            </div>
          </div>
        ))}

        <div className="rta-contents-strip" aria-hidden="true">
          <span className="rc-strip-en">Contents</span>
          <span className="rc-strip-jp">目録</span>
        </div>
      </div>

      <style>{`
        .rta-contents-wrap { font-family: ${SANS}; color: ${C.ink}; }
        .rta-contents-head { display: flex; justify-content: space-between; align-items: flex-start; padding: 26px 22px 0; }
        .rta-contents-head .rc-lbl { font-size: 8px; letter-spacing: 0.3em; text-transform: uppercase; color: ${C.accent}; }
        .rta-contents-head .rc-idx { font-size: 8px; letter-spacing: 0.2em; color: ${C.muted}; }
        .rta-chapters { padding: 20px 0 40px; }
        .rc-chapter { position: relative; padding: 34px 22px 34px 40px; cursor: pointer; transition: background .5s ease; }
        .rc-chapter::before { content: ""; position: absolute; left: 22px; top: 26px; bottom: 26px; width: 1px; background: ${C.line}; transition: background .45s ease; }
        .rc-sidetag { position: absolute; right: 20px; top: 30px; bottom: 30px; display: flex; flex-direction: column; align-items: center; justify-content: space-between; }
        .rc-vt { writing-mode: vertical-rl; font-size: 7px; letter-spacing: 0.32em; text-transform: uppercase; color: ${C.muted}; transition: color .45s ease; }
        .rc-vno { font-family: ${SERIF}; font-size: 15px; color: ${C.muted}; transition: color .45s ease; }
        .rc-vline { width: 1px; flex: 1; background: ${C.line}; margin: 10px 0; transition: background .45s ease; }
        .rc-headrow { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 20px; }
        .rc-en { writing-mode: vertical-rl; font-size: 8px; letter-spacing: 0.28em; text-transform: uppercase; color: ${C.muted}; margin-top: 6px; line-height: 1; transition: color .45s ease; }
        .rc-kanji { font-family: ${MINCHO}; font-weight: 500; font-size: 44px; line-height: 1.05; letter-spacing: 0.08em; transition: color .45s ease; }
        .rc-items { display: flex; flex-direction: column; gap: 14px; padding-left: 20px; }
        .rc-item { display: flex; align-items: baseline; gap: 10px; }
        .rc-dot { width: 7px; height: 7px; border-radius: 50%; border: 1px solid ${C.muted}; flex-shrink: 0; position: relative; top: 2px; transition: background .45s ease, border-color .45s ease; }
        .rc-jp { font-family: ${MINCHO}; font-size: 15px; letter-spacing: 0.04em; color: ${C.ink}; }
        .rc-sep { color: ${C.line}; margin: 0 6px; }
        .rc-romaji { font-size: 9px; letter-spacing: 0.06em; color: ${C.muted}; }
        .rc-body { font-family: ${MINCHO}; font-size: 12px; line-height: 2.0; color: ${C.muted}; padding-left: 20px; margin-top: 16px; max-width: 360px; }
        .rc-chapter.is-active .rc-kanji, .rc-chapter.is-active .rc-en { color: ${C.accent}; }
        .rc-chapter.is-active::before { background: ${C.accent}; }
        .rc-chapter.is-active .rc-dot { background: ${C.accent}; border-color: ${C.accent}; }
        .rc-chapter.is-active .rc-vt, .rc-chapter.is-active .rc-vno { color: ${C.accent}; }
        .rc-chapter.is-active .rc-vline { background: ${C.accent}; }
        @media (hover: hover) {
          .rc-chapter:hover .rc-kanji, .rc-chapter:hover .rc-en { color: ${C.accent}; }
          .rc-chapter:hover::before { background: ${C.accent}; }
          .rc-chapter:hover .rc-dot { background: ${C.accent}; border-color: ${C.accent}; }
          .rc-chapter:hover .rc-vt, .rc-chapter:hover .rc-vno { color: ${C.accent}; }
          .rc-chapter:hover .rc-vline { background: ${C.accent}; }
        }
        .rta-contents-strip { display: none; }
        @media (min-width: 900px) {
          .rta-chapters { display: grid; grid-template-columns: repeat(4, 1fr) 120px; gap: 0; padding: 60px 40px 80px; position: relative; }
          .rc-chapter { padding: 0 28px; }
          .rc-chapter::before { left: 0; top: 0; bottom: 0; }
          .rc-sidetag { display: none; }
          .rc-chapter.c1 { margin-top: 20px; }
          .rc-chapter.c2 { margin-top: 150px; }
          .rc-chapter.c3 { margin-top: 60px; }
          .rc-chapter.c4 { margin-top: 150px; }
          .rc-kanji { font-size: clamp(40px, 3.4vw, 60px); }
          .rc-body { display: none; }
          .rta-contents-strip { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; }
          .rc-strip-en { writing-mode: vertical-rl; font-size: 8px; letter-spacing: 0.3em; text-transform: uppercase; color: ${C.muted}; }
          .rc-strip-jp { font-family: ${MINCHO}; writing-mode: vertical-rl; font-size: 38px; letter-spacing: 0.15em; }
        }
        @media (max-width: 899px) {
          .rc-chapter { padding-right: 56px; }
          .rc-chapter + .rc-chapter { border-top: 1px solid ${C.line}; }
        }
      `}</style>
    </section>
  );
}
