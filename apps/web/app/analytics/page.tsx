import { Badge, Card, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import type { AnalyticsOverviewDto } from "@contracts/index";
import { getAnalyticsOverview } from "../../lib/api";

const fallbackOverview: AnalyticsOverviewDto = {
  totalStudents: 248,
  activeApplications: 64,
  visaApprovalRate: 91,
  activePartnerships: 76,
  upcomingEvents: 5,
  openSupportTickets: 18
};

export default async function AnalyticsPage() {
  const overview = (await getAnalyticsOverview()) ?? fallbackOverview;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 md:px-8">
      <Stack gap="md">
        <Group justify="space-between">
          <div>
            <Title order={1} c="white">Analytics Overview</Title>
            <Text c="rgba(255,255,255,0.75)">
              Snapshot of internationalization KPIs for operations and leadership reviews.
            </Text>
          </div>
          <Badge color="indigo" variant="filled">Live KPI View</Badge>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Total Students</Text>
            <Title order={2} c="white">{overview.totalStudents}</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Active Applications</Text>
            <Title order={2} c="white">{overview.activeApplications}</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Visa Approval Rate</Text>
            <Title order={2} c="white">{overview.visaApprovalRate}%</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Active Partnerships</Text>
            <Title order={2} c="white">{overview.activePartnerships}</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Upcoming Events</Text>
            <Title order={2} c="white">{overview.upcomingEvents}</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Open Support Tickets</Text>
            <Title order={2} c="white">{overview.openSupportTickets}</Title>
          </Card>
        </SimpleGrid>
      </Stack>
    </main>
  );
}
