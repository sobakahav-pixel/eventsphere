import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth() ?? {};

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <Link className="brand" to="/" onClick={close}>
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
        </Link>

        <nav className="nav-links">
          <NavLink to="/catalog">Каталог</NavLink>
          <NavLink to="/#constructor" onClick={e => { e.preventDefault(); document.getElementById('constructor')?.scrollIntoView({behavior:'smooth'}); }}>Конструктор</NavLink>
          <NavLink to="/#match" onClick={e => { e.preventDefault(); document.getElementById('match')?.scrollIntoView({behavior:'smooth'}); }}>Smart Match</NavLink>
          <NavLink to="/pro">Pro</NavLink>
        </nav>

        <div className="nav-actions">
          {user ? (
            <>
              <Link to="/cabinet" className="nav-avatar" title={user.email}>
                <span>{(user.user_metadata?.name || user.email || '?')[0].toUpperCase()}</span>
              </Link>
              <Link to="/cabinet" className="nav-link">Кабінет</Link>
              <button className="btn-line sm" onClick={logout}>Вийти</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">увійти</Link>
              <Link to="/register" className="btn-pop sm">
                <span>Створити</span><span className="bp-arrow">→</span>
              </Link>
            </>
          )}
          <button
            className={`burger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Меню"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <nav className="mm-links">
            <Link to="/catalog" className="mm-link" onClick={close}>🏛 Каталог</Link>
            <Link to="/pro" className="mm-link" onClick={close}>✨ Pro для бізнесу</Link>
            <Link to="/pro/pricing" className="mm-link" onClick={close}>💰 Тарифи</Link>
            {user && <Link to="/cabinet" className="mm-link" onClick={close}>👤 Мій кабінет</Link>}
          </nav>
          <div className="mm-actions">
            {user ? (
              <button className="btn-line" style={{justifyContent:'center'}} onClick={() => { logout(); close(); }}>Вийти з акаунту</button>
            ) : (
              <>
                <Link to="/login" className="btn-line" style={{justifyContent:'center'}} onClick={close}>Увійти</Link>
                <Link to="/register" className="btn-pop" style={{justifyContent:'center'}} onClick={close}>
                  <span className="bp-spark">✨</span><span>Зареєструватись</span><span className="bp-arrow">→</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
