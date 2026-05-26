import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function ResetPasswordPage() {
  const [form, setForm] = useState({ password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    if (!form.password) { setError('Введіть новий пароль'); return; }
    if (form.password.length < 6) { setError('Мінімум 6 символів'); return; }
    if (form.password !== form.confirm) { setError('Паролі не співпадають'); return; }
    setLoading(true); setError('');
    try {
      const { error } = await supabase.auth.updateUser({ password: form.password });
      if (error) throw error;
      setTimeout(() => navigate('/cabinet'), 1500);
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
        <div style={{ fontSize: 40, marginBottom: 16 }}>🔐</div>
        <h1 className="auth-title">Новий пароль</h1>
        <p className="auth-sub">Придумай надійний пароль для свого акаунту</p>
        <form className="auth-form" onSubmit={submit}>
          <div className="af-group">
            <label className="af-label mono">Новий пароль</label>
            <input className="af-input" type="password" placeholder="мінімум 6 символів"
              value={form.password} onChange={set('password')} autoFocus />
          </div>
          <div className="af-group">
            <label className="af-label mono">Повторити пароль</label>
            <input className="af-input" type="password" placeholder="ще раз"
              value={form.confirm} onChange={set('confirm')} />
          </div>
          {error && <div className="af-error">{error}</div>}
          <button className="btn-pop" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
            {loading
              ? <span>Зберігаємо...</span>
              : <><span className="bp-spark">✨</span><span>Зберегти пароль</span><span className="bp-arrow">→</span></>}
          </button>
        </form>
      </div>
    </div>
  );
}
