import { Badge, Card, Group, SimpleGrid, Stack, Table, Text, Title } from "@mantine/core";
import type { DiscoveryShortlistDto, DiscoverySummaryDto, UniversityDiscoveryDto } from "@contracts/index";
import { DiscoveryWorkflowPanel } from "../../components/discovery-workflow-panel";
import { getDiscoveryShortlists, getDiscoverySummary, getDiscoveryUniversities } from "../../lib/api";

const fallbackUniversities: UniversityDiscoveryDto[] = [
  { id: "uni-1", universityName: "Technical University of Munich", country: "Germany", program: "Data Engineering", tuitionEstimate: 12800, fitLevel: "HIGH", intake: "Winter 2026" }
];
const fallbackShortlists: DiscoveryShortlistDto[] = [
  { id: "shortlist-1", studentProfileId: "student-1", universityId: "uni-1", universityName: "Technical University of Munich", status: "SHORTLISTED", notes: "Strong fit" }
];
const fallbackSummary: DiscoverySummaryDto = { availableUniversities: 3, highFitMatches: 1, shortlisted: 1, applied: 0 };

export default async function DiscoveryPage() {
  const universities = (await getDiscoveryUniversities()) ?? fallbackUniversities;
  const shortlists = (await getDiscoveryShortlists("student-1")) ?? fallbackShortlists;
  const summary = (await getDiscoverySummary("student-1")) ?? fallbackSummary;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 md:px-8"><Stack gap="md"><Group justify="space-between"><div><Title order={1} c="white">Global University Discovery Engine</Title><Text c="rgba(255,255,255,0.75)">Search, compare, and shortlist best-fit universities.</Text></div><Badge color="indigo" variant="filled">Module 16</Badge></Group><SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md"><Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Text c="rgba(255,255,255,0.7)" size="sm">Universities</Text><Title order={3} c="white">{summary.availableUniversities}</Title></Card><Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Text c="rgba(255,255,255,0.7)" size="sm">High Fit</Text><Title order={3} c="white">{summary.highFitMatches}</Title></Card><Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Text c="rgba(255,255,255,0.7)" size="sm">Shortlisted</Text><Title order={3} c="white">{summary.shortlisted}</Title></Card><Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Text c="rgba(255,255,255,0.7)" size="sm">Applied</Text><Title order={3} c="white">{summary.applied}</Title></Card></SimpleGrid><Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Title order={3} c="white" mb="sm">University Matches</Title><Table highlightOnHover><thead><tr><th>University</th><th>Country</th><th>Program</th><th>Fit</th><th>Tuition</th></tr></thead><tbody>{universities.map((uni) => <tr key={uni.id}><td>{uni.universityName}</td><td>{uni.country}</td><td>{uni.program}</td><td>{uni.fitLevel}</td><td>EUR {uni.tuitionEstimate}</td></tr>)}</tbody></Table></Card><Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Title order={3} c="white" mb="sm">Student Shortlists</Title><Table highlightOnHover><thead><tr><th>University</th><th>Status</th><th>Notes</th></tr></thead><tbody>{shortlists.map((item) => <tr key={item.id}><td>{item.universityName}</td><td>{item.status}</td><td>{item.notes ?? "-"}</td></tr>)}</tbody></Table></Card><DiscoveryWorkflowPanel studentId="student-1" universities={universities} shortlists={shortlists} /></Stack></main>
  );
}
