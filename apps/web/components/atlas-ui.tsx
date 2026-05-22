"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

type NavId =
  | "overview"
  | "inbox"
  | "calendar"
  | "students"
  | "apps"
  | "opps"
  | "visa"
  | "docs"
  | "partners"
  | "events"
  | "finance"
  | "analytics"
  | "ai"
  | "kb"
  | "settings";

const APP_DATA = {
  user: {
    name: "Dr. Priya Menon",
    role: "IR Director",
    institution: "Tagore Institute of Technology"
  },
  kpis: [
    { label: "Outbound students", value: "412", change: "+18%" },
    { label: "Incoming students", value: "289", change: "+24%" },
    { label: "Active MoUs", value: "67", change: "+5" },
    { label: "Visa approval rate", value: "94%", change: "+2pt" }
  ],
  students: [
    { id: "STU-4012", name: "Aanya Krishnan", stage: "Visa approved", dest: "TU Munchen, DE" },
    { id: "STU-3987", name: "Rohan Mehta", stage: "Offer received", dest: "Toronto, CA" },
    { id: "STU-3940", name: "Saanvi Iyer", stage: "Interview", dest: "ESSEC, FR" },
    { id: "STU-3902", name: "Kabir Sharma", stage: "Under review", dest: "Kyoto, JP" }
  ],
  events: [
    { date: "JUN 04", title: "Global Education Fair", tag: "Outreach" },
    { date: "JUN 12", title: "TU Munchen Delegation", tag: "Delegation" },
    { date: "JUN 18", title: "Erasmus Information Session", tag: "Webinar" }
  ]
};

const NAV = [
  {
    section: "Workspace",
    items: [
      { id: "overview", label: "Overview", icon: "home", href: "/dashboard" },
      { id: "inbox", label: "Inbox", icon: "mail", href: "/inbox" },
      { id: "calendar", label: "Calendar", icon: "calendar", href: "/calendar" }
    ]
  },
  {
    section: "Mobility",
    items: [
      { id: "students", label: "Students", icon: "students", href: "/students/profile" },
      { id: "apps", label: "Applications", icon: "compass", href: "/applications" },
      { id: "opps", label: "Opportunities", icon: "globe", href: "/opportunities" },
      { id: "visa", label: "Visa & Immigration", icon: "visa", href: "/visa" }
    ]
  },
  {
    section: "Operations",
    items: [
      { id: "docs", label: "Documents", icon: "doc", href: "/documents" },
      { id: "partners", label: "Partnerships", icon: "handshake", href: "/partnerships" },
      { id: "events", label: "Events", icon: "calendar", href: "/events" },
      { id: "finance", label: "Scholarships", icon: "coin", href: "/finance" }
    ]
  },
  {
    section: "Intelligence",
    items: [
      { id: "analytics", label: "Analytics", icon: "chart", href: "/analytics" },
      { id: "ai", label: "AI Counsellor", icon: "sparkles", href: "/ai-automation" },
      { id: "kb", label: "Knowledge base", icon: "book", href: "/knowledge" }
    ]
  }
] as const;

function Ico({ name, size = 16 }: { name: string; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const
  };

  if (name === "home") {
    return <svg {...common}><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z"/></svg>;
  }
  if (name === "mail") {
    return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 7l9 7 9-7"/></svg>;
  }
  if (name === "calendar") {
    return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="1"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>;
  }
  if (name === "students") {
    return <svg {...common}><path d="M3 9l9-5 9 5-9 5-9-5z"/><path d="M7 11v5a5 5 0 0 0 10 0v-5"/></svg>;
  }
  if (name === "compass") {
    return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5L13 13l-4.5 2.5L10 11z"/></svg>;
  }
  if (name === "globe") {
    return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>;
  }
  if (name === "visa") {
    return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 9h18M7 14h4"/></svg>;
  }
  if (name === "doc") {
    return <svg {...common}><path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5"/></svg>;
  }
  if (name === "handshake") {
    return <svg {...common}><path d="M11 13l2-2 4 4-2 2a2 2 0 0 1-3 0z"/><path d="M3 14l4-4 3 3"/></svg>;
  }
  if (name === "coin") {
    return <svg {...common}><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/></svg>;
  }
  if (name === "chart") {
    return <svg {...common}><path d="M4 19h16M7 16v-6M12 16V7M17 16v-9"/></svg>;
  }
  if (name === "sparkles") {
    return <svg {...common}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/></svg>;
  }
  if (name === "book") {
    return <svg {...common}><path d="M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M20 4h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8z"/></svg>;
  }
  if (name === "settings") {
    return <svg {...common}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .36 1.7 1.7 0 0 0-.76 1.47V21a2 2 0 1 1-4 0v-.08A1.7 1.7 0 0 0 8.48 19.4a1.7 1.7 0 0 0-1-.36 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.36-1 1.7 1.7 0 0 0-1.47-.76H2.7a2 2 0 1 1 0-4h.08A1.7 1.7 0 0 0 4.6 8.48a1.7 1.7 0 0 0 .36-1 1.7 1.7 0 0 0-.34-1.87l-.06-.06A2 2 0 1 1 7.4 2.72l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.36 1.7 1.7 0 0 0 .76-1.47V2.7a2 2 0 1 1 4 0v.08A1.7 1.7 0 0 0 15.52 4.6a1.7 1.7 0 0 0 1 .36 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 .36 1 1.7 1.7 0 0 0 1.47.76h.08a2 2 0 1 1 0 4h-.08A1.7 1.7 0 0 0 19.4 15z"/></svg>;
  }
  if (name === "search") {
    return <svg {...common}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>;
  }
  return <svg {...common}><circle cx="12" cy="12" r="8"/></svg>;
}

function pageMeta(id: NavId) {
  const map: Record<NavId, { title: string; subtitle: string }> = {
    overview: { title: "Global mobility, thoughtfully orchestrated.", subtitle: "Unified international relations command center." },
    inbox: { title: "Unified inbox", subtitle: "Student, partner, visa, and workflow communication." },
    calendar: { title: "Calendar and events", subtitle: "Delegations, webinars, and deadlines in one timeline." },
    students: { title: "Outbound mobility register", subtitle: "Profiles, progress, and readiness checkpoints." },
    apps: { title: "Application pipeline", subtitle: "Board-level tracking from applied to enrolled." },
    opps: { title: "Opportunities explorer", subtitle: "Find best-fit programs across partner universities." },
    visa: { title: "Visa operations desk", subtitle: "Case progress, likelihood, and expiry watchlists." },
    docs: { title: "Document repository", subtitle: "AI-assisted compliance and verification operations." },
    partners: { title: "Partner universities and MoUs", subtitle: "Institutional collaboration lifecycle management." },
    events: { title: "Events and delegations", subtitle: "Plan outreach and inbound visit programs." },
    finance: { title: "Scholarships and funding", subtitle: "Awards, disbursement, and finance planning." },
    analytics: { title: "Internationalisation analytics", subtitle: "Accreditation-ready KPI and trend intelligence." },
    ai: { title: "Atlas AI counsellor", subtitle: "Decision support for mobility and operations teams." },
    kb: { title: "Knowledge base", subtitle: "Templates, guides, and learning paths." },
    settings: { title: "Atlas configuration", subtitle: "Security, roles, and institutional controls." }
  };

  return map[id];
}

function QuickKpis() {
  return (
    <div className="kpi-row">
      {APP_DATA.kpis.map((kpi) => (
        <div key={kpi.label} className="kpi">
          <div className="label">{kpi.label}</div>
          <div className="value"><em>{kpi.value}</em></div>
          <div className="delta"><span className="up">{kpi.change}</span></div>
        </div>
      ))}
    </div>
  );
}

function GenericScreen({ id }: { id: NavId }) {
  const meta = pageMeta(id);

  return (
    <div className="page fade-in">
      <div className="page-head">
        <div>
          <div className="mono" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--ink-mute)", marginBottom: 8 }}>
            Atlas Workspace
          </div>
          <h1>{meta.title.split(" ").slice(0, -1).join(" ")} <em>{meta.title.split(" ").slice(-1)}</em></h1>
          <div className="sub">{meta.subtitle}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-ghost">Export</button>
          <button className="btn-clay">Quick action</button>
        </div>
      </div>

      <QuickKpis />

      <div className="grid-2" style={{ marginTop: 22 }}>
        <div className="card">
          <div className="card-head">
            <h3>Live records</h3>
            <span className="chip clay">Updated now</span>
          </div>
          <div className="card-body tight">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Entity</th>
                  <th>ID</th>
                  <th>Status</th>
                  <th>Destination</th>
                </tr>
              </thead>
              <tbody>
                {APP_DATA.students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.name}</td>
                    <td className="mono">{student.id}</td>
                    <td><span className="chip sage">{student.stage}</span></td>
                    <td>{student.dest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <h3>Upcoming focus</h3>
            <span className="chip plum">This week</span>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {APP_DATA.events.map((event, index) => (
              <div key={event.title} style={{ padding: "14px 20px", borderBottom: index < APP_DATA.events.length - 1 ? "1px solid var(--line-soft)" : "none" }}>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{event.title}</div>
                <div className="mono" style={{ fontSize: 11, color: "var(--ink-mute)", marginTop: 4 }}>{event.date} · {event.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const PATH_TO_NAV: Array<{ match: RegExp; id: NavId }> = [
  { match: /^\/dashboard$/, id: "overview" },
  { match: /^\/inbox$/, id: "inbox" },
  { match: /^\/calendar$/, id: "calendar" },
  { match: /^\/students\/profile$/, id: "students" },
  { match: /^\/applications$/, id: "apps" },
  { match: /^\/opportunities$/, id: "opps" },
  { match: /^\/visa$/, id: "visa" },
  { match: /^\/documents$/, id: "docs" },
  { match: /^\/partnerships$/, id: "partners" },
  { match: /^\/events$/, id: "events" },
  { match: /^\/finance$/, id: "finance" },
  { match: /^\/analytics$/, id: "analytics" },
  { match: /^\/ai-automation$/, id: "ai" },
  { match: /^\/knowledge$/, id: "kb" },
  { match: /^\/settings$/, id: "settings" },
  { match: /^\/communication$/, id: "inbox" },
  { match: /^\/support$/, id: "inbox" },
  { match: /^\/discovery$/, id: "opps" },
  { match: /^\/institutional$/, id: "analytics" },
  { match: /^\/mobile-experience$/, id: "settings" }
];

function resolveNavId(pathname: string): NavId {
  const found = PATH_TO_NAV.find((item) => item.match.test(pathname));
  return found ? found.id : "overview";
}

function Sidebar({ activeId }: { activeId: NavId }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">A</div>
        <div>
          <div className="brand-name">Atlas</div>
          <div className="brand-tag">IR CRM</div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 0, overflowY: "auto", flex: 1 }}>
        {NAV.map((group) => (
          <div key={group.section}>
            <div className="nav-section">{group.section}</div>
            {group.items.map((item) => (
              <Link key={item.id} href={item.href} className={"nav-item" + (activeId === item.id ? " active" : "") }>
                <span className="nav-ico"><Ico name={item.icon} size={15} /></span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="sidebar-foot">
        <Link href="/settings" className={"nav-item" + (activeId === "settings" ? " active" : "")}>
          <span className="nav-ico"><Ico name="settings" size={15} /></span>
          <span>Settings</span>
        </Link>
        <div className="user-card" style={{ background: "oklch(1 0 0 / 0.04)", borderRadius: 8 }}>
          <div className="avatar">PM</div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ color: "var(--bg)", fontSize: 13, fontWeight: 500 }}>{APP_DATA.user.name}</div>
            <div className="mono" style={{ fontSize: 10, color: "oklch(0.7 0.02 320)", letterSpacing: "0.06em" }}>{APP_DATA.user.role}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function Topbar({ activeId }: { activeId: NavId }) {
  const crumbMap: Record<NavId, [string, string]> = {
    overview: ["Workspace", "Overview"],
    inbox: ["Workspace", "Inbox"],
    calendar: ["Workspace", "Calendar"],
    students: ["Mobility", "Students"],
    apps: ["Mobility", "Applications"],
    opps: ["Mobility", "Opportunities"],
    visa: ["Mobility", "Visa and Immigration"],
    docs: ["Operations", "Documents"],
    partners: ["Operations", "Partnerships"],
    events: ["Operations", "Events"],
    finance: ["Operations", "Scholarships"],
    analytics: ["Intelligence", "Analytics"],
    ai: ["Intelligence", "AI Counsellor"],
    kb: ["Intelligence", "Knowledge Base"],
    settings: ["Account", "Settings"]
  };

  const [root, leaf] = crumbMap[activeId];

  return (
    <header className="topbar">
      <div className="crumb">
        <span>{root}</span>
        <span style={{ opacity: 0.4 }}>/</span>
        <b>{leaf}</b>
      </div>
      <div className="search">
        <Ico name="search" size={14} />
        <input placeholder="Search students, universities, MoUs, visas..." />
        <kbd>CTRL K</kbd>
      </div>
      <button className="btn-ghost" style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px" }}>
        <Ico name="compass" size={13} /> New
      </button>
      <button className="icon-btn"><Ico name="mail" size={15} /></button>
      <div className="avatar sage" style={{ marginLeft: 4 }} title="Priya Menon">PM</div>
    </header>
  );
}

export function AtlasWorkspacePage() {
  const pathname = usePathname();
  const activeId = useMemo(() => resolveNavId(pathname), [pathname]);

  return (
    <div className="app-shell">
      <Sidebar activeId={activeId} />
      <main className="main-scroll" data-screen-label={activeId}>
        <Topbar activeId={activeId} />
        <GenericScreen id={activeId} />
      </main>
    </div>
  );
}

export function AtlasLoginPage() {
  return (
    <div className="login-shell">
      <div className="login-art">
        <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, background: "oklch(0.97 0.012 85)", color: "oklch(0.19 0.025 320)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Instrument Serif, serif", fontStyle: "italic", fontSize: 26, lineHeight: 1 }}>A</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 500 }}>Atlas</div>
            <div className="mono" style={{ fontSize: 10, opacity: 0.65, letterSpacing: "0.14em", textTransform: "uppercase" }}>International Relations CRM</div>
          </div>
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 480 }}>
          <div className="mono" style={{ fontSize: 11, opacity: 0.6, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14 }}>A unified workspace for</div>
          <h1 className="serif" style={{ fontSize: 52, lineHeight: 1.05, margin: 0, fontWeight: 400, color: "oklch(0.97 0.012 85)", letterSpacing: "-0.02em" }}>
            Global education, <em style={{ color: "oklch(0.78 0.14 55)" }}>thoughtfully orchestrated.</em>
          </h1>
          <p style={{ color: "oklch(0.78 0.02 320)", marginTop: 18, fontSize: 14, maxWidth: 440, lineHeight: 1.6 }}>
            Student mobility, partnerships, visas, MoUs, and internationalisation analytics in one institutional ecosystem.
          </p>
        </div>
      </div>

      <div className="login-form-side">
        <div className="login-card">
          <div className="mono" style={{ fontSize: 11, color: "var(--ink-mute)", letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 10 }}>
            Sign in institutional access
          </div>
          <h2 className="serif" style={{ fontSize: 36, margin: "0 0 6px", letterSpacing: "-0.02em", fontWeight: 400 }}>
            Welcome back, <em style={{ color: "var(--clay)" }}>Director</em>
          </h2>
          <p style={{ color: "var(--ink-mute)", margin: "0 0 28px", fontSize: 13.5 }}>
            Use your institutional credentials, or sign in via SSO.
          </p>
          <div className="field">
            <label htmlFor="email">Institutional Email</label>
            <input id="email" type="email" defaultValue="priya.menon@tagore.edu" />
          </div>
          <div className="field">
            <label htmlFor="pwd">Password</label>
            <input id="pwd" type="password" defaultValue="********" />
          </div>
          <Link href="/dashboard" className="btn-primary" style={{ width: "100%", textDecoration: "none" }}>
            Continue to Atlas
          </Link>
        </div>
      </div>
    </div>
  );
}
