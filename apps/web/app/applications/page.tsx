import { Badge, Card, Group, Stack, Table, Text, Title } from "@mantine/core";
import { getStudentApplications } from "../../lib/api";

const fallbackApplications = [
  {
    id: "app-1",
    studentId: "student-1",
    university: "Technical University of Munich",
    country: "Germany",
    program: "Data Engineering",
    status: "UNDER_REVIEW",
    deadline: "2026-08-12"
  },
  {
    id: "app-2",
    studentId: "student-1",
    university: "University of Toronto",
    country: "Canada",
    program: "AI and Systems",
    status: "INTERVIEW_SCHEDULED",
    deadline: "2026-09-02"
  }
];

function statusColor(status: string) {
  if (status === "VISA_APPROVED" || status === "ENROLLMENT_COMPLETED") {
    return "teal";
  }

  if (status === "REJECTED") {
    return "red";
  }

  return "indigo";
}

export default async function ApplicationsPage() {
  const applications = (await getStudentApplications("student-1")) ?? fallbackApplications;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 md:px-8">
      <Stack gap="md">
        <Group justify="space-between">
          <div>
            <Title order={1} c="white">
              Application Tracking
            </Title>
            <Text c="rgba(255,255,255,0.75)">
              Multi-university admission progress aligned with mobility workflow stages.
            </Text>
          </div>
          <Badge color="indigo" variant="filled">
            {applications.length} Active
          </Badge>
        </Group>

        <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
          <Table highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>University</Table.Th>
                <Table.Th>Country</Table.Th>
                <Table.Th>Program</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Deadline</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {applications.map((item) => (
                <Table.Tr key={item.id}>
                  <Table.Td>{item.university}</Table.Td>
                  <Table.Td>{item.country}</Table.Td>
                  <Table.Td>{item.program}</Table.Td>
                  <Table.Td>
                    <Badge color={statusColor(item.status)} variant="light">
                      {item.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td>{item.deadline}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Card>
      </Stack>
    </main>
  );
}
