import { Badge, Card, Group, SimpleGrid, Stack, Table, Text, Title } from "@mantine/core";
import type {
  AiAutomationSummaryDto,
  AiRecommendationDto,
  AutomationRuleDto,
  RecommendationStatusDto
} from "@contracts/index";
import { AiAutomationWorkflowPanel } from "../../components/ai-automation-workflow-panel";
import { getAiAutomationSummary, getAiRecommendations, getAutomationRules } from "../../lib/api";

const fallbackRules: AutomationRuleDto[] = [
  {
    id: "rule-1",
    name: "Missing Document Nudger",
    trigger: "Document status remains MISSING for 72h",
    action: "Auto-create reminder ticket and notify student",
    status: "ACTIVE",
    lastRunAt: "2026-05-21",
    successRate: 91
  }
];

const fallbackRecommendations: AiRecommendationDto[] = [
  {
    id: "ai-rec-1",
    studentProfileId: "student-1",
    title: "Switch to fast-track APS verification",
    reason: "Destination university has APS priority queue this month.",
    priority: "HIGH",
    status: "OPEN",
    generatedAt: "2026-05-20"
  }
];

const fallbackSummary: AiAutomationSummaryDto = {
  activeRules: 2,
  openRecommendations: 1,
  implementedRecommendations: 0,
  averageSuccessRate: 89
};

function statusColor(status: RecommendationStatusDto) {
  if (status === "IMPLEMENTED") {
    return "teal";
  }

  if (status === "DISMISSED") {
    return "red";
  }

  return "indigo";
}

export default async function AiAutomationPage() {
  const rules = (await getAutomationRules()) ?? fallbackRules;
  const recommendations = (await getAiRecommendations("student-1")) ?? fallbackRecommendations;
  const summary = (await getAiAutomationSummary("student-1")) ?? fallbackSummary;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 md:px-8">
      <Stack gap="md">
        <Group justify="space-between">
          <div>
            <Title order={1} c="white">AI and Automation</Title>
            <Text c="rgba(255,255,255,0.75)">Run smart recommendation and automation rule workflows.</Text>
          </div>
          <Badge color="indigo" variant="filled">Module 12</Badge>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Text c="rgba(255,255,255,0.7)" size="sm">Active Rules</Text><Title order={3} c="white">{summary.activeRules}</Title></Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Text c="rgba(255,255,255,0.7)" size="sm">Open Recommendations</Text><Title order={3} c="white">{summary.openRecommendations}</Title></Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Text c="rgba(255,255,255,0.7)" size="sm">Implemented</Text><Title order={3} c="white">{summary.implementedRecommendations}</Title></Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Text c="rgba(255,255,255,0.7)" size="sm">Avg Success Rate</Text><Title order={3} c="white">{summary.averageSuccessRate}%</Title></Card>
        </SimpleGrid>

        <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
          <Title order={3} c="white" mb="sm">Automation Rules</Title>
          <Table highlightOnHover>
            <thead><tr><th>Name</th><th>Trigger</th><th>Action</th><th>Status</th><th>Success</th></tr></thead>
            <tbody>
              {rules.map((rule) => (
                <tr key={rule.id}><td>{rule.name}</td><td>{rule.trigger}</td><td>{rule.action}</td><td>{rule.status}</td><td>{rule.successRate}%</td></tr>
              ))}
            </tbody>
          </Table>
        </Card>

        <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
          <Title order={3} c="white" mb="sm">AI Recommendations</Title>
          <Table highlightOnHover>
            <thead><tr><th>Title</th><th>Priority</th><th>Status</th><th>Generated</th></tr></thead>
            <tbody>
              {recommendations.map((item) => (
                <tr key={item.id}><td>{item.title}</td><td>{item.priority}</td><td><Badge color={statusColor(item.status)} variant="light">{item.status}</Badge></td><td>{item.generatedAt}</td></tr>
              ))}
            </tbody>
          </Table>
        </Card>

        <AiAutomationWorkflowPanel studentId="student-1" recommendations={recommendations} />
      </Stack>
    </main>
  );
}
