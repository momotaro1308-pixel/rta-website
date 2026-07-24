'use client';

import { useState } from 'react';
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
    number: 'PLAN 01',
    name: 'ARCHIVE',
    taglineJa: '基礎から体系的に学ぶ',
    taglineEn: 'Learn systematically from the ground up',
    taglineZh: '从基础开始，系统地学习',
    descJa: '動画ライブラリーを通して、レザーの理論・設計・ケーススタディを好きな時間に学べます。',
    descEn: 'Through the video library, study razor theory, design, and case studies whenever it suits you.',
    descZh: '通过视频库，随时学习剃刀切的理论、设计与案例分析。',
    contents: ['Video Library', 'Foundation Theory', 'Case Study', 'Monthly Update', 'Archive Access'],
    recommendedForJa: ['まずは基礎から学びたい', '自分のペースで勉強したい', 'レザーを理論で理解したい'],
    recommendedForEn: ['Want to start with the fundamentals', 'Prefer to study at your own pace', 'Want to understand razor work through theory'],
    recommendedForZh: ['想先从基础学起', '想按自己的节奏学习', '想用理论理解剃刀切'],
    priceJa: '¥3,980 / 月',
    priceEn: '¥3,980 / month',
    priceZh: '¥3,980 / 月',
    ctaLabel: 'START LEARNING',
  },
  {
    number: 'PLAN 02',
    name: 'ACADEMY',
    taglineJa: '学びを、技術へ。',
    taglineEn: 'Turn learning into skill.',
    taglineZh: '将所学，化为技术。',
    descJa: 'Archiveの全コンテンツに加え、LIVE・添削・Q&Aを通して、サロンワークで再現できる技術へ落とし込みます。',
    descEn: 'Everything in Archive, plus live sessions, feedback, and Q&A to turn knowledge into skills you can reproduce in the salon.',
    descZh: '在 Archive 全部内容之上，通过直播、点评与问答，将知识落实为可在沙龙中复现的技术。',
    contents: ['Everything in Archive', 'Monthly Live', 'Practical Videos', 'Feedback', 'Monthly Q&A', 'Live Archive'],
    recommendedForJa: ['本気で技術を伸ばしたい', '添削を受けたい', '質問しながら学びたい', 'サロンワークの再現性を高めたい'],
    recommendedForEn: ['Serious about improving your skills', 'Want personal feedback', 'Want to learn by asking questions', 'Want more reproducibility in salon work'],
    recommendedForZh: ['想认真提升技术', '希望获得作品点评', '想边提问边学习', '想提升沙龙工作的可复现性'],
    priceJa: '¥9,800 / 月',
    priceEn: '¥9,800 / month',
    priceZh: '¥9,800 / 月',
    ctaLabel: 'JOIN ACADEMY',
  },
  {
    number: 'PLAN 03',
    name: 'CERTIFIED MEMBER',
    taglineJa: '技術を証明する。',
    taglineEn: 'Prove your craft.',
    taglineZh: '证明你的技术。',
    descJa: 'Academyプランに加え、認定制度・Workshop・コミュニティへ参加。学んだ技術を、Razor Tech Archive認定メンバーとして証明できます。',
    descEn: 'Everything in Academy, plus certification, workshops, and community—prove your skills as a certified Razor Tech Archive member.',
    descZh: '在 Academy 方案之上，加入认定制度、Workshop 与社群，以 Razor Tech Archive 认定成员的身份证明所学技术。',
    contents: ['Everything in Academy', 'Certification Program', 'Members Workshop', 'Community', 'Offline Event', 'Skill Assessment'],
    recommendedForJa: ['認定を取得したい', 'Workshopに参加したい', '仲間と成長したい', '講師や教育活動を目指したい'],
    recommendedForEn: ['Want to earn certification', 'Want to join workshops', 'Want to grow with peers', 'Aiming to teach or educate'],
    recommendedForZh: ['想取得认定资格', '想参加 Workshop', '想与伙伴共同成长', '有志于讲师或教育工作'],
    priceJa: 'Application Only（審査制）',
    priceEn: 'Application Only',
    priceZh: '仅限申请（审核制）',
    ctaLabel: 'APPLY',
  },
];

const journeySteps = [
  { no: 'STEP 01', label: 'Learn', ja: '理論を理解する', en: 'Understand the theory', zh: '理解理论' },
  { no: 'STEP 02', label: 'Practice', ja: '技術を定着させる', en: 'Make the skill stick', zh: '巩固技术' },
  { no: 'STEP 03', label: 'Certified', ja: '技術を証明する', en: 'Prove your skill', zh: '证明技术' },
];

const journeyPlans = [
  { name: 'ARCHIVE', ja: 'いつでも学べるライブラリー', en: 'A library you can learn from anytime', zh: '随时可学的资料库', star: false },
  { name: 'ACADEMY', ja: 'Live・添削・実践', en: 'Live, feedback, practice', zh: '直播 · 点评 · 实践', star: true },
  { name: 'CERTIFIED MEMBER', ja: '認定・Workshop', en: 'Certification & workshops', zh: '认定 · Workshop', star: false },
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
  const t = (ja, en, zh) => (lang === 'zh' ? zh : lang === 'en' ? en : ja);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const toggleSection = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

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
        <SectionLabel>Learning Plans</SectionLabel>
        <div className="members-plans-intro about-fade-up" style={{maxWidth:720, marginBottom:'clamp(48px, 6vw, 80px)'}}>
          <h2 style={{fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(26px,3vw,40px)', fontWeight:200, lineHeight:1.2, letterSpacing:'-0.02em', color:'#EDEBE5', marginBottom:24}}>
            {t('あなたに合った学び方を選ぶ。', 'Choose the way of learning that fits you.', '选择适合你的学习方式。')}
          </h2>
          <p style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:13, lineHeight:2.1, color:'rgba(237,235,229,0.72)', margin:0}}>
            {t(
              'Razor Tech Archiveは、レザー技術を「感覚」ではなく「理論」で学ぶ教育プラットフォームです。自分の目標に合わせて、最適な学び方を選択できます。',
              'Razor Tech Archive is an education platform for learning razor technique through theory, not sensation. Choose the learning path that best fits your goals.',
              'Razor Tech Archive 是一个用"理论"而非"感觉"学习剃刀技术的教育平台。你可以根据自己的目标，选择最合适的学习方式。'
            )}
          </p>
        </div>
        <div className="members-plans-grid" style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:32}}>
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.name;
            const contentsKey = `${plan.name}:contents`;
            const recommendedKey = `${plan.name}:recommended`;
            const contentsOpen = !!openSections[contentsKey];
            const recommendedOpen = !!openSections[recommendedKey];
            return (
              <article
                key={plan.name}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                className={`about-fade-up members-plan-card${isSelected ? ' is-selected' : ''}`}
                onClick={() => setSelectedPlan(plan.name)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedPlan(plan.name);
                  }
                }}
                style={{
                  position:'relative',
                  border: isSelected ? '1px solid #C9956A' : '1px solid rgba(237,235,229,0.15)',
                  padding:'40px 32px',
                  background: isSelected ? 'rgba(201,149,106,0.09)' : 'transparent',
                  display:'flex',
                  flexDirection:'column',
                  cursor:'pointer',
                  transition:'border-color 0.4s ease, background-color 0.4s ease',
                }}
              >
                <span style={{fontSize:8, letterSpacing:'0.32em', textTransform:'uppercase', color:'#C9956A', marginBottom:14}}>{plan.number}</span>
                <h3 style={{fontFamily:'Cormorant Garamond, serif', fontSize:26, fontWeight:300, marginBottom:10, letterSpacing:'-0.01em'}}>{plan.name}</h3>
                <p style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:12, color:'#C9956A', letterSpacing:'0.08em', marginBottom:16}}>
                  — {t(plan.taglineJa, plan.taglineEn, plan.taglineZh)}
                </p>
                <p style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:11, lineHeight:1.95, color:'rgba(237,235,229,0.72)', marginBottom:20, paddingBottom:20, borderBottom:'1px solid rgba(237,235,229,0.15)'}}>
                  {t(plan.descJa, plan.descEn, plan.descZh)}
                </p>

                <div style={{marginBottom:8}}>
                  <button
                    type="button"
                    className="plan-accordion-trigger"
                    aria-expanded={contentsOpen}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSection(contentsKey);
                    }}
                    style={{
                      width:'100%',
                      display:'flex',
                      alignItems:'center',
                      justifyContent:'space-between',
                      gap:12,
                      background:'none',
                      border:'none',
                      padding:'12px 0',
                      cursor:'pointer',
                      color:'rgba(237,235,229,0.72)',
                      fontSize:8,
                      letterSpacing:'0.32em',
                      textTransform:'uppercase',
                      fontFamily:'DM Sans, sans-serif',
                    }}
                  >
                    <span>— Contents</span>
                    <span aria-hidden="true" style={{fontSize:14, color:'#C9956A', lineHeight:1}}>{contentsOpen ? '−' : '+'}</span>
                  </button>
                  <div
                    className="plan-accordion-panel"
                    style={{
                      maxHeight: contentsOpen ? 320 : 0,
                      overflow:'hidden',
                      transition:'max-height 0.4s ease',
                    }}
                  >
                    <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap:12, padding:'4px 0 16px'}}>
                      {plan.contents.map((f) => (
                        <li key={f} style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:11, lineHeight:1.7, color:'#EDEBE5', paddingLeft:16, position:'relative'}}>
                          <span style={{position:'absolute', left:0, top:'0.5em', width:4, height:4, borderRadius:'50%', background:'#C9956A'}} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{marginBottom:24, flex:1}}>
                  <button
                    type="button"
                    className="plan-accordion-trigger"
                    aria-expanded={recommendedOpen}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSection(recommendedKey);
                    }}
                    style={{
                      width:'100%',
                      display:'flex',
                      alignItems:'center',
                      justifyContent:'space-between',
                      gap:12,
                      background:'none',
                      border:'none',
                      padding:'12px 0',
                      cursor:'pointer',
                      color:'rgba(237,235,229,0.72)',
                      fontSize:8,
                      letterSpacing:'0.32em',
                      textTransform:'uppercase',
                      fontFamily:'DM Sans, sans-serif',
                    }}
                  >
                    <span>— {t('こんな方に', 'Recommended For', '推荐给')}</span>
                    <span aria-hidden="true" style={{fontSize:14, color:'#C9956A', lineHeight:1}}>{recommendedOpen ? '−' : '+'}</span>
                  </button>
                  <div
                    className="plan-accordion-panel"
                    style={{
                      maxHeight: recommendedOpen ? 280 : 0,
                      overflow:'hidden',
                      transition:'max-height 0.4s ease',
                    }}
                  >
                    <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap:10, padding:'4px 0 16px'}}>
                      {t(plan.recommendedForJa, plan.recommendedForEn, plan.recommendedForZh).map((r) => (
                        <li key={r} style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:11, lineHeight:1.7, color:'rgba(237,235,229,0.72)', paddingLeft:16, position:'relative'}}>
                          <span style={{position:'absolute', left:0, top:'0.55em', color:'#C9956A', fontSize:9}}>✓</span>
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(22px,2.4vw,30px)', fontWeight:300, letterSpacing:'-0.01em', color:'#EDEBE5', marginBottom:24}}>
                  {t(plan.priceJa, plan.priceEn, plan.priceZh)}
                </div>
                <a
                  href="/contact"
                  className={`members-plan-cta${isSelected ? ' is-selected' : ''}`}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    display:'inline-block',
                    fontSize:9,
                    letterSpacing:'0.28em',
                    textTransform:'uppercase',
                    color: isSelected ? '#2A2620' : '#EDEBE5',
                    border: isSelected ? '1px solid #C9956A' : '1px solid rgba(237,235,229,0.15)',
                    padding:'16px 24px',
                    textDecoration:'none',
                    textAlign:'center',
                    background: isSelected ? '#C9956A' : 'transparent',
                    transition:'background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease',
                  }}
                >
                  {plan.ctaLabel}
                </a>
              </article>
            );
          })}
        </div>
      </section>

      {/* 5.5 LEARNING JOURNEY */}
      <section className="section-pad" style={{padding:'140px 80px', borderBottom:'1px solid rgba(237,235,229,0.15)'}}>
        <SectionLabel>Learning Journey</SectionLabel>
        <div className="members-journey about-fade-up" style={{display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center'}}>
          {journeySteps.map((s, i) => (
            <div key={s.no} style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
              <div>
                <div style={{fontSize:9, letterSpacing:'0.32em', textTransform:'uppercase', color:'#C9956A', marginBottom:10}}>{s.no}</div>
                <div style={{fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(24px,3vw,36px)', fontWeight:300, letterSpacing:'-0.01em', marginBottom:8}}>{s.label}</div>
                <div style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:13, color:'rgba(237,235,229,0.72)'}}>{t(s.ja, s.en, s.zh)}</div>
              </div>
              {i < journeySteps.length - 1 && (
                <span aria-hidden="true" style={{color:'#C9956A', fontSize:22, lineHeight:1, margin:'22px 0'}}>↓</span>
              )}
            </div>
          ))}
        </div>

        <div className="members-journey-plans about-fade-up" style={{marginTop:'clamp(48px, 6vw, 80px)', display:'flex', alignItems:'stretch', gap:16}}>
          {journeyPlans.map((p, i) => (
            <div key={p.name} style={{display:'contents'}}>
              <div style={{flex:1, border: p.star ? '1px solid #C9956A' : '1px solid rgba(237,235,229,0.15)', background: p.star ? 'rgba(201,149,106,0.09)' : 'transparent', padding:'28px 24px', textAlign:'center', display:'flex', flexDirection:'column', justifyContent:'center', gap:10}}>
                <div style={{fontFamily:'Cormorant Garamond, serif', fontSize:20, fontWeight:300, letterSpacing:'-0.01em', color:'#EDEBE5'}}>
                  {p.star && <span style={{color:'#C9956A'}}>★ </span>}{p.name}
                </div>
                <div style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:12, lineHeight:1.8, color:'rgba(237,235,229,0.72)'}}>{t(p.ja, p.en, p.zh)}</div>
              </div>
              {i < journeyPlans.length - 1 && (
                <span aria-hidden="true" className="journey-arrow" style={{alignSelf:'center', color:'#C9956A', fontSize:20, lineHeight:1, flexShrink:0}}>→</span>
              )}
            </div>
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
        @media (hover: hover) {
          .members-plan-card:hover {
            border-color: #C9956A !important;
            background: rgba(201,149,106,0.09) !important;
          }
        }
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
          .members-journey-plans {
            flex-direction: column !important;
          }
          .journey-arrow {
            transform: rotate(90deg) !important;
            margin: 4px 0 !important;
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
