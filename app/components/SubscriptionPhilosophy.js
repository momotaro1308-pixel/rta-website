'use client';

import { useLang } from '../context/LangContext';

const philosophyItemsJa = ['生え癖', '毛流れ', '根元方向', '落下位置', '質感', '空気感'];
const philosophyItemsEn = ['Natural growth', 'Hair flow', 'Root direction', 'Fall position', 'Texture', 'Airiness'];

export default function SubscriptionPhilosophy() {
  const { lang } = useLang();
  const isEn = lang !== 'ja';

  return (
    <section className="section-pad" style={{padding:'80px 80px', borderBottom:'1px solid rgba(237,235,229,0.15)'}}>
      <div className="about-fade-up" style={{maxWidth:640}}>
        <p style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:11, letterSpacing:'0.28em', textTransform:'uppercase', color:'#C9956A', marginBottom:32}}>
          {isEn ? 'What is RTA Subscription' : 'RTA Subscription とは'}
        </p>
        <p style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:15, lineHeight:2.2, color:'#EDEBE5', marginBottom:32, fontWeight:300}}>
          {isEn ? (
            <>RTA Subscription is not<br />simply an online salon.</>
          ) : (
            <>RTA Subscriptionは、<br />単なるオンラインサロンではない。</>
          )}
        </p>
        <p style={{fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(18px,2vw,24px)', fontStyle:'italic', fontWeight:300, color:'#EDEBE5', marginBottom:48, letterSpacing:'-0.01em', paddingLeft:24, borderLeft:'1px solid rgba(237,235,229,0.15)'}}>
          {isEn ? '"An Archive that Preserves Sensation"' : '"感覚を保存するArchive"'}
        </p>
        <p style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:12, lineHeight:2.4, color:'rgba(237,235,229,0.72)', marginBottom:8}}>
          {isEn
            ? 'Much beauty education teaches cutting methods, procedures, and styles.'
            : '多くの美容教育は、切り方・手順・スタイルを教える。'}
        </p>
        <p style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:12, lineHeight:2.4, color:'rgba(237,235,229,0.72)', marginBottom:48}}>
          {isEn ? (
            <>But what RTA wants to preserve is <strong style={{color:'#EDEBE5', fontWeight:300}}>"how you see hair"</strong>.</>
          ) : (
            <>しかしRTAが保存したいのは、<strong style={{color:'#EDEBE5', fontWeight:300}}>「髪の見方」</strong>。</>
          )}
        </p>
        <p style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:11, letterSpacing:'0.28em', textTransform:'uppercase', color:'#C9956A', marginBottom:24}}>
          RTA Subscription Philosophy
        </p>
        <p style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:13, lineHeight:2.2, color:'#EDEBE5', marginBottom:40, fontWeight:300}}>
          {isEn ? (
            <>We do not let technique end as <strong style={{fontWeight:300}}>"sensation"</strong>.</>
          ) : (
            <>技術を<strong style={{fontWeight:300}}>"感覚"</strong>で終わらせない。</>
          )}
        </p>
        <p style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:12, lineHeight:2.4, color:'rgba(237,235,229,0.72)', marginBottom:16}}>
          {isEn ? 'At RTA,' : 'RTAでは、'}
        </p>
        <div style={{display:'flex', flexWrap:'wrap', gap:'8px 24px', marginBottom:32}}>
          {(isEn ? philosophyItemsEn : philosophyItemsJa).map((item) => (
            <span key={item} style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:11, color:'#EDEBE5', letterSpacing:'0.12em', display:'flex', alignItems:'center', gap:8}}>
              <span style={{width:4, height:4, borderRadius:'50%', background:'#C9956A', display:'inline-block'}} />
              {item}
            </span>
          ))}
        </div>
        <p style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:12, lineHeight:2.4, color:'rgba(237,235,229,0.72)'}}>
          {isEn ? 'we theorize these and translate them into reproducibility.' : 'を理論化し、再現性へ落とし込む。'}
        </p>
      </div>
    </section>
  );
}
