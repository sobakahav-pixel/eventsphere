import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../lib/auth';

export default function RegisterPage() {
  const [role, setRole] = useState('client');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError('Заповніть усі поля'); return; }
    if (form.password.length < 6) { setError('Пароль — мінімум 6 символів'); return; }
    setLoading(true); setError('');
    try {
      await signUp({ ...form, role });
      setSuccess(true);
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.message === 'Supabase не налаштовано'
        ? 'Бекенд підключається — незабаром! 🚀'
        : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card" style={{maxWidth: 480}}>
        <div className="auth-glow" />
        <Link to="/" className="auth-brand">
          <svg viewBox="0 0 32 32" width="24" height="24">
            <defs><linearGradient id="ag2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFC857"/><stop offset="1" stopColor="#FF3D80"/></linearGradient></defs>
            <path d="M16 2 L20 12 L30 13 L22 20 L25 30 L16 24 L7 30 L10 20 L2 13 L12 12 Z" fill="url(#ag2)"/>
          </svg>
          EventSphere
        </Link>
        <h1 className="auth-title">Створити акаунт</h1>

        <div className="role-tabs">
          <button className={`role-tab ${role === 'client' ? 'on' : ''}`} onClick={() => setRole('client')}>
            🎉 Я святкую
          </button>
          <button className={`role-tab ${role === 'vendor' ? 'on' : ''}`} onClick={() => setRole('vendor')}>
            🎤 Я виконавець
          </button>
        </div>
        <p className="auth-sub">
          {role === 'client' ? 'Плануй свята, знаходь команду, бронюй.' : 'Розміщуй портфоліо, отримуй замовлення.'}
        </p>

        <form className="auth-form" onSubmit={submit}>
          <div className="af-group">
            <label className="af-label mono">{role === 'vendor' ? 'Назва / ПІБ' : "Ім'я"}</label>
            <input className="af-input" type="text" placeholder={role === 'vendor' ? 'Olha Tkach Photography' : "Ваше ім'я"} value={form.name} onChange={set('name')} />
          </div>
          <div className="af-group">
            <label className="af-label mono">Email</label>
            <input className="af-input" type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} />
          </div>
          <div className="af-group">
            <label className="af-label mono">Пароль</label>
            <input className="af-input" type="password" placeholder="мінімум 6 символів" value={form.password} onChange={set('password')} />
          </div>
          {success && <div className="af-error" style={{background:'rgba(77,224,181,0.12)', borderColor:'var(--mint)', color:'var(--mint)'}}>✅ Акаунт створено! Перевір пошту для підтвердження.</div>}
          {error && <div className="af-error">{error}</div>}
          <button className="btn-pop" type="submit" disabled={loading} style={{width:'100%', justifyContent:'center'}}>
            {loading ? <span>Реєструємося...</span> : <><span className="bp-spark">✨</span><span>Зареєструватись</span><span className="bp-arrow">→</span></>}
          </button>
        </form>

        <p className="auth-switch">Вже є акаунт? <Link to="/login">Увійти →</Link></p>
        <p className="auth-terms">Реєструючись, ти погоджуєшся з <a href="#">Умовами використання</a> та <a href="#">Політикою конфіденційності</a></p>
      </div>
    </div>
  );
}
