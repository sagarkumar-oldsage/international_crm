import { Badge, Card, Group, SimpleGrid, Stack, Table, Text, Title } from "@mantine/core";
import type { StudentVisaCaseDto, StudentVisaSummaryDto, VisaStageDto } from "@contracts/index";
import { VisaWorkflowPanel } from "../../components/visa-workflow-panel";
import { getStudentVisaCases, getStudentVisaSummary } from "../../lib/api";

const fallbackVisaCases: StudentVisaCaseDto[] = [
  {
    id: "visa-1",
    studentId: "student-1",
    country: "Germany",
    visaType: "National Visa (D)",
    currentStage: "APPOINTMENT_BOOKED",
    appointmentDate: "2026-07-18",
    biometricsDate: "2026-07-18",
    interviewDate: "2026-07-25",
    decisionDate: null,
    notes: "Keep blocked account statement and insurance copy ready."
  }
];

const fallbackVisaSummary: StudentVisaSummaryDto = {
  studentId: "student-1",
  totalVisaCases: 1,
  activeStage: "APPOINTMENT_BOOKED",
  nextMilestoneLabel: "Interview",
  nextMilestoneDate: "2026-07-25",
  approvedCases: 0
};

function stageColor(stage: VisaStageDto) {
  if (stage === "APPROVED") {
    return "teal";
  }

  if (stage === "REJECTED") {
    return "red";
  }

  return "indigo";
}

export default async function VisaPage() {
  const visaCases = (await getStudentVisaCases("student-1")) ?? fallbackVisaCases;
  const summary = (await getStudentVisaSummary("student-1")) ?? fallbackVisaSummary;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 md:px-8">
      <Stack gap="md">
        <Group justify="space-between">
          <div>
            <Title order={1} c="white">
              Visa & Immigration
            </Title>
            <Text c="rgba(255,255,255,0.75)">
              Appointment, interview, biometrics, and decision visibility for active visa cases.
            </Text>
          </div>
          <Badge color="indigo" variant="filled">
            {visaCases.length} Cases
          </Badge>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Active Stage</Text>
            <Title order={3} c="white">{summary.activeStage ?? "N/A"}</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Next Milestone</Text>
            <Title order={3} c="white">{summary.nextMilestoneLabel ?? "N/A"}</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Milestone Date</Text>
            <Title order={3} c="white">{summary.nextMilestoneDate ?? "N/A"}</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Approved Cases</Text>
            <Title order={3} c="white">{summary.approvedCases}</Title>
          </Card>
        </SimpleGrid>

        <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>Country</th>
                <th>Visa Type</th>
                <th>Stage</th>
                <th>Appointment</th>
                <th>Interview</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {visaCases.map((visaCase) => (
                <tr key={visaCase.id}>
                  <td>{visaCase.country}</td>
                  <td>{visaCase.visaType}</td>
                  <td>
                    <Badge color={stageColor(visaCase.currentStage)} variant="light">
                      {visaCase.currentStage}
                    </Badge>
                  </td>
                  <td>{visaCase.appointmentDate ?? "N/A"}</td>
                  <td>{visaCase.interviewDate ?? "N/A"}</td>
                  <td>{visaCase.notes ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>

        <VisaWorkflowPanel visaCases={visaCases} />
      </Stack>
    </main>
  );
}
