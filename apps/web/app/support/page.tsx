import { Badge, Card, Group, SimpleGrid, Stack, Table, Text, Title } from "@mantine/core";
import type {
  SupportRequestDto,
  SupportRequestStatusDto,
  SupportRequestSummaryDto
} from "@contracts/index";
import { SupportWorkflowPanel } from "../../components/support-workflow-panel";
import { getSupportRequestSummary, getSupportRequests } from "../../lib/api";

const fallbackRequests: SupportRequestDto[] = [
  {
    id: "support-1",
    studentProfileId: "student-1",
    category: "PRE_ARRIVAL",
    title: "Airport pickup request",
    details: "Need pickup from Jaipur International Airport on 2026-07-14.",
    status: "IN_REVIEW",
    assignedTeam: "International Student Desk",
    appointmentDate: "2026-07-14T09:30:00.000Z",
    completionNotes: null
  },
  {
    id: "support-2",
    studentProfileId: "student-1",
    category: "CAMPUS_ONBOARDING",
    title: "Orientation and local registration support",
    details: "Need help with FRRO local registration and orientation schedule.",
    status: "REQUESTED",
    assignedTeam: "Onboarding Cell",
    appointmentDate: null,
    completionNotes: null
  }
];

const fallbackSummary: SupportRequestSummaryDto = {
  totalRequests: 2,
  openRequests: 2,
  preArrivalRequests: 1,
  postArrivalRequests: 1,
  completedRequests: 0
};

function statusColor(status: SupportRequestStatusDto) {
  if (status === "COMPLETED") {
    return "teal";
  }

  if (status === "CANCELLED") {
    return "red";
  }

  return "indigo";
}

export default async function SupportPage() {
  const requests = (await getSupportRequests("student-1")) ?? fallbackRequests;
  const summary = (await getSupportRequestSummary("student-1")) ?? fallbackSummary;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 md:px-8">
      <Stack gap="md">
        <Group justify="space-between">
          <div>
            <Title order={1} c="white">International Student Support</Title>
            <Text c="rgba(255,255,255,0.75)">
              Manage pre-arrival and post-arrival support operations for incoming and mobility students.
            </Text>
          </div>
          <Badge color="indigo" variant="filled">{requests.length} Requests</Badge>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 5 }} spacing="md">
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Total</Text>
            <Title order={2} c="white">{summary.totalRequests}</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Open</Text>
            <Title order={2} c="white">{summary.openRequests}</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Pre-Arrival</Text>
            <Title order={2} c="white">{summary.preArrivalRequests}</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Post-Arrival</Text>
            <Title order={2} c="white">{summary.postArrivalRequests}</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Completed</Text>
            <Title order={2} c="white">{summary.completedRequests}</Title>
          </Card>
        </SimpleGrid>

        <SupportWorkflowPanel studentId="student-1" requests={requests} />

        <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Assigned Team</th>
                <th>Appointment</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id}>
                  <td>
                    <Stack gap={2}>
                      <Text c="white">{request.title}</Text>
                      <Text c="rgba(255,255,255,0.7)" size="sm">{request.details}</Text>
                    </Stack>
                  </td>
                  <td>{request.category}</td>
                  <td>
                    <Badge color={statusColor(request.status)} variant="light">{request.status}</Badge>
                  </td>
                  <td>{request.assignedTeam ?? "Unassigned"}</td>
                  <td>{request.appointmentDate ? request.appointmentDate.slice(0, 10) : "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Stack>
    </main>
  );
}
