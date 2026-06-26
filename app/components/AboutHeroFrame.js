const HERO = {
  outer: '#C9BFAD',
  frame: '#F1EBDF',
  frameBorder: '#b8ac96',
  ink: '#2a2318',
  sub: '#6a6254',
};

// Slightly larger corner chamfers + notch depths so the ticket character
// still reads at large desktop widths (not just on a small card).
const FRAME_CLIP = `polygon(
  0 24px, 24px 0,
  calc(38% - 12px) 0, 38% 10px, calc(38% + 12px) 0,
  calc(62% - 12px) 0, 62% 10px, calc(62% + 12px) 0,
  calc(100% - 24px) 0, 100% 24px,
  100% 40%, calc(100% - 10px) 44%, 100% 48%,
  100% calc(100% - 24px), calc(100% - 24px) 100%,
  62% 100%, calc(62% - 10px) calc(100% - 10px), calc(62% - 20px) 100%,
  24px 100%, 0 calc(100% - 24px),
  0 52%, 10px 48%, 0 44%
)`;

function Micro({ children, style, ink }) {
  return (
    <span
      style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 'clamp(7px, 0.7vw, 9px)',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: ink ? HERO.ink : HERO.sub,
        lineHeight: 1.5,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

function CheckerFlag({ side = 'left' }) {
  const cells = side === 'left' ? [1, 0, 1, 0, 1] : [0, 1, 0, 1, 0];
  return (
    <div aria-hidden="true" style={{ display: 'flex', gap: 0 }}>
      {cells.map((on, i) => (
        <div
          key={i}
          style={{
            width: 6,
            height: 6,
            background: on ? HERO.ink : 'transparent',
            border: `0.5px solid ${HERO.frameBorder}`,
          }}
        />
      ))}
    </div>
  );
}

function CornerIndex({ left, right }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'clamp(14px, 1.8vw, 24px)',
        paddingTop: 'clamp(10px, 1.4vw, 18px)',
        borderTop: `0.5px solid ${HERO.frameBorder}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 4, height: 4, borderRadius: '50%', background: HERO.frame, border: `0.5px solid ${HERO.ink}` }} />
        <span style={{ width: 4, height: 4, borderRadius: '50%', background: HERO.ink }} />
        <Micro ink>{left}</Micro>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Micro ink>{right}</Micro>
        <span style={{ width: 4, height: 4, borderRadius: '50%', background: HERO.frame, border: `0.5px solid ${HERO.ink}` }} />
        <span style={{ width: 4, height: 4, borderRadius: '50%', background: HERO.ink }} />
      </div>
    </div>
  );
}

export default function AboutHeroFrame({ isEn }) {
  return (
    <section
      className="about-hero about-page-top"
      style={{
        padding: 'clamp(96px, 9vw, 130px) clamp(24px, 5vw, 60px) clamp(48px, 6vw, 80px)',
        background: HERO.outer,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        className="about-hero-frame about-fade-up"
        style={{
          width: '100%',
          maxWidth: 1200,
          background: HERO.frame,
          border: `0.5px solid ${HERO.frameBorder}`,
          clipPath: FRAME_CLIP,
          WebkitClipPath: FRAME_CLIP,
          padding: 'clamp(20px, 2.6vw, 44px) clamp(18px, 3vw, 52px) clamp(18px, 2.4vw, 40px)',
          color: HERO.ink,
        }}
      >
        {/* Top label row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            alignItems: 'center',
            gap: 8,
            marginBottom: 'clamp(12px, 1.6vw, 22px)',
          }}
        >
          <Micro ink style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            n01 <span style={{ fontSize: 6 }}>✳</span>
          </Micro>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 'clamp(6px, 0.8vw, 10px)', color: HERO.sub, marginRight: 6 }}>✳</span>
            <span
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(13px, 1.5vw, 22px)',
                letterSpacing: '0.12em',
                color: HERO.ink,
              }}
            >
              RTA<sup style={{ fontSize: '0.5em' }}>®</sup>
            </span>
            <span style={{ fontSize: 'clamp(6px, 0.8vw, 10px)', color: HERO.sub, marginLeft: 6 }}>✳</span>
          </div>
          <Micro ink style={{ textAlign: 'right' }}>
            <span style={{ fontSize: 6 }}>✳</span> m2026
          </Micro>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'clamp(10px, 1.4vw, 18px)' }}>
          <CheckerFlag side="left" />
          <CheckerFlag side="right" />
        </div>

        {/* Photo — aspect-ratio so it scales with the frame instead of staying a thin letterbox */}
        <div style={{ position: 'relative', marginBottom: 'clamp(8px, 1.2vw, 16px)' }}>
          <img
            src="/about-hero.jpg"
            alt="Razor Tech Archive — About"
            style={{
              width: '100%',
              aspectRatio: '16 / 9',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
            fetchPriority="high"
            loading="eager"
            draggable={false}
          />
        </div>
        <Micro ink style={{ display: 'block', textAlign: 'center', marginBottom: 'clamp(16px, 2.4vw, 32px)' }}>
          Razor Cut
        </Micro>

        {/* Title row */}
        <div
          className="about-hero-title-row"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1.4fr) auto minmax(0, 1fr)',
            alignItems: 'end',
            gap: 8,
            marginBottom: 'clamp(10px, 1.4vw, 18px)',
          }}
        >
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(20px, 2.4vw, 36px)', fontWeight: 300, color: HERO.ink, lineHeight: 1 }}>01</div>
            <Micro>{isEn ? 'Archive No.' : 'Archive No.'}</Micro>
          </div>
          <span style={{ color: HERO.sub, fontSize: 'clamp(8px, 1.2vw, 16px)', paddingBottom: 4 }}>✣</span>
          <h1
            className="about-animate-title"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(22px, 4.2vw, 48px)',
              fontWeight: 300,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: HERO.ink,
              margin: 0,
              lineHeight: 1.05,
              textAlign: 'center',
            }}
          >
            Razor Cut
          </h1>
          <span style={{ color: HERO.sub, fontSize: 'clamp(8px, 1.2vw, 16px)', paddingBottom: 4 }}>✣</span>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(20px, 2.4vw, 36px)', fontWeight: 300, color: HERO.ink, lineHeight: 1 }}>26</div>
            <Micro>{isEn ? 'Date' : 'Date'}</Micro>
          </div>
        </div>

        <Micro ink style={{ display: 'block', textAlign: 'center', letterSpacing: '0.28em' }}>
          The Art of — RTA Manifesto
        </Micro>

        <CornerIndex left="17 / 37" right="28 / 23" />
      </div>

      <style>{`
        .about-hero-frame {
          clip-path: ${FRAME_CLIP};
          -webkit-clip-path: ${FRAME_CLIP};
        }
        @media (max-width: 768px) {
          .about-hero-title-row {
            grid-template-columns: 1fr !important;
            text-align: center;
            justify-items: center;
            gap: 6px !important;
          }
          .about-hero-title-row > div:last-child {
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}
