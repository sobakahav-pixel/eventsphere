import { useState, useEffect } from 'react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="brand" href="#top">
        <span className="bm">
          <svg viewBox="0 0 32 32" width="28" height="28">
            <defs>
              <linearGradient id="bmg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#FFC857" />
                <stop offset="1" stopColor="#FF3D80" />
              </linearGradient>
            </defs>
            <path d="M16 2 L20 12 L30 13 L22 20 L25 30 L16 24 L7 30 L10 20 L2 13 L12 12 Z" fill="url(#bmg)" />
          </svg>
        </span>
        <span className="bn">EventSphere</span>
      </a>
      <nav className="nav-links">
        <a href="#bento">Каталог</a>
        <a href="#constructor">Конструктор</a>
        <a href="#match">Smart Match</a>
        <a href="/daily">Щодня</a>
        <a href="/pro">Pro</a>
      </nav>
      <div className="nav-actions">
        <a href="/login" className="nav-link">увійти</a>
        <a href="/register" className="btn-pop sm"><span>Створити</span><span className="bp-arrow">→</span></a>
      </div>
    </header>
  );
}
