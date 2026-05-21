import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const VENDORS_DB = {
  1:  { name:'Forest Hall',       cat:'Локація',    city:'Київ',   rating:4.9, reviews:142, price:'від ₴18 000', emoji:'🏛', tone:'magenta', tag:'Топ вибір',
        desc:'Елегантний простір у серці Києва для весіль та корпоративів. 3 зали до 300 гостей, власний сад, повна технічна підтримка.',
        tags:['Весілля','Корпоратив','Прийоми'], capacity:'до 300 гостей', area:'1 200 м²',
        gallery:['🏛','🌿','🕯','🎊','🌸','✨'],
        reviews_list:[
          { name:'Марія К.', date:'Квітень 2026', text:'Абсолютно чарівне місце! Персонал уважний, простір продуманий до дрібниць. Весілля пройшло ідеально.', rating:5 },
          { name:'Іван С.', date:'Березень 2026', text:'Провели корпоратив на 120 осіб. Логістика, кейтеринг, звук — все на найвищому рівні.', rating:5 },
          { name:'Оля П.', date:'Лютий 2026', text:'Трохи дорого, але воно того варте. Атмосфера неперевершена.', rating:4 },
        ]},
  4:  { name:'Olha Tkach',        cat:'Фотограф',   city:'Київ',   rating:5.0, reviews:213, price:'від ₴8 500', emoji:'📷', tone:'violet', tag:'Улюблений',
        desc:'Документальна весільна фотографія. Знімаю справжні емоції, а не постановку. 10 років досвіду, 200+ весіль по Україні та Європі.',
        tags:['Весілля','Love story','Репортаж'], capacity:'будь-який', area:'виїзд',
        gallery:['📷','🎞','🌅','💍','🥂','🌷'],
        reviews_list:[
          { name:'Аня & Дмитро', date:'Травень 2026', text:'Ольга вловлює магію. Фото — ніби ожилі спогади. Найкращий подарунок на весілля.', rating:5 },
          { name:'Катя Р.', date:'Квітень 2026', text:'Працювала на love story. Результат перевершив усі очікування!', rating:5 },
          { name:'Вова & Ліна', date:'Березень 2026', text:'Непомітна під час зйомки, але кожен кадр — шедевр.', rating:5 },
        ]},
  6:  { name:'Hum Catering',      cat:'Кейтеринг',  city:'Київ',   rating:4.8, reviews:176, price:'від ₴450/ос', emoji:'🍽', tone:'gold', tag:'Топ вибір',
        desc:'Гастрономія з любов\'ю до деталей. Сезонне меню, фермерські продукти, майстри-кухарі. Від мінімалістичних фуршетів до повноцінних банкетів.',
        tags:['Банкет','Фуршет','Кава-брейк'], capacity:'20–500 гостей', area:'виїзд',
        gallery:['🍽','🥗','🍷','🎂','🫙','🌿'],
        reviews_list:[
          { name:'HR Monobank', date:'Квітень 2026', text:'Провели корпоратив на 200 осіб. Меню сезонне, обслуговування бездоганне. Уже замовили ще раз.', rating:5 },
          { name:'Родина Шевченко', date:'Березень 2026', text:'Весілля на 80 гостей. Торт — просто казка. Гості досі згадують.', rating:5 },
          { name:'Катя О.', date:'Лютий 2026', text:'Невелика вечірка 30 осіб. Дорого, але якість відповідає.', rating:4 },
        ]},
  8:  { name:'Brass & Velvet',    cat:'Гурт',       city:'Київ',   rating:4.9, reviews:132, price:'від ₴14 000', emoji:'🎷', tone:'peach', tag:'Хіт',
        desc:'Джаз, соул, фанк — живий звук, що створює атмосферу. 5 музикантів, власний репертуар 200+ треків, можлива адаптація під запит.',
        tags:['Весілля','Корпоратив','Концерт'], capacity:'до 500 гостей', area:'виїзд',
        gallery:['🎷','🥁','🎹','🎸','🎺','🎵'],
        reviews_list:[
          { name:'Соня & Артем', date:'Травень 2026', text:'Зіграли наш перший танець і весь вечір. Гості аплодували стоячи. Неймовірно!', rating:5 },
          { name:'Event Pro Agency', date:'Квітень 2026', text:'Третій захід з Brass & Velvet. Кожного разу — бездоганно.', rating:5 },
          { name:'Тетяна М.', date:'Лютий 2026', text:'Прекрасна атмосфера. Репертуар різноманітний, всі побажання враховані.', rating:5 },
        ]},
};

const DEFAULT_VENDOR = {
  name:'Виконавець', cat:'Категорія', city:'Україна', rating:4.8, reviews:0, price:'за домовленістю',
  emoji:'⭐', tone:'gold', desc:'Детальна інформація оновлюється.',
  tags:[], capacity:'', area:'', gallery:['⭐','✨','🎉'],
  reviews_list:[],
};

function Stars({ n }) {
  return <span style={{color:'var(--gold)'}}>{Array.from({length:5}).map((_,i) => i < n ? '★' : '☆')}</span>;
}

export default function VendorPage() {
  const { id } = useParams();
  const v = VENDORS_DB[+id] || DEFAULT_VENDOR;
  const [tab, setTab] = useState('about');
  const [form, setForm] = useState({ date:'', guests:'', message:'' });
  const [sent, setSent] = useState(false);

  const set = k => e => setForm(f => ({...f, [k]: e.target.value}));

  const submit = async e => {
    e.preventDefault();
    await new Promise(r => setTimeout(r, 800));
    setSent(true);
  };

  return (
    <div className="vendor-page">
      <div className={`vp-hero t-${v.tone}`}>
        <div className="vp-hero-mesh" />
        <div className="vp-hero-inner">
          <div className="vp-breadcrumb">
            <Link to="/catalog">← Каталог</Link>
            <span className="dim">/</span>
            <span>{v.cat}</span>
          </div>
          <div className="vp-hero-main">
            <div className="vp-emoji">{v.emoji}</div>
            <div className="vp-hero-info">
              {v.tag && <span className="vcard-tag mono" style={{position:'static', marginBottom:10}}>{v.tag}</span>}
              <h1 className="vp-name">{v.name}</h1>
              <div className="vp-meta">
                <span className="vp-cat mono">{v.cat}</span>
                <span className="dim">·</span>
                <span>📍 {v.city}</span>
                <span className="dim">·</span>
                <Stars n={Math.round(v.rating)} />
                <b style={{color:'var(--gold)'}}>{v.rating}</b>
                <span className="dim">({v.reviews} відгуків)</span>
              </div>
              <div className="vp-tags">
                {v.tags.map(t => <span key={t} className="vp-tag">{t}</span>)}
                {v.capacity && <span className="vp-tag">👥 {v.capacity}</span>}
              </div>
            </div>
            <div className="vp-price-block">
              <div className="vp-price">{v.price}</div>
              <a href="#booking" className="btn-pop" style={{justifyContent:'center'}}>
                <span className="bp-spark">✨</span><span>Надіслати запит</span><span className="bp-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="vp-body">
        <div className="vp-main">
          <div className="vp-tabs">
            {[['about','Про нас'],['gallery','Галерея'],['reviews','Відгуки']].map(([k,l]) => (
              <button key={k} className={`vp-tab ${tab===k?'on':''}`} onClick={()=>setTab(k)}>{l}</button>
            ))}
          </div>

          {tab === 'about' && (
            <div className="vp-about">
              <p className="vp-desc">{v.desc}</p>
              {v.area && (
                <div className="vp-specs">
                  <div className="vp-spec"><span className="mono dim">ПЛОЩА</span><b>{v.area}</b></div>
                  <div className="vp-spec"><span className="mono dim">ГОСТІ</span><b>{v.capacity}</b></div>
                  <div className="vp-spec"><span className="mono dim">РЕЙТИНГ</span><b>{v.rating} ★</b></div>
                  <div className="vp-spec"><span className="mono dim">ВІДГУКИ</span><b>{v.reviews}</b></div>
                </div>
              )}
            </div>
          )}

          {tab === 'gallery' && (
            <div className="vp-gallery">
              {v.gallery.map((g, i) => (
                <div key={i} className={`vp-gallery-item t-${v.tone}`}>
                  <span>{g}</span>
                </div>
              ))}
            </div>
          )}

          {tab === 'reviews' && (
            <div className="vp-reviews">
              {v.reviews_list.length === 0 && <p className="dim" style={{padding:'24px 0'}}>Відгуків поки немає</p>}
              {v.reviews_list.map((r, i) => (
                <div key={i} className="vp-review">
                  <div className="vpr-head">
                    <div className="vpr-avatar">{r.name[0]}</div>
                    <div>
                      <div className="vpr-name">{r.name}</div>
                      <div className="vpr-date mono">{r.date}</div>
                    </div>
                    <Stars n={r.rating} />
                  </div>
                  <p className="vpr-text">{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <aside className="vp-sidebar">
          <div className="vp-booking" id="booking">
            <h3 className="vp-booking-title">Надіслати запит</h3>
            {sent ? (
              <div className="vp-sent">
                <div style={{fontSize:40}}>✅</div>
                <p>Запит надіслано! {v.name} зв'яжеться з вами найближчим часом.</p>
                <button className="btn-line sm" onClick={() => setSent(false)}>Новий запит</button>
              </div>
            ) : (
              <form className="vp-form" onSubmit={submit}>
                <div className="af-group">
                  <label className="af-label mono">Дата події</label>
                  <input className="af-input" type="date" value={form.date} onChange={set('date')} />
                </div>
                <div className="af-group">
                  <label className="af-label mono">Кількість гостей</label>
                  <input className="af-input" type="number" placeholder="50" min="1" value={form.guests} onChange={set('guests')} />
                </div>
                <div className="af-group">
                  <label className="af-label mono">Повідомлення</label>
                  <textarea className="af-input" rows="4" placeholder="Розкажіть про вашу подію..." value={form.message} onChange={set('message')} style={{resize:'vertical'}} />
                </div>
                <button className="btn-pop" type="submit" style={{width:'100%', justifyContent:'center'}}>
                  <span className="bp-spark">✨</span><span>Надіслати</span><span className="bp-arrow">→</span>
                </button>
                <p className="auth-terms" style={{marginTop:10}}>Відповідь протягом 2 годин у робочий час</p>
              </form>
            )}
          </div>
          <div className="vp-similar">
            <h4 className="mono dim" style={{marginBottom:14}}>СХОЖІ ВИКОНАВЦІ</h4>
            {Object.values(VENDORS_DB).filter(x => x.cat === v.cat && x.name !== v.name).slice(0,3).map(s => (
              <Link key={s.name} to={`/vendor/${Object.keys(VENDORS_DB).find(k => VENDORS_DB[k].name === s.name)}`} className={`vcard t-${s.tone}`} style={{marginBottom:10}}>
                <div className="vcard-mesh" />
                <div style={{display:'flex', gap:12, alignItems:'center', position:'relative'}}>
                  <span style={{fontSize:28}}>{s.emoji}</span>
                  <div>
                    <div className="vcard-name" style={{fontSize:16}}>{s.name}</div>
                    <div className="vcard-rating" style={{fontSize:12}}>★ {s.rating} · {s.price}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
