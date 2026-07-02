'use client';

import { useMemo } from 'react';
import Nav from './components/Nav';
import HeroImage from './components/HeroImage';
import { useLang } from './context/LangContext';
import { useGsapPageScroll } from './hooks/useGsapPageScroll';

const seminarsData = [
  {
    num: '01',
    date: '2026.06.30',
    name: 'Razor Basics Seminar',
    locJa: '福岡 / Fukuoka',
    locEn: 'Fukuoka / Fukuoka',
    status: 'UPCOMING',
  },
];

export default function Home() {
  const mainRef = useGsapPageScroll();
  const { lang } = useLang();
  const isEn = lang === 'en';

  const seminars = useMemo(
    () =>
      seminarsData.map((s) => ({
        ...s,
        loc: isEn ? s.locEn : s.locJa,
      })),
    [isEn]
  );

  return (
    <main ref={mainRef} style={{background:'#EDEBE5', minHeight:'100vh', fontFamily:'DM Sans, sans-serif', fontWeight:200, color:'#1C1A17'}}>
      <Nav />

      {/* HERO */}
      <section className="about-page-top" style={{position:'relative', width:'100%', height:'100vh', background:'#EDEBE5', overflow:'hidden'}}>
        <HeroImage src="/hero.jpg" alt="Razor Tech Archive" parallax priority />
        <div style={{position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(237,235,229,0) 55%, rgba(237,235,229,0.85) 100%)', zIndex:5, pointerEvents:'none'}}></div>
        <span className="hero-vert about-fade-up" style={{position:'absolute', left:24, top:'50%', transform:'translateY(-50%) rotate(180deg)', writingMode:'vertical-rl', fontSize:8, letterSpacing:'0.35em', textTransform:'uppercase', color:'#C4BFB7', zIndex:10}}>Archive</span>
        <div className="hero-title-block" style={{position:'absolute', left:48, top:'60%', transform:'translateY(-50%)', zIndex:10}}>
          <p className="hero-title-en about-animate-title" style={{fontFamily:'Cormorant Garamond, serif', fontSize:13, fontWeight:300, fontStyle:'italic', lineHeight:1.5, marginBottom:14, color:'#9A948C'}}>Precision has no language.</p>
          <p className="about-fade-up" style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:12, letterSpacing:'0.3em', color:'#9A948C'}}>
            {isEn ? 'From Sensation to Theory.' : '感覚を理論へ。'}
          </p>
        </div>
        <div className="hero-bottom about-fade-up" style={{position:'absolute', bottom:40, left:0, right:0, padding:'0 48px', display:'flex', alignItems:'flex-end', justifyContent:'flex-end', zIndex:10}}>
          <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:12}}>
            <span style={{fontFamily:"'DM Sans', sans-serif", fontSize:8, letterSpacing:'0.3em', textTransform:'uppercase', color:'rgba(28,26,23,0.5)', writingMode:'vertical-rl'}}>Scroll</span>
            <div style={{
              width:1,
              height:52,
              background:'linear-gradient(to bottom, #C9956A, transparent)',
              animation:'scrollPulse 2.4s ease-in-out infinite'
            }}></div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="about-fade-up" style={{borderTop:'1px solid #C4BFB7', borderBottom:'1px solid #C4BFB7', padding:'13px 0', overflow:'hidden'}}>
        <div style={{display:'flex', gap:60, animation:'tick 28s linear infinite', whiteSpace:'nowrap'}}>
          {['Razor Tech Archive','Razor Cut','Precision Has No Language','感覚を理論へ','From Sensation to Theory','Razor Tech Archive','Razor Cut','Precision Has No Language','感覚を理論へ','From Sensation to Theory'].map((t,i) => (
            <span key={i} style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:8, letterSpacing:'0.35em', textTransform:'uppercase', color:'#9A948C', flexShrink:0}}>{t} &nbsp;✦&nbsp; </span>
          ))}
        </div>
      </div>

      {/* SEMINAR */}
      <section className="section-pad" style={{padding:'clamp(72px, 11vw, 140px) clamp(24px, 6vw, 80px)', borderTop:'1px solid #C4BFB7'}}>
        <div className="about-fade-up section-label" style={{fontSize:8, letterSpacing:'0.45em', textTransform:'uppercase', color:'#C9956A', marginBottom:'clamp(36px, 5vw, 64px)', display:'flex', alignItems:'center', gap:16}}>
          <span style={{width:18, height:1, background:'#C9956A', display:'inline-block'}}></span>
          Upcoming Seminars
        </div>
        {seminars.map((s) => (
          <a key={s.num} href="/seminar" className="seminar-item about-fade-up" style={{display:'grid', gridTemplateColumns:'180px 1fr auto auto', alignItems:'center', gap:48, padding:'36px 0', borderBottom:'1px solid #C4BFB7', textDecoration:'none', color:'#1C1A17'}}>
            <span style={{fontSize:10, color:'#9A948C', letterSpacing:'0.12em'}}>{s.num} — {s.date}</span>
            <span className="seminar-name" style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:'clamp(18px,2.4vw,30px)', fontWeight:300, color:'#1C1A17'}}>{s.name}</span>
            <span style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:10, color:'#9A948C', letterSpacing:'0.08em'}}>{s.loc}</span>
            <span style={{fontFamily:'DM Sans, sans-serif', fontSize:9, letterSpacing:'0.28em', textTransform:'uppercase', textAlign:'right', color:'#C9956A'}}>{s.status}</span>
          </a>
        ))}
      </section>

      {/* ABOUT */}
      <section className="section-pad" style={{padding:'clamp(72px, 11vw, 140px) clamp(24px, 6vw, 80px)', borderTop:'1px solid #C4BFB7'}}>
        <div className="about-fade-up section-label" style={{fontSize:8, letterSpacing:'0.45em', textTransform:'uppercase', color:'#C9956A', marginBottom:'clamp(36px, 5vw, 64px)', display:'flex', alignItems:'center', gap:16}}>
          <span style={{width:18, height:1, background:'#C9956A', display:'inline-block'}}></span>
          About
        </div>
        <div className="about-grid" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(40px, 8vw, 120px)', alignItems:'start'}}>
          <div>
            <div className="about-heading about-fade-up" style={{fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(28px, 3vw, 42px)', fontWeight:200, lineHeight:1.05, letterSpacing:'-0.02em', marginBottom:16}}>
              Archive<br/>the <em style={{fontStyle:'italic', color:'#C9956A'}}>Sense</em>.
            </div>
            <p className="about-fade-up" style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:13, letterSpacing:'0.12em', color:'#9A948C', margin:0}}>
              {isEn ? 'Record sensation.' : '感覚を、記録する。'}
            </p>
          </div>
          <div className="about-body">
            <p className="about-fade-up" style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:13, lineHeight:2.05, color:'#9A948C', marginBottom:22}}>
              {isEn
                ? 'Much education teaches cutting methods and procedures.'
                : '多くの教育は、切り方と手順を教える。'}
            </p>
            <p className="about-fade-up" style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:13, lineHeight:2.05, color:'#9A948C', marginBottom:22}}>
              {isEn ? (
                <>But what RTA seeks to preserve is how you <strong style={{color:'#1C1A17', fontWeight:300}}>see hair</strong>.</>
              ) : (
                <>しかしRTAが保存したいのは、髪の<strong style={{color:'#1C1A17', fontWeight:300}}>「見方」</strong>だ。</>
              )}
            </p>
            <p className="about-fade-up" style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:13, lineHeight:2.05, color:'#9A948C', marginBottom:22}}>
              {isEn
                ? 'We do not let technique end as sensation alone. We observe, theorize, and translate into reproducibility.'
                : '技術を感覚で終わらせない。観察し、理論化し、再現性へ落とし込む。'}
            </p>
            <p className="about-fade-up" style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:13, lineHeight:2.05, color:'#1C1A17', margin:0}}>
              {isEn ? 'From sensation, to intention.' : '感覚から、意図へ。'}
            </p>
          </div>
        </div>
      </section>

      {/* MEMBERS */}
      <section className="section-pad" style={{padding:'clamp(72px, 11vw, 140px) clamp(24px, 6vw, 80px)', borderTop:'1px solid #C4BFB7'}}>
        <div className="members-banner" style={{border:'1px solid #C4BFB7', padding:'clamp(56px, 8vw, 100px) clamp(28px, 6vw, 80px)', display:'flex', alignItems:'center', justifyContent:'space-between', gap:60, position:'relative', overflow:'hidden'}}>
          <div>
            <div className="about-fade-up" style={{fontSize:8, letterSpacing:'0.45em', textTransform:'uppercase', color:'#C9956A', marginBottom:24, display:'flex', alignItems:'center', gap:16}}>
              <span style={{width:18, height:1, background:'#C9956A', display:'inline-block'}}></span>
              Members
            </div>
            <h2 className="members-heading about-fade-up" style={{fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(32px,4vw,56px)', fontWeight:200, lineHeight:1.0, marginBottom:20, letterSpacing:'-0.01em', whiteSpace:'nowrap'}}>Join the<br/>Archive</h2>
            <p className="about-fade-up" style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:12, color:'#9A948C', lineHeight:2, maxWidth:400}}>
              {isEn
                ? 'Members-only content, online seminars, and app access—where you deepen your craft.'
                : '会員限定コンテンツ、オンラインセミナー、アプリへのアクセス。技術を深める場所がここにあります。'}
            </p>
          </div>
          <a href="/members" className="about-fade-up" style={{fontSize:9, letterSpacing:'0.28em', textTransform:'uppercase', color:'#1C1A17', border:'1px solid #C4BFB7', padding:'20px 52px', textDecoration:'none', whiteSpace:'nowrap', flexShrink:0}}>Join Now</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer about-fade-up" style={{padding:'48px 80px', borderTop:'1px solid #C4BFB7', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <span style={{fontFamily:'Cormorant Garamond, serif', fontSize:13, letterSpacing:'0.3em', textTransform:'uppercase', opacity:0.5}}>Razor Tech Archive</span>
        <span style={{fontSize:9, letterSpacing:'0.18em', color:'#9A948C'}}>© 2026 Razor Tech Archive</span>
        <div style={{display:'flex', gap:24}}>
          <a href="https://www.instagram.com/razor_techarchive" target="_blank" rel="noopener noreferrer" style={{fontSize:9, letterSpacing:'0.22em', textTransform:'uppercase', color:'#9A948C', textDecoration:'none'}}>Instagram</a>
          <a href="/contact" style={{fontSize:9, letterSpacing:'0.22em', textTransform:'uppercase', color:'#9A948C', textDecoration:'none'}}>Contact</a>
        </div>
      </footer>

      <style>{`
        @keyframes tick { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes scrollPulse {
          0%, 100% { transform: scaleY(0.3); transform-origin: top; opacity: 0.4; }
          50% { transform: scaleY(1); transform-origin: top; opacity: 1; }
        }
        @media (max-width: 768px) {
          .hero-vert {
            display: none !important;
          }
          .hero-title-block {
            left: 20px !important;
            right: 20px !important;
          }
          .hero-bottom {
            padding: 0 20px !important;
            bottom: 32px !important;
          }
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .about-body {
            padding-top: 0 !important;
          }
          .seminar-item {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
            padding: 28px 0 !important;
          }
          .seminar-name {
            font-size: 22px !important;
          }
          .members-banner {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 32px !important;
          }
          .members-heading {
            font-size: 34px !important;
            white-space: normal !important;
          }
          .footer-flex, .site-footer {
            flex-wrap: wrap;
            gap: 16px;
          }
        }
      `}</style>
    </main>
  );
}
