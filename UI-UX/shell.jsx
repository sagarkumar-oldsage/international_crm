/* Shell: sidebar + topbar */

const NAV = [
  {
    section: 'Workspace',
    items: [
      { id: 'overview', label: 'Overview',     icon: 'home',     count: null },
      { id: 'inbox',    label: 'Inbox',        icon: 'mail',     count: 12   },
      { id: 'calendar', label: 'Calendar',     icon: 'calendar', count: 4    }
    ]
  },
  {
    section: 'Mobility',
    items: [
      { id: 'students',  label: 'Students',           icon: 'students', count: 412 },
      { id: 'apps',      label: 'Applications',       icon: 'compass',  count: 86  },
      { id: 'opps',      label: 'Opportunities',      icon: 'globe',    count: null },
      { id: 'visa',      label: 'Visa & Immigration', icon: 'visa',     count: 18  }
    ]
  },
  {
    section: 'Operations',
    items: [
      { id: 'docs',      label: 'Documents',     icon: 'doc',       count: 2840 },
      { id: 'partners',  label: 'Partnerships',  icon: 'handshake', count: 67   },
      { id: 'events',    label: 'Events',        icon: 'calendar',  count: 9    },
      { id: 'finance',   label: 'Scholarships',  icon: 'coin',      count: null }
    ]
  },
  {
    section: 'Intelligence',
    items: [
      { id: 'analytics', label: 'Analytics',     icon: 'chart',    count: null },
      { id: 'ai',        label: 'AI Counsellor', icon: 'sparkles', count: null },
      { id: 'kb',        label: 'Knowledge base',icon: 'book',     count: null }
    ]
  }
];

const Sidebar = ({ active, setActive, onLogout }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">A</div>
        <div>
          <div className="brand-name">Atlas</div>
          <div className="brand-tag">IR · CRM</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, overflowY: 'auto', flex: 1 }}>
        {NAV.map(group => (
          <React.Fragment key={group.section}>
            <div className="nav-section">{group.section}</div>
            {group.items.map(it => (
              <div key={it.id}
                   className={'nav-item' + (active === it.id ? ' active' : '')}
                   onClick={() => setActive(it.id)}>
                <span className="nav-ico"><Ico name={it.icon} size={15}/></span>
                <span>{it.label}</span>
                {it.count !== null && <span className="count">{it.count}</span>}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      <div className="sidebar-foot">
        <div className="nav-item" style={{ marginBottom: 6 }} onClick={() => setActive('settings')}>
          <span className="nav-ico"><Ico name="settings" size={15}/></span>
          <span>Settings</span>
        </div>
        <div className="user-card" style={{ background: 'oklch(1 0 0 / 0.04)', borderRadius: 8 }}>
          <div className="avatar">PM</div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ color: 'var(--bg)', fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{APP_DATA.user.name}</div>
            <div className="mono" style={{ fontSize: 10, color: 'oklch(0.7 0.02 320)', letterSpacing: '0.06em' }}>{APP_DATA.user.role}</div>
          </div>
          <button onClick={onLogout} title="Log out" style={{ background: 'transparent', border: 'none', color: 'oklch(0.85 0.02 320)', padding: 4, cursor: 'pointer' }}>
            <Ico name="log-out" size={14}/>
          </button>
        </div>
      </div>
    </aside>
  );
};

const Topbar = ({ active, setActive }) => {
  const crumbMap = {
    overview: ['Workspace', 'Overview'],
    inbox: ['Workspace', 'Inbox'],
    calendar: ['Workspace', 'Calendar'],
    students: ['Mobility', 'Students'],
    apps: ['Mobility', 'Applications'],
    opps: ['Mobility', 'Opportunities Explorer'],
    visa: ['Mobility', 'Visa & Immigration'],
    docs: ['Operations', 'Documents'],
    partners: ['Operations', 'Partnerships'],
    events: ['Operations', 'Events'],
    finance: ['Operations', 'Scholarships'],
    analytics: ['Intelligence', 'Analytics'],
    ai: ['Intelligence', 'AI Counsellor'],
    kb: ['Intelligence', 'Knowledge Base'],
    settings: ['Account', 'Settings']
  };
  const c = crumbMap[active] || ['Workspace', 'Overview'];

  return (
    <header className="topbar">
      <div className="crumb">
        <span>{c[0]}</span>
        <span style={{ opacity: 0.4 }}>/</span>
        <b>{c[1]}</b>
      </div>
      <div className="search">
        <Ico name="search" size={14} style={{ color: 'var(--ink-mute)' }}/>
        <input placeholder="Search students, universities, MoUs, visas…"/>
        <kbd>⌘ K</kbd>
      </div>
      <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px' }}>
        <Ico name="plus" size={13}/> New
      </button>
      <button className="icon-btn" style={{ position: 'relative' }}>
        <Ico name="bell" size={15}/>
        <span className="pip"/>
      </button>
      <button className="icon-btn">
        <Ico name="dot-grid" size={15}/>
      </button>
      <div className="avatar sage" style={{ marginLeft: 4 }} title="Priya Menon">PM</div>
    </header>
  );
};

window.Sidebar = Sidebar;
window.Topbar = Topbar;
