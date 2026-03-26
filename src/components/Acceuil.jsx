import { useState, useEffect, useCallback } from 'react';
import { slides } from '../data'
import { useSelector } from 'react-redux';


export default function Acceuil() {// inside the component:
const { courriers } = useSelector(state => state.courriers);

const upcoming = courriers.filter(c => {
  if (!c.limite_recu || c.status !== 'pending') return false;
  const diff = Math.round((new Date(c.limite_recu) - new Date()) / (1000 * 60 * 60 * 24));
  return diff >= 0 && diff <= 5;
});
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [animation, setanimation] = useState(false);
  // eslint-disable-next-line 
  const [direction, setDirection] = useState('next');

  useEffect(() => {
    document.title = "SETAS";
  }, []);

  const goTo = useCallback((index, dir = 'next') => {
    if (animation || index === current) return;
    setDirection(dir);
    setPrev(current);
    setanimation(true);
    setCurrent(index);
    setTimeout(() => {
      setPrev(null);
      setanimation(false);
    }, 700);
  }, [animation, current]);

  const next = () => goTo((current + 1) % slides.length, 'next');
  const back = () => goTo((current - 1 + slides.length) % slides.length, 'prev');

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
    // eslint-disable-next-line 
  }, [current, animation]);

  return (
    <div className="page-enter">
      <div className="acceuil">
        {upcoming.length > 0 && (
          <div className="alert alert-danger m-3 text-end" dir="rtl" role="alert">
            <strong>⚠️ تنبيه!</strong> يوجد <strong>{upcoming.length}</strong> {upcoming.length === 1 ? 'مراسلة' : 'مراسلات'} تقترب من أجلها خلال 5 أيام:
            <ul className="mb-0 mt-1">
              {upcoming.map(c => (
                <li key={c.id}>
                  <strong dir="ltr">{c.n_garde}</strong> — {c.sujet} — الأجل: <strong>{c.limite_recu}</strong>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="setas-carousel">

          {/* Welcome bar */}
          <div className="setas-welcome">
            مرحبا بعودتك <span>السيدة فاطمة الزهراء</span> — نظام تتبع المراسلات SETAS
          </div>

          <div className="setas-frame" />

          {/* Slide counter */}
          <div className="setas-counter">
            <strong>{String(current + 1).padStart(2, '0')}</strong> / {String(slides.length).padStart(2, '0')}
          </div>

          {slides.map((slide, i) => (
            <div
              key={i}
              className={`setas-slide ${i === current ? 'active' : ''} ${i === prev ? 'prev-slide' : ''}`}>
              <img src={slide.img} alt={slide.title} />
              <div className="setas-content">
                <div className="setas-tag">{slide.tag}</div>
                <h2 className="setas-title">{slide.title}</h2>
                <div className="setas-divider" />
                <p className="setas-text">{slide.text}</p>
              </div>
            </div>
          ))}

          <button className="setas-btn btn-prev" onClick={back} aria-label="السابق">&#8249;</button>
          <button className="setas-btn btn-next" onClick={next} aria-label="التالي">&#8250;</button>

          <div className="setas-dots">
            {slides.map((e, i) => (
              <button
                key={i}
                className={`setas-dot ${i === current ? 'active' : ''}`}
                onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}