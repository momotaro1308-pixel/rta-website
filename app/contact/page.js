'use client';

import { useState } from 'react';
import Nav from '../components/Nav';
import PageHero from '../components/PageHero';
import { useLang } from '../context/LangContext';
import { useGsapPageScroll } from '../hooks/useGsapPageScroll';

export default function ContactPage() {
  const mainRef = useGsapPageScroll();
  const { lang } = useLang();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) {
      setErrors((er) => ({ ...er, [name]: '' }));
    }
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = lang === 'zh' ? '请输入您的姓名。' : lang === 'en' ? 'Please enter your name.' : 'お名前を入力してください。';
    if (!form.email.trim() || !form.email.includes('@')) e.email = lang === 'zh' ? '请输入有效的邮箱地址。' : lang === 'en' ? 'Please enter a valid email address.' : '正しいメールアドレスを入力してください。';
    if (!form.message.trim()) e.message = lang === 'zh' ? '请输入留言内容。' : lang === 'en' ? 'Please enter a message.' : 'メッセージを入力してください。';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) {
      setErrors(e2);
      return;
    }

    setLoading(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error('Send failed');
      }

      setSubmitted(true);
    } catch {
      setSubmitError(lang === 'zh' ? '发送失败。' : lang === 'en' ? 'Failed to send message.' : '送信に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main ref={mainRef} style={{background:'#2E3A4A', minHeight:'100vh', fontFamily:'DM Sans, sans-serif', fontWeight:200, color:'#EDEBE5'}}>
      <Nav />

      {/* HERO */}
      <PageHero
        src="/contact-hero.jpg"
        alt="Razor Tech Archive — Contact"
        contentClassName="contact-hero-content"
        priority
      >
        <div className="about-fade-up" style={{fontSize:8, letterSpacing:'0.45em', textTransform:'uppercase', color:'#FFFFFF', marginBottom:36, display:'flex', alignItems:'center', gap:16, opacity:0.85}}>
          <span style={{width:18, height:1, background:'#FFFFFF', display:'inline-block', opacity:0.7}}></span>
          Contact — Get in Touch
        </div>
        <h1 className="page-heading about-animate-title" style={{fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(28px, 3vw, 42px)', fontWeight:200, lineHeight:1.05, letterSpacing:'-0.02em', marginBottom:36, color:'#FFFFFF'}}>
          Let's <em style={{fontStyle:'italic', color:'#FFFFFF'}}>talk</em>.
        </h1>
        <p className="about-fade-up" style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:13, color:'#FFFFFF', lineHeight:2.1, maxWidth:560, opacity:0.85}}>
          {lang === 'zh'
            ? '关于研讨会的咨询、合作洽谈，或就技术展开对话——欢迎随时给我们留言。'
            : lang === 'en'
            ? 'Inquiries about seminars, collaboration, or dialogue on technique—please send a message anytime.'
            : 'セミナーへのお問い合わせ、コラボレーションのご相談、技術についての対話。お気軽にメッセージをお送りください。'}
        </p>
      </PageHero>

      {/* FORM */}
      <section className="section-pad" style={{padding:'120px 80px'}}>
        <div className="contact-form-wrap about-fade-up" style={{maxWidth:720, margin:'0 auto'}}>
            {submitted ? (
              <div style={{border:'1px solid #C9956A', padding:'48px 36px', background:'#354656', textAlign:'center'}}>
                <span style={{width:8, height:8, borderRadius:'50%', background:'#C9956A', display:'inline-block', marginBottom:20}}></span>
                <h2 style={{fontFamily:'Cormorant Garamond, serif', fontSize:28, fontWeight:300, marginBottom:14, letterSpacing:'-0.01em'}}>
                  {lang === 'zh' ? '已送出。' : lang === 'en' ? 'Thank you.' : '送信しました。'}
                </h2>
                <p style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:12, color:'rgba(237,235,229,0.72)', lineHeight:2}}>
                  {lang === 'zh' ? (
                    <>我们已收到您的留言。<br />将在数个工作日内回复您。</>
                  ) : lang === 'en' ? (
                    <>We have received your message.<br />We will reply within a few business days.</>
                  ) : (
                    <>メッセージを受け取りました。<br />数営業日以内にご返信いたします。</>
                  )}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:32}}>
                <Field
                  label={lang === 'zh' ? 'Name / 姓名' : lang === 'en' ? 'Name' : 'Name / お名前'}
                  num="01"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={lang === 'zh' ? '您的姓名' : lang === 'en' ? 'Your name' : '山田 太郎'}
                  error={errors.name}
                />
                <Field
                  label={lang === 'zh' ? 'Email / 邮箱' : lang === 'en' ? 'Email' : 'Email / メールアドレス'}
                  num="02"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  error={errors.email}
                />
                <Field
                  label={lang === 'zh' ? 'Message / 留言' : lang === 'en' ? 'Message' : 'Message / メッセージ'}
                  num="03"
                  name="message"
                  type="textarea"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={lang === 'zh' ? '请描述您的咨询内容。' : lang === 'en' ? 'Please describe your inquiry.' : 'ご相談内容をお書きください。'}
                  error={errors.message}
                />

                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:24, paddingTop:16, borderTop:'1px solid rgba(237,235,229,0.15)', flexWrap:'wrap'}}>
                  <p style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:10, color:'rgba(237,235,229,0.72)', lineHeight:1.8, maxWidth:340}}>
                    {lang === 'zh'
                      ? '您提交的内容仅用于回复本次咨询。'
                      : lang === 'en'
                      ? 'Your submission will be used only to respond to your inquiry.'
                      : '送信内容は、お問い合わせ対応の目的でのみ使用します。'}
                  </p>
                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end', gap:12}}>
                  {submitError && (
                    <p style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:11, color:'#C9956A', letterSpacing:'0.04em', width:'100%', textAlign:'right'}}>
                      {submitError}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      fontFamily:'DM Sans, sans-serif',
                      fontSize:9,
                      letterSpacing:'0.32em',
                      textTransform:'uppercase',
                      color: loading ? 'rgba(237,235,229,0.72)' : '#EDEBE5',
                      border:'1px solid rgba(237,235,229,0.15)',
                      padding:'18px 44px',
                      background:'transparent',
                      cursor: loading ? 'wait' : 'pointer',
                      whiteSpace:'nowrap',
                    }}
                  >
                    {loading
                      ? (lang === 'zh' ? '发送中…' : 'Sending...')
                      : (lang === 'zh' ? '发送留言 →' : 'Send Message →')}
                  </button>
                </div>
                </div>
              </form>
            )}
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
          .contact-hero-content {
            padding: 140px 24px 40px !important;
          }
          .section-pad {
            padding: 72px 24px !important;
          }
        }
      `}</style>
    </main>
  );
}

function Field({ label, num, name, type = 'text', value, onChange, placeholder, error }) {
  const isTextarea = type === 'textarea';
  const sharedStyle = {
    width: '100%',
    padding: '18px 0',
    background: 'transparent',
    border: 'none',
    borderBottom: error ? '1px solid #C9956A' : '1px solid rgba(237,235,229,0.15)',
    outline: 'none',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: 14,
    color: '#EDEBE5',
    letterSpacing: '0.01em',
    resize: 'none',
  };
  return (
    <div style={{display:'flex', flexDirection:'column', gap:8}}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
        <label htmlFor={name} style={{fontFamily:'DM Sans, sans-serif', fontSize:9, letterSpacing:'0.32em', textTransform:'uppercase', color:'rgba(237,235,229,0.72)'}}>
          — {label}
        </label>
        <span style={{fontSize:9, color:'#C9956A', letterSpacing:'0.32em'}}>{num}</span>
      </div>
      {isTextarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={6}
          style={sharedStyle}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={sharedStyle}
        />
      )}
      {error && (
        <p style={{fontFamily:"'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif", fontSize:11, color:'#C9956A', letterSpacing:'0.04em'}}>{error}</p>
      )}
    </div>
  );
}
