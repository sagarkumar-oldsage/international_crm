"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const kpis = [
  { label: "Active Mobility Cases", value: "248" },
  { label: "Visa Approvals", value: "91.2%" },
  { label: "Partner Universities", value: "76" },
  { label: "Pending Documents", value: "39" }
];

const mvpModules = [
  "Student Portal",
  "Application Tracking",
  "Document Management",
  "Visa Tracking",
  "Event Management",
  "International Student Support",
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
            International Relations Command Center
          </p>
          <h1 className="max-w-4xl text-3xl font-semibold leading-tight md:text-5xl">
            Unified Global Mobility Platform for Students, Partnerships, and Compliance
          </h1>
          <p className="max-w-3xl text-sm text-white/75 md:text-base">
            Phase 1 foundation aligned to your architecture: modular frontend, scalable API,
            and deployment-ready setup for Vercel + Render.
          </p>
        </motion.header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

        <section className="grid gap-4 md:grid-cols-3">
          <Link href="/students/profile" className="rounded-2xl border border-white/15 bg-white/5 p-5 transition hover:bg-white/10">
            <p className="text-xs uppercase tracking-[0.14em] text-white/65">Mobility</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Student Profiles</h2>
            <p className="mt-2 text-sm text-white/75">Review learner records, preferences, and application readiness.</p>
          </Link>
          <Link href="/documents" className="rounded-2xl border border-white/15 bg-white/5 p-5 transition hover:bg-white/10">
            <p className="text-xs uppercase tracking-[0.14em] text-white/65">Compliance</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Document Operations</h2>
            <p className="mt-2 text-sm text-white/75">Manage verification queues, expiry alerts, and review workflows.</p>
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
        </section>
      </section>
    </main>
  );
}
