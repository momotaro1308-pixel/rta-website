'use client';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LangContext';

const menuItems = [
  ['01', 'Seminar', '/seminar'],
  ['02', 'Shop', '/shop'],
  ['03', 'Members', '/members'],
  ['04', 'About', '/about'],
  ['05', 'Contact', '/contact'],
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang } = useLang();
  const { cartCount } = useCart();

  return (
    <>
      <nav className="site-nav" style={{position:'fixed', top:0, left:0, right:0, zIndex:200, padding:'26px 48px', display:'grid', gridTemplateColumns:'auto 1fr auto', alignItems:'center', gap:16, background:'rgba(237,235,229,0.9)', backdropFilter:'blur(12px)', borderBottom:'1px solid #C4BFB7'}}>
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" style={{display:'flex', flexDirection:'column', gap:7, cursor:'pointer', padding:4, background:'none', border:'none', zIndex:300, justifySelf:'start'}}>
          <span style={{display:'block', width:24, height:1, background:'#1C1A17', transition:'all 0.5s', transform: menuOpen ? 'translateY(8px) rotate(45deg)' : 'none'}}></span>
          <span style={{display:'block', width:24, height:1, background:'#1C1A17', transition:'all 0.5s', opacity: menuOpen ? 0 : 1}}></span>
          <span style={{display:'block', width:24, height:1, background:'#1C1A17', transition:'all 0.5s', transform: menuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none'}}></span>
        </button>
        <div style={{textAlign:'center', whiteSpace:'nowrap', minWidth:0}}>
          <a href="/" className="site-logo" style={{fontFamily:'Cormorant Garamond, serif', fontSize:11, letterSpacing:'0.2em', textTransform:'uppercase', whiteSpace:'nowrap', color:'#1C1A17', textDecoration:'none'}}>Razor Tech Archive</a>
        </div>
        <div style={{display:'flex', gap:14, alignItems:'center', justifySelf:'end', flexWrap:'wrap', justifyContent:'flex-end'}}>
          <div
            role="group"
            aria-label="Language"
            style={{
              display:'inline-flex',
              alignItems:'center',
              fontFamily:'DM Sans, sans-serif',
              fontSize:9,
              letterSpacing:'0.18em',
              textTransform:'uppercase',
              border:'1px solid #C4BFB7',
              background:'rgba(237,235,229,0.6)',
            }}
          >
            <button
              type="button"
              onClick={() => setLang('en')}
              style={{
                padding:'8px 10px',
                border:'none',
                borderRight:'1px solid #C4BFB7',
                background: lang === 'en' ? '#1C1A17' : 'transparent',
                color: lang === 'en' ? '#EDEBE5' : '#1C1A17',
                cursor:'pointer',
                letterSpacing:'0.18em',
              }}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang('ja')}
              style={{
                padding:'8px 10px',
                border:'none',
                background: lang === 'ja' ? '#1C1A17' : 'transparent',
                color: lang === 'ja' ? '#EDEBE5' : '#1C1A17',
                cursor:'pointer',
                letterSpacing:'0.18em',
              }}
            >
              JP
            </button>
          </div>
          {/* マイページ/アカウントボタンは一時的に非表示。復活させる場合は下のコメントを解除する。
          <button aria-label="Account" style={{background:'none', border:'none', cursor:'pointer', opacity:0.5}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1C1A17" strokeWidth="1.2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </button>
          */}
          <a href="/cart" aria-label="Cart" style={{position:'relative', display:'flex', alignItems:'center', opacity:0.5, textDecoration:'none'}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1C1A17" strokeWidth="1.2" strokeLinecap="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            {cartCount > 0 && (
              <span style={{position:'absolute', top:-6, right:-8, minWidth:16, height:16, padding:'0 4px', fontSize:8, background:'#C9956A', color:'white', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', lineHeight:1}}>
                {cartCount}
              </span>
            )}
          </a>
        </div>
      </nav>

      {menuOpen && (
        <div className="menu-overlay" style={{position:'fixed', inset:0, background:'#E5E2DA', zIndex:150, display:'flex', flexDirection:'column', justifyContent:'center', padding:'120px 80px 80px'}}>
          <ul style={{listStyle:'none', marginBottom:80}}>
            {menuItems.map(([num, name, href]) => (
              <li key={name} style={{borderBottom:'1px solid #C4BFB7', overflow:'hidden'}}>
                <a href={href} style={{display:'flex', alignItems:'center', padding:'22px 0', textDecoration:'none', color:'rgba(28,26,23,0.45)', fontSize:11, letterSpacing:'0.32em', textTransform:'uppercase'}}>
                  <span style={{fontSize:9, color:'#9A948C', width:36}}>{num}</span>
                  <span style={{flex:1, paddingLeft:20}}>{name}</span>
                  <span style={{fontSize:10, color:'#C9956A'}}>→</span>
                </a>
              </li>
            ))}
          </ul>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end'}}>
            <p style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:12, fontStyle:'italic', color:'#9A948C', lineHeight:1.8}}>Precision has no language.<br/>感覚を理論へ。</p>
            <div style={{display:'flex', gap:28}}>
              <a href="https://www.instagram.com/razor_techarchive" target="_blank" rel="noopener noreferrer" style={{fontSize:9, letterSpacing:'0.22em', textTransform:'uppercase', color:'#9A948C', textDecoration:'none'}}>Instagram</a>
              <a href="#" style={{fontSize:9, letterSpacing:'0.22em', textTransform:'uppercase', color:'#9A948C', textDecoration:'none'}}>© 2026 RTA</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
