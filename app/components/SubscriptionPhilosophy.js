'use client';

import { useLang } from '../context/LangContext';

const MINCHO = "'Shippori Mincho', 'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif";
const CORMORANT = "'Cormorant Garamond', serif";
const SANS = "'DM Sans', sans-serif";
const CREAM = '#EDEBE5';
const CREAM_70 = 'rgba(237,235,229,0.7)';
const COPPER = '#C9956A';
const HAIRLINE = 'rgba(237,235,229,0.15)';

const termsJa = ['生え癖', '毛流れ', '根元方向', '落下位置', '質感', '空気感'];
const termsEn = ['Natural growth', 'Hair flow', 'Root direction', 'Fall position', 'Texture', 'Airiness'];
const termsZh = ['发旋', '发流', '发根方向', '落点', '质感', '空气感'];

function Label({ children }) {
  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:12, marginBottom:24}}>
      <span style={{width:24, height:1, background:COPPER, display:'inline-block'}} />
      <span style={{fontFamily:SANS, fontSize:8, letterSpacing:'0.45em', textTransform:'uppercase', color:COPPER, marginRight:'-0.45em'}}>
        {children}
      </span>
    </div>
  );
}

export default function SubscriptionPhilosophy() {
  const { lang } = useLang();
  const t = (ja, en, zh) => (lang === 'zh' ? zh : lang === 'en' ? en : ja);
  const strong = { color: CREAM, fontWeight: 500 };

  return (
    <section className="section-pad" style={{padding:'clamp(88px, 10vw, 120px) 80px', borderBottom:`1px solid ${HAIRLINE}`, textAlign:'center'}}>
      <div className="about-fade-up" style={{maxWidth:720, margin:'0 auto'}}>
        <div style={{marginBottom:'clamp(72px, 10vw, 120px)'}}>
          <Label>RTA Subscription — 01</Label>
          <p style={{fontFamily:MINCHO, fontWeight:400, fontSize:'clamp(16px, 2.8vw, 21px)', lineHeight:1.8, color:CREAM, maxWidth:600, margin:'0 auto', textWrap:'balance'}}>
            {t('単なるオンラインサロンではない。', 'Not simply an online salon.', '并非只是一间线上沙龙。')}
          </p>
          <em style={{display:'block', fontFamily:CORMORANT, fontStyle:'italic', fontWeight:300, fontSize:'clamp(26px, 5vw, 44px)', lineHeight:1.3, letterSpacing:'-0.01em', color:COPPER, marginTop:12, textWrap:'balance'}}>
            {t('"感覚を保存するArchive"', '"An Archive that Preserves Sensation"', '"保存感觉的 Archive"')}
          </em>
          <p style={{fontFamily:MINCHO, fontWeight:400, fontSize:12.5, lineHeight:2.1, color:CREAM_70, maxWidth:440, margin:'28px auto 0', textWrap:'balance', wordBreak:'auto-phrase'}}>
            {lang === 'zh' ? (
              <>许多美容教育教授的是裁剪的方法、步骤与造型。而 RTA 想要保存的，是<span style={strong}>&ldquo;观察头发的方式&rdquo;</span>。</>
            ) : lang === 'en' ? (
              <>Much beauty education teaches cutting methods, procedures, and styles. But what RTA wants to preserve is <span style={strong}>&ldquo;how you see hair&rdquo;</span>.</>
            ) : (
              <>多くの美容教育は、切り方・手順・スタイルを教える。しかしRTAが保存したいのは、<span style={strong}>「髪の見方」</span>。</>
            )}
          </p>
        </div>

        <div>
          <Label>Philosophy — 02</Label>
          <p style={{fontFamily:MINCHO, fontWeight:500, fontSize:'clamp(18px, 3.5vw, 26px)', lineHeight:1.7, color:CREAM, maxWidth:560, margin:'0 auto', textWrap:'balance'}}>
            {lang === 'zh' ? (
              <>我们不让技术止步于<span style={{color:COPPER}}>&ldquo;感觉&rdquo;</span>。</>
            ) : lang === 'en' ? (
              <>We do not let technique end as <span style={{color:COPPER}}>&ldquo;sensation&rdquo;</span>.</>
            ) : (
              <>技術を<span style={{color:COPPER}}>&ldquo;感覚&rdquo;</span>で終わらせない。</>
            )}
          </p>
          <div className="philosophy-terms" style={{display:'flex', flexWrap:'wrap', justifyContent:'center', gap:8, maxWidth:520, margin:'clamp(32px, 4.5vw, 44px) auto 0'}}>
            {t(termsJa, termsEn, termsZh).map((term) => (
              <span
                key={term}
                style={{fontFamily:MINCHO, fontWeight:400, fontSize:12, lineHeight:1.6, letterSpacing:'0.08em', color:CREAM, padding:'5px 14px', border:`1px solid ${HAIRLINE}`}}
              >
                {term}
              </span>
            ))}
          </div>
          <p style={{fontFamily:MINCHO, fontWeight:400, fontSize:12.5, lineHeight:2.1, color:CREAM_70, maxWidth:400, margin:'26px auto 0', textWrap:'balance', wordBreak:'auto-phrase'}}>
            {lang === 'zh' ? (
              <>将这些<span style={strong}>理论化</span>，落实为<span style={strong}>可复现</span>的方法。从感觉，到意图。</>
            ) : lang === 'en' ? (
              <>We <span style={strong}>theorize</span> these and translate them into <span style={strong}>reproducibility</span>. From sensation, to intention.</>
            ) : (
              <>これらを<span style={strong}>理論化</span>し、<span style={strong}>再現性</span>へ落とし込む。感覚から、意図へ。</>
            )}
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .philosophy-terms { max-width: 300px !important; }
        }
      `}</style>
    </section>
  );
}
