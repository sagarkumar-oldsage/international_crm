import { Badge, Card, Group, SimpleGrid, Stack, Table, Text, Title } from "@mantine/core";
import type {
  SupportTicketDto,
  TicketPriorityDto,
  TicketStatusDto,
  TicketSummaryDto
} from "@contracts/index";
import { TicketWorkflowPanel } from "../../components/ticket-workflow-panel";
import { getSupportTickets, getTicketSummary } from "../../lib/api";

const fallbackTickets: SupportTicketDto[] = [
  {
    id: "ticket-1",
    studentProfileId: "student-1",
    raisedByName: "Aarav Sharma",
    raisedByEmail: "student@internationalcrm.edu",
    category: "VISA_ISSUE",
    subject: "Appointment slot reschedule support",
    description: "Need guidance on embassy appointment rescheduling after exam overlap.",
    priority: "HIGH",
    status: "IN_PROGRESS",
    assignedTeam: "Visa Team",
    resolutionNotes: null,
    dueDate: "2026-06-02"
  },
  {
    id: "ticket-2",
    studentProfileId: "student-1",
    raisedByName: "Aarav Sharma",
    raisedByEmail: "student@internationalcrm.edu",
    category: "DOCUMENTATION_ISSUE",
    subject: "LOR format clarification",
    description: "Need university-specific LOR template confirmation for TUM application.",
    priority: "MEDIUM",
    status: "OPEN",
    assignedTeam: "Documentation Desk",
    resolutionNotes: null,
    dueDate: "2026-06-06"
  }
];

const fallbackSummary: TicketSummaryDto = {
  totalTickets: 2,
  openTickets: 2,
  criticalTickets: 0,
  resolvedTickets: 0,
  overdueTickets: 0
};

function statusColor(status: TicketStatusDto) {
  if (status === "RESOLVED" || status === "CLOSED") {
    return "teal";
  }

  if (status === "ON_HOLD") {
    return "yellow";
  }

  return "indigo";
}

function priorityColor(priority: TicketPriorityDto) {
  if (priority === "CRITICAL") {
    return "red";
  }

  if (priority === "HIGH") {
    return "orange";
  }

  if (priority === "MEDIUM") {
    return "yellow";
  }

  return "blue";
}

export default async function CommunicationPage() {
  const tickets = (await getSupportTickets()) ?? fallbackTickets;
  const summary = (await getTicketSummary()) ?? fallbackSummary;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 md:px-8">
      <Stack gap="md">
        <Group justify="space-between">
          <div>
            <Title order={1} c="white">Communication and Ticketing</Title>
            <Text c="rgba(255,255,255,0.75)">
              Capture student support issues, track response ownership, and monitor resolution flow.
            </Text>
          </div>
          <Badge color="indigo" variant="filled">{tickets.length} Tickets</Badge>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 5 }} spacing="md">
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Total Tickets</Text>
            <Title order={2} c="white">{summary.totalTickets}</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Open Tickets</Text>
            <Title order={2} c="white">{summary.openTickets}</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Critical</Text>
            <Title order={2} c="white">{summary.criticalTickets}</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Resolved</Text>
            <Title order={2} c="white">{summary.resolvedTickets}</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Overdue</Text>
            <Title order={2} c="white">{summary.overdueTickets}</Title>
          </Card>
        </SimpleGrid>

        <TicketWorkflowPanel tickets={tickets} />

        <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Category</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assigned Team</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>
                    <Stack gap={2}>
                      <Text c="white">{ticket.subject}</Text>
                      <Text c="rgba(255,255,255,0.7)" size="sm">{ticket.raisedByName}</Text>
                    </Stack>
                  </td>
                  <td>{ticket.category}</td>
                  <td>
                    <Badge color={priorityColor(ticket.priority)} variant="light">{ticket.priority}</Badge>
                  </td>
                  <td>
                    <Badge color={statusColor(ticket.status)} variant="light">{ticket.status}</Badge>
                  </td>
                  <td>{ticket.assignedTeam ?? "Unassigned"}</td>
                  <td>{ticket.dueDate ?? "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Stack>
    </main>
  );
}
