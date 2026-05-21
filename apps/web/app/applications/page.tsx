import { Badge, Card, Group, Stack, Table, Text, Title } from "@mantine/core";
import type { ApplicationStatusDto, StudentApplicationDto } from "@contracts/index";
import { getStudentApplications } from "../../lib/api";

const fallbackApplications: StudentApplicationDto[] = [
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

function statusColor(status: ApplicationStatusDto) {
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
            <thead>
              <tr>
                <th>University</th>
                <th>Country</th>
                <th>Program</th>
                <th>Status</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((item) => (
                <tr key={item.id}>
                  <td>{item.university}</td>
                  <td>{item.country}</td>
                  <td>{item.program}</td>
                  <td>
                    <Badge color={statusColor(item.status)} variant="light">
                      {item.status}
                    </Badge>
                  </td>
                  <td>{item.deadline}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Stack>
    </main>
  );
}
