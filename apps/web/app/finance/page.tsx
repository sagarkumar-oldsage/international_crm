import { Badge, Card, Group, SimpleGrid, Stack, Table, Text, Title } from "@mantine/core";
import type {
  FinanceRecordStatusDto,
  FinanceScholarshipSummaryDto,
  ScholarshipCaseDto,
  ScholarshipStatusDto,
  StudentFinanceRecordDto
} from "@contracts/index";
import { FinanceWorkflowPanel } from "../../components/finance-workflow-panel";
import {
  getFinanceScholarshipSummary,
  getStudentFinanceRecords,
  getStudentScholarships
} from "../../lib/api";

const fallbackFinanceRecords: StudentFinanceRecordDto[] = [
  {
    id: "finance-1",
    studentProfileId: "student-1",
    itemType: "TUITION",
    label: "Semester 1 Tuition Fee",
    amount: 12800,
    currency: "EUR",
    status: "PENDING",
    dueDate: "2026-08-20",
    paidDate: null,
    notes: "Eligible for 15% early scholarship adjustment"
  },
  {
    id: "finance-2",
    studentProfileId: "student-1",
    itemType: "INSURANCE",
    label: "Mandatory Student Insurance",
    amount: 680,
    currency: "EUR",
    status: "PAID",
    dueDate: "2026-07-15",
    paidDate: "2026-07-08",
    notes: "Policy attached in document vault"
  }
];

const fallbackScholarships: ScholarshipCaseDto[] = [
  {
    id: "scholarship-1",
    studentProfileId: "student-1",
    scholarshipName: "Global Merit Scholarship",
    providerName: "Technical University of Munich",
    amount: 5400,
    currency: "EUR",
    status: "UNDER_REVIEW",
    deadline: "2026-07-25",
    awardedDate: null,
    disbursedDate: null,
    notes: "Interview round planned with scholarship committee"
  },
  {
    id: "scholarship-2",
    studentProfileId: "student-1",
    scholarshipName: "DAAD Mobility Grant",
    providerName: "DAAD",
    amount: 2200,
    currency: "EUR",
    status: "AWARDED",
    deadline: "2026-06-30",
    awardedDate: "2026-07-04",
    disbursedDate: null,
    notes: "Disbursement expected after university enrollment confirmation"
  }
];

const fallbackSummary: FinanceScholarshipSummaryDto = {
  totalPayableAmount: 13480,
  totalPaidAmount: 680,
  pendingAmount: 12800,
  activeScholarships: 2,
  awardedScholarshipAmount: 2200
};

function financeStatusColor(status: FinanceRecordStatusDto) {
  if (status === "PAID" || status === "WAIVED") {
    return "teal";
  }

  if (status === "OVERDUE") {
    return "red";
  }

  return "indigo";
}

function scholarshipStatusColor(status: ScholarshipStatusDto) {
  if (status === "DISBURSED") {
    return "teal";
  }

  if (status === "REJECTED") {
    return "red";
  }

  return "blue";
}

export default async function FinancePage() {
  const records = (await getStudentFinanceRecords("student-1")) ?? fallbackFinanceRecords;
  const scholarships = (await getStudentScholarships("student-1")) ?? fallbackScholarships;
  const summary = (await getFinanceScholarshipSummary("student-1")) ?? fallbackSummary;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 md:px-8">
      <Stack gap="md">
        <Group justify="space-between">
          <div>
            <Title order={1} c="white">Finance and Scholarship Desk</Title>
            <Text c="rgba(255,255,255,0.75)">
              Manage payable obligations, scholarship pipelines, and disbursement milestones for mobility students.
            </Text>
          </div>
          <Badge color="indigo" variant="filled">Module 11</Badge>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 5 }} spacing="md">
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Total Payable</Text>
            <Title order={3} c="white">EUR {summary.totalPayableAmount.toFixed(0)}</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Paid</Text>
            <Title order={3} c="white">EUR {summary.totalPaidAmount.toFixed(0)}</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Pending</Text>
            <Title order={3} c="white">EUR {summary.pendingAmount.toFixed(0)}</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Active Scholarships</Text>
            <Title order={3} c="white">{summary.activeScholarships}</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Awarded Value</Text>
            <Title order={3} c="white">EUR {summary.awardedScholarshipAmount.toFixed(0)}</Title>
          </Card>
        </SimpleGrid>

        <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
          <Title order={3} c="white" mb="sm">Financial Obligations</Title>
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>Label</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Paid Date</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td>{record.label}</td>
                  <td>{record.itemType}</td>
                  <td>{record.currency} {record.amount.toFixed(0)}</td>
                  <td>
                    <Badge color={financeStatusColor(record.status)} variant="light">{record.status}</Badge>
                  </td>
                  <td>{record.dueDate}</td>
                  <td>{record.paidDate ?? "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>

        <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
          <Title order={3} c="white" mb="sm">Scholarship Pipeline</Title>
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>Scholarship</th>
                <th>Provider</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Deadline</th>
                <th>Awarded</th>
              </tr>
            </thead>
            <tbody>
              {scholarships.map((scholarship) => (
                <tr key={scholarship.id}>
                  <td>{scholarship.scholarshipName}</td>
                  <td>{scholarship.providerName}</td>
                  <td>{scholarship.currency} {scholarship.amount.toFixed(0)}</td>
                  <td>
                    <Badge color={scholarshipStatusColor(scholarship.status)} variant="light">
                      {scholarship.status}
                    </Badge>
                  </td>
                  <td>{scholarship.deadline ?? "N/A"}</td>
                  <td>{scholarship.awardedDate ?? "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>

        <FinanceWorkflowPanel studentId="student-1" records={records} scholarships={scholarships} />
      </Stack>
    </main>
  );
}
