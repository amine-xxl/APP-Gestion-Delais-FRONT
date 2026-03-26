import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Calendar4Week, EnvelopeArrowUp, EnvelopeCheck, Funnel, GraphUpArrow, Inbox } from 'react-bootstrap-icons';

const MONTHS = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'ماي', 'يونيو',
  'يوليوز', 'غشت', 'شتنبر', 'أكتوبر', 'نونبر', 'دجنبر'
];

export default function Stats() {
  useEffect(() => { document.title = "SETAS | الإحصائيات"; }, []);

  const { courriers } = useSelector(state => state.courriers);
  const [selectedMonth, setSelectedMonth] = useState('all');

  // ── Statistics globals ──
  const totalWarid = courriers.length;
  const totalSadir = courriers.filter(c => c.n_reponse).length;


  const najaaValues = courriers
    .filter(c => c.limite_recu && c.date_reponse)
    .map(c => Math.round((new Date(c.date_reponse) - new Date(c.limite_recu)) / (1000 * 60 * 60 * 24)));

  const avgNajaa = najaaValues.length
    ? Math.round(najaaValues.reduce((a, b) => a + b, 0) / najaaValues.length)
    : null;

  // ── Monthly filter ──
  const getMonthData = (monthIndex) => {
    const filtered = courriers.filter(c => {
      if (!c.date_garde) return false;
      const d = new Date(c.date_garde);
      return d.getMonth() === monthIndex;
    });

    const warid = filtered.length;
    const sadir = filtered.filter(c => c.n_reponse).length;

    const vals = filtered
      .filter(c => c.limite_recu && c.date_reponse)
      .map(c => Math.round((new Date(c.date_reponse) - new Date(c.limite_recu)) / (1000 * 60 * 60 * 24)));

    const avg = vals.length
      ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length)
      : null;

    return { warid, sadir, avg, years: [...new Set(filtered.map(c => new Date(c.date_garde).getFullYear()))] };
  };

  const allMonthsData = MONTHS.map((name, i) => ({ name, index: i, ...getMonthData(i) }));
  const selectedData = selectedMonth === 'all' ? null : getMonthData(parseInt(selectedMonth));

  return (
    <div>
      <div className='container mt-4 stats-page' dir='rtl'>

        {/* ── Top 3 cards ── */}
        <div className="row g-3 mb-4">
          <div className="col-md-4" style={{ animationDelay: '0.05s' }}>
            <div className="stat-card card-warid">
              <div>
                <div className="stat-label">مجموع البريد الوارد</div>
                <div className="stat-value value-warid">{totalWarid}</div>
              </div>
              <div className="stat-icon icon-warid"><EnvelopeArrowUp /></div>
            </div>
          </div>
          <div className="col-md-4" style={{ animationDelay: '0.1s' }}>
            <div className="stat-card card-sadir">
              <div>
                <div className="stat-label">مجموع البريد الصادر</div>
                <div className="stat-value value-sadir">{totalSadir}</div>
              </div>
              <div className="stat-icon icon-sadir"><EnvelopeCheck /></div>
            </div>
          </div>
          <div className="col-md-4" style={{ animationDelay: '0.15s' }}>
            <div className="stat-card card-najaa">
              <div>
                <div className="stat-label">متوسط النجاعة</div>
                <div className={`stat-value ${avgNajaa === null ? 'value-neutral' : avgNajaa <= 0 ? 'value-good' : 'value-bad'}`}>
                  {avgNajaa === null ? '-' : `${avgNajaa <= 0 ? '+' : '-'}${Math.abs(avgNajaa)}%`}
                </div>
              </div>
              <div className="stat-icon icon-najaa"><GraphUpArrow /></div>
            </div>
          </div>
        </div>

        {/* ── Monthly filter ── */}
        <div className="stats-filter-bar mb-3">
          <h5 className="stats-filter-title"><Funnel className="mx-1" /> تصفية حسب الشهر </h5>
          <select className="month-select" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
            <option value="all">جميع الأشهر</option>
            {MONTHS.map((m, i) => (
              <option key={i} value={i}>{m}</option>
            ))}
          </select>
        </div>

        {/* ── All months grid ── */}
        {selectedMonth === 'all' ? (
          <div className="month-grid">
            {allMonthsData.map((m, i) => (
              <div key={i} className={`month-card ${m.warid === 0 ? 'empty' : ''}`} style={{ animationDelay: `${i * 0.04}s` }}>
                <div className="month-name"><Calendar4Week className="me-1" /> {m.name}</div>
                {m.warid === 0 ? (
                  <div className="month-empty-msg">
                    <Inbox /> لا توجد مراسلات
                  </div>
                ) : (
                  <div>
                    <div className="month-stat"><span>البريد الوارد</span><span className="ms-warid">{m.warid}</span></div>
                    <div className="month-stat"><span>البريد الصادر</span><span className="ms-sadir">{m.sadir}</span></div>
                    <div className="month-stat">
                      <span>النجاعة</span>
                      <span className={m.avg === null ? 'ms-neutral' : m.avg <= 0 ? 'ms-good' : 'ms-bad'}>
                        {m.avg === null ? '-' : `${m.avg <= 0 ? '+' : '-'}${Math.abs(m.avg)}%`}
                      </span>
                    </div>
                    {m.years.length > 0 && (
                      <div className="month-years">
                        {m.years.join(' - ')}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* ── Selected month panel ── */
          <div className="selected-panel">
            <h5 className="selected-panel-title">
              <Calendar4Week className="mx-1" /> {MONTHS[parseInt(selectedMonth)]}
            </h5>
            {selectedData.warid === 0 ? (
              <div className="panel-empty">
                <div className="panel-empty-icon"><Inbox /></div>
                <p>لا توجد مراسلات في هذا الشهر</p>
              </div>
            ) : (
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="stat-card card-warid">
                    <div>
                      <div className="stat-label">البريد الوارد</div>
                      <div className="stat-value value-warid">{selectedData.warid}</div>
                    </div>
                    <div className="stat-icon icon-warid"><EnvelopeArrowUp /></div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="stat-card card-sadir">
                    <div>
                      <div className="stat-label">البريد الصادر</div>
                      <div className="stat-value value-sadir">{selectedData.sadir}</div>
                    </div>
                    <div className="stat-icon icon-sadir"><EnvelopeCheck /></div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="stat-card card-najaa">
                    <div>
                      <div className="stat-label">النجاعة</div>
                      <div className={`stat-value ${selectedData.avg === null ? 'value-neutral' : selectedData.avg <= 0 ? 'value-good' : 'value-bad'}`}>
                        {selectedData.avg === null ? '-' : `${selectedData.avg <= 0 ? '+' : '-'}${Math.abs(selectedData.avg)}%`}
                      </div>
                    </div>
                    <div className="stat-icon icon-najaa"><GraphUpArrow /></div>
                  </div>
                </div>
                {selectedData.years.length > 0 && (
                  <div className="col-12">
                    <small className="panel-years">السنوات: {selectedData.years.join(' - ')}</small>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}