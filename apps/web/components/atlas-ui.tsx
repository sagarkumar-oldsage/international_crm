"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

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
    name: "Dr. Swati",
    role: "IR Director",
    initials: "SW",
    institution: "Tagore Institute of Technology"
  },
  kpis: [
    { label: "Outbound students", value: 412, change: "+18%" },
    { label: "Incoming students", value: 289, change: "+24%" },
    { label: "Active MoUs", value: 67, change: "+5" },
    { label: "Visa approval rate", value: "94%", change: "+2pt" }
  ],
  pipeline: [
    { stage: "Applied", n: 124 },
    { stage: "Under review", n: 86 },
    { stage: "Interview", n: 41 },
    { stage: "Offer received", n: 58 },
    { stage: "Visa approved", n: 39 },
    { stage: "Enrolled", n: 27 }
  ],
  alerts: [
    { kind: "crit", title: "Visa interview tomorrow", sub: "Aanya Krishnan - German Consulate, Mumbai", when: "09:30 IST" },
    { kind: "warn", title: "I-20 expiring in 18 days", sub: "4 outbound students - USA workflow", when: "Due Jun 8" },
    { kind: "sage", title: "MoU renewal pending", sub: "Universitat de Barcelona - sign by Jun 15", when: "6 days" },
    { kind: "clay", title: "New partner inquiry", sub: "Trinity College Dublin - joint PhD program", when: "Today" }
  ],
  students: [
    { id: "STU-4012", name: "Aanya Krishnan", program: "M.Sc. Data Science", stage: "Visa approved", dest: "TU Munchen, DE", docs: 0.92 },
    { id: "STU-3987", name: "Rohan Mehta", program: "B.Eng Exchange", stage: "Offer received", dest: "Toronto, CA", docs: 0.78 },
    { id: "STU-3940", name: "Saanvi Iyer", program: "MBA Dual Degree", stage: "Interview", dest: "ESSEC, FR", docs: 0.85 },
    { id: "STU-3902", name: "Kabir Sharma", program: "Research Fellowship", stage: "Under review", dest: "Kyoto, JP", docs: 0.66 }
  ],
  partners: [
    { name: "Technical University of Munich", country: "Germany", mou: "MoU-DE-014", status: "Active", students: 23 },
    { name: "University of Toronto", country: "Canada", mou: "MoU-CA-008", status: "Active", students: 17 },
    { name: "ESSEC Business School", country: "France", mou: "MoU-FR-003", status: "Renewal", students: 11 },
    { name: "National University of Singapore", country: "Singapore", mou: "MoU-SG-001", status: "Active", students: 26 }
  ],
  documents: [
    { name: "Passport.pdf", owner: "Aanya Krishnan", type: "Passport", expires: "2031-04-12", status: "Verified" },
    { name: "IELTS-Scorecard.pdf", owner: "Aanya Krishnan", type: "Test Score", expires: "2027-01-22", status: "Verified" },
    { name: "Bank-Statement-May.pdf", owner: "Rohan Mehta", type: "Financial", expires: "2026-08-01", status: "Pending" },
    { name: "Insurance-Policy.pdf", owner: "Kabir Sharma", type: "Insurance", expires: "2026-06-30", status: "Expiring" }
  ],
  visaQueue: [
    { student: "Aanya Krishnan", country: "Germany", stage: "Interview", date: "2026-05-22", prob: 96 },
    { student: "Rohan Mehta", country: "Canada", stage: "Biometrics", date: "2026-05-25", prob: 88 },
    { student: "Saanvi Iyer", country: "France", stage: "Filed", date: "2026-05-28", prob: 91 },
    { student: "Aarav Nair", country: "Switzerland", stage: "Approved", date: "2026-05-15", prob: 100 }
  ],
  scholarships: [
    { name: "Erasmus+ Mobility Grant", country: "EU", amt: "EUR 850/mo", open: 41, awarded: 12 },
    { name: "DAAD WISE", country: "Germany", amt: "EUR 1100/mo", open: 18, awarded: 6 },
    { name: "Commonwealth Scholarship", country: "UK", amt: "Full", open: 22, awarded: 3 },
    { name: "MEXT Research", country: "Japan", amt: "JPY 143k/mo", open: 9, awarded: 2 }
  ],
  events: [
    { date: "JUN 04", title: "Global Education Fair", tag: "Outreach", loc: "Main Auditorium" },
    { date: "JUN 12", title: "TU Munchen Delegation", tag: "Delegation", loc: "IR Conference Room" },
    { date: "JUN 18", title: "Erasmus Information Session", tag: "Webinar", loc: "Zoom" },
    { date: "JUN 25", title: "Cultural Onboarding", tag: "Support", loc: "Block C Hall 2" }
  ],
  inbox: [
    { from: "Visa Cell", subject: "Interview slot moved for STU-4012", when: "12m" },
    { from: "Finance Desk", subject: "DAAD shortlist received", when: "31m" },
    { from: "Partner Team", subject: "MoU draft shared by Trinity", when: "1h" },
    { from: "Events", subject: "Speaker confirmation pending", when: "2h" }
  ],
  knowledge: [
    { title: "Visa filing checklist by destination", type: "Playbook", owner: "Visa Cell" },
    { title: "Pre-departure orientation runbook", type: "Runbook", owner: "Student Support" },
    { title: "Partner outreach email templates", type: "Template", owner: "Partnerships" },
    { title: "Scholarship counselling SOP", type: "Policy", owner: "Finance" }
  ],
  aiRecommendations: [
    { title: "Escalate 4 profiles for visa prep", priority: "High", reason: "Interview windows within 5 days" },
    { title: "Trigger reminder campaign", priority: "Medium", reason: "11 students missing financial documents" },
    { title: "Bundle DAAD candidates", priority: "Low", reason: "High profile match confidence" }
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

function HeaderBlock({ kicker, title, accent, subtitle, actions }: {
  kicker: string;
  title: string;
  accent: string;
  subtitle: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="page-head">
      <div>
        <div className="mono" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--ink-mute)", marginBottom: 8 }}>
          {kicker}
        </div>
        <h1>{title} <em>{accent}</em></h1>
        <div className="sub">{subtitle}</div>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        {actions}
      </div>
    </div>
  );
}

function KpiRow() {
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

function GlobalMobilityMap() {
  const hubs = [
    { label: "Germany", x: 53, y: 33 },
    { label: "Canada", x: 28, y: 28 },
    { label: "France", x: 50, y: 36 },
    { label: "Japan", x: 78, y: 38 },
    { label: "Singapore", x: 73, y: 56 }
  ];

  return (
    <div className="world-card stripes" style={{ border: "1px solid var(--line-soft)", borderRadius: 8, padding: 10, position: "relative" }}>
      <svg viewBox="0 0 900 420" style={{ width: "100%", height: "100%", display: "block" }} aria-label="Global mobility map">
        <rect x="0" y="0" width="900" height="420" fill="oklch(0.985 0.006 85)" />
        <path d="M74 120l38-32 74-20 76 18 38 42-14 30-58 12-36 30-86-10-44-38z" fill="oklch(0.88 0.02 72)" />
        <path d="M285 88l84-20 116 8 84 26 16 26-42 22-92 16-84-8-74-32z" fill="oklch(0.86 0.018 70)" />
        <path d="M492 162l66 8 80 30 90 4 78 26-10 26-76 14-98-6-84-26-54-46z" fill="oklch(0.84 0.016 68)" />
        <path d="M670 274l52 14 46 34-10 26-54 14-62-18-16-34z" fill="oklch(0.83 0.018 66)" />
        {hubs.map((hub) => (
          <g key={hub.label}>
            <circle cx={hub.x * 9} cy={hub.y * 4.2} r="7" fill="var(--clay)" />
            <circle cx={hub.x * 9} cy={hub.y * 4.2} r="16" fill="none" stroke="oklch(0.66 0.155 42 / 0.35)" strokeWidth="2" />
            <text x={hub.x * 9 + 12} y={hub.y * 4.2 + 4} fontSize="12" fill="var(--ink-soft)" fontFamily="var(--font-mono), monospace">{hub.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function OverviewScreen() {
  return (
    <div className="page fade-in">
      <HeaderBlock
        kicker={`Thursday, 21 May 2026 - ${APP_DATA.user.institution}`}
        title="Good morning,"
        accent="Swati."
        subtitle="Here's what's happening across global mobility today."
        actions={
          <>
            <button className="btn-ghost">Export</button>
            <button className="btn-clay">Quick action</button>
          </>
        }
      />
      <KpiRow />
      <div className="grid-2" style={{ marginTop: 22 }}>
        <div className="card">
          <div className="card-head">
            <h3>Global mobility map</h3>
            <span className="chip">Outbound</span>
          </div>
          <div className="card-body">
            <GlobalMobilityMap />
          </div>
        </div>
        <div className="card">
          <div className="card-head">
            <h3>Today's priorities</h3>
            <span className="chip clay">4 urgent</span>
          </div>
          <div className="card-body" style={{ padding: 0 }}>
            {APP_DATA.alerts.map((alert, index) => (
              <div key={alert.title} style={{ padding: "14px 20px", borderBottom: index < APP_DATA.alerts.length - 1 ? "1px solid var(--line-soft)" : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 500 }}>{alert.title}</div>
                    <div style={{ fontSize: 12, color: "var(--ink-mute)" }}>{alert.sub}</div>
                  </div>
                  <span className="mono" style={{ fontSize: 11, color: "var(--ink-mute)" }}>{alert.when}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentsScreen() {
  const [filter, setFilter] = useState<"all" | "visa" | "attention">("all");
  const selected = APP_DATA.students[0];
  const filteredStudents = APP_DATA.students.filter((student) => {
    if (filter === "all") return true;
    if (filter === "visa") return student.stage.toLowerCase().includes("visa") || student.stage === "Interview";
    return student.docs < 0.8 || student.stage === "Under review";
  });

  return (
    <div className="page fade-in">
      <HeaderBlock
        kicker="Mobility - Students"
        title="Outbound"
        accent="mobility"
        subtitle="412 active students across 6 program types."
        actions={<button className="btn-primary">Add student</button>}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
        <div className="tabs">
          <button className={`tab ${filter === "all" ? "on" : ""}`} onClick={() => setFilter("all")}>All 412</button>
          <button className={`tab ${filter === "visa" ? "on" : ""}`} onClick={() => setFilter("visa")}>In visa 41</button>
          <button className={`tab ${filter === "attention" ? "on" : ""}`} onClick={() => setFilter("attention")}>Needs attention 17</button>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button className="btn-ghost">Filter</button>
          <button className="btn-ghost">Export</button>
        </div>
      </div>
      <div className="grid-2" style={{ gridTemplateColumns: "1.4fr 1fr" }}>
        <div className="card">
          <div className="card-body tight">
            <table className="tbl">
              <thead><tr><th>Student</th><th>Program</th><th>Destination</th><th>Stage</th><th style={{ textAlign: "right" }}>Docs</th></tr></thead>
              <tbody>
                {filteredStudents.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div className="avatar plum" style={{ width: 28, height: 28, fontSize: 11 }}>{s.name.split(" ").map((part) => part[0]).join("")}</div>
                        <div>
                          <div style={{ fontWeight: 500 }}>{s.name}</div>
                          <div className="mono" style={{ fontSize: 10, color: "var(--ink-mute)" }}>{s.id}</div>
                        </div>
                      </div>
                    </td>
                    <td>{s.program}</td>
                    <td>{s.dest}</td>
                    <td><span className="chip clay">{s.stage}</span></td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 58 }} className="bar clay"><i style={{ width: `${Math.round(s.docs * 100)}%` }} /></div>
                        <span className="mono" style={{ fontSize: 11, color: "var(--ink-mute)" }}>{Math.round(s.docs * 100)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <div className="card-head"><h3>Student profile</h3><span className="chip sage">Live</span></div>
          <div className="card-body">
            <div className="mono" style={{ fontSize: 11, color: "var(--ink-mute)" }}>{selected.id}</div>
            <h3 style={{ margin: "8px 0 4px" }}>{selected.name}</h3>
            <div style={{ color: "var(--ink-mute)", marginBottom: 12 }}>{selected.program}</div>
            <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
              <span className="chip">{selected.dest}</span>
              <span className="chip sage">Visa ready</span>
            </div>
            <div className="bar clay"><i style={{ width: `${Math.round(selected.docs * 100)}%` }} /></div>
            <div className="mono" style={{ marginTop: 8, fontSize: 11, color: "var(--ink-mute)" }}>Document readiness {Math.round(selected.docs * 100)}%</div>
            <div className="timeline" style={{ marginTop: 18 }}>
              <div className="tl-item done"><div className="when">Jan 12</div><div className="what">Applied</div></div>
              <div className="tl-item done"><div className="when">Mar 18</div><div className="what">Interview</div></div>
              <div className="tl-item cur"><div className="when">May 14</div><div className="what">Visa approved</div></div>
              <div className="tl-item idle"><div className="when">Jul 28</div><div className="what">Pre-departure</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApplicationsScreen() {
  return (
    <div className="page fade-in">
      <HeaderBlock
        kicker="Mobility - Application Pipeline"
        title="Application"
        accent="pipeline"
        subtitle="Board-level tracking from applied to enrolled."
        actions={<button className="btn-primary">New application</button>}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(180px, 1fr))", gap: 12, overflowX: "auto" }}>
        {APP_DATA.pipeline.map((stage) => (
          <div key={stage.stage} className="card">
            <div className="card-head" style={{ flexDirection: "column", alignItems: "flex-start", gap: 4 }}>
              <div className="mono" style={{ fontSize: 10, textTransform: "uppercase", color: "var(--ink-mute)" }}>{stage.stage}</div>
              <div className="serif" style={{ fontSize: 34 }}>{stage.n}</div>
            </div>
            <div className="card-body" style={{ padding: 12 }}>
              <div className="mono" style={{ fontSize: 11, color: "var(--ink-mute)" }}>Drag-and-drop stage board</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OpportunitiesScreen() {
  return (
    <div className="page fade-in">
      <HeaderBlock kicker="Mobility - Opportunities" title="Opportunities" accent="explorer" subtitle="Discover best-fit programs across partner universities." />
      <div className="grid-2" style={{ gridTemplateColumns: "1.2fr 1fr" }}>
        <div className="card">
          <div className="card-head"><h3>Destination hotspots</h3></div>
          <div className="card-body">
            <div className="bars-mini">{[78, 64, 52, 47, 38, 29, 21].map((n, i) => <i key={n} className={i % 2 ? "alt" : ""} style={{ height: `${Math.max(12, Math.round(n * 0.8))}px` }} />)}</div>
          </div>
        </div>
        <div className="card">
          <div className="card-head"><h3>Suggested shortlist</h3></div>
          <div className="card-body" style={{ padding: 0 }}>
            {APP_DATA.partners.slice(0, 4).map((p, i) => (
              <div key={p.name} style={{ padding: "12px 16px", borderBottom: i < 3 ? "1px solid var(--line-soft)" : "none" }}>
                <div style={{ fontWeight: 500 }}>{p.name}</div>
                <div className="mono" style={{ fontSize: 11, color: "var(--ink-mute)" }}>{p.country} - {p.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VisaScreen() {
  return (
    <div className="page fade-in">
      <HeaderBlock kicker="Mobility - Visa" title="Visa" accent="operations" subtitle="Case progress, interview windows, and approval confidence." />
      <div className="card">
        <div className="card-body tight">
          <table className="tbl">
            <thead><tr><th>Student</th><th>Country</th><th>Stage</th><th>Date</th><th>Probability</th></tr></thead>
            <tbody>
              {APP_DATA.visaQueue.map((v) => (
                <tr key={`${v.student}-${v.country}`}><td>{v.student}</td><td>{v.country}</td><td>{v.stage}</td><td>{v.date}</td><td>{v.prob}%</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DocumentsScreen() {
  return (
    <div className="page fade-in">
      <HeaderBlock kicker="Operations - Document Vault" title="Document" accent="repository" subtitle="OCR-indexed files with verification and expiry tracking." actions={<button className="btn-primary">Upload</button>} />
      <div className="kpi-row" style={{ marginBottom: 22 }}>
        <div className="kpi"><div className="label">Total documents</div><div className="value"><em>2840</em></div><div className="delta">OCR indexed</div></div>
        <div className="kpi"><div className="label">Verified</div><div className="value"><em>94%</em></div><div className="delta">AI checks</div></div>
        <div className="kpi"><div className="label">Expiring in 30d</div><div className="value"><em>12</em></div><div className="delta">4 critical</div></div>
        <div className="kpi"><div className="label">Missing docs</div><div className="value"><em>38</em></div><div className="delta">14 applicants</div></div>
      </div>
      <div className="grid-2" style={{ gridTemplateColumns: "1.4fr 1fr" }}>
        <div className="card">
          <div className="card-body tight">
            <table className="tbl">
              <thead><tr><th>Document</th><th>Owner</th><th>Type</th><th>Expires</th><th>Status</th></tr></thead>
              <tbody>
                {APP_DATA.documents.map((d) => (
                  <tr key={d.name}><td>{d.name}</td><td>{d.owner}</td><td><span className="chip">{d.type}</span></td><td>{d.expires}</td><td><span className={`chip ${d.status === "Verified" ? "sage" : d.status === "Pending" ? "warn" : "crit"}`}>{d.status}</span></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <div className="card-head"><h3>Smart inspections</h3><span className="chip">Hourly</span></div>
          <div className="card-body" style={{ padding: 0 }}>
            <div className="row-card"><div className="avatar clay">!</div><div><div style={{ fontWeight: 500 }}>Bank statement low confidence</div><div style={{ fontSize: 12, color: "var(--ink-mute)" }}>Rohan Mehta - stamp not clear</div></div><span className="chip warn">Review</span></div>
            <div className="row-card"><div className="avatar sage">OK</div><div><div style={{ fontWeight: 500 }}>Visa packet complete</div><div style={{ fontSize: 12, color: "var(--ink-mute)" }}>Aanya Krishnan - 14/14 docs</div></div><span className="chip sage">Verified</span></div>
            <div className="row-card"><div className="avatar plum">AI</div><div><div style={{ fontWeight: 500 }}>SOP style mismatch detected</div><div style={{ fontSize: 12, color: "var(--ink-mute)" }}>Needs Campus France format</div></div><span className="chip plum">Flagged</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PartnersScreen() {
  const [view, setView] = useState<"cards" | "table">("cards");

  return (
    <div className="page fade-in">
      <HeaderBlock
        kicker="Operations - Partnerships"
        title="Partner"
        accent="universities"
        subtitle="Track MoUs, renewals, and student throughput by institution."
        actions={
          <div className="seg">
            <button className={view === "cards" ? "on" : ""} onClick={() => setView("cards")}>Cards</button>
            <button className={view === "table" ? "on" : ""} onClick={() => setView("table")}>Table</button>
          </div>
        }
      />
      <div className="grid-2" style={{ marginBottom: 22 }}>
        <div className="card">
          <div className="card-head"><h3>Partnership types</h3><span className="mono" style={{ fontSize: 11, color: "var(--ink-mute)" }}>67 active</span></div>
          <div className="card-body">
            <div style={{ display: "grid", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Student exchange</span><span className="mono">24</span></div>
              <div className="bar clay"><i style={{ width: "72%" }} /></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Research collaboration</span><span className="mono">16</span></div>
              <div className="bar sage"><i style={{ width: "48%" }} /></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Dual degree</span><span className="mono">12</span></div>
              <div className="bar plum"><i style={{ width: "38%" }} /></div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-head"><h3>MoU lifecycle</h3><span className="chip warn">6 due in 90d</span></div>
          <div className="card-body" style={{ padding: 0 }}>
            <div className="row-card"><div className="avatar ink">D</div><div><div style={{ fontWeight: 500 }}>In drafting</div><div style={{ fontSize: 12, color: "var(--ink-mute)" }}>3 institutions</div></div><span className="serif" style={{ fontSize: 24 }}>3</span></div>
            <div className="row-card"><div className="avatar clay">S</div><div><div style={{ fontWeight: 500 }}>Awaiting signature</div><div style={{ fontSize: 12, color: "var(--ink-mute)" }}>4 institutions</div></div><span className="serif" style={{ fontSize: 24 }}>4</span></div>
            <div className="row-card"><div className="avatar sage">A</div><div><div style={{ fontWeight: 500 }}>Active</div><div style={{ fontSize: 12, color: "var(--ink-mute)" }}>67 institutions</div></div><span className="serif" style={{ fontSize: 24 }}>67</span></div>
          </div>
        </div>
      </div>
      {view === "cards" ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 18 }}>
          {APP_DATA.partners.map((p) => (
            <div key={p.mou} className="card">
              <div className="card-body">
                <div style={{ display: "flex", alignItems: "start", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    <div className="serif" style={{ fontSize: 22 }}>{p.name}</div>
                    <div className="mono" style={{ fontSize: 11, color: "var(--ink-mute)", marginTop: 3 }}>{p.country}</div>
                  </div>
                  <span className={`chip ${p.status === "Active" ? "sage" : "warn"}`}>{p.status}</span>
                </div>
                <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                  <div><div className="mono" style={{ fontSize: 10, color: "var(--ink-mute)" }}>MoU</div><div className="mono" style={{ fontSize: 12 }}>{p.mou}</div></div>
                  <div><div className="mono" style={{ fontSize: 10, color: "var(--ink-mute)" }}>Students</div><div style={{ fontWeight: 500 }}>{p.students}</div></div>
                  <div><div className="mono" style={{ fontSize: 10, color: "var(--ink-mute)" }}>Flow</div><div style={{ fontWeight: 500 }}>Bidirectional</div></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="card-body tight">
            <table className="tbl">
              <thead><tr><th>Institution</th><th>Country</th><th>MoU</th><th>Status</th><th>Students</th></tr></thead>
              <tbody>
                {APP_DATA.partners.map((p) => (
                  <tr key={p.mou}><td>{p.name}</td><td>{p.country}</td><td className="mono">{p.mou}</td><td><span className={`chip ${p.status === "Active" ? "sage" : "warn"}`}>{p.status}</span></td><td>{p.students}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function CalendarGrid() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const eventMap: Record<number, { title: string; tone: string }> = {
    4: { title: "Global Education Fair", tone: "clay" },
    12: { title: "TUM Delegation", tone: "plum" },
    18: { title: "Erasmus Session", tone: "sage" },
    25: { title: "Cultural Onboarding", tone: "clay" }
  };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", borderTop: "1px solid var(--line-soft)", borderLeft: "1px solid var(--line-soft)" }}>
      {days.map((day) => (
        <div key={day} style={{ minHeight: 86, padding: 8, borderRight: "1px solid var(--line-soft)", borderBottom: "1px solid var(--line-soft)", background: day === 12 ? "var(--clay-tint)" : "transparent" }}>
          <div className="mono" style={{ fontSize: 10, color: "var(--ink-mute)" }}>{day.toString().padStart(2, "0")}</div>
          {eventMap[day] ? <div className={`chip ${eventMap[day].tone}`} style={{ marginTop: 6, fontSize: 9 }}>{eventMap[day].title}</div> : null}
        </div>
      ))}
    </div>
  );
}

function EventsScreen() {
  return (
    <div className="page fade-in">
      <HeaderBlock kicker="Operations - Events" title="Events and" accent="delegations" subtitle="Plan and run outreach, webinars, and inbound visit programs." actions={<><div className="seg"><button>Day</button><button>Week</button><button className="on">Month</button></div><button className="btn-primary">Create event</button></>} />
      <div className="grid-2" style={{ gridTemplateColumns: "2fr 1fr" }}>
        <div className="card">
          <div className="card-head"><h3>June 2026 calendar</h3><span className="mono" style={{ fontSize: 11, color: "var(--ink-mute)" }}>Asia/Kolkata</span></div>
          <div className="card-body" style={{ padding: 0 }}>
            <CalendarGrid />
          </div>
        </div>
        <div className="card">
          <div className="card-head"><h3>Upcoming agenda</h3><span className="chip">This month</span></div>
          <div className="card-body" style={{ padding: 0 }}>
            {APP_DATA.events.map((event, index) => (
              <div key={event.title} className="row-card" style={{ borderBottom: index < APP_DATA.events.length - 1 ? "1px solid var(--line-soft)" : "none" }}>
                <div className="avatar sage">{event.date.split(" ")[1]}</div>
                <div>
                  <div style={{ fontWeight: 500 }}>{event.title}</div>
                  <div style={{ color: "var(--ink-mute)", fontSize: 12 }}>{event.loc}</div>
                </div>
                <span className="chip plum">{event.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScholarshipsScreen() {
  return (
    <div className="page fade-in">
      <HeaderBlock kicker="Operations - Scholarships" title="Scholarship" accent="programs" subtitle="Open opportunities, awards, and conversion rates." />
      <div className="kpi-row" style={{ marginBottom: 22 }}>
        <div className="kpi"><div className="label">Open calls</div><div className="value"><em>90</em></div><div className="delta">Across regions</div></div>
        <div className="kpi"><div className="label">Awarded</div><div className="value"><em>23</em></div><div className="delta">Current cycle</div></div>
        <div className="kpi"><div className="label">Conversion</div><div className="value"><em>26%</em></div><div className="delta">Applicant to award</div></div>
        <div className="kpi"><div className="label">Flagged</div><div className="value"><em>7</em></div><div className="delta">Needs counselling</div></div>
      </div>
      <div className="card">
        <div className="card-body tight">
          <table className="tbl">
            <thead><tr><th>Program</th><th>Country</th><th>Amount</th><th>Open</th><th>Awarded</th></tr></thead>
            <tbody>
              {APP_DATA.scholarships.map((s) => (
                <tr key={s.name}><td>{s.name}</td><td>{s.country}</td><td>{s.amt}</td><td>{s.open}</td><td>{s.awarded}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AnalyticsScreen() {
  return (
    <div className="page fade-in">
      <HeaderBlock kicker="Intelligence - Analytics" title="Internationalisation" accent="analytics" subtitle="Accreditation-ready trends across mobility, partnerships, and outcomes." actions={<button className="btn-ghost">Export report</button>} />
      <KpiRow />
      <div className="grid-2" style={{ marginTop: 22 }}>
        <div className="card">
          <div className="card-head"><h3>Mobility trends</h3><div style={{ display: "flex", gap: 10 }} className="mono"><span><span className="dot" style={{ background: "var(--clay)" }} /> Outbound</span><span><span className="dot" style={{ background: "var(--sage)" }} /> Incoming</span></div></div>
          <div className="card-body"><SimpleLineChart /></div>
        </div>
        <div className="card">
          <div className="card-head"><h3>Country distribution</h3><span className="chip">Outbound 412</span></div>
          <div className="card-body">
            {APP_DATA.partners.map((p) => (
              <div key={p.name} className="country-row"><span className="mono">{p.country.slice(0, 2).toUpperCase()}</span><span>{p.name}</span><span>{p.students}</span><span className="chip">{p.status}</span></div>
            ))}
          </div>
        </div>
      </div>
      <div className="card" style={{ marginTop: 22 }}>
        <div className="card-head"><h3>Accreditation packs</h3><span className="chip sage">2 ready</span></div>
        <div className="card-body" style={{ padding: 0 }}>
          <div className="row-card"><div className="avatar sage">N</div><div><div style={{ fontWeight: 500 }}>NAAC Criterion 7.2</div><div style={{ fontSize: 12, color: "var(--ink-mute)" }}>Updated May 18</div></div><span className="chip sage">Ready</span></div>
          <div className="row-card"><div className="avatar plum">Q</div><div><div style={{ fontWeight: 500 }}>QS International outlook</div><div style={{ fontSize: 12, color: "var(--ink-mute)" }}>Updated May 15</div></div><span className="chip sage">Ready</span></div>
          <div className="row-card"><div className="avatar clay">T</div><div><div style={{ fontWeight: 500 }}>THE International outlook</div><div style={{ fontSize: 12, color: "var(--ink-mute)" }}>Due Jun 30</div></div><span className="chip warn">Pending</span></div>
        </div>
      </div>
    </div>
  );
}

function SimpleLineChart() {
  const outbound = [180, 210, 232, 258, 290, 330, 372, 412];
  const incoming = [110, 135, 142, 168, 195, 220, 252, 289];
  const max = 420;
  const w = 520;
  const h = 220;
  const points = (data: number[]) => data.map((value, index) => {
    const x = 16 + (index / (data.length - 1)) * (w - 32);
    const y = h - 16 - (value / max) * (h - 36);
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: 230 }}>
      <polyline points={points(outbound)} fill="none" stroke="var(--clay)" strokeWidth="2.5" />
      <polyline points={points(incoming)} fill="none" stroke="var(--sage)" strokeWidth="2.5" />
    </svg>
  );
}

function AIScreen() {
  return (
    <div className="page fade-in">
      <HeaderBlock kicker="Intelligence - AI Counsellor" title="Atlas PU" accent="AI" subtitle="Recommendation and automation assistance for IR teams." actions={<button className="btn-primary">Run model</button>} />
      <div className="grid-2" style={{ gridTemplateColumns: "1.5fr 1fr" }}>
        <div className="card">
          <div className="card-head"><h3>Assistant conversation</h3><span className="chip plum">Beta</span></div>
          <div className="card-body">
            <div style={{ display: "grid", gap: 14 }}>
              <div style={{ justifySelf: "end", maxWidth: "78%", background: "var(--clay)", color: "white", borderRadius: "12px 12px 4px 12px", padding: "10px 12px" }}>Which students have highest visa risk this month?</div>
              <div style={{ maxWidth: "85%" }}>
                <div className="mono" style={{ fontSize: 10, color: "var(--ink-mute)", marginBottom: 6 }}>ATLAS PU</div>
                <div style={{ background: "var(--bg-tint)", border: "1px solid var(--line-soft)", borderRadius: 10, padding: "12px 14px" }}>
                  3 students need urgent attention before May 30. Rohan Mehta has financial documents pending; Meera Pillai has interview prep gaps; Vikram Reddy is missing nomination paperwork.
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                  <button className="btn-ghost" style={{ padding: "6px 10px", fontSize: 12 }}>Draft outreach</button>
                  <button className="btn-ghost" style={{ padding: "6px 10px", fontSize: 12 }}>Add watchlist</button>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              <input placeholder="Ask Atlas PU anything..." style={{ flex: 1, border: "1px solid var(--line)", borderRadius: 8, padding: "10px 12px", background: "var(--surface)" }} />
              <button className="btn-primary">Send</button>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-head"><h3>Recommendations</h3></div>
          <div className="card-body" style={{ padding: 0 }}>
            {APP_DATA.aiRecommendations.map((r, i) => (
              <div key={r.title} className="row-card" style={{ borderBottom: i < APP_DATA.aiRecommendations.length - 1 ? "1px solid var(--line-soft)" : "none" }}>
                <div className="avatar ink">AI</div>
                <div>
                  <div style={{ fontWeight: 500 }}>{r.title}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-mute)" }}>{r.reason}</div>
                </div>
                <span className={`chip ${r.priority === "High" ? "crit" : r.priority === "Medium" ? "warn" : "sage"}`}>{r.priority}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function KnowledgeScreen() {
  return (
    <div className="page fade-in">
      <HeaderBlock kicker="Intelligence - Knowledge Base" title="Knowledge" accent="hub" subtitle="Runbooks, templates, and institutional playbooks." />
      <div className="card">
        <div className="card-body" style={{ padding: 0 }}>
          {APP_DATA.knowledge.map((k, i) => (
            <div key={k.title} className="row-card" style={{ borderBottom: i < APP_DATA.knowledge.length - 1 ? "1px solid var(--line-soft)" : "none" }}>
              <div className="avatar ink">KB</div>
              <div>
                <div style={{ fontWeight: 500 }}>{k.title}</div>
                <div style={{ fontSize: 12, color: "var(--ink-mute)" }}>{k.owner}</div>
              </div>
              <span className="chip">{k.type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InboxScreen() {
  return (
    <div className="page fade-in">
      <HeaderBlock kicker="Workspace - Inbox" title="Unified" accent="inbox" subtitle="Student, partner, visa, and operations communications." />
      <div className="card">
        <div className="card-body" style={{ padding: 0 }}>
          {APP_DATA.inbox.map((m, i) => (
            <div key={m.subject} className="row-card" style={{ borderBottom: i < APP_DATA.inbox.length - 1 ? "1px solid var(--line-soft)" : "none" }}>
              <div className="avatar sage">{m.from.slice(0, 2).toUpperCase()}</div>
              <div>
                <div style={{ fontWeight: 500 }}>{m.subject}</div>
                <div style={{ color: "var(--ink-mute)", fontSize: 12 }}>{m.from}</div>
              </div>
              <span className="mono" style={{ fontSize: 11, color: "var(--ink-mute)" }}>{m.when}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CalendarScreen() {
  return (
    <div className="page fade-in">
      <HeaderBlock kicker="Workspace - Calendar" title="Calendar" accent="timeline" subtitle="Delegations, webinars, and deadlines in one place." actions={<div className="seg"><button>Day</button><button>Week</button><button className="on">Month</button></div>} />
      <div className="card">
        <div className="card-head"><h3>June 2026</h3><span className="mono" style={{ fontSize: 11, color: "var(--ink-mute)" }}>Asia/Kolkata</span></div>
        <div className="card-body" style={{ padding: 0 }}>
          <CalendarGrid />
        </div>
      </div>
      <div className="card" style={{ marginTop: 22 }}>
        <div className="card-head"><h3>Timeline</h3></div>
        <div className="card-body">
          <div className="timeline">
            {APP_DATA.events.map((event, i) => (
              <div key={event.title} className={`tl-item ${i === 0 ? "cur" : i === 1 ? "done" : "idle"}`}>
                <div className="what">{event.date} - {event.title}</div>
                <div className="when">{event.tag} - {event.loc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsScreen() {
  return (
    <div className="page fade-in">
      <HeaderBlock kicker="Workspace - Settings" title="Atlas PU" accent="configuration" subtitle="Security, notifications, and institutional preferences." />
      <div className="grid-2" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div className="card">
          <div className="card-head"><h3>Profile</h3></div>
          <div className="card-body">
            <div className="field"><label>Name</label><input defaultValue={APP_DATA.user.name} /></div>
            <div className="field"><label>Role</label><input defaultValue={APP_DATA.user.role} /></div>
            <div className="field"><label>Institution</label><input defaultValue={APP_DATA.user.institution} /></div>
          </div>
        </div>
        <div className="card">
          <div className="card-head"><h3>Preferences</h3></div>
          <div className="card-body">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}><span>Email digests</span><span className="chip ok">Enabled</span></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}><span>Risk alerts</span><span className="chip ok">Enabled</span></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>MFA</span><span className="chip clay">Required</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderScreen(id: NavId) {
  if (id === "overview") return <OverviewScreen />;
  if (id === "students") return <StudentsScreen />;
  if (id === "apps") return <ApplicationsScreen />;
  if (id === "opps") return <OpportunitiesScreen />;
  if (id === "visa") return <VisaScreen />;
  if (id === "docs") return <DocumentsScreen />;
  if (id === "partners") return <PartnersScreen />;
  if (id === "events") return <EventsScreen />;
  if (id === "finance") return <ScholarshipsScreen />;
  if (id === "analytics") return <AnalyticsScreen />;
  if (id === "ai") return <AIScreen />;
  if (id === "kb") return <KnowledgeScreen />;
  if (id === "calendar") return <CalendarScreen />;
  if (id === "settings") return <SettingsScreen />;
  return <InboxScreen />;
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
          <div className="brand-name">Atlas PU</div>
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
          <div className="avatar">{APP_DATA.user.initials}</div>
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
      <div className="avatar sage" style={{ marginLeft: 4 }} title="Dr. Swati">{APP_DATA.user.initials}</div>
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
        {renderScreen(activeId)}
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
            <div style={{ fontSize: 16, fontWeight: 500 }}>Atlas PU</div>
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
            <input id="email" type="email" defaultValue="dr.swati@tagore.edu" />
          </div>
          <div className="field">
            <label htmlFor="pwd">Password</label>
            <input id="pwd" type="password" defaultValue="********" />
          </div>
          <Link href="/dashboard" className="btn-primary" style={{ width: "100%", textDecoration: "none" }}>
            Continue to Atlas PU
          </Link>
        </div>
      </div>
    </div>
  );
}
