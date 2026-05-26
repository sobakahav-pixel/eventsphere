import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    const handle = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const hash = new URLSearchParams(window.location.hash.replace('#', ''));

        const code = params.get('code');
        const tokenHash = params.get('token_hash');
        const type = params.get('type') || hash.get('type');
        const accessToken = hash.get('access_token');

        if (code && supabase) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
          if (type === 'recovery') {
            navigate('/reset-password');
          } else {
            setStatus('success');
            setTimeout(() => navigate('/'), 2000);
          }
        } else if (tokenHash && supabase) {
          const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: type || 'email' });
          if (error) throw error;
          if (type === 'recovery') {
            navigate('/reset-password');
          } else {
            setStatus('success');
            setTimeout(() => navigate('/'), 2000);
          }
        } else if (accessToken && supabase) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: hash.get('refresh_token'),
          });
          if (error) throw error;
          if (type === 'recovery') {
            navigate('/reset-password');
          } else {
            setStatus('success');
            setTimeout(() => navigate('/'), 2000);
          }
        } else {
          setStatus('success');
          setTimeout(() => navigate('/'), 1500);
        }
      } catch (err) {
        setError(err.message);
        setStatus('error');
      }
    };

    handle();
  }, [navigate]);

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ textAlign: 'center' }}>
        <div className="auth-glow" />
        {status === 'loading' && (
          <>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
            <h2 className="auth-title">Підтверджуємо...</h2>
            <p className="auth-sub">Секунду, перевіряємо твій email</p>
          </>
        )}
        {status === 'success' && (
          <>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
            <h2 className="auth-title">Email підтверджено!</h2>
            <p className="auth-sub">Вітаємо в EventSphere. Перенаправляємо...</p>
          </>
        )}
        {status === 'error' && (
          <>
            <div style={{ fontSize: 48, marginBottom: 16 }}>😕</div>
            <h2 className="auth-title">Щось пішло не так</h2>
            <p className="af-error" style={{ marginTop: 12 }}>{error}</p>
            <a href="/" className="btn-pop" style={{ marginTop: 20, justifyContent: 'center' }}>
              <span>На головну</span><span className="bp-arrow">→</span>
            </a>
          </>
        )}
      </div>
    </div>
  );
}
