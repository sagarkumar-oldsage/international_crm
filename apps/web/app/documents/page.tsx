import { Badge, Card, Group, SimpleGrid, Stack, Table, Text, Title } from "@mantine/core";
import type {
  DocumentStatusDto,
  StudentDocumentDto,
  StudentDocumentSummaryDto
} from "@contracts/index";
import { DocumentWorkflowPanel } from "../../components/document-workflow-panel";
import { getStudentDocuments, getStudentDocumentSummary } from "../../lib/api";

const fallbackDocuments: StudentDocumentDto[] = [
  {
    id: "doc-1",
    studentId: "student-1",
    category: "PASSPORT",
    fileName: "aarav-sharma-passport.pdf",
    storagePath: "/documents/student-1/passport-v1.pdf",
    status: "VERIFIED",
    expiresAt: "2030-05-14",
    notes: "Passport verified by visa team"
  },
  {
    id: "doc-2",
    studentId: "student-1",
    category: "SOP",
    fileName: "aarav-sharma-sop.pdf",
    storagePath: "/documents/student-1/sop-v2.pdf",
    status: "PENDING_REVIEW",
    expiresAt: null,
    notes: "Awaiting faculty mentor review"
  }
];

const fallbackSummary: StudentDocumentSummaryDto = {
  studentId: "student-1",
  totalDocuments: 2,
  verifiedDocuments: 1,
  pendingReviewDocuments: 1,
  expiredDocuments: 0,
  expiringSoonDocuments: 0,
  completionPercentage: 40,
  missingCategories: ["CV", "MARKSHEET", "FINANCIAL_STATEMENT"]
};

function statusColor(status: DocumentStatusDto) {
  if (status === "VERIFIED") {
    return "teal";
  }

  if (status === "REJECTED" || status === "EXPIRED") {
    return "red";
  }

  return "yellow";
}

export default async function DocumentsPage() {
  const documents = (await getStudentDocuments("student-1")) ?? fallbackDocuments;
  const summary = (await getStudentDocumentSummary("student-1")) ?? fallbackSummary;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 md:px-8">
      <Stack gap="md">
        <Group justify="space-between">
          <div>
            <Title order={1} c="white">
              Document Management
            </Title>
            <Text c="rgba(255,255,255,0.75)">
              Document verification, review status, and expiry visibility for mobility workflows.
            </Text>
          </div>
          <Badge color="indigo" variant="filled">
            {documents.length} Records
          </Badge>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Completion</Text>
            <Title order={2} c="white">{summary.completionPercentage}%</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Verified</Text>
            <Title order={2} c="white">{summary.verifiedDocuments}</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Pending Review</Text>
            <Title order={2} c="white">{summary.pendingReviewDocuments}</Title>
          </Card>
          <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
            <Text c="rgba(255,255,255,0.7)" size="sm">Expiry Alerts</Text>
            <Title order={2} c="white">{summary.expiredDocuments + summary.expiringSoonDocuments}</Title>
          </Card>
        </SimpleGrid>

        <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
          <Stack gap="sm">
            <Group justify="space-between">
              <Title order={3} c="white">Checklist Gaps</Title>
              <Badge color="yellow" variant="light">
                {summary.missingCategories.length} Missing
              </Badge>
            </Group>
            {summary.missingCategories.length > 0 ? (
              <Group gap="xs">
                {summary.missingCategories.map((category) => (
                  <Badge key={category} color="yellow" variant="light">
                    {category}
                  </Badge>
                ))}
              </Group>
            ) : (
              <Text c="rgba(255,255,255,0.75)">All required document categories are uploaded.</Text>
            )}
          </Stack>
        </Card>

        <DocumentWorkflowPanel studentId="student-1" documents={documents} />

        <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>Category</th>
                <th>File</th>
                <th>Status</th>
                <th>Expires</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((document) => (
                <tr key={document.id}>
                  <td>{document.category}</td>
                  <td>{document.fileName}</td>
                  <td>
                    <Badge color={statusColor(document.status)} variant="light">
                      {document.status}
                    </Badge>
                  </td>
                  <td>{document.expiresAt ?? "N/A"}</td>
                  <td>{document.notes ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Stack>
    </main>
  );
}
