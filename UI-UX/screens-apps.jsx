/* Applications · Visa · Opportunities Explorer */

const ApplicationsScreen = () => {
  const D = APP_DATA;
  const stages = D.pipeline;
  const total = stages.reduce((s,d) => s + d.n, 0);

  // Expand each stage with sample student names
  const mockNames = {
    'Applied': ['Vikram Reddy', 'Anjali Das', 'Karan Bhatia', 'Neha Roy'],
    'Under review': ['Kabir Sharma', 'Ishan Verma', 'Riya Kapoor'],
    'Interview': ['Saanvi Iyer', 'Aryan Joshi'],
    'Offer received': ['Rohan Mehta', 'Meera Pillai', 'Diya Kulkarni'],
    'Visa approved': ['Aanya Krishnan', 'Aarav Nair'],
    'Enrolled': ['Tara Banerjee']
  };
  const dests = ['TU München, DE','Toronto, CA','ESSEC, FR','Kyoto, JP','NUS, SG','KU Leuven, BE','Sciences Po, FR','ETH Zürich, CH'];

  return (
    <div className="page fade-in">
      <div className="page-head">
        <div>
          <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-mute)', marginBottom: 8 }}>
            ◯ Mobility · Application Pipeline
          </div>
          <h1>Application <em>pipeline</em></h1>
          <div className="sub">{total} applications across 6 stages · 28 destination universities</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div className="seg">
            <button className="on">Board</button>
            <button>Table</button>
            <button>Timeline</button>
          </div>
          <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Ico name="filter" size={13}/> Filter
          </button>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Ico name="plus" size={13}/> New application
          </button>
        </div>
      </div>

      {/* Kanban */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14, overflowX: 'auto' }}>
        {stages.map((st, i) => {
          const c = st.color === 'clay' ? 'var(--clay)' : st.color === 'sage' ? 'var(--sage)' : st.color === 'plum' ? 'var(--plum)' : 'var(--ink)';
          const names = mockNames[st.stage] || [];
          return (
            <div key={i} className="card" style={{ minHeight: 460, display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--line-soft)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: c }}/>
                  <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-mute)' }}>{st.stage}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <div className="serif tabular" style={{ fontSize: 28, lineHeight: 1 }}>{st.n}</div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)' }}>{Math.round(st.n/total*100)}%</div>
                </div>
              </div>
              <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                {names.map((nm, k) => (
                  <div key={k} style={{
                    padding: '10px 12px', background: 'var(--bg)',
                    border: '1px solid var(--line-soft)', borderRadius: 7,
                    cursor: 'grab', position: 'relative'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <div className="avatar" style={{ width: 22, height: 22, fontSize: 10, background: c, color: 'white' }}>
                        {nm.split(' ').map(x => x[0]).join('')}
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 500 }}>{nm}</div>
                    </div>
                    <div className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      → {dests[(i*3 + k) % dests.length]}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                      <div style={{ width: 50 }}><div className="bar" style={{ height: 3 }}><i style={{ width: (50 + k*10) + '%', background: c }}/></div></div>
                      <span className="mono" style={{ fontSize: 9, color: 'var(--ink-mute)' }}>STU-{4000 - i*30 - k*4}</span>
                    </div>
                  </div>
                ))}
                {names.length < 4 && (
                  <div style={{
                    padding: 10, border: '1px dashed var(--line)', borderRadius: 7,
                    textAlign: 'center', fontSize: 11, color: 'var(--ink-mute)',
                    fontFamily: 'Geist Mono, monospace', letterSpacing: '0.06em'
                  }}>
                    + {st.n - names.length} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Country workflow strip */}
      <div className="card" style={{ marginTop: 22 }}>
        <div className="card-head">
          <div>
            <h3>Country workflows</h3>
            <div style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 2 }}>
              Visa rules, SOP formats, exam matrix & cost guidance — managed per destination
            </div>
          </div>
          <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>Configure rules <Ico name="arrow-right" size={12}/></button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', borderTop: '1px solid var(--line-soft)' }}>
          {[
            { flag: '🇩🇪', n: 'Germany',  apps: 78, days: 21, sop: 'APS + Motivation', tone: 'sage' },
            { flag: '🇬🇧', n: 'UK',       apps: 64, days: 14, sop: 'Personal statement', tone: 'plum' },
            { flag: '🇨🇦', n: 'Canada',   apps: 52, days: 28, sop: 'SOP + LOR', tone: 'clay' },
            { flag: '🇺🇸', n: 'USA',      apps: 47, days: 35, sop: 'SOP + GRE', tone: 'sage' },
            { flag: '🇦🇺', n: 'Australia',apps: 38, days: 19, sop: 'Statement of purpose', tone: 'plum' }
          ].map((c, i) => (
            <div key={i} style={{ padding: 18, borderRight: i < 4 ? '1px solid var(--line-soft)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 22 }}>{c.flag}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{c.n}</div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)' }}>{c.sop}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                <div>
                  <div className="mono" style={{ color: 'var(--ink-mute)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Apps</div>
                  <div className="serif tabular" style={{ fontSize: 22, marginTop: 2 }}>{c.apps}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="mono" style={{ color: 'var(--ink-mute)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Avg cycle</div>
                  <div className="serif tabular" style={{ fontSize: 22, marginTop: 2 }}>{c.days}<span style={{ fontSize: 12, color: 'var(--ink-mute)' }}>d</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


const VisaScreen = () => {
  const D = APP_DATA;
  const [active, setActive] = React.useState('Germany');

  const countryQueues = {
    'Germany':  D.visaQueue.filter(v => v.country === 'Germany'),
    'Canada':   D.visaQueue.filter(v => v.country === 'Canada'),
    'France':   D.visaQueue.filter(v => v.country === 'France'),
    'All':      D.visaQueue
  };
  const queue = countryQueues['All'];

  return (
    <div className="page fade-in">
      <div className="page-head">
        <div>
          <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-mute)', marginBottom: 8 }}>
            ◯ Mobility · Visa & Immigration
          </div>
          <h1>Visa <em>operations</em> desk</h1>
          <div className="sub">41 active visa cases · 94% approval rate (YTD) · next embassy slot wave: May 26–30</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Ico name="calendar" size={13}/> Embassy slots
          </button>
          <button className="btn-clay" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Ico name="plane" size={13}/> Start case
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="kpi-row">
        {[
          { label: 'Active cases', value: 41, change: '+6', tone: 'clay' },
          { label: 'Approved · 30D', value: 17, change: '+2', tone: 'sage' },
          { label: 'Avg processing', value: '21d', change: '-3d', tone: 'plum' },
          { label: 'At risk', value: 5,  change: '+2', tone: 'crit' }
        ].map((k, i) => (
          <div key={i} className="kpi">
            <div className="label">{k.label}</div>
            <div className="value"><em>{k.value}</em></div>
            <div className="delta">
              <span className={k.change.startsWith('-') ? 'up' : k.tone === 'crit' ? 'down' : 'up'}>
                {k.change.startsWith('-') ? '▼' : '▲'} {k.change}
              </span>
              <span style={{ opacity: 0.6 }}>vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ marginTop: 22 }}>
        {/* Visa case board */}
        <div className="card">
          <div className="card-head">
            <h3>Live case board</h3>
            <div className="tabs">
              {['All','Germany','Canada','France'].map(c => (
                <button key={c} className={'tab ' + (active === c ? 'on' : '')} onClick={() => setActive(c)}>{c}</button>
              ))}
            </div>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            <table className="tbl">
              <thead><tr>
                <th>Student</th><th>Country</th><th>Stage</th><th>Date</th><th style={{ textAlign: 'right' }}>Likelihood</th>
              </tr></thead>
              <tbody>
                {queue.map((v, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div className="avatar" style={{ width: 26, height: 26, fontSize: 10, background: v.prob >= 95 ? 'var(--sage)' : v.prob >= 85 ? 'var(--clay)' : 'var(--plum)' }}>
                          {v.student.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span style={{ fontWeight: 500 }}>{v.student}</span>
                      </div>
                    </td>
                    <td style={{ color: 'var(--ink-soft)' }}>{v.country}</td>
                    <td>
                      <span className={'chip ' + (v.stage === 'Approved' ? 'sage' : v.stage === 'Interview' ? 'clay' : v.stage === 'Biometrics' ? 'plum' : '')}>
                        {v.stage}
                      </span>
                    </td>
                    <td className="mono" style={{ color: 'var(--ink-soft)', fontSize: 12 }}>{v.date}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 60 }}>
                          <div className="bar"><i style={{ width: v.prob + '%', background: v.prob >= 90 ? 'var(--ok)' : v.prob >= 80 ? 'var(--warn)' : 'var(--crit)' }}/></div>
                        </div>
                        <span className="mono tabular" style={{ fontSize: 11, width: 32 }}>{v.prob}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Expiry alerts */}
        <div className="card">
          <div className="card-head">
            <h3>Expiry watchlist</h3>
            <span className="chip warn">4 within 30 days</span>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {[
              { what: 'Passport · Rohan Mehta',          when: 'Expires Jun 02', d: 11, type: 'Passport',  tone: 'crit' },
              { what: 'I-20 · 4 USA-bound students',     when: 'Expires Jun 08', d: 17, type: 'I-20',      tone: 'warn' },
              { what: 'Health insurance · Kabir Sharma', when: 'Expires Jun 30', d: 39, type: 'Insurance', tone: 'warn' },
              { what: 'CAS letter · UK cohort (3)',      when: 'Expires Jul 04', d: 43, type: 'CAS',       tone: 'sage' },
              { what: 'Visa stamp · Vikram Reddy',       when: 'Expires Aug 11', d: 81, type: 'Visa',      tone: 'sage' }
            ].map((e, i) => {
              const dotC = e.tone === 'crit' ? 'var(--crit)' : e.tone === 'warn' ? 'var(--warn)' : 'var(--sage)';
              return (
                <div key={i} style={{ padding: '14px 20px', borderBottom: i < 4 ? '1px solid var(--line-soft)' : 'none', display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="dot" style={{ background: dotC }}/>
                      <span style={{ fontSize: 13.5, fontWeight: 500 }}>{e.what}</span>
                    </div>
                    <div className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)', marginTop: 4, marginLeft: 14 }}>{e.type.toUpperCase()} · {e.when}</div>
                  </div>
                  <div className="serif tabular" style={{ fontSize: 24, color: e.tone === 'crit' ? 'var(--crit)' : 'var(--ink)' }}>
                    {e.d}<span className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)', marginLeft: 2 }}>D</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Workflow lane */}
      <div className="card" style={{ marginTop: 22 }}>
        <div className="card-head">
          <h3>Germany student visa — workflow lane</h3>
          <span className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)' }}>78 students · Avg 21 days end-to-end</span>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 10 }}>
            {[
              { n: 'APS Cert.',        d: 8, status: 'done' },
              { n: 'Admission',         d: 12, status: 'done' },
              { n: 'Blocked Account',   d: 4, status: 'cur' },
              { n: 'Insurance',         d: 2, status: 'cur' },
              { n: 'Visa interview',    d: 5, status: 'idle' },
              { n: 'Decision',          d: 9, status: 'idle' },
              { n: 'Stamp + travel',    d: 3, status: 'idle' }
            ].map((s, i) => {
              const isDone = s.status === 'done';
              const isCur = s.status === 'cur';
              return (
                <div key={i} style={{
                  padding: 14,
                  background: isDone ? 'var(--sage-tint)' : isCur ? 'var(--clay-tint)' : 'var(--bg-tint)',
                  border: '1px solid ' + (isDone ? 'oklch(0.85 0.04 170)' : isCur ? 'oklch(0.85 0.05 50)' : 'var(--line)'),
                  borderRadius: 8, position: 'relative'
                }}>
                  <div className="mono" style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-mute)', marginBottom: 6 }}>
                    Step {i+1}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>{s.n}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span className="serif tabular" style={{ fontSize: 22 }}>{s.d}</span>
                    <span className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)' }}>days</span>
                  </div>
                  {isCur && <div style={{ position: 'absolute', top: 6, right: 8, width: 8, height: 8, borderRadius: '50%', background: 'var(--clay)', boxShadow: '0 0 0 4px var(--clay-tint)' }}/>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};


const OpportunitiesScreen = () => {
  const opps = [
    { title: 'Erasmus+ Mobility — Spring 2027',   uni: 'KU Leuven',                  country: 'BE', flag: '🇧🇪', kind: 'Exchange',     dur: '5 mo', tuition: 'Waived', deadline: 'Aug 15', tier: 'Tier II', tone: 'sage', match: 92 },
    { title: 'Data Science MSc · Joint Degree',   uni: 'TU München',                 country: 'DE', flag: '🇩🇪', kind: 'Dual Degree',  dur: '2 yr', tuition: '€0',     deadline: 'Jul 30', tier: 'Tier I',  tone: 'clay', match: 89 },
    { title: 'DAAD WISE Summer Research',         uni: 'Heidelberg University',      country: 'DE', flag: '🇩🇪', kind: 'Fellowship',   dur: '3 mo', tuition: 'Stipend',deadline: 'Jun 18', tier: 'Tier I',  tone: 'plum', match: 86 },
    { title: 'Sustainability Lab Internship',     uni: 'NUS Singapore',              country: 'SG', flag: '🇸🇬', kind: 'Internship',   dur: '4 mo', tuition: 'Paid',   deadline: 'Sep 02', tier: 'Tier I',  tone: 'sage', match: 84 },
    { title: 'Kyoto–India Research Exchange',     uni: 'Kyoto University',           country: 'JP', flag: '🇯🇵', kind: 'Research',     dur: '6 mo', tuition: 'Waived', deadline: 'Aug 04', tier: 'Tier I',  tone: 'clay', match: 81 },
    { title: 'Sciences Po — Public Policy MA',    uni: 'Sciences Po',                country: 'FR', flag: '🇫🇷', kind: 'Master',       dur: '2 yr', tuition: '€14k',   deadline: 'Jul 22', tier: 'Tier I',  tone: 'plum', match: 78 }
  ];

  return (
    <div className="page fade-in">
      <div className="page-head">
        <div>
          <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-mute)', marginBottom: 8 }}>
            ◯ Mobility · Opportunities Explorer
          </div>
          <h1>The world is <em>open</em>.</h1>
          <div className="sub">2,184 programs across 67 partner universities · ranked by Atlas AI for your cohort</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Ico name="sparkles" size={13}/> AI match</button>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>Save view</button>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 22, flexWrap: 'wrap' }}>
        {['All · 2184','Exchange','Dual Degree','Research','Fellowship','Summer School','Internship','Volunteer'].map((t, i) => (
          <button key={t} className={'chip ' + (i === 0 ? 'ink' : '')} style={{ padding: '7px 12px', fontSize: 11.5, cursor: 'pointer' }}>{t}</button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Ico name="filter" size={13}/> Country · Discipline · Tuition · Duration</button>
        </div>
      </div>

      {/* Cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {opps.map((o, i) => {
          const c = o.tone === 'clay' ? 'var(--clay)' : o.tone === 'sage' ? 'var(--sage)' : 'var(--plum)';
          const cTint = o.tone === 'clay' ? 'var(--clay-tint)' : o.tone === 'sage' ? 'var(--sage-tint)' : 'var(--plum-tint)';
          return (
            <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                padding: 18, background: cTint, borderBottom: '1px solid var(--line-soft)',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: 30 }}>{o.flag}</div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="mono" style={{ fontSize: 9, letterSpacing: '0.14em', color: 'var(--ink-mute)', textTransform: 'uppercase' }}>AI Match</div>
                    <div className="serif" style={{ fontSize: 28, lineHeight: 1, marginTop: 2, color: c }}>{o.match}<span style={{ fontSize: 14, color: 'var(--ink-mute)' }}>%</span></div>
                  </div>
                </div>
                <div className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', color: c, textTransform: 'uppercase', marginTop: 16 }}>
                  {o.kind} · {o.tier}
                </div>
                <div className="serif" style={{ fontSize: 21, lineHeight: 1.2, marginTop: 6, letterSpacing: '-0.01em' }}>{o.title}</div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-soft)', marginTop: 4 }}>{o.uni}</div>
              </div>
              <div style={{ padding: 16, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, fontSize: 11 }}>
                <Meta label="Duration" value={o.dur}/>
                <Meta label="Tuition" value={o.tuition}/>
                <Meta label="Deadline" value={o.deadline}/>
              </div>
              <div style={{ padding: '12px 16px', borderTop: '1px solid var(--line-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <span className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {12 + i*3} students applied
                </span>
                <button className="btn-ghost" style={{ padding: '6px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  Explore <Ico name="arrow-up-right" size={12}/>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Meta = ({ label, value }) => (
  <div>
    <div className="mono" style={{ fontSize: 9, color: 'var(--ink-mute)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
    <div style={{ fontSize: 13, fontWeight: 500, marginTop: 2 }}>{value}</div>
  </div>
);

window.ApplicationsScreen = ApplicationsScreen;
window.VisaScreen = VisaScreen;
window.OpportunitiesScreen = OpportunitiesScreen;
