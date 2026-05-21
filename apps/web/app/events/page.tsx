import { Badge, Card, Group, SimpleGrid, Stack, Table, Text, Title } from "@mantine/core";
import type {
  EventStatusDto,
  EventsSummaryDto,
  InternationalEventDto
} from "@contracts/index";
import { EventWorkflowPanel } from "../../components/event-workflow-panel";
import { getEventsSummary, getInternationalEvents } from "../../lib/api";

const fallbackEvents: InternationalEventDto[] = [
  {
    id: "event-1",
    title: "Global Mobility Orientation 2026",
    category: "SEMINAR",
    format: "Hybrid",
    hostCountry: "India",
    venue: "Senate Hall, Poornima Campus",
    organizer: "International Relations Office",
    registrationDeadline: "2026-06-05",
    startDate: "2026-06-10T10:00:00.000Z",
    endDate: "2026-06-10T13:00:00.000Z",
    status: "REGISTRATION_OPEN",
    capacity: 250,
    registeredCount: 184,
    speaker: "Dr. Sofia Mehta",
    notes: "Includes exchange briefing and visa readiness clinic"
  },
  {
    id: "event-2",
    title: "Germany University Delegation Visit",
    category: "DELEGATION_VISIT",
    format: "In Person",
    hostCountry: "India",
    venue: "International Collaboration Boardroom",
    organizer: "Partnerships and Outreach Cell",
    registrationDeadline: null,
    startDate: "2026-07-22T08:30:00.000Z",
    endDate: "2026-07-22T17:00:00.000Z",
    status: "PLANNED",
    capacity: 40,
    registeredCount: 18,
    speaker: "TUM and DAAD Delegation",
    notes: "Includes campus tour, MoU review, and faculty roundtable"
  }
];

const fallbackSummary: EventsSummaryDto = {
  totalEvents: 2,
  registrationOpen: 1,
  upcomingDelegations: 1,
  totalRegistrations: 202,
  averageFillRate: 59
};

function statusColor(status: EventStatusDto) {
  if (status === "COMPLETED") {
    return "teal";
  }

  if (status === "CANCELLED") {
    return "red";
  }

  if (status === "REGISTRATION_OPEN") {
    return "blue";
  }

  return "indigo";
}

export default async function EventsPage() {
  const events = (await getInternationalEvents()) ?? fallbackEvents;
  const summary = (await getEventsSummary()) ?? fallbackSummary;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 md:px-8">
      <Stack gap="md">
        <Group justify="space-between">
          <div>
            <Title order={1} c="white">Events & Delegations</Title>
            <Text c="rgba(255,255,255,0.75)">
              Plan outreach events, track registrations, and manage delegation execution milestones.
            </Text>
          </div>
          <Badge color="indigo" variant="filled">{events.length} Events</Badge>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 5 }} spacing="md">
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Total Events</Text>
            <Title order={2} c="white">{summary.totalEvents}</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Registration Open</Text>
            <Title order={2} c="white">{summary.registrationOpen}</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Delegations Ahead</Text>
            <Title order={2} c="white">{summary.upcomingDelegations}</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Registrations</Text>
            <Title order={2} c="white">{summary.totalRegistrations}</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Avg Fill Rate</Text>
            <Title order={2} c="white">{summary.averageFillRate}%</Title>
          </Card>
        </SimpleGrid>

        <EventWorkflowPanel events={events} />

        <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Schedule</th>
                <th>Capacity</th>
                <th>Venue</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>
                    <Stack gap={2}>
                      <Text c="white">{event.title}</Text>
                      <Text c="rgba(255,255,255,0.7)" size="sm">{event.organizer}</Text>
                    </Stack>
                  </td>
                  <td>{event.category}</td>
                  <td>
                    <Badge color={statusColor(event.status)} variant="light">{event.status}</Badge>
                  </td>
                  <td>{new Date(event.startDate).toLocaleDateString()}</td>
                  <td>{event.registeredCount}/{event.capacity}</td>
                  <td>{event.venue}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Stack>
    </main>
  );
}
