import { Link } from 'react-router-dom';

const FEATURES = [
  { emoji: '🏆', title: 'Pro-портфоліо', desc: '360°-тури, відео, галерея, відгуки — все в одному місці. Клієнти бачать тебе таким, яким ти є.' },
  { emoji: '📅', title: 'Вбудований CRM', desc: 'Замовлення, ліди, переписка, контракти та платежі — без Excel і Telegram-груп.' },
  { emoji: '🤖', title: 'AI-рекомендації', desc: 'Алгоритм підбирає тебе до клієнтів, які шукають саме те, що ти пропонуєш.' },
  { emoji: '📊', title: 'Аналітика', desc: 'Переглядів, заявок, конверсій, дохід по місяцях — дані для розумних рішень.' },
  { emoji: '💬', title: 'Відгуки з верифікацією', desc: 'Тільки реальні клієнти залишають відгуки. Рейтинг, якому довіряють.' },
  { emoji: '🌍', title: '22 міста охоплення', desc: 'Один профіль — вся Україна. Приймай замовлення звідусіль.' },
];

const STATS = [
  { num: '+38%', label: 'середній дохід партнерів' },
  { num: '×3.2', label: 'швидкість закриття угоди' },
  { num: '4.9★', label: 'середній рейтинг Pro' },
  { num: '0%', label: 'прихованих комісій' },
];

const TESTIMONIALS = [
  { name: 'Olha Tkach', role: 'Фотограф, Київ', text: 'Перший місяць на Pro — і вже +4 замовлення понад звичний потік. Профіль продає сам.', emoji: '📷' },
  { name: 'Hum Catering', role: 'Кейтеринг, Київ', text: 'CRM заощаджує 6+ годин на тиждень. Більше не ведемо заявки в гугл-таблицях.', emoji: '🍽' },
  { name: 'Brass & Velvet', role: 'Гурт, Львів', text: 'AI підбирає нас саме до тих, хто шукає джаз на весілля. Конверсія — космос.', emoji: '🎷' },
];

export default function ProPage() {
  return (
    <div className="pro-page">
      <div className="pro-page-hero">
        <div className="pro-page-glow" />
        <div className="pro-page-inner">
          <span className="mono dim">⊹ EVENTSPHERE PRO · ДЛЯ БІЗНЕСУ</span>
          <h1 className="pro-page-title">Розвивай свій <em>івент-бізнес</em> разом з нами</h1>
          <p className="pro-page-sub">2 400+ виконавців вже на платформі. Приєднуйся і отримуй замовлення щодня.</p>
          <div style={{display:'flex', gap:12, flexWrap:'wrap', marginTop:32}}>
            <Link to="/register?role=vendor" className="btn-pop">
              <span className="bp-spark">✨</span><span>Стати партнером</span><span className="bp-arrow">→</span>
            </Link>
            <Link to="/pro/pricing" className="btn-line">Дивитись тарифи</Link>
          </div>
        </div>
      </div>

      <div className="pro-page-stats">
        {STATS.map(s => (
          <div key={s.label} className="pro-stat">
            <b>{s.num}</b>
            <span className="mono">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="pro-features-sec">
        <div className="sh">
          <div className="sh-kicker mono"><span className="sh-num">01</span><span className="sh-bar"/><span>Можливості</span><span className="sh-bar"/><span className="sh-spark">✦</span></div>
          <h2 className="sh-title">Все що потрібно для <em>зростання</em></h2>
        </div>
        <div className="pro-features-grid">
          {FEATURES.map(f => (
            <div key={f.title} className="pro-feat">
              <div className="pro-feat-emoji">{f.emoji}</div>
              <h3 className="pro-feat-title">{f.title}</h3>
              <p className="pro-feat-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="pro-testimonials">
        <div className="sh">
          <div className="sh-kicker mono"><span className="sh-num">02</span><span className="sh-bar"/><span>Відгуки партнерів</span><span className="sh-bar"/><span className="sh-spark">✦</span></div>
          <h2 className="sh-title">Вони вже <em>ростуть</em></h2>
        </div>
        <div className="pro-testi-grid">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="pro-testi">
              <div className="pro-testi-emoji">{t.emoji}</div>
              <p className="pro-testi-text">"{t.text}"</p>
              <div className="pro-testi-author">
                <b>{t.name}</b>
                <span className="mono">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pro-cta-sec">
        <h2>Готовий стати <em>частиною команди</em>?</h2>
        <p>Реєстрація безкоштовна. Перший місяць Pro — у подарунок.</p>
        <div style={{display:'flex', gap:12, flexWrap:'wrap', justifyContent:'center', marginTop:28}}>
          <Link to="/register?role=vendor" className="btn-pop">
            <span className="bp-spark">✨</span><span>Почати безкоштовно</span><span className="bp-arrow">→</span>
          </Link>
          <Link to="/pro/pricing" className="btn-line">Тарифи →</Link>
        </div>
      </div>
    </div>
  );
}
