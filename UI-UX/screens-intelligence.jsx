/* Analytics · AI Counsellor · Knowledge Base · Inbox · Calendar · Settings */

const AnalyticsScreen = () => {
  return (
    <div className="page fade-in">
      <div className="page-head">
        <div>
          <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-mute)', marginBottom: 8 }}>
            ◯ Intelligence · Internationalisation Analytics
          </div>
          <h1>Internationalisation <em>at a glance</em></h1>
          <div className="sub">Powering NAAC · NIRF · QS · THE submissions · AY 2025–26</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div className="seg">
            <button>AY 24-25</button>
            <button className="on">AY 25-26</button>
            <button>Custom</button>
          </div>
          <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Ico name="download" size={13}/> Export NAAC pack</button>
        </div>
      </div>

      {/* Internationalisation KPIs */}
      <div className="kpi-row">
        {[
          { label: 'Mobility ratio',        value: '11.8%', sub: 'Target: 15%',     tone: 'clay' },
          { label: 'Foreign collaborations', value: 67,     sub: '+12 this year',   tone: 'sage' },
          { label: 'Joint publications',     value: 184,    sub: '↗ 31% YoY',       tone: 'plum' },
          { label: 'Foreign faculty %',      value: '7.4%', sub: 'NIRF benchmark 6%', tone: 'ink' }
        ].map((k, i) => (
          <div key={i} className="kpi">
            <div className="label">{k.label}</div>
            <div className="value"><em>{k.value}</em></div>
            <div className="delta"><span style={{ opacity: 0.7 }}>{k.sub}</span></div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginTop: 22 }}>
        {/* Outbound vs Incoming line chart */}
        <div className="card">
          <div className="card-head">
            <h3>Mobility trends · 8 quarters</h3>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 11 }} className="mono">
              <span><span className="dot" style={{ background: 'var(--clay)' }}/> Outbound</span>
              <span><span className="dot" style={{ background: 'var(--sage)' }}/> Incoming</span>
            </div>
          </div>
          <div className="card-body">
            <LineChart
              series={[
                { c: 'var(--clay)', d: [180, 210, 232, 258, 290, 330, 372, 412] },
                { c: 'var(--sage)', d: [110, 135, 142, 168, 195, 220, 252, 289] }
              ]}
              labels={['Q3 24','Q4 24','Q1 25','Q2 25','Q3 25','Q4 25','Q1 26','Q2 26']}
              w={520} h={220}/>
          </div>
        </div>

        {/* Country distribution heatmap */}
        <div className="card">
          <div className="card-head">
            <h3>Country distribution heatmap</h3>
            <span className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)' }}>Outbound · 412</span>
          </div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
              {[
                { c: 'DE', n: 78 }, { c: 'GB', n: 64 }, { c: 'CA', n: 52 }, { c: 'US', n: 47 }, { c: 'AU', n: 38 }, { c: 'SG', n: 29 }, { c: 'JP', n: 21 },
                { c: 'FR', n: 19 }, { c: 'NL', n: 14 }, { c: 'CH', n: 12 }, { c: 'IE', n: 9 },  { c: 'BE', n: 9 },  { c: 'SE', n: 7 },  { c: 'IT', n: 6 },
                { c: 'NZ', n: 5 },  { c: 'KR', n: 4 },  { c: 'NO', n: 4 },  { c: 'AE', n: 3 },  { c: 'ES', n: 3 },  { c: 'DK', n: 2 },  { c: 'FI', n: 1 }
              ].map((x, i) => {
                const op = Math.max(0.12, Math.min(1, x.n / 80));
                return (
                  <div key={i} style={{
                    aspectRatio: '1',
                    background: `oklch(0.66 0.155 42 / ${op})`,
                    borderRadius: 4,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    color: op > 0.55 ? 'white' : 'var(--ink)',
                    fontFamily: 'Geist Mono, monospace'
                  }}>
                    <span style={{ fontSize: 11, fontWeight: 600 }}>{x.c}</span>
                    <span style={{ fontSize: 11, opacity: 0.85 }}>{x.n}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 18, fontSize: 11 }} className="mono">
              <span style={{ color: 'var(--ink-mute)' }}>LOW</span>
              <div style={{ flex: 1, height: 6, borderRadius: 99, background: 'linear-gradient(90deg, oklch(0.66 0.155 42 / 0.12), oklch(0.66 0.155 42 / 1))' }}/>
              <span style={{ color: 'var(--ink-mute)' }}>HIGH</span>
            </div>
          </div>
        </div>
      </div>

      {/* Program type chart + Accred panel */}
      <div className="grid-2" style={{ marginTop: 22 }}>
        <div className="card">
          <div className="card-head">
            <h3>Mobility by program type</h3>
            <span className="chip">Stacked · 412 students</span>
          </div>
          <div className="card-body">
            <BarStack/>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <h3><Ico name="shield" size={14} style={{ verticalAlign: '-2px' }}/> &nbsp;Accreditation packs</h3>
            <button className="btn-ghost" style={{ padding: '4px 10px', fontSize: 12 }}>Generate all</button>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {[
              { n: 'NAAC · Criterion 7.2', state: 'Ready',   d: 'May 18', tone: 'sage' },
              { n: 'NIRF · International outlook', state: 'Draft', d: 'Updated 2h ago', tone: 'plum' },
              { n: 'QS · International faculty/student', state: 'Ready', d: 'May 15', tone: 'sage' },
              { n: 'THE · International outlook',  state: 'Pending', d: 'Due Jun 30',   tone: 'warn' },
              { n: 'NBA · Tier-II SAR',            state: 'Draft',   d: 'Updated yesterday', tone: 'plum' }
            ].map((r, i) => (
              <div key={i} style={{ padding: '14px 20px', borderBottom: i < 4 ? '1px solid var(--line-soft)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 500 }}>{r.n}</div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 2 }}>{r.d}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className={'chip ' + r.tone}>{r.state}</span>
                  <button className="icon-btn" style={{ width: 28, height: 28 }}><Ico name="download" size={12}/></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cohort cards */}
      <div className="card" style={{ marginTop: 22 }}>
        <div className="card-head">
          <h3>Cohort comparison · Fall 26 vs Fall 25</h3>
          <span className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)' }}>YoY delta</span>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)' }}>
            {[
              { l: 'Total cohort',     v: 375, d: '+58',  pct: 18 },
              { l: 'IELTS ≥ 7.5',      v: '74%', d: '+5pt', pct: 12 },
              { l: 'Avg CGPA',         v: '8.4', d: '+0.2', pct: 4 },
              { l: 'Scholarship ratio',v: '38%', d: '+9pt', pct: 31 },
              { l: 'Visa first try',   v: '91%', d: '+3pt', pct: 4 },
              { l: 'Repatriation',     v: '6.1%',d: '-1.2pt', pct: -16 }
            ].map((k, i) => (
              <div key={i} style={{ padding: 18, borderRight: i < 5 ? '1px solid var(--line-soft)' : 'none' }}>
                <div className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{k.l}</div>
                <div className="serif" style={{ fontSize: 32, lineHeight: 1, marginTop: 8, letterSpacing: '-0.02em' }}>{k.v}</div>
                <div className="mono tabular" style={{ fontSize: 11, marginTop: 6, color: k.pct >= 0 ? 'var(--ok)' : 'var(--crit)' }}>
                  {k.pct >= 0 ? '▲' : '▼'} {k.d}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const LineChart = ({ series, labels, w = 500, h = 200 }) => {
  const padL = 30, padR = 10, padT = 14, padB = 22;
  const innerW = w - padL - padR, innerH = h - padT - padB;
  const allMax = Math.max(...series.flatMap(s => s.d));
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`}>
      {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
        <g key={i}>
          <line x1={padL} x2={w - padR} y1={padT + innerH * (1 - p)} y2={padT + innerH * (1 - p)} stroke="var(--line-soft)" strokeWidth="1"/>
          <text x={padL - 6} y={padT + innerH * (1 - p) + 4} textAnchor="end" fontSize="9" fill="var(--ink-mute)" fontFamily="Geist Mono">{Math.round(allMax * p)}</text>
        </g>
      ))}
      {labels.map((l, i) => (
        <text key={i} x={padL + (i / (labels.length - 1)) * innerW} y={h - 6} textAnchor="middle" fontSize="9" fill="var(--ink-mute)" fontFamily="Geist Mono">{l}</text>
      ))}
      {series.map((s, si) => {
        const pts = s.d.map((v, i) => [padL + (i / (s.d.length - 1)) * innerW, padT + innerH - (v / allMax) * innerH]);
        const path = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0] + ',' + p[1]).join(' ');
        const area = path + ` L ${pts[pts.length-1][0]},${padT + innerH} L ${pts[0][0]},${padT + innerH} Z`;
        return (
          <g key={si}>
            <path d={area} fill={s.c} opacity="0.08"/>
            <path d={path} fill="none" stroke={s.c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="white" stroke={s.c} strokeWidth="1.5"/>)}
          </g>
        );
      })}
    </svg>
  );
};

const BarStack = () => {
  const data = [
    { q: 'Spring 25', exc: 32, dd: 14, fel: 9,  int: 12, res: 8,  sum: 11 },
    { q: 'Summer 25', exc: 24, dd: 12, fel: 18, int: 22, res: 7,  sum: 38 },
    { q: 'Fall 25',   exc: 88, dd: 34, fel: 12, int: 18, res: 22, sum: 4  },
    { q: 'Spring 26', exc: 52, dd: 28, fel: 14, int: 17, res: 14, sum: 12 },
    { q: 'Summer 26', exc: 18, dd: 8,  fel: 22, int: 31, res: 9,  sum: 47 },
    { q: 'Fall 26',   exc: 114,dd: 41, fel: 19, int: 24, res: 28, sum: 8  }
  ];
  const cats = [
    { k: 'exc', c: 'var(--clay)',           l: 'Exchange' },
    { k: 'dd',  c: 'var(--sage)',           l: 'Dual degree' },
    { k: 'fel', c: 'var(--plum)',           l: 'Fellowship' },
    { k: 'int', c: 'var(--ink)',            l: 'Internship' },
    { k: 'res', c: 'oklch(0.78 0.14 80)',   l: 'Research' },
    { k: 'sum', c: 'oklch(0.62 0.1 250)',   l: 'Summer school' }
  ];
  const max = Math.max(...data.map(d => cats.reduce((s, c) => s + d[c.k], 0)));

  return (
    <div>
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-end', height: 200, padding: '0 4px' }}>
        {data.map((d, i) => {
          const total = cats.reduce((s, c) => s + d[c.k], 0);
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', width: 32, height: 180, borderRadius: '4px 4px 0 0', overflow: 'hidden' }}>
                {cats.map((c, k) => (
                  <div key={k} title={c.l + ': ' + d[c.k]} style={{
                    height: (d[c.k] / max * 180) + 'px',
                    background: c.c,
                    borderBottom: k < cats.length - 1 ? '1px solid var(--bg)' : 'none'
                  }}/>
                ))}
              </div>
              <div className="mono" style={{ fontSize: 9.5, color: 'var(--ink-mute)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{d.q}</div>
              <div className="mono tabular" style={{ fontSize: 11, fontWeight: 500 }}>{total}</div>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 22, flexWrap: 'wrap' }}>
        {cats.map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
            <span style={{ width: 10, height: 10, background: c.c, borderRadius: 2 }}/>
            <span className="mono" style={{ color: 'var(--ink-soft)' }}>{c.l}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


const AIScreen = () => {
  const [input, setInput] = React.useState('');
  const [messages] = React.useState([
    { role: 'user', t: 'Which of my outbound students are at highest visa risk this month?' },
    {
      role: 'atlas',
      t: '3 students need urgent attention before May 30:',
      detail: [
        'Rohan Mehta — Canada · biometrics scheduled but financial docs incomplete (APS pending, 72% confidence).',
        'Meera Pillai — France · interview date drifting; SOP not aligned with Campus France format.',
        'Vikram Reddy — Belgium · Erasmus+ packet missing nomination letter from KU Leuven IRO.'
      ],
      actions: ['Draft outreach', 'Add to watchlist', 'Schedule consultation']
    }
  ]);

  const prompts = [
    'Generate NAAC 7.2.1 narrative for 2024–26',
    'Compare TU München vs ETH Zürich for MSc Data Science',
    'Predict Fall 27 incoming intake from SAARC',
    'Draft renewal letter — Universitat de Barcelona',
    'Find 5 scholarships for Saanvi Iyer'
  ];

  return (
    <div className="page fade-in" style={{ paddingBottom: 0 }}>
      <div className="page-head">
        <div>
          <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-mute)', marginBottom: 8 }}>
            ◯ Intelligence · Atlas AI Counsel
          </div>
          <h1>Ask <em>Atlas</em>, the global education co-pilot.</h1>
          <div className="sub">Trained on 12 years of institutional mobility data, visa outcomes, and partnership history</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span className="chip plum">Beta</span>
          <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Ico name="settings" size={13}/> Tune</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 22 }}>
        {/* Chat */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', minHeight: 580 }}>
          <div style={{ flex: 1, padding: 24, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
            {messages.map((m, i) => (
              m.role === 'user' ? (
                <div key={i} style={{ alignSelf: 'flex-end', maxWidth: '70%' }}>
                  <div style={{
                    padding: '12px 16px',
                    background: 'var(--clay)', color: 'white',
                    borderRadius: '12px 12px 4px 12px',
                    fontSize: 14
                  }}>{m.t}</div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)', marginTop: 4, textAlign: 'right', letterSpacing: '0.06em' }}>
                    PRIYA · 9:42 AM
                  </div>
                </div>
              ) : (
                <div key={i} style={{ display: 'flex', gap: 12 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                    background: 'var(--ink)', color: 'var(--saffron)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <Ico name="sparkles" size={16}/>
                  </div>
                  <div style={{ flex: 1, maxWidth: '85%' }}>
                    <div className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
                      ATLAS · just now
                    </div>
                    <div className="serif" style={{ fontSize: 22, lineHeight: 1.3, letterSpacing: '-0.01em', marginBottom: 14 }}>{m.t}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {m.detail.map((d, k) => (
                        <div key={k} style={{
                          padding: '10px 14px',
                          background: 'var(--bg-tint)',
                          border: '1px solid var(--line-soft)',
                          borderLeft: '3px solid var(--clay)',
                          borderRadius: 6,
                          fontSize: 13, color: 'var(--ink-soft)'
                        }}>{d}</div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                      {m.actions.map((a, k) => (
                        <button key={k} className="btn-ghost" style={{ padding: '6px 12px', fontSize: 12 }}>{a}</button>
                      ))}
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>

          {/* Composer */}
          <div style={{ padding: 18, borderTop: '1px solid var(--line-soft)', background: 'var(--bg-tint)' }}>
            <div style={{
              display: 'flex', alignItems: 'flex-end', gap: 8,
              background: 'var(--surface)', border: '1px solid var(--line)',
              borderRadius: 10, padding: 8
            }}>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask anything — students, visas, MoUs, accreditation…"
                rows={1}
                style={{
                  flex: 1, border: 'none', background: 'transparent',
                  resize: 'none', outline: 'none', fontSize: 14, padding: '8px 6px'
                }}/>
              <button className="btn-ghost" style={{ padding: '8px 10px', fontSize: 12 }}><Ico name="upload" size={13}/></button>
              <button className="btn-primary" style={{ padding: '8px 14px' }}>
                <Ico name="arrow-right" size={14}/>
              </button>
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
              {['SOP review','University compare','Visa risk','MoU draft','Cost estimate'].map(p => (
                <span key={p} className="chip" style={{ padding: '4px 10px', cursor: 'pointer' }}>✶ {p}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right rail */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="card">
            <div className="card-head"><h3>Suggested prompts</h3></div>
            <div className="card-body" style={{ padding: 0 }}>
              {prompts.map((p, i) => (
                <div key={i} style={{ padding: '12px 16px', borderBottom: i < prompts.length - 1 ? '1px solid var(--line-soft)' : 'none', fontSize: 12.5, cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{ color: 'var(--clay)' }}>✶</span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ background: 'var(--ink)', color: 'var(--bg)', borderColor: 'var(--ink)' }}>
            <div className="card-body">
              <div className="mono" style={{ fontSize: 10, color: 'var(--saffron)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 10 }}>
                ✶ ATLAS THINKS
              </div>
              <div className="serif" style={{ fontSize: 19, lineHeight: 1.3, color: 'var(--bg)' }}>
                A handful of "Tier 0" partners now contribute 41% of all outbound flow. Diversify before NAAC peer review.
              </div>
              <div style={{ fontSize: 11, color: 'oklch(0.7 0.02 320)', marginTop: 14, fontFamily: 'Geist Mono, monospace' }}>
                Based on 8 quarter trend · confidence 88%
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-head"><h3>What Atlas does</h3></div>
            <div className="card-body" style={{ padding: 0 }}>
              {[
                { i: 'doc',       n: 'SOP reviewer',           c: '1,284 reviewed' },
                { i: 'briefcase', n: 'Resume / CV ATS scorer', c: '892 scored' },
                { i: 'sparkles',  n: 'University matcher',     c: '67 partner uni' },
                { i: 'chart',     n: 'Predictive analytics',   c: 'Visa · admit · scholarship' }
              ].map((x, i) => (
                <div key={i} style={{ padding: '12px 16px', borderBottom: i < 3 ? '1px solid var(--line-soft)' : 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 6, background: 'var(--clay-tint)', color: 'var(--clay-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Ico name={x.i} size={13}/>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{x.n}</div>
                    <div className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)' }}>{x.c}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const KnowledgeBaseScreen = () => {
  const cats = [
    { i: 'doc',       n: 'SOP samples',          c: 184, tone: 'clay' },
    { i: 'doc',       n: 'LOR templates',        c: 64,  tone: 'sage' },
    { i: 'visa',      n: 'Country visa guides',  c: 31,  tone: 'plum' },
    { i: 'book',      n: 'IELTS / TOEFL prep',   c: 92,  tone: 'clay' },
    { i: 'globe',     n: 'Country handbooks',    c: 28,  tone: 'sage' },
    { i: 'coin',      n: 'Scholarship guides',   c: 47,  tone: 'plum' },
    { i: 'briefcase', n: 'Internship playbooks', c: 22,  tone: 'clay' },
    { i: 'shield',    n: 'Cultural training',    c: 18,  tone: 'sage' }
  ];

  const featured = [
    { tag: 'Long read',    title: 'The German student visa, deconstructed',    by: 'Atlas IR Team', mins: 12, tone: 'clay' },
    { tag: 'Template',     title: 'SOP framework — Data Science, EU schools',  by: 'Dr. R. Kapoor', mins: 6,  tone: 'sage' },
    { tag: 'Country guide',title: 'Living in Munich · a first-month playbook', by: 'Atlas + TUM',   mins: 9,  tone: 'plum' }
  ];

  return (
    <div className="page fade-in">
      <div className="page-head">
        <div>
          <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-mute)', marginBottom: 8 }}>
            ◯ Intelligence · Knowledge Center
          </div>
          <h1>The <em>Atlas</em> library</h1>
          <div className="sub">486 curated resources · contributed by 23 universities · used by 1.2k students this month</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div className="search" style={{ maxWidth: 280 }}>
            <Ico name="search" size={13} style={{ color: 'var(--ink-mute)' }}/>
            <input placeholder="Search the library…"/>
          </div>
          <button className="btn-clay" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Ico name="plus" size={13}/> Contribute</button>
        </div>
      </div>

      {/* Featured */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginBottom: 26 }}>
        {featured.map((f, i) => {
          const c = f.tone === 'clay' ? 'var(--clay)' : f.tone === 'sage' ? 'var(--sage)' : 'var(--plum)';
          return (
            <div key={i} className="card" style={{ overflow: 'hidden', cursor: 'pointer' }}>
              <div className="stripes" style={{
                height: 140, background: f.tone === 'clay' ? 'var(--clay-tint)' : f.tone === 'sage' ? 'var(--sage-tint)' : 'var(--plum-tint)',
                position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--line-soft)'
              }}>
                <div style={{
                  position: 'absolute', bottom: 16, left: 18, right: 18,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'
                }}>
                  <div className="mono" style={{ fontSize: 10, color: c, textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 600 }}>
                    {f.tag}
                  </div>
                  <div className="serif" style={{ fontSize: 42, lineHeight: 1, color: c, opacity: 0.4 }}>0{i+1}</div>
                </div>
              </div>
              <div style={{ padding: 18 }}>
                <div className="serif" style={{ fontSize: 21, lineHeight: 1.25, letterSpacing: '-0.01em' }}>{f.title}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, fontSize: 11, color: 'var(--ink-mute)' }}>
                  <span>{f.by}</span>
                  <span className="mono">{f.mins} min read</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Categories */}
      <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-mute)', marginBottom: 14 }}>
        Browse by category
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {cats.map((c, i) => {
          const tint = c.tone === 'clay' ? 'var(--clay-tint)' : c.tone === 'sage' ? 'var(--sage-tint)' : 'var(--plum-tint)';
          const col  = c.tone === 'clay' ? 'var(--clay-deep)' : c.tone === 'sage' ? 'var(--sage-deep)' : 'var(--plum)';
          return (
            <div key={i} className="card" style={{ padding: 18, cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 9,
                background: tint, color: col,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Ico name={c.i} size={18}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{c.n}</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 3 }}>
                  {c.c} resources
                </div>
              </div>
              <Ico name="arrow-up-right" size={14} style={{ color: 'var(--ink-mute)' }}/>
            </div>
          );
        })}
      </div>

      {/* Learning paths */}
      <div className="card" style={{ marginTop: 26 }}>
        <div className="card-head">
          <h3>Active learning paths</h3>
          <button className="btn-ghost" style={{ padding: '4px 10px', fontSize: 12 }}>+ Path</button>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          {[
            { n: 'Outbound mobility — Germany',  pct: 78, weeks: '8 wk', enrolled: 38 },
            { n: 'IELTS · Band 7+ in 6 weeks',    pct: 45, weeks: '6 wk', enrolled: 92 },
            { n: 'Incoming · India cultural prep',pct: 92, weeks: '4 wk', enrolled: 24 },
            { n: 'Interview confidence',          pct: 31, weeks: '3 wk', enrolled: 56 }
          ].map((p, i) => (
            <div key={i} style={{ padding: '14px 20px', borderBottom: i < 3 ? '1px solid var(--line-soft)' : 'none', display: 'grid', gridTemplateColumns: '1fr 220px 100px', alignItems: 'center', gap: 18 }}>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{p.n}</div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 2 }}>{p.weeks} · {p.enrolled} enrolled</div>
              </div>
              <div className="bar sage"><i style={{ width: p.pct + '%' }}/></div>
              <div className="mono tabular" style={{ fontSize: 12, textAlign: 'right' }}>{p.pct}% complete</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


const InboxScreen = () => {
  const msgs = [
    { from: 'Prof. Klaus Werner',    inst: 'TU München',         t: 'Re: Renewal of joint MSc Data Science MoU', s: 'Dear Priya, attached is the redlined draft of the renewal. We propose adjusting Annex B to reflect the increase to 8 mobility quotas per year, as discussed...', when: '08:42', tag: 'Partner', tone: 'clay', un: true },
    { from: 'Saanvi Iyer',           inst: 'STU-3940',            t: 'Question about ESSEC scholarship interview', s: 'Hi ma\'am, I have been shortlisted for the ESSEC merit scholarship and the interview is on June 4th. Could we please schedule a 30-min mock interview...', when: '07:14', tag: 'Student', tone: 'sage', un: true },
    { from: 'Atlas AI',              inst: 'System',              t: '✶ 3 students at high visa risk · Germany window', s: 'Atlas detected 3 outbound students approaching visa risk thresholds. Rohan Mehta, Meera Pillai, and Vikram Reddy require fast-track attention...', when: 'Yesterday', tag: 'Automation', tone: 'plum', un: true },
    { from: 'German Consulate',      inst: 'Mumbai',              t: 'Visa appointment confirmation — Aanya Krishnan', s: 'Your appointment for Aanya Krishnan, passport number XXXX, has been confirmed for 22 May 2026 at 09:30 IST. Please bring the following documents...', when: 'Yesterday', tag: 'Visa', tone: 'ink', un: false },
    { from: 'Marie Lefèvre',         inst: 'Sciences Po',         t: 'Delegation visit — June 18 logistics',       s: 'Dear Priya, We are finalising travel for our delegation of 3 colleagues. Could you confirm hotel arrangements at the Taj near campus?...', when: '2 days ago', tag: 'Delegation', tone: 'plum', un: false },
    { from: 'Erasmus+ EACEA',        inst: 'Brussels',            t: 'Call for proposals · KA171 mobility 2027',     s: 'Dear partners, the 2027 call for KA171 mobility actions is now open. Submission deadline is 15 October 2026. We strongly encourage your institution to...', when: 'Apr 14',     tag: 'Opportunity', tone: 'sage', un: false }
  ];

  const [sel, setSel] = React.useState(0);
  const m = msgs[sel];

  return (
    <div className="page fade-in" style={{ padding: '20px 24px 0', height: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column' }}>
      <div className="page-head" style={{ marginBottom: 18, paddingBottom: 14 }}>
        <div>
          <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-mute)', marginBottom: 6 }}>
            ◯ Workspace · Inbox
          </div>
          <h1 style={{ fontSize: 30 }}>Unified <em>inbox</em></h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span className="chip clay">12 unread</span>
          <button className="btn-ghost"><Ico name="filter" size={13}/></button>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Ico name="plus" size={13}/> Compose
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 0, border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--surface)', flex: 1, minHeight: 0 }}>
        {/* Mail list */}
        <div style={{ borderRight: '1px solid var(--line)', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--line-soft)', display: 'flex', gap: 6 }}>
            <button className="chip ink" style={{ padding: '4px 10px' }}>All · 28</button>
            <button className="chip" style={{ padding: '4px 10px' }}>Students</button>
            <button className="chip" style={{ padding: '4px 10px' }}>Partners</button>
            <button className="chip" style={{ padding: '4px 10px' }}>Visa</button>
          </div>
          {msgs.map((mm, i) => (
            <div key={i} onClick={() => setSel(i)} style={{
              padding: '14px 16px',
              borderBottom: '1px solid var(--line-soft)',
              cursor: 'pointer',
              background: sel === i ? 'var(--bg-tint)' : 'transparent',
              borderLeft: '3px solid ' + (sel === i ? 'var(--clay)' : 'transparent')
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: mm.un ? 600 : 400 }}>{mm.from}</span>
                <span className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)' }}>{mm.when}</span>
              </div>
              <div style={{ fontSize: 12.5, fontWeight: mm.un ? 500 : 400, marginBottom: 4 }}>{mm.t}</div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-mute)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 6 }}>{mm.s}</div>
              <span className={'chip ' + mm.tone}>{mm.tag}</span>
            </div>
          ))}
        </div>

        {/* Reader */}
        <div style={{ overflowY: 'auto', padding: 28 }}>
          <div style={{ marginBottom: 18 }}>
            <span className={'chip ' + m.tone}>{m.tag}</span>
          </div>
          <div className="serif" style={{ fontSize: 30, lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: 18 }}>{m.t}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 18, borderBottom: '1px solid var(--line-soft)' }}>
            <div className="avatar" style={{ background: 'var(--clay)' }}>{m.from.split(' ').map(x => x[0]).slice(0,2).join('')}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 500 }}>{m.from}</div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)' }}>{m.inst} · to me · {m.when}</div>
            </div>
            <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>Reply</button>
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink-soft)', marginTop: 22, maxWidth: 640 }}>
            <p>{m.s}</p>
            <p>Looking forward to your response and to deepening our collaboration.</p>
            <p>Warmly,<br/>{m.from}<br/><span className="mono" style={{ fontSize: 11 }}>{m.inst}</span></p>
          </div>

          <div style={{ marginTop: 28, padding: 16, background: 'var(--ink)', color: 'var(--bg)', borderRadius: 10 }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--saffron)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>
              ✶ ATLAS suggests
            </div>
            <div style={{ fontSize: 13, color: 'oklch(0.88 0.018 320)', marginBottom: 12 }}>
              Reply acknowledging Annex B revision, propose virtual signing on <b style={{ color: 'var(--bg)' }}>Jun 14</b>, and link the current MoU draft.
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button className="btn-clay" style={{ padding: '6px 12px' }}>Draft with Atlas</button>
              <button style={{ background: 'transparent', color: 'var(--bg)', border: '1px solid oklch(1 0 0 / 0.18)', padding: '6px 12px', borderRadius: 6, fontSize: 12 }}>Add to MoU pipeline</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const CalendarScreen = () => EventsScreen(); // reuse


const SettingsScreen = () => {
  const sections = [
    { i: 'shield',    n: 'Security & access',  d: 'MFA, SSO, session policies, audit logs' },
    { i: 'students',  n: 'Roles & permissions', d: '16 internal roles, 5 student roles, 4 external roles' },
    { i: 'globe',     n: 'Internationalisation', d: 'Languages, currencies, regional defaults' },
    { i: 'bell',      n: 'Notifications',       d: 'Email, WhatsApp, push, SMS rules' },
    { i: 'doc',       n: 'Document policies',   d: 'Retention, encryption, e-signature' },
    { i: 'sparkles',  n: 'AI features',         d: 'Training data scope, model selection, beta opt-ins' }
  ];

  return (
    <div className="page fade-in">
      <div className="page-head">
        <div>
          <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-mute)', marginBottom: 8 }}>
            ◯ Account · Settings
          </div>
          <h1>Atlas <em>configuration</em></h1>
          <div className="sub">Manage your institution, security, and the way Atlas behaves for your team</div>
        </div>
      </div>

      <div className="grid-3">
        {sections.map((s, i) => (
          <div key={i} className="card" style={{ padding: 20, cursor: 'pointer' }}>
            <div style={{
              width: 42, height: 42, borderRadius: 10,
              background: 'var(--clay-tint)', color: 'var(--clay-deep)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 14
            }}>
              <Ico name={s.i} size={20}/>
            </div>
            <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: '-0.005em' }}>{s.n}</div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-mute)', marginTop: 6, lineHeight: 1.5 }}>{s.d}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 22 }}>
        <div className="card-head">
          <h3>Institutional profile</h3>
          <button className="btn-ghost" style={{ padding: '4px 10px', fontSize: 12 }}>Edit</button>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {[
              ['Institution',      'Tagore Institute of Technology'],
              ['IR Director',      'Dr. Priya Menon'],
              ['Established',      '1968 · Bengaluru, India'],
              ['Accreditations',   'NAAC A+ · NBA Tier I'],
              ['Total students',   '14,820'],
              ['International %',  '8.3%'],
              ['Active workflows', '11'],
              ['Plan',             'Atlas Enterprise · 5y']
            ].map(([l, v], i) => (
              <div key={i}>
                <div className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{l}</div>
                <div style={{ fontSize: 13.5, marginTop: 4, fontWeight: 500 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


window.AnalyticsScreen = AnalyticsScreen;
window.AIScreen = AIScreen;
window.KnowledgeBaseScreen = KnowledgeBaseScreen;
window.InboxScreen = InboxScreen;
window.CalendarScreen = CalendarScreen;
window.SettingsScreen = SettingsScreen;
