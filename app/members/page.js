'use client';

import Nav from '../components/Nav';
import PageHero from '../components/PageHero';
import SubscriptionPhilosophy from '../components/SubscriptionPhilosophy';
import { useLang } from '../context/LangContext';
import { useGsapPageScroll } from '../hooks/useGsapPageScroll';

const steps = [
  {
    step: 'STEP 1',
    en: 'SEE',
    jp: '髪を観察する',
    jpEn: 'Observe Hair',
    jpZh: '观察头发',
    goalJa: '切る前に見る',
    goalEn: 'See before you cut',
    goalZh: '在裁剪之前先观察',
  },
  {
    step: 'STEP 2',
    en: 'TOUCH',
    jp: '柔操作理論',
    jpEn: 'Soft Manipulation Theory',
    jpZh: '柔性操作理论',
    goalJa: '硬い操作から抜ける',
    goalEn: 'Move beyond rigid manipulation',
    goalZh: '摆脱僵硬的操作',
  },
  {
    step: 'STEP 3',
    en: 'FLOW',
    jp: 'CUT × DRY',
    jpEn: 'CUT × DRY',
    jpZh: 'CUT × DRY',
    goalJa: '自然に落ちるを作る',
    goalEn: 'Create natural fall',
    goalZh: '塑造自然的垂落',
  },
  {
    step: 'STEP 4',
    en: 'DESIGN',
    jp: 'Flow Design',
    jpEn: 'Flow Design',
    jpZh: 'Flow Design',
    goalJa: '狙って柔らかくする',
    goalEn: 'Soften with intention',
    goalZh: '有意识地营造柔和',
  },
  {
    step: 'STEP 5',
    en: 'EXPRESSION',
    jp: 'Visual Design',
    jpEn: 'Visual Design',
    jpZh: 'Visual Design',
    goalJa: '伝わる技術へ変える',
    goalEn: 'Transform technique into communication',
    goalZh: '让技术成为可传达的表达',
  },
];

const archiveTags = [
  'ROOT', 'FLOW', 'DRY', 'SOFTNESS', 'TENSION',
  'BOB', 'LAYER', 'WOLF', 'PERM', 'VISUAL',
];

const plans = [
  {
    name: 'BASIC',
    taglineJa: '理論中心',
    taglineEn: 'Theory-focused',
    taglineZh: '以理论为中心',
    featuresJa: ['Archive閲覧', 'Monthly更新', '基礎理論'],
    featuresEn: ['Archive access', 'Monthly updates', 'Foundational theory'],
    featuresZh: ['Archive 浏览', '每月更新', '基础理论'],
    highlight: false,
  },
  {
    name: 'FOUNDATION',
    taglineJa: '実践追加',
    taglineEn: 'Practice added',
    taglineZh: '增设实践',
    featuresJa: ['実践動画', 'Live参加', '添削', '限定配信'],
    featuresEn: ['Practice videos', 'Live participation', 'Critique', 'Exclusive releases'],
    featuresZh: ['实践视频', 'Live 参与', '作品点评', '专属放送'],
    highlight: true,
  },
  {
    name: 'CERTIFIED MEMBER',
    taglineJa: 'Offline連動',
    taglineEn: 'Offline integration',
    taglineZh: 'Offline 联动',
    featuresJa: ['認定対象', '限定Workshop', 'Community', '実技審査'],
    featuresEn: ['Certification eligible', 'Exclusive workshops', 'Community', 'Practical examination'],
    featuresZh: ['认定资格', '专属 Workshop', 'Community', '实操考核'],
    highlight: false,
  },
];

function SectionLabel({ children }) {
  return (
    <div className="about-fade-up" style={{fontSize:8, letterSpacing:'0.45em', textTransform:'uppercase', color:'#C9956A', marginBottom:64, display:'flex', alignItems:'center', gap:16}}>
      <span style={{width:18, height:1, background:'#C9956A', display:'inline-block'}} />
      {children}
    </div>
  );
}

export default function MembersPage() {
  const mainRef = useGsapPageScroll();
  const { lang } = useLang();

  return (
    <main ref={mainRef} style={{background:'#2E3A4A', minHeight:'100vh', fontFamily:'DM Sans, sans-serif', fontWeight:200, color:'#EDEBE5'}}>
      <Nav />

      {/* 1. HERO */}
      <PageHero
        src="/members-hero.jpg"
        alt="Razor Tech Archive — Members"
        contentClassName="members-hero-content"
        priority
      >
        <div className="about-fade-up" style={{fontSize:8, letterSpacing:'0.45em', textTransform:'uppercase', color:'#FFFFFF', marginBottom:36, display:'flex', alignItems:'center', gap:16, opacity:0.85}}>
          <span style={{width:18, height:1, background:'#FFFFFF', display:'inline-block', opacity:0.7}}></span>
          Members / Subscription
        </div>
        <h1 className="members-page-title about-animate-title" style={{fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(32px, 4vw, 56px)', fontWeight:200, lineHeight:1.05, letterSpacing:'-0.02em', marginBottom:20, color:'#FFFFFF'}}>
          Join the <em style={{fontStyle:'italic', color:'#FFFFFF'}}>Archive</em>
        </h1>
        <p className="about-fade-up" style={{fontFamily:'DM Sans, sans-serif', fontSize:10, letterSpacing:'0.38em', textTransform:'uppercase', color:'#FFFFFF', opacity:0.85}}>
          Archive-Based Education System
        </p>
      </PageHero>

      <SubscriptionPhilosophy />

      {/* 2. SUBSCRIPTION PURPOSE */}
      <section className="section-pad" style={{padding:'100px 80px', borderBottom:'1px solid rgba(237,235,229,0.15)'}}>
        <p className="about-fade-up" style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:'clamp(18px,2.2vw,26px)', lineHeight:1.9, color:'#EDEBE5', fontWeight:300, maxWidth:720}}>
          {lang === 'zh' ? (
            <>
              不是&ldquo;观看视频&rdquo;。<br />
              <em style={{fontStyle:'italic', color:'#C9956A'}}>&ldquo;而是积累理解。&rdquo;</em>
            </>
          ) : lang === 'en' ? (
            <>
              Not &ldquo;watching videos.&rdquo;<br />
              <em style={{fontStyle:'italic', color:'#C9956A'}}>&ldquo;Accumulating understanding.&rdquo;</em>
            </>
          ) : (
            <>
              「動画を見る」ではない。<br />
              <em style={{fontStyle:'italic', color:'#C9956A'}}>&ldquo;理解を蓄積する&rdquo;こと。</em>
            </>
          )}
        </p>
      </section>

      {/* 3. STEP 1–5 */}
      <section className="section-pad" style={{padding:'140px 80px', borderBottom:'1px solid rgba(237,235,229,0.15)'}}>
        <SectionLabel>Learning Path — STEP 1–5</SectionLabel>
        {steps.map((s) => (
          <div
            key={s.step}
            className="members-step-row about-fade-up"
            style={{
              display:'grid',
              gridTemplateColumns:'minmax(0, 1fr) auto',
              alignItems:'baseline',
              gap:24,
              padding:'32px 0',
              borderBottom:'1px solid rgba(237,235,229,0.15)',
            }}
          >
            <div style={{display:'flex', flexWrap:'wrap', alignItems:'baseline', gap:'8px 16px', minWidth:0}}>
              <span style={{fontSize:9, color:'#C9956A', letterSpacing:'0.32em', flexShrink:0}}>{s.step}</span>
              <span style={{color:'rgba(237,235,229,0.15)', flexShrink:0}}>｜</span>
              <span style={{fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(20px,2.4vw,28px)', fontWeight:300, letterSpacing:'-0.01em', flexShrink:0}}>{s.en}</span>
              <span style={{color:'rgba(237,235,229,0.15)', flexShrink:0}}>—</span>
              <span style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:13, color:'#EDEBE5', fontWeight:300}}>
                {lang === 'zh' ? s.jpZh : lang === 'en' ? s.jpEn : s.jp}
              </span>
            </div>
            <span style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:11, color:'rgba(237,235,229,0.72)', letterSpacing:'0.06em', whiteSpace:'nowrap', flexShrink:0}}>
              Goal：{lang === 'zh' ? s.goalZh : lang === 'en' ? s.goalEn : s.goalJa}
            </span>
          </div>
        ))}
      </section>

      {/* 4. ARCHIVE SYSTEM */}
      <section className="section-pad" style={{padding:'140px 80px', borderBottom:'1px solid rgba(237,235,229,0.15)'}}>
        <SectionLabel>Archive System</SectionLabel>
        <div className="members-archive-grid about-fade-up" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'start'}}>
          <div>
            <p style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:'clamp(18px,2.2vw,26px)', lineHeight:1.9, color:'#EDEBE5', fontWeight:300, marginBottom:32}}>
              {lang === 'zh' ? (
                <>
                  并非单纯的视频列表。<br />
                  <em style={{fontStyle:'italic', color:'#C9956A'}}>&ldquo;可检索的教育。&rdquo;</em>
                </>
              ) : lang === 'en' ? (
                <>
                  Not simply a video library.<br />
                  <em style={{fontStyle:'italic', color:'#C9956A'}}>&ldquo;Searchable education.&rdquo;</em>
                </>
              ) : (
                <>
                  単なる動画一覧ではない。<br />
                  <em style={{fontStyle:'italic', color:'#C9956A'}}>&ldquo;検索できる教育&rdquo;</em>
                </>
              )}
            </p>
          </div>
          <div style={{border:'1px solid rgba(237,235,229,0.15)', padding:'36px 32px', background:'#354656'}}>
            <div style={{fontSize:8, letterSpacing:'0.45em', textTransform:'uppercase', color:'rgba(237,235,229,0.72)', marginBottom:24}}>— Tags</div>
            <div style={{display:'flex', flexWrap:'wrap', gap:10}}>
              {archiveTags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize:9,
                    letterSpacing:'0.22em',
                    textTransform:'uppercase',
                    color:'#EDEBE5',
                    border:'1px solid rgba(237,235,229,0.15)',
                    padding:'10px 14px',
                    background:'#2E3A4A',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. SUBSCRIPTION PLAN */}
      <section className="section-pad" style={{padding:'140px 80px', borderBottom:'1px solid rgba(237,235,229,0.15)'}}>
        <SectionLabel>Subscription Plan</SectionLabel>
        <div className="members-plans-grid" style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:32}}>
          {plans.map((plan) => (
            <article
              key={plan.name}
              className="about-fade-up"
              style={{
                border: plan.highlight ? '1px solid #C9956A' : '1px solid rgba(237,235,229,0.15)',
                padding:'40px 32px',
                background: plan.highlight ? '#354656' : 'transparent',
                display:'flex',
                flexDirection:'column',
                minHeight:360,
              }}
            >
              <h3 style={{fontFamily:'Cormorant Garamond, serif', fontSize:26, fontWeight:300, marginBottom:8, letterSpacing:'-0.01em'}}>{plan.name}</h3>
              <p style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:11, color:'#C9956A', letterSpacing:'0.12em', marginBottom:28, paddingBottom:28, borderBottom:'1px solid rgba(237,235,229,0.15)'}}>
                — {lang === 'zh' ? plan.taglineZh : lang === 'en' ? plan.taglineEn : plan.taglineJa}
              </p>
              <ul style={{listStyle:'none', flex:1, display:'flex', flexDirection:'column', gap:14}}>
                {(lang === 'zh' ? plan.featuresZh : lang === 'en' ? plan.featuresEn : plan.featuresJa).map((f) => (
                  <li key={f} style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:11, lineHeight:1.85, color:'rgba(237,235,229,0.72)', paddingLeft:16, position:'relative'}}>
                    <span style={{position:'absolute', left:0, top:'0.55em', width:4, height:4, borderRadius:'50%', background:'#C9956A'}} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/contact"
                style={{
                  display:'inline-block',
                  marginTop:28,
                  fontSize:9,
                  letterSpacing:'0.28em',
                  textTransform:'uppercase',
                  color: plan.highlight ? '#2A2620' : '#EDEBE5',
                  border: plan.highlight ? '1px solid #C9956A' : '1px solid rgba(237,235,229,0.15)',
                  padding:'16px 24px',
                  textDecoration:'none',
                  textAlign:'center',
                  background: plan.highlight ? '#C9956A' : 'transparent',
                }}
              >
                {lang === 'zh' ? '咨询 →' : 'Inquire →'}
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* 6. OFFLINE CONNECTION */}
      <section className="section-pad" style={{padding:'140px 80px', borderBottom:'1px solid rgba(237,235,229,0.15)'}}>
        <SectionLabel>Offline Connection</SectionLabel>
        <div className="members-offline about-fade-up" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:80}}>
          <div style={{padding:'40px 36px', border:'1px solid rgba(237,235,229,0.15)', background:'#354656'}}>
            <p style={{fontSize:9, letterSpacing:'0.38em', textTransform:'uppercase', color:'#C9956A', marginBottom:20}}>
              {lang === 'zh' ? '线上' : lang === 'en' ? 'Online' : 'オンライン'}
            </p>
            <p style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:'clamp(16px,1.8vw,22px)', lineHeight:2, color:'#EDEBE5', fontWeight:300}}>
              {lang === 'zh' ? '理论 · 观察 · 观察方式' : lang === 'en' ? 'Theory · Observation · Way of seeing' : '理論・観察・見方'}
            </p>
          </div>
          <div style={{padding:'40px 36px', border:'1px solid rgba(237,235,229,0.15)'}}>
            <p style={{fontSize:9, letterSpacing:'0.38em', textTransform:'uppercase', color:'#C9956A', marginBottom:20}}>
              {lang === 'zh' ? '线下' : lang === 'en' ? 'Offline' : 'オフライン'}
            </p>
            <p style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:'clamp(16px,1.8vw,22px)', lineHeight:2, color:'#EDEBE5', fontWeight:300}}>
              {lang === 'zh' ? '压力 · 温度 · 距离 · 空气 · 手的感觉' : lang === 'en' ? 'Pressure · Heat · Distance · Air · Sensation of the hands' : '圧・熱・距離・空気・手の感覚'}
            </p>
          </div>
        </div>
      </section>

      {/* 7. RTA GOAL */}
      <section className="section-pad members-goal" style={{padding:'140px 80px', borderBottom:'1px solid rgba(237,235,229,0.15)', textAlign:'center'}}>
        <p className="about-fade-up" style={{fontSize:8, letterSpacing:'0.45em', textTransform:'uppercase', color:'#C9956A', marginBottom:32}}>
          RTA Goal
        </p>
        <p className="about-fade-up" style={{fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(28px,3.5vw,48px)', fontStyle:'italic', fontWeight:300, lineHeight:1.35, color:'#EDEBE5', letterSpacing:'-0.02em'}}>
          {lang === 'zh' ? '“改变看待头发的方式。”' : lang === 'en' ? '"Change how hair is seen."' : '"髪の見え方"を変える。'}
        </p>
      </section>

      <footer className="site-footer about-fade-up" style={{padding:'48px 80px', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <span style={{fontFamily:'Cormorant Garamond, serif', fontSize:13, letterSpacing:'0.3em', textTransform:'uppercase', opacity:0.5}}>Razor Tech Archive</span>
        <span style={{fontSize:9, letterSpacing:'0.18em', color:'rgba(237,235,229,0.72)'}}>© 2026 Razor Tech Archive</span>
        <div style={{display:'flex', gap:24}}>
          <a href="https://www.instagram.com/razor_techarchive" target="_blank" rel="noopener noreferrer" style={{fontSize:9, letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(237,235,229,0.72)', textDecoration:'none'}}>Instagram</a>
          <a href="/contact" style={{fontSize:9, letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(237,235,229,0.72)', textDecoration:'none'}}>Contact</a>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .members-hero-content {
            padding: 140px 24px 40px !important;
          }
          .section-pad { padding: 80px 24px !important; }
          .members-step-row {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
            padding: 28px 0 !important;
          }
          .members-step-row > span:last-child {
            white-space: normal !important;
          }
          .members-archive-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .members-plans-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .members-offline {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .members-goal { padding: 100px 24px !important; }
        }
      `}</style>
    </main>
  );
}
