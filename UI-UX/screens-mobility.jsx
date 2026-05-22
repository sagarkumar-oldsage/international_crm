/* Students + Applications + Mobility detail */

const StudentsScreen = () => {
  const [selected, setSelected] = React.useState(APP_DATA.students[0]);
  const [filter, setFilter] = React.useState('all');

  const filtered = APP_DATA.students.filter(s => {
    if (filter === 'all') return true;
    if (filter === 'outbound') return true;
    if (filter === 'visa') return s.stage.includes('Visa') || s.stage === 'Interview';
    if (filter === 'attention') return s.status === 'warn';
    return true;
  });

  return (
    <div className="page fade-in">
      <div className="page-head">
        <div>
          <div className="mono" style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-mute)', marginBottom: 8 }}>
            ◯ Mobility · Students
          </div>
          <h1>Outbound <em>mobility</em> register</h1>
          <div className="sub">412 active students across 6 program types · Fall 2026 intake closes in 38 days</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Ico name="upload" size={13}/> Bulk import
          </button>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Ico name="plus" size={13}/> Add student
          </button>
        </div>
      </div>

      {/* Filters + KPIs strip */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18, flexWrap: 'wrap' }}>
        <div className="tabs">
          {[
            { id: 'all', label: 'All · 412' },
            { id: 'outbound', label: 'Outbound · 287' },
            { id: 'incoming', label: 'Incoming · 125' },
            { id: 'visa', label: 'In visa · 41' },
            { id: 'attention', label: 'Needs attention · 17', tone: 'clay' }
          ].map(t => (
            <button key={t.id}
              className={'tab ' + (filter === t.id ? 'on' : '')}
              onClick={() => setFilter(t.id)}
              style={t.tone === 'clay' && filter !== t.id ? { color: 'var(--clay-deep)' } : {}}>
              {t.label}
            </button>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Ico name="filter" size={13}/> Country · Program · Status
          </button>
          <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Ico name="download" size={13}/>
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 22 }}>
        {/* Student table */}
        <div className="card">
          <div className="card-body" style={{ padding: 0 }}>
            <table className="tbl">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Program</th>
                  <th>Destination</th>
                  <th>Stage</th>
                  <th style={{ textAlign: 'right' }}>Docs</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.id} onClick={() => setSelected(s)}
                      style={{ cursor: 'pointer', background: selected.id === s.id ? 'var(--bg-tint)' : 'transparent' }}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div className="avatar" style={{ width: 28, height: 28, fontSize: 11,
                          background: s.status === 'done' ? 'var(--sage)' : s.status === 'warn' ? 'var(--plum)' : 'var(--clay)' }}>
                          {s.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div style={{ fontWeight: 500 }}>{s.name}</div>
                          <div className="mono" style={{ fontSize: 10, color: 'var(--ink-mute)' }}>{s.id} · {s.intake}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ color: 'var(--ink-soft)' }}>{s.program}</td>
                    <td style={{ color: 'var(--ink-soft)' }}>{s.dest}</td>
                    <td>
                      <span className={'chip ' + (
                        s.stage === 'Enrolled' ? 'sage' :
                        s.stage === 'Visa approved' ? 'sage' :
                        s.stage === 'Offer received' ? 'clay' :
                        s.stage === 'Interview' ? 'plum' : ''
                      )}>{s.stage}</span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 60 }}>
                          <div className="bar clay"><i style={{ width: (s.docs * 100) + '%' }}/></div>
                        </div>
                        <span className="mono tabular" style={{ fontSize: 11, color: 'var(--ink-mute)', width: 30 }}>{Math.round(s.docs * 100)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Student detail panel */}
        <StudentDetail s={selected}/>
      </div>
    </div>
  );
};

const StudentDetail = ({ s }) => {
  const stages = [
    { name: 'Applied', when: 'Jan 12' },
    { name: 'Under review', when: 'Feb 04' },
    { name: 'Interview', when: 'Mar 18' },
    { name: 'Offer received', when: 'Apr 02' },
    { name: 'Visa approved', when: 'May 14' },
    { name: 'Pre-departure', when: 'Jul 28 →' },
    { name: 'Enrolled', when: 'Sep 01 →' }
  ];
  const currentIdx = stages.findIndex(x => x.name === s.stage);

  return (
    <div className="card" style={{ position: 'sticky', top: 80, alignSelf: 'flex-start' }}>
      <div style={{
        padding: 22, borderBottom: '1px solid var(--line-soft)',
        background: 'linear-gradient(180deg, var(--bg-tint), var(--surface))'
      }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <div className="avatar" style={{ width: 52, height: 52, fontSize: 18, background: 'var(--clay)' }}>
            {s.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div style={{ flex: 1 }}>
            <div className="serif" style={{ fontSize: 26, lineHeight: 1.1, letterSpacing: '-0.01em' }}>{s.name}</div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-mute)', marginTop: 4 }}>
              {s.program} · <span className="mono">{s.id}</span>
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
              <span className="chip clay">{s.intake}</span>
              <span className="chip"><Ico name="map-pin" size={10}/> {s.dest}</span>
              <span className="chip sage">IELTS 8.0</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 6, marginTop: 16 }}>
          <button className="btn-clay" style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 6, alignItems: 'center' }}>
            <Ico name="chat" size={13}/> Message
          </button>
          <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Ico name="eye" size={13}/> Full profile
          </button>
          <button className="icon-btn"><Ico name="settings" size={14}/></button>
        </div>
      </div>

      <div className="card-body">
        {/* Document completion */}
        <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-mute)', marginBottom: 10 }}>
          Document checklist
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 22 }}>
          {[
            { name: 'Passport',      ok: true },
            { name: 'IELTS Score',   ok: true },
            { name: 'Transcript',    ok: true },
            { name: 'SOP',           ok: true },
            { name: 'LOR (×3)',      ok: true },
            { name: 'Financial',     ok: false },
            { name: 'Insurance',     ok: false },
            { name: 'Visa packet',   ok: true }
          ].map(d => (
            <div key={d.name} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 10px', border: '1px solid var(--line-soft)',
              borderRadius: 6, background: d.ok ? 'var(--sage-tint)' : 'var(--bg-tint)',
              fontSize: 12
            }}>
              <span style={{
                width: 14, height: 14, borderRadius: 3,
                background: d.ok ? 'var(--sage)' : 'transparent',
                border: d.ok ? 'none' : '1.5px dashed var(--ink-mute)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
              }}>
                {d.ok && <Ico name="check" size={10}/>}
              </span>
              <span style={{ color: d.ok ? 'var(--sage-deep)' : 'var(--ink-mute)' }}>{d.name}</span>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--ink-mute)', marginBottom: 14 }}>
          Application timeline
        </div>
        <div className="timeline">
          {stages.map((st, i) => (
            <div key={i} className={'tl-item ' + (i < currentIdx ? 'done' : i === currentIdx ? 'cur' : 'idle')}>
              <div className="when">{st.when}</div>
              <div className="what" style={{ color: i <= currentIdx ? 'var(--ink)' : 'var(--ink-mute)', fontWeight: i === currentIdx ? 500 : 400 }}>
                {st.name}
                {i === currentIdx && <span className="chip clay" style={{ marginLeft: 8 }}>current</span>}
              </div>
            </div>
          ))}
        </div>

        {/* AI insight */}
        <div style={{
          marginTop: 18, padding: 14,
          background: 'var(--ink)', color: 'var(--bg)', borderRadius: 10,
          fontSize: 12.5, lineHeight: 1.55
        }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--saffron)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6 }}>
            ✶ Atlas AI prediction
          </div>
          <div style={{ color: 'oklch(0.88 0.018 320)' }}>
            <b style={{ color: 'var(--bg)' }}>96% likelihood</b> of on-time enrollment. Recommend booking pre-departure orientation by <b style={{ color: 'var(--saffron)' }}>Jun 12</b>.
          </div>
        </div>
      </div>
    </div>
  );
};

window.StudentsScreen = StudentsScreen;
