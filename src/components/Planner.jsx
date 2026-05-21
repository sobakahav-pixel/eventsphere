import { useState } from 'react';
import { SectionHead } from './Bento';

const CITY_EVENTS = [
  { city: 'Київ',       events: 142, hot: true },
  { city: 'Львів',      events: 88,  hot: true },
  { city: 'Одеса',      events: 64 },
  { city: 'Харків',     events: 42 },
  { city: 'Дніпро',     events: 38 },
  { city: 'Івано-Фр.', events: 24 },
  { city: 'Чернівці',   events: 18 },
  { city: 'Запоріжжя',  events: 21 },
];

const EVENT_FEED = [
  { time: '18:00', title: 'Корпоратив Monobank', venue: 'Forest Hall', tag: '200 гостей' },
  { time: '19:30', title: 'Весілля С&А', venue: 'Vila Magnolia', tag: '120 гостей' },
  { time: '20:00', title: 'Brass & Velvet · live', venue: 'Underhub', tag: 'DJ-сет' },
  { time: '21:00', title: 'Day-by-day pop-up', venue: 'Atelier Vy', tag: 'запис' },
];

export default function Planner() {
  const [active, setActive] = useState(0);
  const c = CITY_EVENTS[active];
  const date = new Date().toLocaleDateString('uk-UA');

  return (
    <section className="planner-sec" id="planner">
      <SectionHead n="04" kicker="Жива мапа" title={<>Україна <em>святкує</em> просто зараз</>}
        sub="142 події у Києві сьогодні. 88 у Львові. Підключайся до пульсу країни." />
      <div className="planner-wrap">
        <div className="planner-grid">
          {CITY_EVENTS.map((city, i) => (
            <button key={city.city}
                    className={`pl-cell ${active === i ? 'is-on' : ''} ${city.hot ? 'is-hot' : ''}`}
                    onClick={() => setActive(i)}>
              <div className="pl-pulse" />
              <div className="pl-spark">✦</div>
              <div className="pl-num">{city.events}</div>
              <div className="pl-city">{city.city}</div>
              <div className="pl-meta mono">подій сьогодні</div>
            </button>
          ))}
        </div>
        <aside className="planner-side">
          <div className="ps-head">
            <span className="mono dim">⊹ {c.city.toUpperCase()} · {date}</span>
            <h3>{c.events} подій <em>зараз</em></h3>
          </div>
          <div className="ps-feed">
            {EVENT_FEED.map((e, i) => (
              <div key={i} className="ps-row">
                <span className="ps-time mono">{e.time}</span>
                <div className="ps-body">
                  <div className="ps-title">{e.title}</div>
                  <div className="ps-venue">{e.venue}</div>
                </div>
                <span className="ps-tag mono">{e.tag}</span>
              </div>
            ))}
          </div>
          <a href="#" className="ps-cta">Усі події у {c.city} <span>↗</span></a>
        </aside>
      </div>
    </section>
  );
}
