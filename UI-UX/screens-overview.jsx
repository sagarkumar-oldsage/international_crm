/* Overview dashboard */

const Sparkline = ({ data, color = 'var(--ink)', w = 80, h = 24 }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={w} height={h}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={w} cy={h - ((data[data.length - 1] - min) / range) * h} r="2" fill={color}/>
    </svg>
  );
};

const OverviewScreen = () => {
  const D = APP_DATA;
  const [range, setRange] = React.useState('30D');

  return (
    <div className="page fade-in">
      <div className="page-head">
        <div>
          <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-mute)', marginBottom: 8 }}>
            ◯ Thursday, 21 May 2026 · {D.user.institution}
          </div>
          <h1>Good morning, <em>Priya.</em></h1>
          <div className="sub">Here's what's happening across global mobility today.</div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div className="seg">
            {['7D', '30D', 'QTR', 'YTD'].map(r => (
              <button key={r} className={range === r ? 'on' : ''} onClick={() => setRange(r)}>{r}</button>
            ))}
          </div>
          <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Ico name="download" size={13}/> Export
          </button>
          <button className="btn-clay" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Ico name="plus" size={13}/> Quick action
          </button>
        </div>
      </div>

      {/* KPI row */}
      <div className="kpi-row">
        {D.kpis.map((k, i) => (
          <div key={i} className="kpi">
            <div className="label">{k.label}</div>
            <div className="spark">
              <Sparkline data={k.spark} color={i === 0 ? 'var(--clay)' : i === 1 ? 'var(--sage)' : i === 2 ? 'var(--plum)' : 'var(--ink)'}/>
            </div>
            <div className="value">{typeof k.value === 'number' ? <em>{k.value}</em> : <em>{k.value}</em>}</div>
            <div className="delta">
              <span className={k.change.startsWith('-') ? 'down' : 'up'}>
                {k.change.startsWith('-') ? '▼' : '▲'} {k.change}
              </span>
              <span style={{ opacity: 0.6 }}>vs last {range.toLowerCase()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Map + Alerts */}
      <div className="grid-2">
        <div className="card">
          <div className="card-head">
            <div>
              <h3>Global mobility map</h3>
              <div style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 2 }}>
                Outbound flows from {D.user.institution.split(' ')[0]} · live as of 09:42 IST
              </div>
            </div>
            <div className="tabs">
              <button className="tab on">Outbound</button>
              <button className="tab">Incoming</button>
              <button className="tab">Partners</button>
            </div>
          </div>
          <div className="card-body tight">
            <WorldMap/>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <h3>Today's priorities</h3>
            <span className="chip clay">4 urgent</span>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {D.alerts.map((a, i) => (
              <div key={i} style={{
                padding: '14px 20px',
                borderBottom: i < D.alerts.length - 1 ? '1px solid var(--line-soft)' : 'none',
                display: 'flex', gap: 12, alignItems: 'flex-start'
              }}>
                <div className="dot" style={{
                  marginTop: 6,
                  background: a.kind === 'crit' ? 'var(--crit)'
                    : a.kind === 'warn' ? 'var(--warn)'
                    : a.kind === 'sage' ? 'var(--sage)'
                    : 'var(--clay)'
                }}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 500, marginBottom: 2 }}>{a.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-mute)' }}>{a.sub}</div>
                </div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                  {a.when}
                </div>
              </div>
            ))}
            <div style={{ padding: '12px 20px', textAlign: 'center', borderTop: '1px solid var(--line-soft)' }}>
              <button className="btn-ghost" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: 6, alignItems: 'center' }}>
                View all 12 items <Ico name="arrow-right" size={13}/>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline + countries */}
      <div className="grid-2" style={{ marginTop: 22 }}>
        <div className="card">
          <div className="card-head">
            <div>
              <h3>Application pipeline · Fall 2026 intake</h3>
              <div style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 2 }}>375 students across 28 destinations</div>
            </div>
            <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Ico name="filter" size={13}/> Filter
            </button>
          </div>
          <div className="card-body">
            <Pipeline data={D.pipeline}/>

            {/* Recent students */}
            <div style={{ marginTop: 28 }}>
              <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-mute)', marginBottom: 10 }}>
                Recent activity
              </div>
              <div>
                {D.students.slice(0, 4).map(s => (
                  <div key={s.id} className="row-card" style={{ borderRadius: 8 }}>
                    <div className="avatar" style={{
                      background: s.stage === 'Enrolled' ? 'var(--sage)' : s.stage === 'Visa approved' ? 'var(--clay)' : 'var(--plum)'
                    }}>{s.name.split(' ').map(n => n[0]).join('')}</div>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 500 }}>{s.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--ink-mute)' }}>
                        {s.program} → {s.dest}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ width: 90 }}>
                        <div className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)', marginBottom: 4, textAlign: 'right' }}>{Math.round(s.docs * 100)}% docs</div>
                        <div className="bar clay"><i style={{ width: (s.docs * 100) + '%' }}/></div>
                      </div>
                      <span className={'pill ' + (s.status === 'done' ? 'chip sage' : s.status === 'warn' ? 'chip warn' : 'chip ok')}
                            style={{ minWidth: 110, justifyContent: 'center' }}>
                        {s.stage}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <h3>Top destinations</h3>
            <span className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)' }}>↗ growth (YoY)</span>
          </div>
          <div className="card-body">
            {D.countries.map(c => (
              <div key={c.code} className="country-row">
                <div className="flag">{c.flag}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{c.name}</div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{c.code}</div>
                </div>
                <div className="mono tabular" style={{ fontSize: 13, textAlign: 'right' }}>{c.students}</div>
                <div className={'mono'} style={{ fontSize: 12, textAlign: 'right', color: c.growth >= 0 ? 'var(--ok)' : 'var(--crit)' }}>
                  {c.growth >= 0 ? '+' : ''}{c.growth}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row: Events + Visa + AI */}
      <div className="grid-3" style={{ marginTop: 22 }}>
        <div className="card">
          <div className="card-head">
            <h3>Upcoming events</h3>
            <button className="btn-ghost" style={{ padding: '4px 10px', fontSize: 12 }}>+ New</button>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {D.events.map((e, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '60px 1fr', gap: 14,
                padding: '14px 20px',
                borderBottom: i < D.events.length - 1 ? '1px solid var(--line-soft)' : 'none'
              }}>
                <div style={{
                  background: 'var(--bg-tint)', border: '1px solid var(--line)',
                  borderRadius: 6, padding: '6px 4px', textAlign: 'center'
                }}>
                  <div className="mono" style={{ fontSize: 9, color: 'var(--clay)', fontWeight: 600, letterSpacing: '0.08em' }}>{e.date.split(' ')[0]}</div>
                  <div className="serif" style={{ fontSize: 20, lineHeight: 1, marginTop: 2 }}>{e.date.split(' ')[1]}</div>
                </div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 500, marginBottom: 4 }}>{e.title}</div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 12, color: 'var(--ink-mute)' }}>
                    <span className={'chip ' + (e.tag === 'Delegation' ? 'plum' : e.tag === 'Webinar' ? 'sage' : e.tag === 'Support' ? 'clay' : '')}>{e.tag}</span>
                    <span>· {e.loc}</span>
                  </div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 6 }}>{e.seats} registered</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <h3>Visa queue</h3>
            <span className="chip ok">94% approval</span>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {D.visaQueue.map((v, i) => (
              <div key={i} style={{
                padding: '12px 20px',
                borderBottom: i < D.visaQueue.length - 1 ? '1px solid var(--line-soft)' : 'none'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 500 }}>{v.student}</span>
                  <span className={'pill ' + (v.stage === 'Approved' ? 'chip sage' : v.stage === 'Interview' ? 'chip clay' : 'chip')}>
                    {v.stage}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11.5, color: 'var(--ink-mute)' }}>
                  <span><Ico name="flag" size={11}/> &nbsp;{v.country} · {v.date}</span>
                  <span className="mono tabular" style={{ color: v.prob >= 90 ? 'var(--ok)' : 'var(--warn)' }}>
                    {v.prob}% likely
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{
          background: 'var(--ink)', color: 'var(--bg)', borderColor: 'var(--ink)'
        }}>
          <div className="card-head" style={{ borderBottomColor: 'oklch(1 0 0 / 0.08)' }}>
            <h3 style={{ color: 'var(--bg)' }}><Ico name="sparkles" size={14} style={{ verticalAlign: '-2px', color: 'var(--saffron)' }}/> &nbsp;Atlas AI · Counsel</h3>
            <span className="mono" style={{ fontSize: 10, color: 'oklch(0.75 0.02 320)', letterSpacing: '0.1em' }}>BETA</span>
          </div>
          <div className="card-body" style={{ color: 'oklch(0.88 0.018 320)' }}>
            <div className="serif" style={{ fontSize: 22, lineHeight: 1.3, color: 'var(--bg)', letterSpacing: '-0.01em', marginBottom: 14 }}>
              "3 students are at <em style={{ color: 'var(--clay)' }}>high risk</em> of missing the German consulate window."
            </div>
            <div style={{ fontSize: 12.5, color: 'oklch(0.78 0.02 320)', lineHeight: 1.55 }}>
              Atlas suggests fast-tracking <b style={{ color: 'var(--bg)' }}>Rohan, Meera and Vikram</b>. Their APS scores are pending and slot availability drops 40% after May 30.
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap' }}>
              <button className="btn-clay" style={{ padding: '7px 12px' }}>Run mitigation</button>
              <button style={{
                background: 'transparent', color: 'var(--bg)', border: '1px solid oklch(1 0 0 / 0.18)',
                padding: '7px 12px', borderRadius: 6, fontSize: 12.5
              }}>Ask Atlas anything →</button>
            </div>
            <div style={{ marginTop: 18, paddingTop: 14, borderTop: '1px solid oklch(1 0 0 / 0.08)', fontSize: 11, color: 'oklch(0.7 0.02 320)' }} className="mono">
              ↳ 18 SOPs reviewed today · 142 docs OCR'd · 4 anomalies flagged
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Stacked horizontal pipeline */
const Pipeline = ({ data }) => {
  const total = data.reduce((s, d) => s + d.n, 0);
  return (
    <div>
      <div style={{ display: 'flex', height: 14, borderRadius: 4, overflow: 'hidden', border: '1px solid var(--line)' }}>
        {data.map((d, i) => {
          const c = d.color === 'clay' ? 'var(--clay)' : d.color === 'sage' ? 'var(--sage)' : d.color === 'plum' ? 'var(--plum)' : 'var(--ink)';
          return <div key={i} style={{ width: (d.n / total * 100) + '%', background: c, opacity: 0.92 }} title={d.stage}/>;
        })}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, marginTop: 16 }}>
        {data.map((d, i) => {
          const c = d.color === 'clay' ? 'var(--clay)' : d.color === 'sage' ? 'var(--sage)' : d.color === 'plum' ? 'var(--plum)' : 'var(--ink)';
          return (
            <div key={i} style={{ borderLeft: `2px solid ${c}`, paddingLeft: 10 }}>
              <div className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{d.stage}</div>
              <div className="serif tabular" style={{ fontSize: 26, lineHeight: 1.1, marginTop: 4 }}>{d.n}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* Simplified world map with hotspots */
const WorldMap = () => {
  // Very simplified continent silhouettes via dot grid + flow lines
  const origin = { x: 580, y: 220, label: 'Bengaluru' };
  const dests = [
    { x: 200, y: 200, n: 47, label: 'United States' },
    { x: 420, y: 170, n: 64, label: 'United Kingdom' },
    { x: 460, y: 175, n: 78, label: 'Germany' },
    { x: 470, y: 190, n: 19, label: 'France' },
    { x: 250, y: 180, n: 52, label: 'Canada' },
    { x: 760, y: 350, n: 38, label: 'Australia' },
    { x: 720, y: 215, n: 21, label: 'Japan' },
    { x: 650, y: 290, n: 29, label: 'Singapore' }
  ];

  return (
    <div className="world-card paper">
      <svg viewBox="0 0 900 400" style={{ width: '100%', height: '100%', display: 'block' }}>
        {/* Dot-grid land mass approximation */}
        <defs>
          <pattern id="dotgrid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="oklch(0.19 0.025 320 / 0.18)"/>
          </pattern>
        </defs>
        {/* land blobs */}
        <g fill="url(#dotgrid)">
          {/* North America */}
          <path d="M80 120 L260 110 L300 180 L240 240 L160 250 L100 220 Z"/>
          {/* South America */}
          <path d="M220 260 L290 250 L280 360 L240 380 L210 340 Z"/>
          {/* Europe */}
          <path d="M400 130 L500 130 L510 200 L420 210 L390 180 Z"/>
          {/* Africa */}
          <path d="M420 220 L520 220 L510 340 L460 370 L420 320 Z"/>
          {/* Asia + India */}
          <path d="M520 130 L740 120 L780 220 L700 270 L600 290 L530 240 Z"/>
          {/* Australia */}
          <path d="M720 320 L820 320 L820 380 L740 380 Z"/>
        </g>

        {/* Flow arcs from origin */}
        {dests.map((d, i) => {
          const midX = (origin.x + d.x) / 2;
          const midY = Math.min(origin.y, d.y) - 70;
          return (
            <g key={i}>
              <path d={`M${origin.x},${origin.y} Q${midX},${midY} ${d.x},${d.y}`}
                    stroke="oklch(0.66 0.155 42 / 0.5)" strokeWidth="1.3" fill="none"
                    strokeDasharray="4 4"/>
            </g>
          );
        })}

        {/* Destination pins */}
        {dests.map((d, i) => {
          const r = 5 + d.n / 16;
          return (
            <g key={i}>
              <circle cx={d.x} cy={d.y} r={r + 6} fill="oklch(0.66 0.155 42 / 0.08)"/>
              <circle cx={d.x} cy={d.y} r={r} fill="oklch(0.66 0.155 42)"/>
              <circle cx={d.x} cy={d.y} r={r} fill="none" stroke="oklch(0.19 0.025 320)" strokeWidth="0.8"/>
              <text x={d.x} y={d.y - r - 6} textAnchor="middle" fontSize="10" fontFamily="Geist Mono, monospace" fill="oklch(0.19 0.025 320)">{d.n}</text>
            </g>
          );
        })}

        {/* Origin */}
        <circle cx={origin.x} cy={origin.y} r="6" fill="oklch(0.19 0.025 320)"/>
        <circle cx={origin.x} cy={origin.y} r="11" fill="none" stroke="oklch(0.19 0.025 320)" strokeWidth="1" opacity="0.4"/>
        <text x={origin.x + 10} y={origin.y + 4} fontSize="11" fontFamily="Geist Mono, monospace" fill="oklch(0.19 0.025 320)" fontWeight="600">⌂ {origin.label}</text>
      </svg>

      {/* Legend */}
      <div style={{
        position: 'absolute', bottom: 14, left: 16,
        display: 'flex', gap: 14, fontSize: 11, color: 'var(--ink-soft)'
      }} className="mono">
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 8, height: 8, background: 'var(--clay)', borderRadius: '50%' }}/> Outbound destinations
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 8, height: 8, background: 'var(--ink)', borderRadius: '50%' }}/> Home institution
        </span>
      </div>
    </div>
  );
};

window.OverviewScreen = OverviewScreen;
