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
    nameJa: 'Razor Basics Seminar',
    nameEn: 'Razor Basics Seminar',
    nameZh: 'Razor Basics Seminar',
    category: 'Seminar',
    status: 'available',
    descJa: 'レザーカットの理論と実践を深く学ぶ、RTAのセミナー。',
    descEn: 'RTA seminar exploring the theory and practice of razor cutting.',
    descZh: '深入研习剃刀切理论与实践的 RTA 研讨会。',
    options: [
      { id: 'seminar-morning', price: 8000, labelEn: 'Morning', nameJa: '午前のみ', nameEn: 'Morning Only', nameZh: '仅上午' },
      { id: 'seminar-fullday', price: 13000, labelEn: 'Full Day', nameJa: '午前＋午後', nameEn: 'Full Day', nameZh: '全天' },
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
      const optName = t3(opt.nameJa, opt.nameEn, opt.nameZh);
      const name = lang === 'en' ? `${productName} (${optName})` : `${productName}（${optName}）`;
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
        <div className="products-grid" style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:60}}>
          {products.map((p, idx) => {
            const selectedOption = getSelectedOption(p);
            const currentItemId = selectedOption ? selectedOption.id : p.id;
            const isAdded = addedId === currentItemId;
            const unavailable = p.status !== 'available';
            const statusLabel = getStatusLabel(p.status);
            const displayPrice = selectedOption ? selectedOption.price : p.price;
            return (
              <article key={p.id} className="product-card about-fade-up" style={{display:'flex', flexDirection:'column', opacity: unavailable ? 0.55 : 1, transition:'opacity 0.3s'}}>
                <div style={{aspectRatio:'1/1', background:'#354656', border:'1px solid rgba(237,235,229,0.15)', marginBottom:28, position:'relative', overflow:'hidden'}}>
                  <span style={{position:'absolute', top:16, left:16, fontSize:8, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(237,235,229,0.72)'}}>0{idx + 1}</span>
                  <span style={{position:'absolute', top:16, right:16, fontSize:8, letterSpacing:'0.3em', textTransform:'uppercase', color: p.category === 'Seminar' ? '#C9956A' : 'rgba(237,235,229,0.72)'}}>{p.category}</span>
                  <span style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', fontFamily:'Cormorant Garamond, serif', fontSize:10, letterSpacing:'0.3em', color:'rgba(237,235,229,0.15)', textTransform:'uppercase'}}>
                    {p.category === 'Seminar' ? 'Ticket' : 'Product Image'}
                  </span>
                  {unavailable && (
                    <div style={{position:'absolute', bottom:16, left:16, right:16, borderTop:'1px solid rgba(237,235,229,0.15)', paddingTop:12, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                      <span style={{fontSize:8, letterSpacing:'0.45em', textTransform:'uppercase', color:'#EDEBE5'}}>{statusLabel}</span>
                      <span style={{width:6, height:6, borderRadius:'50%', background:'#EDEBE5'}}></span>
                    </div>
                  )}
                </div>
                <h2 className="product-name" style={{fontFamily:'Cormorant Garamond, serif', fontSize:24, fontWeight:300, lineHeight:1.2, marginBottom:14, letterSpacing:'-0.01em'}}>{lang === 'zh' ? p.nameZh : lang === 'en' ? p.nameEn : p.nameJa}</h2>
                <p style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:11, lineHeight:1.95, color:'rgba(237,235,229,0.72)', marginBottom:32}}>{lang === 'zh' ? p.descZh : lang === 'en' ? p.descEn : p.descJa}</p>
                {p.options && (
                  <div className="seminar-options" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:32}}>
                    {p.options.map((opt) => {
                      const selected = selectedOption && selectedOption.id === opt.id;
                      return (
                        <button
                          type="button"
                          key={opt.id}
                          onClick={() => setSelectedOptions((prev) => ({ ...prev, [p.id]: opt.id }))}
                          aria-pressed={selected}
                          style={{
                            textAlign:'left',
                            cursor:'pointer',
                            padding:'16px 16px',
                            border: selected ? '1px solid #C9956A' : '1px solid rgba(237,235,229,0.15)',
                            background: selected ? 'rgba(201,149,106,0.09)' : 'transparent',
                            transition:'border-color .35s, background-color .35s, color .35s',
                            display:'flex',
                            flexDirection:'column',
                            gap:8,
                          }}
                        >
                          <span style={{fontFamily:'DM Sans, sans-serif', fontSize:8, letterSpacing:'0.3em', textTransform:'uppercase', color: selected ? '#C9956A' : 'rgba(237,235,229,0.72)', transition:'color .35s'}}>{opt.labelEn}</span>
                          <span style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:13, color:'#EDEBE5'}}>{t3(opt.nameJa, opt.nameEn, opt.nameZh)}</span>
                          <span style={{fontFamily:'Cormorant Garamond, serif', fontSize:18, fontWeight:300, color:'#EDEBE5'}}>¥{opt.price.toLocaleString()}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
                <div style={{marginTop:'auto', paddingTop:24, borderTop:'1px solid rgba(237,235,229,0.15)', display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, flexWrap:'wrap'}}>
                  {displayPrice != null ? (
                    <span style={{fontFamily:'Cormorant Garamond, serif', fontSize:22, fontWeight:300}}>¥{displayPrice.toLocaleString()}</span>
                  ) : (
                    <span />
                  )}
                  {unavailable ? (
                    <span style={{fontSize:9, letterSpacing:'0.28em', textTransform:'uppercase', color:'rgba(237,235,229,0.72)'}}>
                      {statusLabel}
                    </span>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(p)}
                      style={{
                        fontFamily:'DM Sans, sans-serif',
                        fontSize:9,
                        letterSpacing:'0.28em',
                        textTransform:'uppercase',
                        color: isAdded ? '#C9956A' : '#EDEBE5',
                        border: '1px solid rgba(237,235,229,0.15)',
                        background: 'transparent',
                        padding:'14px 24px',
                        cursor: 'pointer',
                        whiteSpace:'nowrap',
                        transition:'all 0.3s'
                      }}
                    >
                      {isAdded
                        ? (lang === 'zh' ? '已加入 ✓' : lang === 'en' ? 'Added ✓' : '追加しました ✓')
                        : (lang === 'zh' ? '加入购物车 →' : lang === 'en' ? 'Add to Cart →' : 'カートに追加 →')}
                    </button>
                  )}
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
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
          .product-name {
            font-size: 20px !important;
          }
          .seminar-options {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
