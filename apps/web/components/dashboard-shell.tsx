"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const kpis = [
  { label: "Active Mobility Cases", value: "248" },
  { label: "Visa Approvals", value: "91.2%" },
  { label: "Partner Universities", value: "76" },
  { label: "Pending Documents", value: "39" },
  { label: "Open Support Tickets", value: "18" }
];

const mvpModules = [
  "Student Portal",
  "Application Tracking",
  "Document Management",
  "Visa Tracking",
  "Event Management",
  "International Student Support",
  "Finance and Scholarship",
  "AI and Automation",
  "Knowledge Base and Learning",
  "Mobile Student Experience",
  "University Discovery Engine",
  "Institutional Internationalisation",
  "Communication System",
  "Analytics Dashboard",
  "Partner University Database",
  "Role-Based Access"
];

export function DashboardShell() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-400 text-white">
      <div className="ambient-orb ambient-orb-a" />
      <div className="ambient-orb ambient-orb-b" />

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-12 md:px-10 md:py-16">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-4"
        >
          <p className="inline-block rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs tracking-[0.14em] text-white/90 uppercase">
            Integrated Operations Dashboard
          </p>
          <h1 className="max-w-4xl text-3xl font-semibold leading-tight md:text-5xl">
            International CRM Control Center
          </h1>
          <p className="max-w-3xl text-sm text-white/75 md:text-base">
            All currently built modules are connected here for day-to-day operations and sprint validation.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/" className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
              One-Page Website
            </Link>
            <Link href="/login" className="rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
              Login
            </Link>
          </div>
        </motion.header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {kpis.map((kpi, index) => (
            <motion.article
              key={kpi.label}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm shadow-soft"
            >
              <p className="text-xs text-white/70">{kpi.label}</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight">{kpi.value}</p>
            </motion.article>
          ))}
        </section>

        <section className="grid gap-5 rounded-3xl border border-white/15 bg-gradient-to-br from-brand-300/65 via-brand-200/30 to-brand-100/20 p-6 md:grid-cols-[1.2fr_1fr] md:p-8">
          <div>
            <h2 className="text-2xl font-semibold">MVP Modules in Current Sprint Track</h2>
            <p className="mt-2 max-w-xl text-sm text-white/80">
              The project structure is prepared so each module can be built as an isolated
              domain with dedicated APIs, reusable contracts, and role-based workflows.
            </p>
          </div>
          <ul className="grid gap-2 text-sm text-white/90 sm:grid-cols-2">
            {mvpModules.map((item) => (
              <li key={item} className="rounded-lg border border-white/15 bg-white/5 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-white/15 bg-white/5 p-6 md:p-8">
          <h2 className="text-2xl font-semibold">README Module Delivery Status</h2>
          <p className="mt-2 text-sm text-white/80">
            Feature-level roadmap integration: this dashboard tracks module maturity, not only route availability.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-teal-300/30 bg-teal-500/10 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-teal-100/90">In Progress</p>
              <p className="mt-2 text-sm text-white">1. RBAC, 2. Mobility, 3. Applications, 4. Documents, 5. Visa, 6. Student Support, 7. Partnerships, 8. Events, 9. Communication, 10. Analytics, 11. Finance and Scholarship, 12. AI and Automation, 13. Knowledge Base and Learning, 14. Mobile Student Experience, 15. Security, 16. Discovery Engine, 17. Institutional Internationalisation</p>
            </div>
            <div className="rounded-xl border border-amber-300/30 bg-amber-500/10 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-amber-100/90">Planned</p>
              <p className="mt-2 text-sm text-white">Module deepening sprint continues for process hardening, QA, and production readiness.</p>
            </div>
            <div className="rounded-xl border border-indigo-300/30 bg-indigo-500/10 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-indigo-100/90">Checkpoint Baseline</p>
              <p className="mt-2 text-sm text-white">Checkpoint 1 locked and used as ongoing sprint base for phased module delivery.</p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <Link href="/dashboard" className="rounded-2xl border border-white/15 bg-white/5 p-5 transition hover:bg-white/10">
            <p className="text-xs uppercase tracking-[0.14em] text-white/65">Overview</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Command Dashboard</h2>
            <p className="mt-2 text-sm text-white/75">Unified snapshot across mobility, outreach, and support modules.</p>
          </Link>
          <Link href="/students/profile" className="rounded-2xl border border-white/15 bg-white/5 p-5 transition hover:bg-white/10">
            <p className="text-xs uppercase tracking-[0.14em] text-white/65">Mobility</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Student Profiles</h2>
            <p className="mt-2 text-sm text-white/75">Review learner records, preferences, and application readiness.</p>
          </Link>
          <Link href="/applications" className="rounded-2xl border border-white/15 bg-white/5 p-5 transition hover:bg-white/10">
            <p className="text-xs uppercase tracking-[0.14em] text-white/65">Mobility</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Application Tracking</h2>
            <p className="mt-2 text-sm text-white/75">Monitor multi-university application progress by status and deadlines.</p>
          </Link>
          <Link href="/documents" className="rounded-2xl border border-white/15 bg-white/5 p-5 transition hover:bg-white/10">
            <p className="text-xs uppercase tracking-[0.14em] text-white/65">Compliance</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Document Operations</h2>
            <p className="mt-2 text-sm text-white/75">Manage verification queues, expiry alerts, and review workflows.</p>
          </Link>
          <Link href="/visa" className="rounded-2xl border border-white/15 bg-white/5 p-5 transition hover:bg-white/10">
            <p className="text-xs uppercase tracking-[0.14em] text-white/65">Compliance</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Visa Workflow</h2>
            <p className="mt-2 text-sm text-white/75">Track interviews, biometrics, milestones, and final visa decisions.</p>
          </Link>
          <Link href="/partnerships" className="rounded-2xl border border-white/15 bg-white/5 p-5 transition hover:bg-white/10">
            <p className="text-xs uppercase tracking-[0.14em] text-white/65">Institutional CRM</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Partner Universities</h2>
            <p className="mt-2 text-sm text-white/75">Track MoUs, renewal windows, quotas, and collaboration themes.</p>
          </Link>
          <Link href="/events" className="rounded-2xl border border-white/15 bg-white/5 p-5 transition hover:bg-white/10">
            <p className="text-xs uppercase tracking-[0.14em] text-white/65">Outreach</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Events and Delegations</h2>
            <p className="mt-2 text-sm text-white/75">Coordinate seminars, conferences, and delegation visit operations.</p>
          </Link>
          <Link href="/communication" className="rounded-2xl border border-white/15 bg-white/5 p-5 transition hover:bg-white/10">
            <p className="text-xs uppercase tracking-[0.14em] text-white/65">Support CRM</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Ticketing and Communication</h2>
            <p className="mt-2 text-sm text-white/75">Handle visa, hostel, documentation, and emergency support requests.</p>
          </Link>
          <Link href="/support" className="rounded-2xl border border-white/15 bg-white/5 p-5 transition hover:bg-white/10">
            <p className="text-xs uppercase tracking-[0.14em] text-white/65">Module 6</p>
            <h2 className="mt-2 text-xl font-semibold text-white">International Student Support</h2>
            <p className="mt-2 text-sm text-white/75">Run pre-arrival and post-arrival assistance workflows with assignment tracking.</p>
          </Link>
          <Link href="/finance" className="rounded-2xl border border-white/15 bg-white/5 p-5 transition hover:bg-white/10">
            <p className="text-xs uppercase tracking-[0.14em] text-white/65">Module 11</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Finance and Scholarship</h2>
            <p className="mt-2 text-sm text-white/75">Track dues, scholarships, and disbursement milestones for outbound and inbound students.</p>
          </Link>
          <Link href="/ai-automation" className="rounded-2xl border border-white/15 bg-white/5 p-5 transition hover:bg-white/10">
            <p className="text-xs uppercase tracking-[0.14em] text-white/65">Module 12</p>
            <h2 className="mt-2 text-xl font-semibold text-white">AI and Automation</h2>
            <p className="mt-2 text-sm text-white/75">Operate automation rules and recommendation workflows for student journeys.</p>
          </Link>
          <Link href="/knowledge" className="rounded-2xl border border-white/15 bg-white/5 p-5 transition hover:bg-white/10">
            <p className="text-xs uppercase tracking-[0.14em] text-white/65">Module 13</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Knowledge and Learning</h2>
            <p className="mt-2 text-sm text-white/75">Publish knowledge articles and monitor mandatory readiness tracks.</p>
          </Link>
          <Link href="/mobile-experience" className="rounded-2xl border border-white/15 bg-white/5 p-5 transition hover:bg-white/10">
            <p className="text-xs uppercase tracking-[0.14em] text-white/65">Module 14</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Mobile Experience</h2>
            <p className="mt-2 text-sm text-white/75">Manage announcements and mobile app feedback status workflows.</p>
          </Link>
          <Link href="/discovery" className="rounded-2xl border border-white/15 bg-white/5 p-5 transition hover:bg-white/10">
            <p className="text-xs uppercase tracking-[0.14em] text-white/65">Module 16</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Discovery Engine</h2>
            <p className="mt-2 text-sm text-white/75">Compare global universities and convert matches into tracked shortlists.</p>
          </Link>
          <Link href="/institutional" className="rounded-2xl border border-white/15 bg-white/5 p-5 transition hover:bg-white/10">
            <p className="text-xs uppercase tracking-[0.14em] text-white/65">Module 17</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Institutional Management</h2>
            <p className="mt-2 text-sm text-white/75">Track internationalisation KPIs and strategic institutional initiatives.</p>
          </Link>
          <Link href="/analytics" className="rounded-2xl border border-white/15 bg-white/5 p-5 transition hover:bg-white/10">
            <p className="text-xs uppercase tracking-[0.14em] text-white/65">KPI Insights</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Analytics Overview</h2>
            <p className="mt-2 text-sm text-white/75">Track mobility, partnerships, events, and support metrics in one view.</p>
          </Link>
        </section>
      </section>
    </main>
  );
}
