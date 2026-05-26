import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const CATEGORIES = [
  { id: 'all',   label: 'Усі',           emoji: '✦' },
  { id: 'venue', label: 'Локації',        emoji: '🏛' },
  { id: 'show',  label: 'Шоу',           emoji: '🎭' },
  { id: 'food',  label: 'Кейтеринг',     emoji: '🍽' },
  { id: 'photo', label: 'Фото & відео',  emoji: '📷' },
  { id: 'decor', label: 'Декор',         emoji: '🌸' },
  { id: 'host',  label: 'Ведучі',        emoji: '🎤' },
  { id: 'sweet', label: 'Кондитерські',  emoji: '🍰' },
  { id: 'music', label: 'DJ & гурти',    emoji: '🎶' },
];

export const CAT_UK = {
  venue: 'Локація',
  show:  'Шоу',
  food:  'Кейтеринг',
  photo: 'Фото & відео',
  decor: 'Декор',
  host:  'Ведучий',
  sweet: 'Кондитерська',
  music: 'DJ & гурти',
};

const VENDORS = [
  { id:1, name:'Forest Hall', cat:'venue', city:'Київ',   rating:4.9, reviews:142, price:'від ₴18 000', emoji:'🏛', tone:'magenta', tag:'Топ вибір' },
  { id:2, name:'Vila Magnolia', cat:'venue', city:'Київ', rating:4.8, reviews:98,  price:'від ₴24 000', emoji:'🌿', tone:'mint' },
  { id:3, name:'Atelier Vy',  cat:'venue', city:'Львів',  rating:4.9, reviews:67,  price:'від ₴12 000', emoji:'🏡', tone:'gold', tag:'Новинка' },
  { id:4, name:'Olha Tkach',  cat:'photo', city:'Київ',   rating:5.0, reviews:213, price:'від ₴8 500',  emoji:'📷', tone:'violet', tag:'Улюблений' },
  { id:5, name:'Sasha Morozov', cat:'photo', city:'Львів',rating:4.9, reviews:88,  price:'від ₴7 200',  emoji:'🎞', tone:'blue' },
  { id:6, name:'Hum Catering', cat:'food',  city:'Київ',  rating:4.8, reviews:176, price:'від ₴450/ос', emoji:'🍽', tone:'gold', tag:'Топ вибір' },
  { id:7, name:'Смак & Гармонія', cat:'food', city:'Харків',rating:4.7,reviews:54, price:'від ₴320/ос', emoji:'🥗', tone:'mint' },
  { id:8, name:'Brass & Velvet', cat:'music', city:'Київ',rating:4.9, reviews:132, price:'від ₴14 000', emoji:'🎷', tone:'peach', tag:'Хіт' },
  { id:9, name:'DJ Artem K.',    cat:'music', city:'Одеса',rating:4.8, reviews:97,  price:'від ₴6 000',  emoji:'🎧', tone:'pink' },
  { id:10,name:'Studio Bloom',  cat:'decor', city:'Київ', rating:5.0, reviews:89,  price:'від ₴12 000', emoji:'🌸', tone:'cherry', tag:'Преміум' },
  { id:11,name:'Kvit & Co',     cat:'decor', city:'Львів',rating:4.8, reviews:61,  price:'від ₴8 000',  emoji:'💐', tone:'magenta' },
  { id:12,name:'Андрій Коваль', cat:'host',  city:'Київ', rating:4.9, reviews:204, price:'від ₴5 500',  emoji:'🎤', tone:'blue', tag:'Топ вибір' },
  { id:13,name:'Марина Сірко',  cat:'host',  city:'Харків',rating:4.8,reviews:78,  price:'від ₴4 200',  emoji:'🎙', tone:'violet' },
  { id:14,name:'Solodka Mama',  cat:'sweet', city:'Київ', rating:5.0, reviews:156, price:'від ₴2 800',  emoji:'🎂', tone:'cherry', tag:'Улюблений' },
  { id:15,name:'CakeArt Studio',cat:'sweet', city:'Одеса',rating:4.7, reviews:43,  price:'від ₴1 900',  emoji:'🍰', tone:'peach' },
  { id:16,name:'Circus Show',   cat:'show',  city:'Київ', rating:4.9, reviews:112, price:'від ₴9 000',  emoji:'🎭', tone:'gold', tag:'Топ вибір' },
  { id:17,name:'Magic Party',   cat:'show',  city:'Дніпро',rating:4.8,reviews:65,  price:'від ₴6 500',  emoji:'🪄', tone:'mint' },
  { id:18,name:'Pixel Cinema',  cat:'photo', city:'Одеса',rating:4.8, reviews:77,  price:'від ₴9 500',  emoji:'🎥', tone:'cherry' },
];

const CITIES = ['Усі міста', 'Київ', 'Львів', 'Одеса', 'Харків', 'Дніпро'];

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [city, setCity] = useState('Усі міста');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('rating');

  const activeCat = searchParams.get('cat') || 'all';
  const setActiveCat = (id) => setSearchParams(id === 'all' ? {} : { cat: id });

  const filtered = useMemo(() => {
    let list = VENDORS;
    if (activeCat !== 'all') list = list.filter(v => v.cat === activeCat);
    if (city !== 'Усі міста') list = list.filter(v => v.city === city);
    if (query) list = list.filter(v => v.name.toLowerCase().includes(query.toLowerCase()));
    if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === 'reviews') list = [...list].sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [activeCat, city, query, sort]);

  return (
    <div className="catalog-page">
      <div className="cat-hero">
        <div className="cat-hero-inner">
          <span className="mono dim">⊹ КАТАЛОГ ВИКОНАВЦІВ</span>
          <h1 className="cat-title">Знайди свою <em>команду мрії</em></h1>
          <p className="cat-sub">2 400+ перевірених виконавців по всій Україні</p>
          <div className="cat-search-wrap">
            <input
              className="cat-search"
              placeholder="🔍  Пошук за назвою..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="cat-body">
        <div className="cat-filters">
          <div className="cat-tabs">
            {CATEGORIES.map(c => (
              <button
                key={c.id}
                className={`cat-tab ${activeCat === c.id ? 'on' : ''}`}
                onClick={() => setActiveCat(c.id)}
              >
                {c.emoji} {c.label}
              </button>
            ))}
          </div>
          <div className="cat-controls">
            <select className="cat-select" value={city} onChange={e => setCity(e.target.value)}>
              {CITIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <select className="cat-select" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="rating">За рейтингом</option>
              <option value="reviews">За відгуками</option>
            </select>
          </div>
        </div>

        <div className="cat-count mono">{filtered.length} виконавців</div>

        <div className="cat-grid">
          {filtered.map(v => (
            <Link key={v.id} to={`/vendor/${v.id}`} className={`vcard t-${v.tone}`}>
              <div className="vcard-mesh" />
              {v.tag && <span className="vcard-tag mono">{v.tag}</span>}
              <div className="vcard-emoji">{v.emoji}</div>
              <div className="vcard-body">
                <div className="vcard-name">{v.name}</div>
                <div className="vcard-city mono">{CAT_UK[v.cat] || v.cat} · {v.city}</div>
                <div className="vcard-footer">
                  <span className="vcard-rating">★ {v.rating} <span className="dim">({v.reviews})</span></span>
                  <span className="vcard-price">{v.price}</span>
                </div>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <div className="cat-empty">
              <div style={{fontSize:48}}>🔍</div>
              <p>Нічого не знайдено — спробуй інший фільтр</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
