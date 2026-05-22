import { Badge, Card, Group, SimpleGrid, Stack, Table, Text, Title } from "@mantine/core";
import type { InstitutionalInitiativeDto, InstitutionalKpiDto, InstitutionalSummaryDto } from "@contracts/index";
import { InstitutionalWorkflowPanel } from "../../components/institutional-workflow-panel";
import { getInstitutionalInitiatives, getInstitutionalKpis, getInstitutionalSummary } from "../../lib/api";

const fallbackKpis: InstitutionalKpiDto[] = [
  { id: "inst-kpi-1", metric: "Active Global Partners", value: "76", trend: "UP" }
];
const fallbackInitiatives: InstitutionalInitiativeDto[] = [
  { id: "initiative-1", title: "Dual Degree Expansion (EU Cluster)", owner: "IR Director", targetDate: "2026-09-30", status: "IN_PROGRESS", notes: "Legal and curriculum alignment underway" }
];
const fallbackSummary: InstitutionalSummaryDto = { totalInitiatives: 2, inProgress: 1, atRisk: 0, completed: 0 };

export default async function InstitutionalPage() {
  const kpis = (await getInstitutionalKpis()) ?? fallbackKpis;
  const initiatives = (await getInstitutionalInitiatives()) ?? fallbackInitiatives;
  const summary = (await getInstitutionalSummary()) ?? fallbackSummary;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 md:px-8"><Stack gap="md"><Group justify="space-between"><div><Title order={1} c="white">Institutional Internationalisation Management</Title><Text c="rgba(255,255,255,0.75)">Drive strategic initiatives and track international growth KPIs.</Text></div><Badge color="indigo" variant="filled">Module 17</Badge></Group><SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md"><Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Text c="rgba(255,255,255,0.7)" size="sm">Total Initiatives</Text><Title order={3} c="white">{summary.totalInitiatives}</Title></Card><Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Text c="rgba(255,255,255,0.7)" size="sm">In Progress</Text><Title order={3} c="white">{summary.inProgress}</Title></Card><Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Text c="rgba(255,255,255,0.7)" size="sm">At Risk</Text><Title order={3} c="white">{summary.atRisk}</Title></Card><Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Text c="rgba(255,255,255,0.7)" size="sm">Completed</Text><Title order={3} c="white">{summary.completed}</Title></Card></SimpleGrid><Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Title order={3} c="white" mb="sm">Institutional KPIs</Title><Table highlightOnHover><thead><tr><th>Metric</th><th>Value</th><th>Trend</th></tr></thead><tbody>{kpis.map((item) => <tr key={item.id}><td>{item.metric}</td><td>{item.value}</td><td>{item.trend}</td></tr>)}</tbody></Table></Card><Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Title order={3} c="white" mb="sm">Strategic Initiatives</Title><Table highlightOnHover><thead><tr><th>Initiative</th><th>Owner</th><th>Target Date</th><th>Status</th></tr></thead><tbody>{initiatives.map((item) => <tr key={item.id}><td>{item.title}</td><td>{item.owner}</td><td>{item.targetDate}</td><td>{item.status}</td></tr>)}</tbody></Table></Card><InstitutionalWorkflowPanel initiatives={initiatives} /></Stack></main>
  );
}
