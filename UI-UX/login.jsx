/* Login page */
const Login = ({ onLogin }) => {
  const [email, setEmail] = React.useState('priya.menon@tagore.edu');
  const [pwd, setPwd] = React.useState('••••••••••');
  const [role, setRole] = React.useState('director');
  const [loading, setLoading] = React.useState(false);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 700);
  };

  return (
    <div className="login-shell">
      {/* LEFT — editorial / globe */}
      <div className="login-art">
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40, background: 'oklch(0.97 0.012 85)',
            color: 'oklch(0.19 0.025 320)', borderRadius: 9,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Instrument Serif', serif", fontStyle: 'italic', fontSize: 26, lineHeight: 1
          }}>A</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 500 }}>Atlas</div>
            <div className="mono" style={{ fontSize: 10, opacity: 0.65, letterSpacing: '0.14em', textTransform: 'uppercase' }}>International Relations ∙ CRM</div>
          </div>
        </div>

        {/* Globe-ish visualization */}
        <div className="globe-wrap">
          <GlobeArt />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 480 }}>
          <div className="mono" style={{ fontSize: 11, opacity: 0.6, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 14 }}>
            ◯ &nbsp;A unified workspace for
          </div>
          <h1 className="serif" style={{
            fontSize: 52, lineHeight: 1.05, margin: 0, fontWeight: 400,
            color: 'oklch(0.97 0.012 85)', letterSpacing: '-0.02em'
          }}>
            Global education,<br/>
            <em style={{ color: 'oklch(0.78 0.14 55)' }}>thoughtfully orchestrated.</em>
          </h1>
          <p style={{ color: 'oklch(0.78 0.02 320)', marginTop: 18, fontSize: 14, maxWidth: 440, lineHeight: 1.6 }}>
            Student mobility, partnerships, visas, MoUs, and internationalisation analytics —
            in one institutional ecosystem trusted by 84 universities across 31 countries.
          </p>

          <div style={{ marginTop: 28, display: 'flex', gap: 26 }}>
            <Stat label="Universities" value="84" />
            <Stat label="Countries" value="31" />
            <Stat label="Students placed" value="12.4k" />
          </div>
        </div>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', color: 'oklch(0.7 0.02 320)', fontSize: 11 }} className="mono">
          <span>v3.2 · 2026 RELEASE</span>
          <span>SOC 2 · GDPR · FERPA-LIKE</span>
        </div>
      </div>

      {/* RIGHT — form */}
      <div className="login-form-side">
        <div className="login-card fade-in">
          <div className="mono" style={{ fontSize: 11, color: 'var(--ink-mute)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 10 }}>
            Sign in · Institutional access
          </div>
          <h2 className="serif" style={{ fontSize: 36, margin: '0 0 6px', letterSpacing: '-0.02em', fontWeight: 400 }}>
            Welcome back, <em style={{ color: 'var(--clay)' }}>Director</em>
          </h2>
          <p style={{ color: 'var(--ink-mute)', margin: '0 0 28px', fontSize: 13.5 }}>
            Use your institutional credentials, or sign in via SSO.
          </p>

          {/* Role chooser */}
          <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--ink-mute)', marginBottom: 8 }}>I sign in as</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 22 }}>
            {[
              { id: 'director',  label: 'IR Staff' },
              { id: 'student',   label: 'Student'  },
              { id: 'partner',   label: 'Partner'  }
            ].map(r => (
              <button key={r.id} type="button"
                onClick={() => setRole(r.id)}
                style={{
                  padding: '10px 8px', fontSize: 12.5,
                  border: '1px solid ' + (role === r.id ? 'var(--ink)' : 'var(--line)'),
                  background: role === r.id ? 'var(--ink)' : 'var(--surface)',
                  color: role === r.id ? 'var(--bg)' : 'var(--ink)',
                  borderRadius: 6, transition: 'all .12s'
                }}>{r.label}</button>
            ))}
          </div>

          <form onSubmit={submit}>
            <div className="field">
              <label htmlFor="email">Institutional Email</label>
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="pwd" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Password</span>
                <span style={{ textTransform: 'none', letterSpacing: 0, color: 'var(--clay)', cursor: 'pointer' }}>Forgot?</span>
              </label>
              <input id="pwd" type="password" value={pwd} onChange={e => setPwd(e.target.value)} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '10px 0 18px', fontSize: 12.5, color: 'var(--ink-soft)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ accentColor: 'oklch(0.19 0.025 320)' }} />
                Keep me signed in
              </label>
              <span className="chip ink"><Ico name="shield" size={11}/> 2FA enabled</span>
            </div>

            <button className="btn-primary" style={{ width: '100%' }} type="submit" disabled={loading}>
              {loading ? (
                <span className="mono" style={{ fontSize: 12, letterSpacing: '0.12em' }}>VERIFYING…</span>
              ) : (
                <>Continue to Atlas <Ico name="arrow-right" size={15}/></>
              )}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '22px 0', color: 'var(--ink-mute)' }}>
              <div style={{ height: 1, background: 'var(--line)', flex: 1 }}/>
              <span className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' }}>or use SSO</span>
              <div style={{ height: 1, background: 'var(--line)', flex: 1 }}/>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <button type="button" className="btn-ghost" style={{ display: 'flex', justifyContent: 'center', gap: 8, alignItems: 'center' }}>
                <SSOIcon kind="google"/> Google Workspace
              </button>
              <button type="button" className="btn-ghost" style={{ display: 'flex', justifyContent: 'center', gap: 8, alignItems: 'center' }}>
                <SSOIcon kind="ms"/> Microsoft 365
              </button>
              <button type="button" className="btn-ghost" style={{ display: 'flex', justifyContent: 'center', gap: 8, alignItems: 'center' }}>
                <SSOIcon kind="saml"/> SAML / Shibboleth
              </button>
              <button type="button" className="btn-ghost" style={{ display: 'flex', justifyContent: 'center', gap: 8, alignItems: 'center' }}>
                <SSOIcon kind="key"/> Keycloak
              </button>
            </div>
          </form>

          <p style={{ marginTop: 28, fontSize: 12, color: 'var(--ink-mute)', textAlign: 'center' }}>
            New to Atlas? <span style={{ color: 'var(--clay)', cursor: 'pointer', textDecoration: 'underline' }}>Request institutional access</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div>
    <div className="serif" style={{ fontSize: 32, lineHeight: 1, color: 'var(--bg)', letterSpacing: '-0.02em' }}>{value}</div>
    <div className="mono" style={{ fontSize: 10, color: 'oklch(0.75 0.02 320)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{label}</div>
  </div>
);

const SSOIcon = ({ kind }) => {
  const c = 'oklch(0.66 0.155 42)';
  if (kind === 'google') return <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.5"/><path d="M12 8v4l3 2" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>;
  if (kind === 'ms')     return <svg width="14" height="14" viewBox="0 0 24 24"><rect x="3" y="3" width="8" height="8" fill={c}/><rect x="13" y="3" width="8" height="8" fill="var(--sage)"/><rect x="3" y="13" width="8" height="8" fill="var(--plum)"/><rect x="13" y="13" width="8" height="8" fill="var(--ink)"/></svg>;
  if (kind === 'saml')   return <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 8l7-4 7 4-7 4z" stroke={c} strokeWidth="1.5"/><path d="M5 8v8l7 4 7-4V8" stroke={c} strokeWidth="1.5"/></svg>;
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="12" r="4" stroke={c} strokeWidth="1.5"/><path d="M13 12h8M17 9v6" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>;
};

/* Decorative globe / world net */
const GlobeArt = () => {
  // Generate dots on a sphere projection
  const R = 220;
  const dots = [];
  for (let lat = -80; lat <= 80; lat += 8) {
    const rowR = R * Math.cos(lat * Math.PI / 180);
    const step = lat % 16 === 0 ? 8 : 12;
    for (let lon = -180; lon < 180; lon += step) {
      const x = rowR * Math.cos(lon * Math.PI / 180);
      const y = R * Math.sin(lat * Math.PI / 180);
      // approximate "visible" hemisphere
      const z = rowR * Math.sin(lon * Math.PI / 180);
      if (z < -30) continue;
      const op = 0.15 + (z + R) / (2 * R) * 0.6;
      dots.push({ x, y, op, r: 1.1 + (z + R) / (2 * R) * 0.9 });
    }
  }
  // Connection arcs (mobility flows)
  const arcs = [
    { from: [-160, 70], to: [-30, 250], color: 'oklch(0.78 0.14 55)' }, // India → US
    { from: [-160, 70], to: [60, 280], color: 'oklch(0.78 0.14 55)' },  // India → Asia
    { from: [-160, 70], to: [-200, 230], color: 'oklch(0.6 0.08 170)' },// India → Europe
    { from: [-160, 70], to: [-160, 340], color: 'oklch(0.6 0.08 170)' } // India → Australia
  ];
  return (
    <svg width="640" height="640" viewBox="-320 -320 640 640" style={{ opacity: 0.85 }}>
      <defs>
        <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.97 0.012 85 / 0.06)"/>
          <stop offset="100%" stopColor="oklch(0.97 0.012 85 / 0)"/>
        </radialGradient>
      </defs>
      <circle cx="0" cy="0" r="240" fill="url(#globeGlow)"/>
      <circle cx="0" cy="0" r="220" fill="none" stroke="oklch(0.97 0.012 85 / 0.1)" strokeWidth="1"/>
      {/* Meridians */}
      {[0, 30, 60, 90, 120, 150].map(a => (
        <ellipse key={a} cx="0" cy="0" rx={220 * Math.abs(Math.cos(a * Math.PI / 180)) || 1} ry="220" stroke="oklch(0.97 0.012 85 / 0.07)" strokeWidth="1" fill="none"/>
      ))}
      {/* Latitudes */}
      {[-60, -30, 0, 30, 60].map(a => (
        <ellipse key={a} cx="0" cy={220 * Math.sin(a * Math.PI / 180)} rx="220" ry={5 + Math.abs(a) * 0.3} stroke="oklch(0.97 0.012 85 / 0.05)" strokeWidth="1" fill="none"/>
      ))}
      {/* Dots */}
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={`oklch(0.97 0.012 85 / ${d.op})`}/>
      ))}
      {/* Mobility arcs */}
      {arcs.map((a, i) => {
        const mx = (a.from[0] + a.to[0]) / 2;
        const my = (a.from[1] + a.to[1]) / 2 - 80;
        return (
          <g key={i}>
            <path d={`M${a.from[0]},${a.from[1]} Q${mx},${my} ${a.to[0]},${a.to[1]}`}
                  stroke={a.color} strokeWidth="1.2" fill="none" strokeDasharray="3 3" opacity="0.65"/>
            <circle cx={a.to[0]} cy={a.to[1]} r="4" fill={a.color}/>
            <circle cx={a.to[0]} cy={a.to[1]} r="8" fill="none" stroke={a.color} strokeWidth="1" opacity="0.4"/>
          </g>
        );
      })}
      {/* Origin pin */}
      <circle cx="-160" cy="70" r="5" fill="oklch(0.78 0.14 55)"/>
      <circle cx="-160" cy="70" r="11" fill="none" stroke="oklch(0.78 0.14 55)" strokeWidth="1.2" opacity="0.6"/>
    </svg>
  );
};

window.Login = Login;
