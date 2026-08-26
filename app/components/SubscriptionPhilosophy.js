'use client';

import { useLayoutEffect, useRef } from 'react';
import { useLang } from '../context/LangContext';

const MINCHO = "'Shippori Mincho', 'Hiragino Mincho Pro', 'ヒラギノ明朝 Pro', serif";
const CORMORANT = "'Cormorant Garamond', serif";
const SANS = "'DM Sans', sans-serif";
const CREAM = '#EDEBE5';
const CREAM_70 = 'rgba(237,235,229,0.7)';
const COPPER = '#C9956A';
const HAIRLINE = 'rgba(237,235,229,0.15)';
const MIN_PX = 11;

// 塊の変わり目は開け、畳みかける列挙は詰める
const GAP = {
  tight: 'clamp(12px, 1.6vw, 16px)',
  near: 'clamp(20px, 2.6vw, 28px)',
  beat: 'clamp(38px, 5vw, 54px)',
  break: 'clamp(56px, 7vw, 80px)',
};

const STATEMENT = {
  ja: {
    heading: '感覚の理論化',
    lead: ['「ここにはこの切り方」——そう覚える技術はそこで終わってしまう'],
    teach: [
      '多くの教育は「答え」を教える',
      'ここにはこの切り方',
      'ここにはこの技法',
      'でも目の前の髪が変われば同じ答えがそのまま通用するとは限らない',
    ],
    conditions: ['生え癖の強さ', '毛量の多さ', '毛質の差', '骨格の違い'],
    limit: ['そんな髪を前にしたとき覚えた答えだけでは対応できない'],
    why: ['だからRTAでは「なぜ、そう切るのか」を考える'],
    link: [
      'この人のこのセクションにはなぜこの技術なのか',
      'この生え癖・髪質・骨格だからなぜこの切り方を選ぶのか',
      '目の前の条件と技術の選択を結びつける',
    ],
    tool: ['そして技術は「何を使うか」だけでは決まらない'],
    razorCue: ['たとえば、レザー。'],
    razor: [
      '根本にあるカットの理論はシザーと大きく違うわけではない',
      'けれどレザーにはレザーだからこそ重要になるシェイプがある',
      'そのシェイプが違うだけでレザー本来の質感や動きは大きく変わる',
      'レザーを持って切ることとレザーの良さを引き出すことは同じではない',
      '持ち方・角度・入れ方だけではなくその前にあるシェイプまで理解する',
    ],
    quote: '” 感覚で行っていた判断を　理由のある理論へ ”',
    open: ['理論として理解できれば技術はひとつの「答え」ではなくなる'],
    choices: ['シザーなのかレザーなのか', 'どんな状態をつくるのか', 'どこにどう技術を作用させるのか'],
    result: [
      '条件に合わせて考え技術を組み合わせ展開する',
      'そうして覚えた答えを再現するのではなく自分の頭で新しい答えを導けるようになる。',
    ],
    closer: ['感覚を理論に。', '理論を、応用できる力へ。'],
  },
  en: {
    heading: 'Theorizing sensation',
    lead: ['"This cut goes here" — technique memorized that way ends right there'],
    teach: [
      'Most education teaches the "answer"',
      'this cut goes here',
      'this technique goes here',
      'but when the hair in front of you changes, the same answer does not always hold',
    ],
    conditions: [
      'The strength of the growth pattern',
      'The amount of hair',
      'The difference in hair quality',
      'The difference in bone structure',
    ],
    limit: ['Faced with such hair, memorized answers alone cannot respond'],
    why: ['So at RTA we think about "why cut it that way"'],
    link: [
      'Why this technique for this section of this person',
      'Why choose this cut, given this growth pattern, this hair, this bone structure',
      'We connect the conditions in front of us with the choice of technique',
    ],
    tool: ['And technique is not decided by "what you use" alone'],
    razorCue: ['Take the razor, for example.'],
    razor: [
      'The cutting theory beneath it does not differ greatly from scissors',
      'but the razor has a shape that matters precisely because it is a razor',
      'a difference in that shape alone greatly changes the texture and movement only a razor gives',
      'holding a razor and drawing out what a razor can do are not the same thing',
      'not only grip, angle, and entry, but the shape that comes before them',
    ],
    quote: '” From judgment made by feel　to theory with reasons ”',
    open: ['Once understood as theory, technique is no longer a single "answer"'],
    choices: ['Scissors or razor', 'What state to create', 'Where and how to let technique act'],
    result: [
      'You think according to the conditions, combining and expanding technique',
      'And so, rather than reproducing a memorized answer, you come to draw new answers with your own mind.',
    ],
    closer: ['Sensation into theory.', 'Theory into the power to apply.'],
  },
  zh: {
    heading: '感觉的理论化',
    lead: ['「这里就用这种剪法」——这样记住的技术，到此就结束了'],
    teach: [
      '多数教育教的是「答案」',
      '这里用这种剪法',
      '这里用这种技法',
      '但眼前的头发一变，同样的答案未必就能通用',
    ],
    conditions: ['发旋的强度', '发量的多少', '发质的差异', '骨骼的不同'],
    limit: ['面对这样的头发，只靠记住的答案无法应对'],
    why: ['所以在 RTA，我们思考「为什么要这样剪」'],
    link: [
      '为这个人的这个区域，为什么是这个技术',
      '因为是这样的发旋、发质、骨骼，为什么选择这样的剪法',
      '把眼前的条件与技术的选择连结起来',
    ],
    tool: ['而且技术，并非只由「用什么」决定'],
    razorCue: ['比如，剃刀。'],
    razor: [
      '其根本的裁剪理论，与剪刀并没有太大不同',
      '但剃刀有着正因为是剃刀才格外重要的形状',
      '仅仅这个形状不同，剃刀本来的质感与动感就会大不相同',
      '拿着剃刀裁剪，与引出剃刀的长处，并不是同一件事',
      '不只是握法、角度、下刀的方式，还要理解它们之前的形状',
    ],
    quote: '” 把凭感觉做出的判断　化为有理由的理论 ”',
    open: ['若能作为理论来理解，技术便不再是唯一的「答案」'],
    choices: ['是剪刀还是剃刀', '要造出什么状态', '在哪里、如何让技术发生作用'],
    result: [
      '依条件思考，将技术组合、展开',
      '如此，不是复现记住的答案，而是能用自己的头脑导出新的答案。',
    ],
    closer: ['把感觉化为理论。', '把理论化为可应用的力量。'],
  },
};

const CLOSER_EN = '"From instinct to intention."';

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

// 各行を nowrap で測り、収まるまでフォントを縮小（下限 11px）。それでも溢れるときだけ balance で折り返す
function FitLine({ children }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      el.style.fontSize = '';
      el.style.whiteSpace = 'nowrap';
      el.style.wordBreak = 'keep-all';
      el.style.textWrap = 'nowrap';

      const available = el.clientWidth;
      if (available <= 0) return;
      if (el.scrollWidth <= available + 1) return;

      const base = parseFloat(getComputedStyle(el).fontSize);
      let lo = MIN_PX;
      let hi = base;
      let best = MIN_PX;
      for (let i = 0; i < 14; i++) {
        const mid = (lo + hi) / 2;
        el.style.fontSize = `${mid}px`;
        if (el.scrollWidth <= available + 1) {
          best = mid;
          lo = mid;
        } else {
          hi = mid;
        }
      }
      el.style.fontSize = `${best}px`;

      if (el.scrollWidth > available + 1) {
        el.style.whiteSpace = 'normal';
        el.style.textWrap = 'balance';
        el.style.wordBreak = 'auto-phrase';
        el.style.fontSize = '';
      }
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [children]);

  return (
    <span ref={ref} className="philosophy-line" style={{display:'block'}}>
      {children}
    </span>
  );
}

function Lines({ lines, gap, className, style }) {
  return (
    <p
      className={className}
      style={{
        margin: `0 auto ${gap}`,
        textAlign: 'center',
        ...style,
      }}
    >
      {lines.map((line) => (
        <FitLine key={line}>{line}</FitLine>
      ))}
    </p>
  );
}

export default function SubscriptionPhilosophy() {
  const { lang } = useLang();
  const s = STATEMENT[lang] ?? STATEMENT.ja;

  const body = {fontFamily:MINCHO, fontWeight:400, fontSize:'clamp(12.5px, 1.5vw, 14px)', lineHeight:2.15, color:CREAM_70};
  const staccato = {...body, lineHeight:1.85};
  const turn = {fontFamily:MINCHO, fontWeight:500, fontSize:'clamp(15px, 2vw, 19px)', lineHeight:1.95, color:CREAM};

  return (
    <section className="section-pad philosophy-section" style={{padding:'clamp(80px, 9vw, 112px) 80px', borderBottom:`1px solid ${HAIRLINE}`, textAlign:'center'}}>
      <div className="philosophy-inner about-fade-up" style={{maxWidth:920, margin:'0 auto'}}>
        <Label>RTA — Philosophy</Label>

        <h2 style={{fontFamily:MINCHO, fontWeight:500, fontSize:'clamp(28px, 5vw, 44px)', lineHeight:1.4, letterSpacing:'0.04em', color:CREAM, margin:`0 0 ${GAP.beat}`}}>
          <FitLine>{s.heading}</FitLine>
        </h2>

        <Lines lines={s.lead} gap={GAP.break} style={turn} />

        <Lines lines={s.teach.slice(0, 3)} gap={GAP.tight} style={staccato} />
        <Lines lines={s.teach.slice(3)} gap={GAP.near} style={body} />
        <Lines lines={s.conditions} gap={GAP.tight} style={staccato} />
        <Lines lines={s.limit} gap={GAP.break} style={body} />

        <Lines lines={s.why} gap={GAP.near} style={turn} />
        <Lines lines={s.link} gap={GAP.break} style={body} />

        <Lines lines={s.tool} gap={GAP.beat} style={turn} />
        <Lines lines={s.razorCue} gap={GAP.near} style={{...turn, fontSize:'clamp(14px, 1.8vw, 17px)'}} />
        <Lines lines={s.razor} gap={GAP.break} style={body} />

        <blockquote className="philosophy-quote" style={{fontFamily:MINCHO, fontWeight:400, fontSize:'clamp(16px, 2.5vw, 22px)', lineHeight:1.8, letterSpacing:'0.04em', color:COPPER, maxWidth:720, margin:`0 auto ${GAP.break}`, padding:'clamp(24px, 3.4vw, 34px) 0', borderTop:`1px solid ${HAIRLINE}`, borderBottom:`1px solid ${HAIRLINE}`}}>
          <FitLine>{s.quote}</FitLine>
        </blockquote>

        <Lines lines={s.open} gap={GAP.near} style={turn} />
        <Lines lines={s.choices} gap={GAP.tight} style={staccato} />
        <Lines lines={s.result} gap={GAP.break} style={body} />

        <Lines lines={s.closer} gap={GAP.beat} style={{fontFamily:MINCHO, fontWeight:500, fontSize:'clamp(17px, 2.6vw, 23px)', lineHeight:1.9, letterSpacing:'0.02em', color:CREAM}} />

        <p style={{fontFamily:CORMORANT, fontStyle:'italic', fontWeight:300, fontSize:'clamp(11px, 1.3vw, 13px)', letterSpacing:'0.18em', color:COPPER, margin:0}}>
          <FitLine>{CLOSER_EN}</FitLine>
        </p>
      </div>
    </section>
  );
}
