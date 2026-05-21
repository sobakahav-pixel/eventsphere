import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="notfound">
      <div style={{fontSize:96}}>🎪</div>
      <h1 className="notfound-title">404</h1>
      <p className="notfound-sub">Схоже, це свято перенесли на іншу адресу</p>
      <Link to="/" className="btn-pop" style={{margin:'0 auto', marginTop:24}}>
        <span className="bp-spark">✨</span><span>На головну</span><span className="bp-arrow">→</span>
      </Link>
    </div>
  );
}
