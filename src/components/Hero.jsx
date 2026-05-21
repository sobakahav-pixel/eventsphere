import { useState, useEffect, useRef } from 'react';

function Confetti({ density = 80 }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    const dpr = window.devicePixelRatio || 1;
    let w, h, pieces;
    const COLORS = ['#FFC857', '#FF3D80', '#4DE0B5', '#FF5757', '#FFF1E0', '#7C5BFF'];

    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.scale(dpr, dpr);
    };
    const init = () => {
      pieces = Array.from({ length: density }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * -h,
        w: 6 + Math.random() * 6,
        h: 9 + Math.random() * 9,
        vx: (Math.random() - 0.5) * 0.6,
        vy: 1 + Math.random() * 2.4,
        rot: Math.random() * Math.PI,
        vrot: (Math.random() - 0.5) * 0.12,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: Math.random() < 0.4 ? 'circle' : Math.random() < 0.7 ? 'rect' : 'ribbon',
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pieces) {
        p.x += p.vx + Math.sin((p.y + p.x) / 60) * 0.4;
        p.y += p.vy;
        p.rot += p.vrot;
        if (p.y > h + 30) { p.y = -30; p.x = Math.random() * w; }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.shape === 'circle') {
          ctx.beginPath(); ctx.arc(0, 0, p.w / 2.2, 0, Math.PI * 2); ctx.fill();
        } else if (p.shape === 'ribbon') {
          ctx.fillRect(-p.w, -1, p.w * 2, 2);
        } else {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };
    resize(); init(); draw();
    const onR = () => { resize(); init(); };
    window.addEventListener('resize', onR);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onR); };
  }, [density]);
  return <canvas ref={ref} className="confetti" />;
}

function Firework({ x, y, hue, delay = 0, size = 60 }) {
  const rays = 12;
  return (
    <svg className="firework" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${delay}s`, width: size, height: size }} viewBox="-50 -50 100 100">
      {Array.from({ length: rays }).map((_, i) => {
        const a = (i / rays) * Math.PI * 2;
        return <line key={i} x1="0" y1="0" x2={Math.cos(a) * 40} y2={Math.sin(a) * 40} stroke={hue} strokeWidth="2" strokeLinecap="round" />;
      })}
      {Array.from({ length: rays }).map((_, i) => {
        const a = (i / rays) * Math.PI * 2;
        return <circle key={i} cx={Math.cos(a) * 38} cy={Math.sin(a) * 38} r="3" fill={hue} />;
      })}
    </svg>
  );
}

function Balloon({ color, x, delay = 0, size = 70 }) {
  return (
    <div className="balloon" style={{ left: `${x}%`, animationDelay: `${delay}s`, '--color': color, width: size, height: size * 1.7 }}>
      <svg viewBox="0 0 60 100">
        <ellipse cx="30" cy="36" rx="28" ry="34" fill={color} />
        <ellipse cx="22" cy="26" rx="6" ry="10" fill="rgba(255,255,255,0.4)" />
        <polygon points="26,68 34,68 30,76" fill={color} />
        <path d="M30 76 Q26 82 32 88 Q28 92 30 100" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none" />
      </svg>
    </div>
  );
}

function Bulbs({ n, vertical }) {
  return (
    <div className={`bulbs ${vertical ? 'v' : ''}`}>
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} className="bulb" style={{ animationDelay: `${(i % 4) * 0.15}s` }} />
      ))}
    </div>
  );
}

function MarqueeFrame({ children }) {
  return (
    <div className="marquee">
      <div className="marquee-row top"><Bulbs n={26} /></div>
      <div className="marquee-row bottom"><Bulbs n={26} /></div>
      <div className="marquee-col left"><Bulbs n={10} vertical /></div>
      <div className="marquee-col right"><Bulbs n={10} vertical /></div>
      <div className="marquee-corners">
        <span /><span /><span /><span />
      </div>
      <div className="marquee-inner">{children}</div>
    </div>
  );
}

const TICKER_LINES = [
  'Микола & Софія забронювали Vila Tysha · 18.06',
  'Studio Polonyna · 12 нових слотів на серпень',
  'AI підібрав 8 команд за останню хвилину',
  'Brass & Velvet · live у Львові 22.06',
  'Hum Catering · сезонне меню «Поділля»',
  '+ 14 нових майстрів за добу',
];

function Ticker() {
  const items = [...TICKER_LINES, ...TICKER_LINES, ...TICKER_LINES];
  return (
    <div className="ticker">
      <span className="ticker-tag"><i className="dot" /> LIVE</span>
      <div className="ticker-track">
        {items.map((s, i) => <span key={i} className="ticker-item">{s}<i className="sep">✦</i></span>)}
      </div>
    </div>
  );
}

export default function Hero() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const hh = String(time.getHours()).padStart(2, '0');
  const mm = String(time.getMinutes()).padStart(2, '0');

  return (
    <section className="hero">
      <div className="hero-spot" />
      <div className="hero-curtain l" />
      <div className="hero-curtain r" />
      <Confetti density={90} />
      <Firework x={12} y={22} hue="#FFC857" delay={0} size={120} />
      <Firework x={86} y={18} hue="#FF3D80" delay={0.7} size={100} />
      <Firework x={74} y={66} hue="#4DE0B5" delay={1.4} size={90} />
      <Firework x={20} y={70} hue="#7C5BFF" delay={2.1} size={80} />

      <div className="hero-balloons">
        <Balloon color="#FF3D80" x={6} delay={0} size={72} />
        <Balloon color="#FFC857" x={88} delay={0.6} size={86} />
        <Balloon color="#4DE0B5" x={92} delay={1.2} size={62} />
        <Balloon color="#7C5BFF" x={4} delay={1.8} size={66} />
      </div>

      <div className="hero-bar">
        <span className="mono">⊹ KYIV · СВЯТКУЄМО ЩОДНЯ</span>
        <span className="mono live"><i className="dot" /> LIVE · 2 412 ВИКОНАВЦІВ · {hh}:{mm}</span>
        <span className="mono">v.8.0 — carnival edition</span>
      </div>

      <MarqueeFrame>
        <div className="hero-inner">
          <div className="hero-pill">
            <span className="cake-emoji">🎉</span>
            <span>Платформа святкування 2026</span>
            <span className="dot pink" />
          </div>

          <h1 className="mega">
            <span className="line">Хай</span>
            <span className="line"><span className="grad">святкують</span></span>
            <span className="line">всі.</span>
          </h1>

          <p className="hero-sub">
            Від ранкової кави з квітами — до фейерверків над Дніпром. EventSphere збирає всі ритуали радості в одне місце: 2 400+ виконавців, AI-підбір команди, конструктор події та живу карту свят України.
          </p>

          <div className="hero-cta">
            <a href="#constructor" className="btn-pop">
              <span className="bp-spark">✨</span>
              <span>Зібрати свято</span>
              <span className="bp-arrow">→</span>
            </a>
            <a href="#match" className="btn-line">
              <span>Підібрати команду</span>
              <span className="dim">за 60 сек</span>
            </a>
          </div>

          <div className="hero-stats">
            <div><b>2 400+</b><span>виконавців</span></div>
            <div className="div" />
            <div><b>18 K</b><span>заходів /рік</span></div>
            <div className="div" />
            <div><b>4.9 ★</b><span>рейтинг</span></div>
            <div className="div" />
            <div><b>22</b><span>міста</span></div>
          </div>
        </div>
      </MarqueeFrame>

      <Ticker />
    </section>
  );
}
