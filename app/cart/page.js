'use client';

import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import { useCart } from '../context/CartContext';
import { useLang } from '../context/LangContext';
import { useGsapPageScroll } from '../hooks/useGsapPageScroll';

export default function CartPage() {
  const mainRef = useGsapPageScroll();
  const { lang } = useLang();
  const isEn = lang !== 'ja';
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      setSuccess(true);
      clearCart();
      window.history.replaceState({}, '', '/cart');
    }
  }, [clearCart]);

  const handleCheckout = async () => {
    if (!cartItems.length) return;
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(
          isEn
            ? 'Could not start checkout. Please try again later.'
            : 'チェックアウトを開始できませんでした。時間をおいて再度お試しください。'
        );
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert(isEn ? 'A network error occurred.' : 'ネットワークエラーが発生しました。');
      setLoading(false);
    }
  };

  return (
    <main
      ref={mainRef}
      style={{
        background: '#2E3A4A',
        minHeight: '100vh',
        fontFamily: 'DM Sans, sans-serif',
        fontWeight: 200,
        color: '#EDEBE5',
      }}
    >
      {success && (
        <div
          style={{
            position: 'fixed',
            top: 96,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 250,
            background: '#354656',
            border: '1px solid #C9956A',
            padding: '16px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#C9956A',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: "'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif",
              fontSize: 12,
              color: '#EDEBE5',
            }}
          >
            {isEn ? 'Thank you for your order.' : 'ご注文ありがとうございました。'}
          </span>
          <button
            type="button"
            onClick={() => setSuccess(false)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(237,235,229,0.72)',
              fontSize: 14,
              paddingLeft: 4,
            }}
          >
            ×
          </button>
        </div>
      )}

      <Nav />

      <section
        className="cart-header about-page-top"
        style={{ padding: '180px 80px 80px', borderBottom: '1px solid rgba(237,235,229,0.15)' }}
      >
        <div
          className="about-fade-up"
          style={{
            fontSize: 8,
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: '#C9956A',
            marginBottom: 36,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <span style={{ width: 18, height: 1, background: '#C9956A', display: 'inline-block' }} />
          Cart — Your Selection
        </div>
        <h1
          className="cart-heading about-animate-title"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(48px,7vw,108px)',
            fontWeight: 200,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            marginBottom: 36,
          }}
        >
          Shopping <em style={{ fontStyle: 'italic', color: '#C9956A' }}>Cart</em>
        </h1>
        <p
          className="about-fade-up"
          style={{
            fontFamily: "'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif",
            fontSize: 13,
            color: 'rgba(237,235,229,0.72)',
            lineHeight: 2.1,
            maxWidth: 540,
          }}
        >
          {isEn
            ? 'Review your items and proceed to checkout when ready.'
            : 'カート内の商品を確認し、よろしければまとめて決済へ進んでください。'}
        </p>
      </section>

      <section className="section-pad" style={{ padding: '120px 80px' }}>
        {cartItems.length === 0 ? (
          <div className="about-fade-up" style={{ textAlign: 'center', padding: '80px 0' }}>
            <p
              style={{
                fontFamily: "'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif",
                fontSize: 14,
                color: 'rgba(237,235,229,0.72)',
                marginBottom: 32,
              }}
            >
              {isEn ? 'Your cart is empty.' : 'カートに商品がありません。'}
            </p>
            <a
              href="/shop"
              style={{
                fontSize: 9,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: '#EDEBE5',
                border: '1px solid rgba(237,235,229,0.15)',
                padding: '14px 24px',
                textDecoration: 'none',
              }}
            >
              {isEn ? 'Go to Shop →' : 'ショップへ →'}
            </a>
          </div>
        ) : (
          <>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="about-fade-up cart-item"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto auto auto',
                    alignItems: 'center',
                    gap: 24,
                    padding: '28px 0',
                    borderBottom: '1px solid rgba(237,235,229,0.15)',
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: 22,
                        fontWeight: 300,
                        margin: '0 0 6px',
                      }}
                    >
                      {item.name}
                    </h2>
                    <span style={{ fontSize: 9, letterSpacing: '0.22em', color: 'rgba(237,235,229,0.72)' }}>
                      × {item.quantity}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 20,
                      fontWeight: 300,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    ¥{(item.price * item.quantity).toLocaleString()}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      fontSize: 9,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: 'rgba(237,235,229,0.72)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {isEn ? 'Remove' : '削除'}
                  </button>
                </li>
              ))}
            </ul>

            <div
              className="about-fade-up cart-summary"
              style={{
                marginTop: 48,
                paddingTop: 32,
                borderTop: '1px solid rgba(237,235,229,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 24,
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: 9,
                    letterSpacing: '0.32em',
                    textTransform: 'uppercase',
                    color: 'rgba(237,235,229,0.72)',
                    display: 'block',
                    marginBottom: 8,
                  }}
                >
                  {isEn ? 'Total' : '合計'}
                </span>
                <span
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 32,
                    fontWeight: 300,
                  }}
                >
                  ¥{total.toLocaleString()}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCheckout}
                disabled={loading}
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 9,
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: loading ? 'rgba(237,235,229,0.72)' : '#EDEBE5',
                  border: '1px solid rgba(237,235,229,0.15)',
                  background: 'transparent',
                  padding: '16px 32px',
                  cursor: loading ? 'wait' : 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {loading
                  ? isEn
                    ? 'Loading…'
                    : '処理中…'
                  : isEn
                    ? 'Checkout All →'
                    : 'まとめて決済 →'}
              </button>
            </div>
          </>
        )}
      </section>

      <footer
        className="site-footer about-fade-up"
        style={{
          padding: '48px 80px',
          borderTop: '1px solid rgba(237,235,229,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 13,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            opacity: 0.5,
          }}
        >
          Razor Tech Archive
        </span>
        <span style={{ fontSize: 9, letterSpacing: '0.18em', color: 'rgba(237,235,229,0.72)' }}>
          © 2026 Razor Tech Archive
        </span>
        <div style={{ display: 'flex', gap: 24 }}>
          <a
            href="https://www.instagram.com/razor_techarchive"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 9,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(237,235,229,0.72)',
              textDecoration: 'none',
            }}
          >
            Instagram
          </a>
          <a
            href="/contact"
            style={{
              fontSize: 9,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(237,235,229,0.72)',
              textDecoration: 'none',
            }}
          >
            Contact
          </a>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .cart-header {
            padding: 140px 24px 60px !important;
          }
          .cart-heading {
            font-size: 50px !important;
          }
          .section-pad {
            padding: 72px 24px !important;
          }
          .cart-item {
            grid-template-columns: 1fr auto !important;
            grid-template-rows: auto auto;
          }
          .cart-summary {
            flex-direction: column;
            align-items: flex-start !important;
          }
          .site-footer {
            padding: 40px 24px !important;
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
        }
      `}</style>
    </main>
  );
}
