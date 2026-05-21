import { Link } from 'react-router-dom';

const PLANS = [
  {
    id: 'free', name: 'Starter', price: '0', period: 'назавжди', tone: 'blue',
    desc: 'Для старту і тестування платформи',
    features: ['Базовий профіль', '3 фото у портфоліо', 'До 5 заявок на місяць', 'Рейтинг і відгуки', 'Підтримка через чат'],
    cta: 'Почати безкоштовно', href: '/register?role=vendor&plan=free',
  },
  {
    id: 'pro', name: 'Pro', price: '990', period: '/міс', tone: 'gold', popular: true,
    desc: 'Для активних виконавців, які хочуть рости',
    features: ['Необмежене портфоліо', 'AI-рекомендації клієнтам', 'CRM: замовлення і ліди', 'Аналітика і статистика', 'Пріоритет у пошуку', 'Верифікований бейдж', 'Підтримка 24/7'],
    cta: 'Спробувати Pro', href: '/register?role=vendor&plan=pro',
    badge: '🔥 Популярний',
  },
  {
    id: 'business', name: 'Business', price: '2 490', period: '/міс', tone: 'magenta',
    desc: 'Для агенцій і великих гравців ринку',
    features: ['Все з Pro', 'До 5 профілів команди', '360°-тури і відео-презентація', 'Персональний менеджер', 'Приватна аналітика ринку', 'Брендований кабінет', 'API-доступ'],
    cta: 'Зв\'язатись з нами', href: 'mailto:hello@eventsphere.ua',
  },
];

export default function PricingPage() {
  return (
    <div className="pricing-page">
      <div className="pricing-hero">
        <span className="mono dim">⊹ ТАРИФИ · EVENTSPHERE PRO</span>
        <h1 className="pricing-title">Чесні ціни, <em>нуль комісій</em></h1>
        <p className="pricing-sub">Ви платите за підписку — і заробляєте 100% від кожного замовлення. Без прихованих зборів.</p>
      </div>

      <div className="pricing-grid">
        {PLANS.map(p => (
          <div key={p.id} className={`pricing-card t-${p.tone} ${p.popular ? 'is-popular' : ''}`}>
            <div className="pc-mesh" />
            {p.badge && <div className="pc-badge mono">{p.badge}</div>}
            <div className="pc-name mono">{p.name}</div>
            <div className="pc-price">
              <b>₴{p.price}</b><span className="mono">{p.period}</span>
            </div>
            <p className="pc-desc">{p.desc}</p>
            <ul className="pc-features">
              {p.features.map(f => <li key={f}><span className="pc-check">✓</span>{f}</li>)}
            </ul>
            <a href={p.href} className={p.popular ? 'btn-pop' : 'btn-line'} style={{marginTop:'auto', justifyContent:'center'}}>
              {p.popular && <span className="bp-spark">✨</span>}
              <span>{p.cta}</span>
              <span className={p.popular ? 'bp-arrow' : ''}>→</span>
            </a>
          </div>
        ))}
      </div>

      <div className="pricing-faq">
        <h2 className="sh-title" style={{textAlign:'center', marginBottom:40}}>Часті запитання</h2>
        {[
          ['Чи є прихована комісія?', 'Ні. Ви платите тільки за підписку. Всі кошти від клієнтів — ваші.'],
          ['Чи можна скасувати підписку?', 'Так, у будь-який момент. Жодних штрафів і прихованих умов.'],
          ['Перший місяць безкоштовний?', 'Так, для нових партнерів — перший місяць Pro у подарунок.'],
          ['Як оплатити?', 'Карткою (Visa/Mastercard), LiqPay або рахунком для юросіб.'],
        ].map(([q, a]) => (
          <details key={q} className="faq-item">
            <summary className="faq-q">{q}</summary>
            <p className="faq-a">{a}</p>
          </details>
        ))}
      </div>

      <div className="pro-cta-sec" style={{marginTop:0}}>
        <h2>Ще питання? <em>Напишіть нам</em></h2>
        <a href="mailto:hello@eventsphere.ua" className="btn-pop" style={{margin:'0 auto', marginTop:24}}>
          <span>hello@eventsphere.ua</span><span className="bp-arrow">→</span>
        </a>
      </div>
    </div>
  );
}
