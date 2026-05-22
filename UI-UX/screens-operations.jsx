/* Documents · Partnerships · Events · Scholarships */

const DocumentsScreen = () => {
  const D = APP_DATA;
  const [filter, setFilter] = React.useState('all');
  const types = ['all', 'Passport', 'Test Score', 'Financial', 'SOP', 'Offer', 'Insurance'];

  return (
    <div className="page fade-in">
      <div className="page-head">
        <div>
          <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-mute)', marginBottom: 8 }}>
            ◯ Operations · Document Vault
          </div>
          <h1>Document <em>repository</em></h1>
          <div className="sub">2,840 documents · OCR-indexed · AI-verified · GDPR / FERPA-equivalent storage</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Ico name="sparkles" size={13}/> Auto-rename</button>
          <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Ico name="download" size={13}/> Bulk export</button>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Ico name="upload" size={13}/> Upload</button>
        </div>
      </div>

      {/* Smart vault summary */}
      <div className="kpi-row">
        {[
          { label: 'Total documents', value: '2,840', sub: '↗ 312 this month' },
          { label: 'Verified · AI',    value: '94%',   sub: 'OCR + signature check' },
          { label: 'Expiring · 30D',   value: 12,      sub: '4 critical' },
          { label: 'Missing',          value: 38,      sub: 'across 14 applicants' }
        ].map((k, i) => (
          <div key={i} className="kpi">
            <div className="label">{k.label}</div>
            <div className="value"><em>{k.value}</em></div>
            <div className="delta"><span style={{ opacity: 0.7 }}>{k.sub}</span></div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '22px 0 14px', flexWrap: 'wrap' }}>
        <div className="tabs">
          {types.map(t => (
            <button key={t} className={'tab ' + (filter === t ? 'on' : '')} onClick={() => setFilter(t)}>
              {t === 'all' ? 'All types' : t}
            </button>
          ))}
        </div>
        <div className="search" style={{ marginLeft: 'auto', maxWidth: 320 }}>
          <Ico name="search" size={13} style={{ color: 'var(--ink-mute)' }}/>
          <input placeholder="Search documents by content (OCR)…"/>
        </div>
      </div>

      <div className="grid-2">
        {/* Table */}
        <div className="card">
          <div className="card-body" style={{ padding: 0 }}>
            <table className="tbl">
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Owner</th>
                  <th>Type</th>
                  <th>Expires</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {D.documents.filter(d => filter === 'all' || d.type === filter).map((d, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 32, height: 38,
                          background: 'var(--bg)', border: '1px solid var(--line)',
                          borderRadius: 4, position: 'relative',
                          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                          paddingBottom: 4, fontSize: 8, fontFamily: 'Geist Mono, monospace',
                          color: 'var(--ink-mute)', letterSpacing: '0.04em'
                        }}>
                          <div style={{ position: 'absolute', top: 0, right: 0, width: 8, height: 8, background: 'var(--bg-tint)', borderLeft: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}/>
                          {d.name.split('.').pop().toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: 500, fontSize: 13 }}>{d.name}</div>
                          <div className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)' }}>{d.size}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>{d.owner}</td>
                    <td><span className="chip">{d.type}</span></td>
                    <td className="mono" style={{ fontSize: 12, color: d.status === 'expiring' ? 'var(--crit)' : 'var(--ink-soft)' }}>
                      {d.expires}
                    </td>
                    <td>
                      <span className={'chip ' + (
                        d.status === 'verified'  ? 'sage' :
                        d.status === 'pending'   ? 'warn' :
                        d.status === 'expiring'  ? 'crit' :
                        d.status === 'reviewing' ? 'plum' : ''
                      )}>{d.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI panel */}
        <div className="card">
          <div className="card-head">
            <h3><Ico name="sparkles" size={14} style={{ verticalAlign: '-2px', color: 'var(--clay)' }}/> &nbsp;Smart inspections</h3>
            <span className="chip">Run hourly</span>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {[
              { ok: false, t: 'Saanvi Iyer · SOP-v3', sub: 'AI flagged passive-voice score 0.71 (target < 0.55) + 2 unsupported claims', tone: 'warn' },
              { ok: false, t: 'Rohan Mehta · Bank Statement', sub: 'Stamp signature low confidence — recommend re-upload', tone: 'crit' },
              { ok: true,  t: 'Aanya Krishnan · Visa packet', sub: 'All 14 documents present · checklist 100%', tone: 'sage' },
              { ok: false, t: 'Vikram Reddy · LOR', sub: 'Missing department letterhead — duplicate of LOR-2 detected', tone: 'warn' },
              { ok: true,  t: 'Meera Pillai · Transcript', sub: 'OCR cross-checked against ESSEC requirements', tone: 'sage' }
            ].map((x, i) => {
              const c = x.tone === 'crit' ? 'var(--crit)' : x.tone === 'warn' ? 'var(--warn)' : 'var(--sage)';
              return (
                <div key={i} style={{ padding: '14px 20px', borderBottom: i < 4 ? '1px solid var(--line-soft)' : 'none', display: 'flex', gap: 12 }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: 6,
                    background: x.ok ? 'var(--sage-tint)' : 'var(--clay-tint)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: c, flexShrink: 0
                  }}>
                    {x.ok ? <Ico name="check" size={13}/> : <Ico name="flag" size={12}/>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{x.t}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--ink-mute)', marginTop: 3, lineHeight: 1.4 }}>{x.sub}</div>
                  </div>
                </div>
              );
            })}
            <div style={{ padding: 16, background: 'var(--bg-tint)', borderTop: '1px solid var(--line-soft)' }}>
              <div className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 6 }}>
                Auto-packet generator
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginBottom: 10 }}>
                Build a country-specific application zip with checklist validation in one click.
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {['🇩🇪 Germany','🇨🇦 Canada','🇫🇷 France','🇺🇸 USA'].map(c => (
                  <button key={c} className="btn-ghost" style={{ padding: '6px 10px', fontSize: 11.5 }}>{c}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const PartnersScreen = () => {
  const D = APP_DATA;
  const [view, setView] = React.useState('cards');

  return (
    <div className="page fade-in">
      <div className="page-head">
        <div>
          <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-mute)', marginBottom: 8 }}>
            ◯ Operations · Partnership CRM
          </div>
          <h1>Partner <em>universities</em> &amp; MoUs</h1>
          <div className="sub">67 active institutions · 31 countries · 4 renewals this quarter · 1 new draft</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div className="seg">
            <button className={view==='cards' ? 'on' : ''} onClick={() => setView('cards')}>Cards</button>
            <button className={view==='table' ? 'on' : ''} onClick={() => setView('table')}>Table</button>
          </div>
          <button className="btn-clay" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Ico name="handshake" size={13}/> Draft new MoU
          </button>
        </div>
      </div>

      {/* Pie + summary */}
      <div className="grid-2" style={{ marginBottom: 22 }}>
        <div className="card">
          <div className="card-head">
            <h3>Partnership types</h3>
            <span className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)' }}>Active MoUs · 67</span>
          </div>
          <div className="card-body" style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
            <DonutChart segs={[
              { v: 24, c: 'var(--clay)',     label: 'Student exchange' },
              { v: 16, c: 'var(--sage)',     label: 'Research collab' },
              { v: 12, c: 'var(--plum)',     label: 'Dual degree' },
              { v: 9,  c: 'var(--ink)',      label: 'Faculty exchange' },
              { v: 6,  c: 'oklch(0.78 0.14 80)', label: 'Joint events' }
            ]}/>
            <div style={{ flex: 1 }}>
              {[
                { v: 24, c: 'var(--clay)',     label: 'Student exchange' },
                { v: 16, c: 'var(--sage)',     label: 'Research collab' },
                { v: 12, c: 'var(--plum)',     label: 'Dual degree' },
                { v: 9,  c: 'var(--ink)',      label: 'Faculty exchange' },
                { v: 6,  c: 'oklch(0.78 0.14 80)', label: 'Joint events' }
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', borderBottom: i < 4 ? '1px solid var(--line-soft)' : 'none' }}>
                  <span style={{ width: 10, height: 10, background: s.c, borderRadius: 2 }}/>
                  <span style={{ flex: 1, fontSize: 13 }}>{s.label}</span>
                  <span className="mono tabular" style={{ fontSize: 12, color: 'var(--ink-mute)' }}>{s.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <h3>MoU lifecycle</h3>
            <button className="btn-ghost" style={{ padding: '4px 10px', fontSize: 12 }}>Calendar →</button>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {[
              { stage: 'In drafting',       n: 3, c: 'var(--ink)'  },
              { stage: 'Internal review',   n: 2, c: 'var(--plum)' },
              { stage: 'Awaiting signature',n: 4, c: 'var(--clay)' },
              { stage: 'Active',            n: 67, c: 'var(--sage)' },
              { stage: 'Renewal due · 90D', n: 6, c: 'var(--warn)' },
              { stage: 'Expired',           n: 1, c: 'var(--crit)' }
            ].map((s, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '4px 1fr auto', padding: '12px 20px', borderBottom: i < 5 ? '1px solid var(--line-soft)' : 'none', alignItems: 'center', gap: 14 }}>
                <span style={{ width: 4, height: 28, background: s.c, borderRadius: 2 }}/>
                <span style={{ fontSize: 13.5, fontWeight: 500 }}>{s.stage}</span>
                <span className="serif tabular" style={{ fontSize: 22 }}>{s.n}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partner cards / table */}
      {view === 'cards' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {D.partners.map((p, i) => {
            const flagMap = { Germany: '🇩🇪', Canada: '🇨🇦', France: '🇫🇷', Japan: '🇯🇵', Belgium: '🇧🇪', Singapore: '🇸🇬', Ireland: '🇮🇪' };
            const tone = p.status === 'active' ? 'sage' : p.status === 'renewal' ? 'warn' : 'plum';
            return (
              <div key={i} className="card">
                <div style={{ padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 8,
                      background: 'var(--bg-tint)', border: '1px solid var(--line)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 26
                    }}>{flagMap[p.country] || '🌐'}</div>
                    <span className={'chip ' + tone}>{p.status}</span>
                  </div>
                  <div className="serif" style={{ fontSize: 19, lineHeight: 1.2, letterSpacing: '-0.01em' }}>{p.name}</div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>
                    {p.country} · {p.tier}
                  </div>
                  <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 12 }}>{p.type}</div>
                </div>
                <div style={{
                  padding: '14px 20px', borderTop: '1px solid var(--line-soft)',
                  display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8,
                  background: 'var(--bg-tint)'
                }}>
                  <Meta2 label="Since" value={p.since}/>
                  <Meta2 label="MoU" value={p.mou}/>
                  <Meta2 label="Students" value={p.students}/>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card">
          <div className="card-body" style={{ padding: 0 }}>
            <table className="tbl">
              <thead><tr><th>Institution</th><th>Country</th><th>Type</th><th>Tier</th><th>MoU</th><th>Status</th></tr></thead>
              <tbody>
                {D.partners.map((p, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 500 }}>{p.name}</td>
                    <td style={{ color: 'var(--ink-soft)' }}>{p.country}</td>
                    <td style={{ color: 'var(--ink-soft)' }}>{p.type}</td>
                    <td><span className="chip">{p.tier}</span></td>
                    <td className="mono" style={{ fontSize: 12 }}>{p.mou}</td>
                    <td><span className={'chip ' + (p.status === 'active' ? 'sage' : p.status === 'renewal' ? 'warn' : 'plum')}>{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const Meta2 = ({ label, value }) => (
  <div>
    <div className="mono" style={{ fontSize: 9, color: 'var(--ink-mute)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
    <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>{value}</div>
  </div>
);

const DonutChart = ({ segs }) => {
  const total = segs.reduce((s,d) => s + d.v, 0);
  const R = 70;
  let cum = 0;
  return (
    <svg width="180" height="180" viewBox="-100 -100 200 200" style={{ flexShrink: 0 }}>
      {segs.map((s, i) => {
        const start = (cum / total) * Math.PI * 2;
        cum += s.v;
        const end = (cum / total) * Math.PI * 2;
        const large = end - start > Math.PI ? 1 : 0;
        const x1 = R * Math.sin(start), y1 = -R * Math.cos(start);
        const x2 = R * Math.sin(end),   y2 = -R * Math.cos(end);
        const inner = 42;
        const ix1 = inner * Math.sin(start), iy1 = -inner * Math.cos(start);
        const ix2 = inner * Math.sin(end),   iy2 = -inner * Math.cos(end);
        return (
          <path key={i}
            d={`M ${x1},${y1} A ${R},${R} 0 ${large} 1 ${x2},${y2} L ${ix2},${iy2} A ${inner},${inner} 0 ${large} 0 ${ix1},${iy1} Z`}
            fill={s.c}/>
        );
      })}
      <text x="0" y="-4" textAnchor="middle" fontSize="14" fontFamily="Geist Mono, monospace" fill="var(--ink-mute)" letterSpacing="2">TOTAL</text>
      <text x="0" y="22" textAnchor="middle" fontSize="32" fontFamily="Instrument Serif, serif" fill="var(--ink)">{total}</text>
    </svg>
  );
};


const EventsScreen = () => {
  const D = APP_DATA;
  // Build a fake month grid (June 2026)
  const days = 30;
  const startWeekday = 0; // Mon
  const eventDays = { 4: D.events[0], 12: D.events[1], 18: D.events[2], 25: D.events[3] };

  return (
    <div className="page fade-in">
      <div className="page-head">
        <div>
          <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-mute)', marginBottom: 8 }}>
            ◯ Operations · Events &amp; Delegations
          </div>
          <h1>What's <em>happening</em> at Atlas</h1>
          <div className="sub">9 upcoming · 4 delegations inbound · 1 international conference</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div className="seg">
            <button>Day</button>
            <button>Week</button>
            <button className="on">Month</button>
          </div>
          <button className="btn-clay" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Ico name="plus" size={13}/> Create event</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 22 }}>
        {/* Calendar */}
        <div className="card">
          <div className="card-head">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <h3 className="serif" style={{ fontFamily: 'Instrument Serif, serif', fontSize: 24, fontWeight: 400 }}>June 2026</h3>
              <span className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)' }}>· Asia / Kolkata</span>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              <button className="icon-btn" style={{ width: 28, height: 28 }}>‹</button>
              <button className="icon-btn" style={{ width: 28, height: 28 }}>›</button>
            </div>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid var(--line-soft)' }}>
              {['MON','TUE','WED','THU','FRI','SAT','SUN'].map(d => (
                <div key={d} className="mono" style={{ padding: '10px 12px', fontSize: 10, color: 'var(--ink-mute)', letterSpacing: '0.12em' }}>{d}</div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
              {Array.from({ length: startWeekday }).map((_, i) => (
                <div key={'e'+i} style={{ minHeight: 92, borderRight: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)', background: 'var(--bg-tint)' }}/>
              ))}
              {Array.from({ length: days }).map((_, i) => {
                const day = i + 1;
                const ev = eventDays[day];
                const isToday = day === 12;
                return (
                  <div key={day} style={{
                    minHeight: 92, padding: 8,
                    borderRight: (i + startWeekday + 1) % 7 === 0 ? 'none' : '1px solid var(--line-soft)',
                    borderBottom: '1px solid var(--line-soft)',
                    background: isToday ? 'var(--clay-tint)' : 'transparent',
                    position: 'relative'
                  }}>
                    <div className={isToday ? 'serif' : 'mono'} style={{ fontSize: isToday ? 18 : 11, color: isToday ? 'var(--clay-deep)' : 'var(--ink-soft)', fontWeight: isToday ? 500 : 400 }}>
                      {day < 10 ? '0' + day : day}
                    </div>
                    {ev && (
                      <div style={{
                        marginTop: 6,
                        padding: '4px 6px',
                        background: ev.tag === 'Delegation' ? 'var(--plum-tint)' : ev.tag === 'Webinar' ? 'var(--sage-tint)' : ev.tag === 'Support' ? 'var(--clay-tint)' : 'var(--bg-tint)',
                        borderLeft: '2px solid ' + (ev.tag === 'Delegation' ? 'var(--plum)' : ev.tag === 'Webinar' ? 'var(--sage)' : ev.tag === 'Support' ? 'var(--clay)' : 'var(--ink)'),
                        borderRadius: 3,
                        fontSize: 11,
                        lineHeight: 1.3,
                        cursor: 'pointer'
                      }}>
                        {ev.title.length > 22 ? ev.title.slice(0, 21) + '…' : ev.title}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Upcoming list */}
        <div className="card">
          <div className="card-head">
            <h3>Upcoming · next 30 days</h3>
            <span className="chip">{D.events.length}</span>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {D.events.map((e, i) => (
              <div key={i} style={{ padding: 18, borderBottom: i < D.events.length - 1 ? '1px solid var(--line-soft)' : 'none' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 56, padding: '8px 4px',
                    background: 'var(--ink)', color: 'var(--bg)',
                    borderRadius: 6, textAlign: 'center', flexShrink: 0
                  }}>
                    <div className="mono" style={{ fontSize: 9, opacity: 0.7, letterSpacing: '0.12em' }}>{e.date.split(' ')[0]}</div>
                    <div className="serif" style={{ fontSize: 22, lineHeight: 1, marginTop: 2 }}>{e.date.split(' ')[1]}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 500, marginBottom: 4 }}>{e.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--ink-mute)', marginBottom: 8 }}>{e.loc}</div>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <span className={'chip ' + (e.tag === 'Delegation' ? 'plum' : e.tag === 'Webinar' ? 'sage' : e.tag === 'Support' ? 'clay' : '')}>{e.tag}</span>
                      <span className="mono" style={{ fontSize: 11, color: 'var(--ink-soft)' }}>{e.seats}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delegations strip */}
      <div className="card" style={{ marginTop: 22 }}>
        <div className="card-head">
          <h3>Inbound delegations</h3>
          <span className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)' }}>Q2 — 4 visits scheduled</span>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {[
              { flag: '🇩🇪', uni: 'TU München', vis: 'Prof. Klaus Werner +3', date: 'Jun 12', goal: 'Renew DDP MoU + Lab visit' },
              { flag: '🇫🇷', uni: 'Sciences Po', vis: 'Dr. Marie Lefèvre +2',  date: 'Jun 18', goal: 'New Public Policy track' },
              { flag: '🇯🇵', uni: 'Kyoto Univ.', vis: 'Prof. Hiro Tanaka +4',  date: 'Jul 02', goal: 'Joint research grant' },
              { flag: '🇸🇬', uni: 'NUS',        vis: 'Dean Chen Wei +3',       date: 'Jul 16', goal: 'Summer school renewal' }
            ].map((d, i) => (
              <div key={i} style={{ padding: 18, borderRight: i < 3 ? '1px solid var(--line-soft)' : 'none' }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{d.flag}</div>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{d.uni}</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 2 }}>{d.date}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 8, lineHeight: 1.5 }}>{d.vis}</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-mute)', marginTop: 8, fontStyle: 'italic' }}>"{d.goal}"</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


const ScholarshipsScreen = () => {
  const D = APP_DATA;
  return (
    <div className="page fade-in">
      <div className="page-head">
        <div>
          <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-mute)', marginBottom: 8 }}>
            ◯ Operations · Scholarships &amp; Finance
          </div>
          <h1>Scholarships <em>&amp; funding</em></h1>
          <div className="sub">¥2.4 Cr disbursed YTD · 23 active awards · 90 open applications</div>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Ico name="plus" size={13}/> Add scholarship
        </button>
      </div>

      <div className="kpi-row">
        {[
          { label: 'Awarded YTD',  value: '₹2.4Cr', sub: '↗ 38% YoY' },
          { label: 'Open programs',value: 23,       sub: '4 closing this week' },
          { label: 'Applicants',   value: 90,       sub: 'Avg 3.9 apps each' },
          { label: 'Success rate', value: '31%',    sub: 'Best: DAAD WISE' }
        ].map((k, i) => (
          <div key={i} className="kpi">
            <div className="label">{k.label}</div>
            <div className="value"><em>{k.value}</em></div>
            <div className="delta"><span style={{ opacity: 0.7 }}>{k.sub}</span></div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginTop: 22 }}>
        <div className="card">
          <div className="card-head">
            <h3>Scholarship catalogue</h3>
            <button className="btn-ghost" style={{ padding: '4px 10px', fontSize: 12 }}>+ Import EU list</button>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {D.scholarships.map((s, i) => {
              const pct = Math.round(s.awarded / s.open * 100);
              return (
                <div key={i} style={{ padding: '16px 20px', borderBottom: i < D.scholarships.length - 1 ? '1px solid var(--line-soft)' : 'none', display: 'grid', gridTemplateColumns: '1fr auto', gap: 14, alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 14.5, fontWeight: 500 }}>{s.name}</span>
                      <span className="chip">{s.country}</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--ink-mute)' }}>
                      Award: <b style={{ color: 'var(--ink-soft)' }}>{s.amt}</b> · {s.open} applicants · {s.awarded} awarded
                    </div>
                    <div style={{ marginTop: 8, width: 240 }}>
                      <div className="bar clay"><i style={{ width: pct + '%' }}/></div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="serif tabular" style={{ fontSize: 28 }}>{pct}<span style={{ fontSize: 14, color: 'var(--ink-mute)' }}>%</span></div>
                    <div className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>awarded</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <h3>Expense estimator</h3>
            <span className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)' }}>per student · Germany</span>
          </div>
          <div className="card-body">
            {[
              { c: 'Tuition (annual)',  v: '€0',      pct: 0 },
              { c: 'Blocked account',   v: '€11,208', pct: 38 },
              { c: 'Health insurance',  v: '€1,400',  pct: 5 },
              { c: 'Travel & visa',     v: '€820',    pct: 3 },
              { c: 'Living (12 mo)',    v: '€10,800', pct: 36 },
              { c: 'Books & misc.',     v: '€600',    pct: 2 },
              { c: 'Contingency 15%',   v: '€4,326',  pct: 16 }
            ].map((row, i) => (
              <div key={i} style={{ padding: '10px 0', borderBottom: i < 6 ? '1px solid var(--line-soft)' : 'none', display: 'grid', gridTemplateColumns: '1fr 80px auto', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 13 }}>{row.c}</span>
                <div className="bar" style={{ height: 4 }}><i style={{ width: row.pct + '%', background: i === 6 ? 'var(--plum)' : 'var(--ink)' }}/></div>
                <span className="mono tabular" style={{ fontSize: 12.5, fontWeight: 500, width: 70, textAlign: 'right' }}>{row.v}</span>
              </div>
            ))}
            <div style={{ marginTop: 14, padding: '14px 16px', background: 'var(--ink)', color: 'var(--bg)', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div className="mono" style={{ fontSize: 10, opacity: 0.7, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Year-one total</div>
                <div className="serif" style={{ fontSize: 28, lineHeight: 1, marginTop: 4 }}>€29,154</div>
              </div>
              <button className="btn-clay">Apply DAAD</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

window.DocumentsScreen = DocumentsScreen;
window.PartnersScreen = PartnersScreen;
window.EventsScreen = EventsScreen;
window.ScholarshipsScreen = ScholarshipsScreen;
