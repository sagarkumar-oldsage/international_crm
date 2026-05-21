"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const highlights = [
  {
    title: "Student Mobility",
    summary: "Track applications, document readiness, and visa milestones in one workflow."
  },
  {
    title: "Institutional Partnerships",
    summary: "Manage MoUs, renewal windows, collaboration themes, and outreach capacity."
  },
  {
    title: "Events and Delegations",
    summary: "Coordinate international seminars, conferences, and delegation execution plans."
  },
  {
    title: "Support Ticketing",
    summary: "Resolve student and team issues with category, priority, due date, and status tracking."
  }
];

export function OnePageWebsite() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-brand-400 text-white">
      <div className="ambient-orb ambient-orb-a" />
      <div className="ambient-orb ambient-orb-b" />

      <section className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-12 md:px-10 md:py-16">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-5"
        >
          <p className="inline-block rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs tracking-[0.14em] text-white/90 uppercase">
            International CRM Platform
          </p>
          <h1 className="max-w-5xl text-3xl font-semibold leading-tight md:text-5xl">
            One Unified Workspace for International Mobility, Partnerships, Outreach, and Student Support
          </h1>
          <p className="max-w-3xl text-sm text-white/75 md:text-base">
            This platform centralizes global education operations for international relations teams,
            students, and partner institutions with role-aware modules and deployment-ready architecture.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/login" className="rounded-xl bg-brand-100 px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90">
              Login to Dashboard
            </Link>
            <Link href="/dashboard" className="rounded-xl border border-white/25 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
              Open Module Dashboard
            </Link>
          </div>
        </motion.header>

        <section className="grid gap-4 md:grid-cols-2">
          {highlights.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-2xl border border-white/15 bg-white/5 p-5"
            >
              <h2 className="text-xl font-semibold text-white">{item.title}</h2>
              <p className="mt-2 text-sm text-white/75">{item.summary}</p>
            </motion.article>
          ))}
        </section>
      </section>
    </main>
  );
}
