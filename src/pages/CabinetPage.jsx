import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const QUICK_LINKS = [
  { emoji: '🔍', label: 'Каталог виконавців', href: '/catalog' },
  { emoji: '🎪', label: 'Конструктор свята', href: '/#constructor' },
  { emoji: '🤖', label: 'Smart Match', href: '/#match' },
  { emoji: '✨', label: 'Pro для бізнесу', href: '/pro' },
];

const STATUS_LABELS = {
  new:      { label: 'Новий',       color: 'var(--gold)' },
  viewed:   { label: 'Переглянуто', color: 'var(--blue)' },
  replied:  { label: 'Відповів',    color: 'var(--mint)' },
  declined: { label: 'Відхилено',   color: 'var(--magenta)' },
};

const STATUS_OPTIONS = ['new', 'viewed', 'replied', 'declined'];

export default function CabinetPage() {
  const { user, logout, loading } = useAuth();
  const [profile, setProfile]     = useState(null);
  const [requests, setRequests]   = useState([]);
  const [editing, setEditing]     = useState(false);
  const [form, setForm]           = useState({ name: '', city: '' });
  const [saved, setSaved]         = useState(false);
  const [tab, setTab]             = useState('requests');

  const isVendor = profile?.role === 'vendor';

  useEffect(() => {
    if (!user || !supabase) return;

    supabase.from('profiles').select('*').eq('id', user.id).single()
      .then(({ data }) => {
        if (data) { setProfile(data); setForm({ name: data.name || '', city: data.city || '' }); }
      });
  }, [user]);

  useEffect(() => {
    if (!user || !supabase || profile === null) return;
    if (profile.role === 'vendor' && profile.name) {
      supabase.from('requests').select('*')
        .eq('vendor_name', profile.name)
        .order('created_at', { ascending: false })
        .then(({ data }) => { if (data) setRequests(data); });
    } else {
      supabase.from('requests').select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .then(({ data }) => { if (data) setRequests(data); });
    }
  }, [user, profile]);

  if (loading) return (
    <div className="auth-page"><div style={{ fontSize: 48 }}>⏳</div></div>
  );
  if (!user) return <Navigate to="/login" replace />;

  const name    = profile?.name || user.user_metadata?.name || user.email?.split('@')[0] || 'Користувач';
  const role    = isVendor ? 'Виконавець' : 'Клієнт';
  const initial = name[0].toUpperCase();

  const save = async () => {
    if (!supabase) return;
    await supabase.from('profiles').upsert({ id: user.id, name: form.name, city: form.city, role: profile?.role || 'client' });
    setProfile(p => ({ ...p, ...form }));
    setEditing(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateStatus = async (id, status) => {
    if (!supabase) return;
    await supabase.from('requests').update({ status }).eq('id', id);
    setRequests(rs => rs.map(r => r.id === id ? { ...r, status } : r));
  };

  const formatDate = iso => iso
    ? new Date(iso).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' })
    : '—';

  const newCount = requests.filter(r => r.status === 'new').length;

  return (
    <div className="cabinet-page">
      <div className="cab-hero">
        <div className="cab-hero-glow" />
        <div className="cab-hero-inner">
          <div className="cab-avatar">{initial}</div>
          <div className="cab-info">
            <span className="mono dim">⊹ МІЙ КАБІНЕТ</span>
            <h1 className="cab-name">{name}</h1>
            <div className="cab-meta">
              <span className="vp-tag">{role}</span>
              {profile?.city && <span className="vp-tag">📍 {profile.city}</span>}
              <span className="vp-tag mono">{user.email}</span>
            </div>
          </div>
          <button className="btn-line sm" onClick={() => setEditing(e => !e)}>
            {editing ? 'Скасувати' : '✏️ Редагувати'}
          </button>
        </div>
      </div>

      <div className="cab-body">
        <div className="cab-main">

          {editing && (
            <div className="cab-section">
              <h2 className="cab-section-title">Редагувати профіль</h2>
              <div className="cab-edit-form">
                <div className="af-group">
                  <label className="af-label mono">Ім'я / Назва</label>
                  <input className="af-input" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Ваше ім'я" />
                </div>
                <div className="af-group">
                  <label className="af-label mono">Місто</label>
                  <input className="af-input" value={form.city}
                    onChange={e => setForm(f => ({ ...f, city: e.target.value }))} placeholder="Київ" />
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <button className="btn-pop" onClick={save}>
                    <span className="bp-spark">✨</span><span>Зберегти</span><span className="bp-arrow">→</span>
                  </button>
                  {saved && <span style={{ color: 'var(--mint)', fontSize: 13 }}>✅ Збережено</span>}
                </div>
              </div>
            </div>
          )}

          <div className="cab-section">
            <div className="cab-tabs">
              <button className={`vp-tab ${tab === 'requests' ? 'on' : ''}`} onClick={() => setTab('requests')}>
                {isVendor ? 'Вхідні запити' : 'Мої запити'}
                {requests.length > 0 && (
                  <span className="cab-count" style={isVendor && newCount > 0 ? { background: 'var(--magenta)' } : {}}>
                    {isVendor ? (newCount > 0 ? newCount : requests.length) : requests.length}
                  </span>
                )}
              </button>
              {!isVendor && (
                <button className={`vp-tab ${tab === 'saved' ? 'on' : ''}`} onClick={() => setTab('saved')}>
                  Збережені
                </button>
              )}
            </div>

            {tab === 'requests' && (
              requests.length === 0 ? (
                <div className="cab-empty-state">
                  <div style={{ fontSize: 48 }}>{isVendor ? '📭' : '📋'}</div>
                  <p>{isVendor ? 'Вхідних запитів ще немає' : 'Запитів ще немає'}</p>
                  {!isVendor && (
                    <Link to="/catalog" className="btn-pop sm">
                      <span className="bp-spark">✨</span><span>Знайти виконавця</span><span className="bp-arrow">→</span>
                    </Link>
                  )}
                </div>
              ) : (
                <div className="cab-requests">
                  {requests.map(r => {
                    const s = STATUS_LABELS[r.status] || STATUS_LABELS.new;
                    return (
                      <div key={r.id} className="cab-req">
                        <div className="cab-req-head">
                          <div>
                            <div className="cab-req-vendor">
                              {isVendor ? (r.user_email || 'Клієнт') : r.vendor_name}
                            </div>
                            <div className="mono dim" style={{ fontSize: 10, marginTop: 4 }}>
                              {formatDate(r.created_at)}
                            </div>
                          </div>
                          {isVendor ? (
                            <select
                              className="cab-status-select"
                              value={r.status || 'new'}
                              style={{ color: s.color }}
                              onChange={e => updateStatus(r.id, e.target.value)}
                            >
                              {STATUS_OPTIONS.map(k => (
                                <option key={k} value={k}>{STATUS_LABELS[k].label}</option>
                              ))}
                            </select>
                          ) : (
                            <span className="cab-req-status" style={{ color: s.color }}>{s.label}</span>
                          )}
                        </div>
                        {r.event_date && (
                          <div className="cab-req-row">
                            <span className="mono dim">ДАТА</span>
                            <span>{r.event_date}</span>
                          </div>
                        )}
                        {r.guests && (
                          <div className="cab-req-row">
                            <span className="mono dim">ГОСТІ</span>
                            <span>{r.guests} осіб</span>
                          </div>
                        )}
                        {r.message && (
                          <p className="cab-req-msg">{r.message}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )
            )}

            {tab === 'saved' && (
              <div className="cab-empty-state">
                <div style={{ fontSize: 48 }}>❤️</div>
                <p>Збережених виконавців ще немає</p>
                <Link to="/catalog" className="btn-line sm">Переглянути каталог →</Link>
              </div>
            )}
          </div>
        </div>

        <aside className="cab-side">
          <div className="cab-card">
            <h3 className="cab-card-title">Акаунт</h3>
            <div className="cab-rows">
              <div className="cab-row"><span className="mono dim">EMAIL</span><span style={{ fontSize: 12 }}>{user.email}</span></div>
              <div className="cab-row"><span className="mono dim">РОЛЬ</span><span>{role}</span></div>
              <div className="cab-row"><span className="mono dim">СТАТУС</span><span style={{ color: 'var(--mint)' }}>✅ Підтверджено</span></div>
              <div className="cab-row">
                <span className="mono dim">{isVendor ? 'ВХІДНІ' : 'ЗАПИТИ'}</span>
                <span style={{ color: isVendor && newCount > 0 ? 'var(--magenta)' : 'var(--gold)' }}>
                  {isVendor ? `${newCount} нових / ${requests.length}` : requests.length}
                </span>
              </div>
            </div>
            {isVendor && (
              <Link to="/pro/pricing" className="btn-pop sm" style={{ marginTop: 16, justifyContent: 'center' }}>
                <span className="bp-spark">✨</span><span>Upgrade до Pro</span>
              </Link>
            )}
          </div>

          <div className="cab-card">
            <h3 className="cab-card-title">Швидкі посилання</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {QUICK_LINKS.map(l => (
                <Link key={l.label} to={l.href} className="mm-link" style={{ padding: '10px 14px', fontSize: 14 }}>
                  {l.emoji} {l.label}
                </Link>
              ))}
            </div>
          </div>

          <button className="btn-line" style={{ width: '100%', justifyContent: 'center', color: 'var(--muted)' }} onClick={logout}>
            Вийти з акаунту
          </button>
        </aside>
      </div>
    </div>
  );
}
