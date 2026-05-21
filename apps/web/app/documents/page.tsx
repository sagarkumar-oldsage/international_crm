import { Badge, Card, Group, Stack, Table, Text, Title } from "@mantine/core";
import type { DocumentStatusDto, StudentDocumentDto } from "@contracts/index";
import { getStudentDocuments } from "../../lib/api";

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

        <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
          <Table highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Category</Table.Th>
                <Table.Th>File</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Expires</Table.Th>
                <Table.Th>Notes</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {documents.map((document) => (
                <Table.Tr key={document.id}>
                  <Table.Td>{document.category}</Table.Td>
                  <Table.Td>{document.fileName}</Table.Td>
                  <Table.Td>
                    <Badge color={statusColor(document.status)} variant="light">
                      {document.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td>{document.expiresAt ?? "N/A"}</Table.Td>
                  <Table.Td>{document.notes ?? "-"}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Card>
      </Stack>
    </main>
  );
}
