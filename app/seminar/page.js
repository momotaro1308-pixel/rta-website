'use client';

import Nav from '../components/Nav';
import HeroImage from '../components/HeroImage';
import { useLang } from '../context/LangContext';
import { useGsapPageScroll } from '../hooks/useGsapPageScroll';

const upcomingSeminars = [
  {
    num: '01',
    date: '2026.06.30',
    name: 'Razor Basics Seminar',
    locJa: '福岡 / Fukuoka',
    locEn: 'Fukuoka / Fukuoka',
    status: 'UPCOMING',
    bodyJa: '福岡で開催する Razor Basics Seminar。レザーカットの理論と実践を、対面で深く学ぶセッション。',
    bodyEn: 'Razor Basics Seminar in Fukuoka—a session to deepen the theory and practice of razor cutting in person.',
  },
];

const pastSeminars = [
  {
    num: '01',
    date: '2026.01',
    name: 'Razor Basics Seminar',
    locJa: '東京 / Tokyo',
    locEn: 'Tokyo / Tokyo',
    status: 'PAST',
  },
  {
    num: '02',
    date: '2026.02',
    name: 'Razor Basics Seminar',
    locJa: '名古屋 / Nagoya',
    locEn: 'Nagoya / Nagoya',
    status: 'PAST',
  },
  {
    num: '03',
    date: '2026.03',
    name: 'Razor Basics Seminar',
    locJa: '台湾 / Taiwan',
    locEn: 'Taiwan / Taiwan',
    status: 'PAST',
  },
  {
    num: '04',
    date: '2026.04',
    name: 'Razor Basics Seminar',
    locJa: '台湾 / Taiwan',
    locEn: 'Taiwan / Taiwan',
    status: 'PAST',
  },
  {
    num: '05',
    date: '2026.05',
    name: 'Razor Basics Seminar',
    locJa: '香港 / Hong Kong',
    locEn: 'Hong Kong / Hong Kong',
    status: 'PAST',
  },
  {
    num: '06',
    date: '2026.06',
    name: 'Razor Basics Seminar',
    locJa: '香港 / Hong Kong',
    locEn: 'Hong Kong / Hong Kong',
    status: 'PAST',
  },
];

export default function SeminarPage() {
  const mainRef = useGsapPageScroll();
  const { lang } = useLang();
  const isEn = lang !== 'ja';

  return (
    <main ref={mainRef} style={{background:'#2E3A4A', minHeight:'100vh', fontFamily:'DM Sans, sans-serif', fontWeight:200, color:'#EDEBE5'}}>
      <Nav />

      {/* HERO PHOTO */}
      <section className="seminar-hero" style={{position:'relative', width:'100%', height:'100vh', overflow:'hidden', borderBottom:'1px solid rgba(237,235,229,0.15)'}}>
        <HeroImage src="/seminar-hero.jpg" alt="Razor Tech Archive — Seminars & Sessions" parallax priority />
        <div aria-hidden="true" style={{position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(20,26,34,0.35) 0%, rgba(20,26,34,0) 35%, rgba(46,58,74,0.4) 70%, rgba(46,58,74,1) 100%)', zIndex:5, pointerEvents:'none'}}></div>

        <div className="seminar-hero-content about-page-top" style={{position:'absolute', inset:0, zIndex:10, display:'flex', flexDirection:'column', justifyContent:'center', padding:'180px 80px 80px'}}>
          <div className="about-fade-up" style={{fontSize:8, letterSpacing:'0.45em', textTransform:'uppercase', color:'#FFFFFF', marginBottom:36, display:'flex', alignItems:'center', gap:16, opacity:0.85}}>
            <span style={{width:18, height:1, background:'#FFFFFF', display:'inline-block', opacity:0.7}}></span>
            Seminar — Sessions
          </div>
          <h1 className="page-heading about-animate-title" style={{fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(32px, 4vw, 56px)', fontWeight:200, lineHeight:1.05, letterSpacing:'-0.02em', marginBottom:20, color:'#FFFFFF'}}>
            <em style={{fontStyle:'italic', color:'#FFFFFF'}}>Seminars</em><br/>& Sessions
          </h1>
          <p className="about-fade-up" style={{fontFamily:'DM Sans, sans-serif', fontSize:10, letterSpacing:'0.38em', textTransform:'uppercase', color:'#FFFFFF', opacity:0.85}}>
            In-Person Technique Sessions
          </p>
        </div>
      </section>

      {/* UPCOMING */}
      <section className="section-pad" style={{padding:'140px 80px'}}>
        <div className="about-fade-up" style={{fontSize:8, letterSpacing:'0.45em', textTransform:'uppercase', color:'#C9956A', marginBottom:64, display:'flex', alignItems:'center', gap:16}}>
          <span style={{width:18, height:1, background:'#C9956A', display:'inline-block'}}></span>
          Upcoming
        </div>

        {upcomingSeminars.map((s) => (
          <article key={s.num} className="seminar-detail about-fade-up" style={{display:'grid', gridTemplateColumns:'200px 1fr 200px', gap:60, padding:'56px 0', borderTop:'1px solid rgba(237,235,229,0.15)', alignItems:'start'}}>
            <div>
              <div style={{fontSize:10, color:'rgba(237,235,229,0.72)', letterSpacing:'0.22em', marginBottom:14}}>{s.num} / {s.status}</div>
              <div style={{fontFamily:'Cormorant Garamond, serif', fontSize:28, fontWeight:300, lineHeight:1.1, letterSpacing:'-0.01em'}}>{s.date}</div>
            </div>

            <div>
              <h2 className="seminar-detail-title" style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:'clamp(22px,2.8vw,36px)', fontWeight:300, lineHeight:1.2, marginBottom:20, color:'#EDEBE5'}}>{s.name}</h2>
              <div style={{display:'flex', flexWrap:'wrap', gap:24, marginBottom:24, fontSize:10, color:'rgba(237,235,229,0.72)', letterSpacing:'0.18em', textTransform:'uppercase'}}>
                <span>{isEn ? s.locEn : s.locJa}</span>
                <span>{s.status}</span>
              </div>
              <p style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:12, lineHeight:2.1, color:'rgba(237,235,229,0.72)', maxWidth:540}}>{isEn ? s.bodyEn : s.bodyJa}</p>
            </div>

            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end', gap:18}}>
              <a href="/shop" style={{fontSize:9, letterSpacing:'0.28em', textTransform:'uppercase', color:'#EDEBE5', border:'1px solid rgba(237,235,229,0.15)', padding:'14px 24px', textDecoration:'none', whiteSpace:'nowrap'}}>
                {isEn ? 'Apply →' : '申し込む →'}
              </a>
            </div>
          </article>
        ))}
      </section>

      {/* PAST */}
      <section className="section-pad" style={{padding:'140px 80px', borderTop:'1px solid rgba(237,235,229,0.15)'}}>
        <div className="about-fade-up" style={{fontSize:8, letterSpacing:'0.45em', textTransform:'uppercase', color:'#C9956A', marginBottom:64, display:'flex', alignItems:'center', gap:16}}>
          <span style={{width:18, height:1, background:'#C9956A', display:'inline-block'}}></span>
          Past — Archive
        </div>

        {pastSeminars.map((s) => (
          <div key={s.num} className="past-row about-fade-up" style={{display:'grid', gridTemplateColumns:'80px 140px 1fr auto', gap:48, padding:'32px 0', borderBottom:'1px solid rgba(237,235,229,0.15)', alignItems:'center', opacity:0.6}}>
            <span style={{fontSize:10, color:'rgba(237,235,229,0.72)', letterSpacing:'0.18em'}}>{s.num}</span>
            <span style={{fontFamily:'Cormorant Garamond, serif', fontSize:14, fontWeight:300}}>{s.date}</span>
            <span style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:'clamp(15px,1.8vw,22px)', fontWeight:300}}>{s.name}</span>
            <span style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:10, color:'rgba(237,235,229,0.72)', letterSpacing:'0.12em'}}>{isEn ? s.locEn : s.locJa} · {s.status}</span>
          </div>
        ))}
      </section>

      {/* CTA — full-bleed photo like hero */}
      <section
        className="seminar-cta-hero"
        style={{
          position:'relative',
          width:'100%',
          height:'70vh',
          minHeight:420,
          overflow:'hidden',
          borderTop:'1px solid rgba(237,235,229,0.15)',
          borderBottom:'1px solid rgba(237,235,229,0.15)',
        }}
      >
        <HeroImage src="/seminar-about.jpg" alt="精密なカットと仕上がり — RTA セッション" parallax />
        <div
          aria-hidden="true"
          style={{
            position:'absolute',
            inset:0,
            background:'linear-gradient(to bottom, rgba(20,26,34,0.35) 0%, rgba(20,26,34,0) 35%, rgba(46,58,74,0.4) 70%, rgba(46,58,74,1) 100%)',
            zIndex:5,
            pointerEvents:'none',
          }}
        />

        <div
          className="seminar-cta-content"
          style={{
            position:'absolute',
            inset:0,
            zIndex:10,
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            padding:'180px 80px 80px',
          }}
        >
          <div
            className="about-fade-up"
            style={{
              fontSize:8,
              letterSpacing:'0.45em',
              textTransform:'uppercase',
              color:'#FFFFFF',
              marginBottom:36,
              display:'flex',
              alignItems:'center',
              gap:16,
              opacity:0.85,
            }}
          >
            <span style={{width:18, height:1, background:'#FFFFFF', display:'inline-block', opacity:0.7}} />
            Archive — Members
          </div>
          <h2
            className="about-fade-up"
            style={{
              fontFamily:'Cormorant Garamond, serif',
              fontSize:'clamp(28px, 3vw, 42px)',
              fontWeight:200,
              lineHeight:1.05,
              letterSpacing:'-0.02em',
              marginBottom:28,
              color:'#FFFFFF',
            }}
          >
            Join the<br />
            <em style={{fontStyle:'italic', color:'#FFFFFF'}}>Archive</em>
          </h2>
          <p
            className="about-fade-up"
            style={{
              fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif",
              fontSize:13,
              color:'#FFFFFF',
              lineHeight:2.1,
              maxWidth:560,
              opacity:0.85,
              marginBottom:40,
            }}
          >
            {isEn
              ? 'Be the first to receive new session announcements.'
              : '新しいセッション情報を、いち早く受け取る。'}
          </p>
          <div className="about-fade-up">
            <a
              href="/members"
              style={{
                display:'inline-block',
                fontSize:9,
                letterSpacing:'0.32em',
                textTransform:'uppercase',
                color:'#FFFFFF',
                border:'1px solid rgba(255,255,255,0.6)',
                padding:'18px 44px',
                textDecoration:'none',
              }}
            >
              Join the Archive →
            </a>
          </div>
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
          .seminar-hero-content {
            padding: 140px 24px 40px !important;
          }
          .section-pad {
            padding: 80px 24px !important;
          }
          .seminar-detail {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            padding: 40px 0 !important;
          }
          .seminar-detail-title {
            font-size: 24px !important;
          }
          .past-row {
            grid-template-columns: 60px 1fr !important;
            gap: 12px 24px !important;
            padding: 24px 0 !important;
          }
          .past-row > span:nth-child(2) {
            grid-column: 2 !important;
          }
          .past-row > span:nth-child(3) {
            grid-column: 1 / -1 !important;
            font-size: 18px !important;
          }
          .past-row > span:nth-child(4) {
            grid-column: 1 / -1 !important;
          }
          .seminar-cta-hero {
            height: 60vh !important;
            min-height: 380px !important;
          }
          .seminar-cta-content {
            padding: 140px 24px 48px !important;
          }
        }
      `}</style>
    </main>
  );
}
