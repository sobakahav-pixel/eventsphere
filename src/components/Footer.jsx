export default function Footer() {
  return (
    <footer className="foot">
      <div className="foot-cta">
        <h2>Готовий <em>увімкнути</em> своє свято?</h2>
        <div className="foot-cta-actions">
          <a href="/register" className="btn-pop">
            <span className="bp-spark">✨</span>
            <span>Створити акаунт</span>
            <span className="bp-arrow">→</span>
          </a>
          <a href="/pro" className="btn-line">Я виконавець</a>
        </div>
      </div>
      <div className="foot-grid">
        <div className="foot-brand">
          <div className="brand">
            <span className="bm">
              <svg viewBox="0 0 32 32" width="22" height="22">
                <defs>
                  <linearGradient id="fg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#FFC857" />
                    <stop offset="1" stopColor="#FF3D80" />
                  </linearGradient>
                </defs>
                <path d="M16 2 L20 12 L30 13 L22 20 L25 30 L16 24 L7 30 L10 20 L2 13 L12 12 Z" fill="url(#fg)" />
              </svg>
            </span>
            <span className="bn">EventSphere</span>
          </div>
          <p>Твій всесвіт свят. Один додаток, уся Україна.</p>
        </div>
        <div>
          <h5>Клієнтам</h5>
          <a href="/catalog">Каталог</a>
          <a href="/daily">Щодня</a>
          <a href="/planner">Планувальник</a>
          <a href="/smart-match">Smart Match</a>
        </div>
        <div>
          <h5>Бізнесу</h5>
          <a href="/pro">Pro-портфоліо</a>
          <a href="/pro/crm">CRM</a>
          <a href="/pro/pricing">Тарифи</a>
        </div>
        <div>
          <h5>Контакт</h5>
          <a href="#">hello@eventsphere.ua</a>
          <a href="#">+38 044 000 0000</a>
          <a href="#">@eventsphere.ua</a>
        </div>
      </div>
      <div className="foot-base">
        <span className="mono">© 2026 EventSphere · made in Україна</span>
        <span className="mono dim">v.8.0 — carnival edition</span>
      </div>
    </footer>
  );
}
