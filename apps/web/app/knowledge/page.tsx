import { Badge, Card, Group, SimpleGrid, Stack, Table, Text, Title } from "@mantine/core";
import type { KnowledgeArticleDto, KnowledgeSummaryDto, LearningTrackDto } from "@contracts/index";
import { KnowledgeWorkflowPanel } from "../../components/knowledge-workflow-panel";
import { getKnowledgeArticles, getKnowledgeSummary, getLearningTracks } from "../../lib/api";

const fallbackArticles: KnowledgeArticleDto[] = [
  { id: "article-1", title: "Pre-Departure Checklist 2026", category: "Mobility", audience: "Outbound Students", readTimeMinutes: 8, updatedAt: "2026-05-20" }
];
const fallbackTracks: LearningTrackDto[] = [
  { id: "track-1", studentProfileId: "student-1", title: "Global Mobility Foundation", progressPercentage: 65, mandatory: true, status: "IN_PROGRESS" }
];
const fallbackSummary: KnowledgeSummaryDto = { articlesPublished: 2, mandatoryTracks: 2, completedTracks: 1, averageProgress: 82 };

export default async function KnowledgePage() {
  const articles = (await getKnowledgeArticles()) ?? fallbackArticles;
  const tracks = (await getLearningTracks("student-1")) ?? fallbackTracks;
  const summary = (await getKnowledgeSummary("student-1")) ?? fallbackSummary;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 md:px-8">
      <Stack gap="md">
        <Group justify="space-between"><div><Title order={1} c="white">Knowledge Base and Learning</Title><Text c="rgba(255,255,255,0.75)">Centralized content and guided readiness tracks.</Text></div><Badge color="indigo" variant="filled">Module 13</Badge></Group>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Text c="rgba(255,255,255,0.7)" size="sm">Articles</Text><Title order={3} c="white">{summary.articlesPublished}</Title></Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Text c="rgba(255,255,255,0.7)" size="sm">Mandatory Tracks</Text><Title order={3} c="white">{summary.mandatoryTracks}</Title></Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Text c="rgba(255,255,255,0.7)" size="sm">Completed</Text><Title order={3} c="white">{summary.completedTracks}</Title></Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Text c="rgba(255,255,255,0.7)" size="sm">Avg Progress</Text><Title order={3} c="white">{summary.averageProgress}%</Title></Card>
        </SimpleGrid>
        <Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Title order={3} c="white" mb="sm">Knowledge Articles</Title><Table highlightOnHover><thead><tr><th>Title</th><th>Category</th><th>Audience</th><th>Read Time</th></tr></thead><tbody>{articles.map((item) => <tr key={item.id}><td>{item.title}</td><td>{item.category}</td><td>{item.audience}</td><td>{item.readTimeMinutes} min</td></tr>)}</tbody></Table></Card>
        <Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Title order={3} c="white" mb="sm">Learning Tracks</Title><Table highlightOnHover><thead><tr><th>Title</th><th>Progress</th><th>Status</th><th>Mandatory</th></tr></thead><tbody>{tracks.map((item) => <tr key={item.id}><td>{item.title}</td><td>{item.progressPercentage}%</td><td>{item.status}</td><td>{item.mandatory ? "Yes" : "No"}</td></tr>)}</tbody></Table></Card>
        <KnowledgeWorkflowPanel tracks={tracks} />
      </Stack>
    </main>
  );
}
