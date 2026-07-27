'use client';

import { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import PageHero from '../components/PageHero';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LangContext';
import { useGsapPageScroll } from '../hooks/useGsapPageScroll';

const products = [
  {
    id: 'razor-seminar',
    nameJa: 'Razor Basics Seminar in Nagoya',
    nameEn: 'Razor Basics Seminar in Nagoya',
    nameZh: 'Razor Basics Seminar in Nagoya',
    // Stripe / カート用の識別名ベース（会場・日付を含め他日程と混同しない）
    stripeBaseName: 'Razor Basics Seminar in Nagoya 2026.8.18',
    dateJa: '開催日：2026年8月18日(火)',
    dateEn: 'Date: Aug 18 (Tue), 2026',
    dateZh: '日期：2026年8月18日(周二)',
    category: 'Seminar',
    status: 'available',
    descJa: 'レザーカットの理論と実践を深く学ぶ、RTAのセミナー。',
    descEn: 'RTA seminar exploring the theory and practice of razor cutting.',
    descZh: '深入研习剃刀切理论与实践的 RTA 研讨会。',
    options: [
      { id: 'seminar-nagoya-20260818-morning', price: 8000, labelEn: 'Morning', nameJa: '午前のみ', nameEn: 'Morning Only', nameZh: '仅上午' },
      { id: 'seminar-nagoya-20260818-fullday', price: 13000, labelEn: 'Full Day', nameJa: '午前＋午後', nameEn: 'Full Day', nameZh: '全天' },
    ],
  },
  {
    id: 'comb',
    nameJa: 'Comb',
    nameEn: 'Comb',
    nameZh: 'Comb',
    category: 'Product',
    status: 'comingSoon',
    descJa: 'レザーカットを支える、RTAオリジナルのコーム。',
    descEn: 'An RTA original comb designed to support razor cutting.',
    descZh: '为剃刀切而生的 RTA 原创梳子。',
  },
];

function getStatusLabel(status) {
  if (status === 'soldOut') return 'SOLD OUT';
  if (status === 'comingSoon') return 'COMING SOON';
  return null;
}

/** 「… in Venue」を「…」/「in Venue」の2行に分割して会場名の孤立改行を防ぐ */
function formatProductTitle(name) {
  const match = String(name).match(/^(.*?)\s+(in\s+.+)$/i);
  if (!match) return name;
  return (
    <>
      {match[1]}
      <br />
      {match[2]}
    </>
  );
}

export default function Shop() {
  const [success, setSuccess] = useState(false);
  const [addedId, setAddedId] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const mainRef = useGsapPageScroll();
  const { lang } = useLang();
  const { addToCart } = useCart();

  const t3 = (ja, en, zh) => (lang === 'zh' ? zh : lang === 'en' ? en : ja);

  const getSelectedOption = (product) => {
    if (!product.options) return null;
    const selectedId = selectedOptions[product.id] ?? product.options[0].id;
    return product.options.find((o) => o.id === selectedId) ?? product.options[0];
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      setSuccess(true);
    }
  }, []);

  const handleAddToCart = (product) => {
    if (product.status !== 'available') return;
    const productName = t3(product.nameJa, product.nameEn, product.nameZh);
    let item;
    if (product.options) {
      const opt = getSelectedOption(product);
      // Stripe 取引一覧用：会場・日付・オプションを必ず含める（他日程と混ざらない識別名）
      const base = product.stripeBaseName || productName;
      const name = `${base}（${opt.nameJa}）`;
      item = { id: opt.id, name, price: opt.price };
    } else {
      item = { id: product.id, name: productName, price: product.price };
    }
    addToCart(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <main ref={mainRef} style={{background:'#2E3A4A', minHeight:'100vh', fontFamily:'DM Sans, sans-serif', fontWeight:200, color:'#EDEBE5'}}>

      {success && (
        <div style={{position:'fixed', top:96, left:'50%', transform:'translateX(-50%)', zIndex:250, background:'#354656', border:'1px solid #C9956A', padding:'16px 28px', display:'flex', alignItems:'center', gap:16}}>
          <span style={{width:6, height:6, borderRadius:'50%', background:'#C9956A', display:'inline-block'}}></span>
          <span style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:12, color:'#EDEBE5'}}>{lang === 'zh' ? '感谢您的订购。' : lang === 'en' ? 'Thank you for your order.' : 'ご注文ありがとうございました。'}</span>
          <button onClick={() => setSuccess(false)} style={{background:'none', border:'none', cursor:'pointer', color:'rgba(237,235,229,0.72)', fontSize:14, paddingLeft:4}}>×</button>
        </div>
      )}

      <Nav />

      {/* SHOP HERO */}
      <PageHero
        src="/shop-hero.jpg"
        alt="Razor Tech Archive — Shop"
        contentClassName="shop-hero-content"
        priority
      >
        <div className="about-fade-up" style={{fontSize:8, letterSpacing:'0.45em', textTransform:'uppercase', color:'#FFFFFF', marginBottom:36, display:'flex', alignItems:'center', gap:16, opacity:0.85}}>
          <span style={{width:18, height:1, background:'#FFFFFF', display:'inline-block', opacity:0.7}}></span>
          Shop — Tickets & Goods
        </div>
        <h1 className="shop-heading about-animate-title" style={{fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(48px,7vw,108px)', fontWeight:200, lineHeight:0.95, letterSpacing:'-0.02em', marginBottom:36, color:'#FFFFFF'}}>
          Razor Tech<br/><em style={{fontStyle:'italic', color:'#FFFFFF'}}>Archive</em> Shop
        </h1>
        <p className="about-fade-up" style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:13, color:'#FFFFFF', lineHeight:2.1, maxWidth:540, opacity:0.85}}>
          {lang === 'zh'
            ? '研讨会门票，以及支撑剃刀切理论的系列产品。学习技术，也将其作为工具留在手边。'
            : lang === 'en'
            ? 'Seminar tickets and products that support the theory of razor cutting. Learn the technique—and keep the tools at hand.'
            : 'セミナーチケットと、レザーカットの理論を支えるためのプロダクト群。技術を学び、道具として手元に置く。'}
        </p>
      </PageHero>

      {/* PRODUCTS GRID */}
      <section className="section-pad" style={{padding:'120px 80px'}}>
        <div className="products-grid">
          {products.map((p, idx) => {
            const selectedOption = getSelectedOption(p);
            const currentItemId = selectedOption ? selectedOption.id : p.id;
            const isAdded = addedId === currentItemId;
            const unavailable = p.status !== 'available';
            const statusLabel = getStatusLabel(p.status);
            const displayPrice = selectedOption ? selectedOption.price : p.price;
            return (
              <article
                key={p.id}
                className={`product-card about-fade-up${unavailable ? ' is-unavailable' : ''}`}
              >
                {/* 画像枠：padding-top 100% で幅基準の正方形を強制（左右同一サイズ） */}
                <div className="product-media-frame">
                  <div className="product-media-square">
                    <div className="product-media">
                      <span className="product-media-idx">0{idx + 1}</span>
                      <span className="product-media-cat" style={{color: p.category === 'Seminar' ? '#C9956A' : 'rgba(237,235,229,0.72)'}}>{p.category}</span>
                      <span className="product-media-label">
                        {p.category === 'Seminar' ? 'Ticket' : 'Product Image'}
                      </span>
                      {unavailable && (
                        <div className="product-media-status">
                          <span>{statusLabel}</span>
                          <span className="product-media-status-dot" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Row 2: title + date */}
                <div className="product-header">
                  <h2 className="product-name">
                    {formatProductTitle(lang === 'zh' ? p.nameZh : lang === 'en' ? p.nameEn : p.nameJa)}
                  </h2>
                  {(p.dateJa || p.dateEn || p.dateZh) ? (
                    <p className="product-date">{t3(p.dateJa, p.dateEn, p.dateZh)}</p>
                  ) : (
                    <span className="product-date-spacer" aria-hidden="true" />
                  )}
                </div>

                {/* Row 3: description — start aligned across cards */}
                <p className="product-desc">
                  {lang === 'zh' ? p.descZh : lang === 'en' ? p.descEn : p.descJa}
                </p>

                {/* Row 4: options (optional) + footer — element count may differ */}
                <div className="product-lower">
                  {p.options && (
                    <div className="seminar-options">
                      {p.options.map((opt) => {
                        const selected = selectedOption && selectedOption.id === opt.id;
                        return (
                          <button
                            type="button"
                            key={opt.id}
                            onClick={() => setSelectedOptions((prev) => ({ ...prev, [p.id]: opt.id }))}
                            aria-pressed={selected}
                            className={`seminar-option${selected ? ' is-selected' : ''}`}
                          >
                            <span className="seminar-option-text">
                              <span className="seminar-option-label">{opt.labelEn}</span>
                              <span className="seminar-option-name">{t3(opt.nameJa, opt.nameEn, opt.nameZh)}</span>
                            </span>
                            <span className="seminar-option-price">¥{opt.price.toLocaleString()}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                  <div className="product-footer">
                    {displayPrice != null ? (
                      <span className="product-footer-price">¥{displayPrice.toLocaleString()}</span>
                    ) : (
                      <span />
                    )}
                    {unavailable ? (
                      <span className="product-footer-status">{statusLabel}</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleAddToCart(p)}
                        className={`product-add-btn${isAdded ? ' is-added' : ''}`}
                      >
                        {isAdded
                          ? (lang === 'zh' ? '已加入 ✓' : lang === 'en' ? 'Added ✓' : '追加しました ✓')
                          : (lang === 'zh' ? '加入购物车 →' : lang === 'en' ? 'Add to Cart →' : 'カートに追加 →')}
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer about-fade-up" style={{padding:'48px 80px', borderTop:'1px solid rgba(237,235,229,0.15)', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <span style={{fontFamily:'Cormorant Garamond, serif', fontSize:13, letterSpacing:'0.3em', textTransform:'uppercase', opacity:0.5}}>Razor Tech Archive</span>
        <span style={{fontSize:9, letterSpacing:'0.18em', color:'rgba(237,235,229,0.72)'}}>© 2026 Razor Tech Archive</span>
        <div style={{display:'flex', gap:24}}>
          <a href="https://www.instagram.com/razor_techarchive" target="_blank" rel="noopener noreferrer" style={{fontSize:9, letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(237,235,229,0.72)', textDecoration:'none'}}>Instagram</a>
          <a href="/contact" style={{fontSize:9, letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(237,235,229,0.72)', textDecoration:'none'}}>Contact</a>
        </div>
      </footer>

      <style>{`
        .products-grid {
          display: grid;
          /* minmax(0,1fr): iPhoneで中身のmin-contentが列幅を押し広げるのを防ぐ */
          grid-template-columns: repeat(2, minmax(0, 1fr));
          column-gap: 60px;
          align-items: start;
        }
        .product-card {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          min-width: 0;
          max-width: 100%;
          transition: opacity 0.3s;
        }
        .product-card.is-unavailable {
          opacity: 0.55;
        }
        /* 列幅が揃えば正方形も揃う。iOSは aspect-ratio を優先 */
        .product-media-frame {
          width: 100%;
          min-width: 0;
          margin-bottom: 28px;
          flex: 0 0 auto;
        }
        .product-media-square {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          height: auto;
        }
        .product-media {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: #354656;
          border: 1px solid rgba(237,235,229,0.15);
          overflow: hidden;
          box-sizing: border-box;
        }
        .product-media-idx {
          position: absolute;
          top: 16px;
          left: 16px;
          font-size: 8px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(237,235,229,0.72);
        }
        .product-media-cat {
          position: absolute;
          top: 16px;
          right: 16px;
          font-size: 8px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
        }
        .product-media-label {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: Cormorant Garamond, serif;
          font-size: 10px;
          letter-spacing: 0.3em;
          color: rgba(237,235,229,0.15);
          text-transform: uppercase;
          white-space: nowrap;
        }
        .product-media-status {
          position: absolute;
          bottom: 16px;
          left: 16px;
          right: 16px;
          border-top: 1px solid rgba(237,235,229,0.15);
          padding-top: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 8px;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          color: #EDEBE5;
        }
        .product-media-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #EDEBE5;
        }
        .product-header {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          min-height: 5.6em;
          min-width: 0;
          margin-bottom: 14px;
        }
        .product-name {
          font-family: Cormorant Garamond, serif;
          font-size: 22px;
          font-weight: 300;
          line-height: 1.2;
          margin: 0;
          letter-spacing: -0.01em;
          min-width: 0;
          overflow-wrap: break-word;
        }
        .product-date {
          font-family: 'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif;
          font-size: 11px;
          letter-spacing: 0.08em;
          color: #C9956A;
          margin: 10px 0 0;
        }
        .product-date-spacer {
          display: block;
          height: 1.2em;
          margin-top: 10px;
        }
        .product-desc {
          font-family: 'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif;
          font-size: 11px;
          line-height: 1.95;
          color: rgba(237,235,229,0.72);
          margin: 0 0 32px;
        }
        .product-lower {
          display: flex;
          flex-direction: column;
          align-self: start;
          width: 100%;
        }
        .seminar-options {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 32px;
        }
        .seminar-option {
          width: 100%;
          max-width: 100%;
          min-width: 0;
          min-height: 58px;
          box-sizing: border-box;
          text-align: left;
          cursor: pointer;
          padding: 14px 16px;
          border: 1px solid rgba(237,235,229,0.18);
          background: transparent;
          transition: border-color .35s, background-color .35s, color .35s;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          color: inherit;
          font: inherit;
        }
        .seminar-option.is-selected {
          border-color: #C9956A;
          background: rgba(201,149,106,0.09);
        }
        .seminar-option-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
          flex: 1 1 auto;
        }
        .seminar-option-label {
          font-family: DM Sans, sans-serif;
          font-size: 8px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(237,235,229,0.6);
          transition: color .35s;
        }
        .seminar-option.is-selected .seminar-option-label {
          color: #C9956A;
        }
        .seminar-option-name {
          font-family: 'Shippori Mincho', 'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif;
          font-size: 14px;
          color: #EDEBE5;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }
        .seminar-option-price {
          font-family: Cormorant Garamond, serif;
          font-size: 20px;
          font-weight: 300;
          color: #EDEBE5;
          flex-shrink: 0;
          white-space: nowrap;
          line-height: 1;
        }
        .product-footer {
          margin-top: auto;
          padding-top: 24px;
          border-top: 1px solid rgba(237,235,229,0.15);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .product-footer-price {
          font-family: Cormorant Garamond, serif;
          font-size: 22px;
          font-weight: 300;
        }
        .product-footer-status {
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(237,235,229,0.72);
        }
        .product-add-btn {
          font-family: DM Sans, sans-serif;
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #EDEBE5;
          border: 1px solid rgba(237,235,229,0.15);
          background: transparent;
          padding: 14px 24px;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.3s;
        }
        .product-add-btn.is-added {
          color: #C9956A;
        }
        @media (max-width: 768px) {
          .shop-hero-content {
            padding: 140px 24px 40px !important;
          }
          .shop-heading {
            font-size: 50px !important;
          }
          .section-pad {
            padding: 72px 24px !important;
          }
          .products-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            column-gap: 24px !important;
          }
          .product-card {
            min-width: 0 !important;
          }
          .seminar-option {
            padding: 12px 10px !important;
            gap: 8px !important;
          }
          .seminar-option-name {
            font-size: 12px !important;
          }
          .seminar-option-price {
            font-size: 16px !important;
          }
          .product-name {
            font-size: 18px !important;
          }
          .product-header {
            min-height: 5.2em !important;
          }
          .product-media-frame {
            margin-bottom: 20px !important;
          }
        }
      `}</style>
    </main>
  );
}
