import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async e => {
    e.preventDefault();
    if (!email) { setError('Введіть email'); return; }
    setLoading(true); setError('');
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://sobakahav-pixel.github.io/eventsphere/auth/callback?type=recovery',
      });
      if (error) throw error;
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-glow" />
        <Link to="/" className="auth-brand">
          <svg viewBox="0 0 32 32" width="24" height="24">
            <defs><linearGradient id="ag3" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFC857"/><stop offset="1" stopColor="#FF3D80"/></linearGradient></defs>
            <path d="M16 2 L20 12 L30 13 L22 20 L25 30 L16 24 L7 30 L10 20 L2 13 L12 12 Z" fill="url(#ag3)"/>
          </svg>
          EventSphere
        </Link>

        {sent ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>📬</div>
            <h2 className="auth-title">Лист відправлено!</h2>
            <p className="auth-sub">Перевір пошту <b>{email}</b> і перейди за посиланням для скидання паролю.</p>
            <Link to="/login" className="btn-line sm" style={{ marginTop: 20, justifyContent: 'center' }}>← Назад до входу</Link>
          </div>
        ) : (
          <>
            <h1 className="auth-title">Забули пароль?</h1>
            <p className="auth-sub">Вкажи email — надішлемо посилання для скидання.</p>
            <form className="auth-form" onSubmit={submit}>
              <div className="af-group">
                <label className="af-label mono">Email</label>
                <input className="af-input" type="email" placeholder="you@example.com"
                  value={email} onChange={e => setEmail(e.target.value)} autoFocus />
              </div>
              {error && <div className="af-error">{error}</div>}
              <button className="btn-pop" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
                {loading ? <span>Надсилаємо...</span> : <><span className="bp-spark">✨</span><span>Надіслати лист</span><span className="bp-arrow">→</span></>}
              </button>
            </form>
            <p className="auth-switch"><Link to="/login">← Назад до входу</Link></p>
          </>
        )}
      </div>
    </div>
  );
}
