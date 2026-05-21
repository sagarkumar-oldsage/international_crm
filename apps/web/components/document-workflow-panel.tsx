"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Badge,
  Button,
  Card,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title
} from "@mantine/core";
import type {
  CreateStudentDocumentDto,
  DocumentCategoryDto,
  DocumentStatusDto,
  StudentDocumentDto,
  UpdateStudentDocumentStatusDto
} from "@contracts/index";
import { createStudentDocument, updateStudentDocumentStatus } from "../lib/api";

const categoryOptions: DocumentCategoryDto[] = [
  "PASSPORT",
  "VISA",
  "MARKSHEET",
  "DEGREE_CERTIFICATE",
  "SOP",
  "LOR",
  "CV",
  "FINANCIAL_STATEMENT",
  "INSURANCE",
  "OFFER_LETTER",
  "ACCEPTANCE_LETTER"
];

const statusOptions: DocumentStatusDto[] = [
  "PENDING_REVIEW",
  "VERIFIED",
  "REJECTED",
  "EXPIRED"
];

interface DocumentWorkflowPanelProps {
  studentId: string;
  documents: StudentDocumentDto[];
}

export function DocumentWorkflowPanel({
  studentId,
  documents
}: DocumentWorkflowPanelProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [createForm, setCreateForm] = useState<CreateStudentDocumentDto>({
    studentId,
    category: "PASSPORT",
    fileName: "",
    storagePath: "",
    expiresAt: "",
    notes: ""
  });
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(
    documents[0]?.id ?? null
  );
  const [statusForm, setStatusForm] = useState<UpdateStudentDocumentStatusDto>({
    status: "VERIFIED",
    expiresAt: "",
    notes: ""
  });

  const runRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleCreate = async () => {
    setFeedback(null);

    try {
      const created = await createStudentDocument({
        ...createForm,
        expiresAt: createForm.expiresAt || undefined,
        notes: createForm.notes || undefined
      });

      if (!created) {
        setFeedback("Document creation request was rejected by the API.");
        return;
      }

      setFeedback(`Created document record for ${created.fileName}.`);
      setCreateForm({
        studentId,
        category: "PASSPORT",
        fileName: "",
        storagePath: "",
        expiresAt: "",
        notes: ""
      });
      runRefresh();
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Document creation failed.");
    }
  };

  const handleStatusUpdate = async () => {
    if (!selectedDocumentId) {
      setFeedback("Select a document before updating its review status.");
      return;
    }

    setFeedback(null);

    try {
      const updated = await updateStudentDocumentStatus(selectedDocumentId, {
        ...statusForm,
        expiresAt: statusForm.expiresAt || undefined,
        notes: statusForm.notes || undefined
      });

      if (!updated) {
        setFeedback("Status update request was rejected by the API.");
        return;
      }

      setFeedback(`Updated ${updated.fileName} to ${updated.status}.`);
      runRefresh();
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Status update failed.");
    }
  };

  return (
    <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="md">
      <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
        <Stack gap="sm">
          <Group justify="space-between">
            <Title order={3} c="white">
              Add Document Metadata
            </Title>
            <Badge color="indigo" variant="light">
              Upload-ready
            </Badge>
          </Group>
          <Select
            label="Category"
            value={createForm.category}
            data={categoryOptions}
            onChange={(value) => {
              if (!value) {
                return;
              }

              setCreateForm((current) => ({
                ...current,
                category: value as DocumentCategoryDto
              }));
            }}
          />
          <TextInput
            label="File Name"
            value={createForm.fileName}
            onChange={(event) =>
              setCreateForm((current) => ({ ...current, fileName: event.currentTarget.value }))
            }
          />
          <TextInput
            label="Storage Path"
            value={createForm.storagePath}
            onChange={(event) =>
              setCreateForm((current) => ({ ...current, storagePath: event.currentTarget.value }))
            }
          />
          <TextInput
            label="Expiry Date"
            placeholder="YYYY-MM-DD"
            value={createForm.expiresAt ?? ""}
            onChange={(event) =>
              setCreateForm((current) => ({ ...current, expiresAt: event.currentTarget.value }))
            }
          />
          <Textarea
            label="Notes"
            value={createForm.notes ?? ""}
            onChange={(event) =>
              setCreateForm((current) => ({ ...current, notes: event.currentTarget.value }))
            }
          />
          <Button onClick={handleCreate} loading={isPending} color="indigo">
            Create Document Record
          </Button>
        </Stack>
      </Card>

      <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
        <Stack gap="sm">
          <Group justify="space-between">
            <Title order={3} c="white">
              Review Workflow
            </Title>
            <Badge color="yellow" variant="light">
              Status control
            </Badge>
          </Group>
          <Select
            label="Document"
            value={selectedDocumentId}
            data={documents.map((document) => ({
              value: document.id,
              label: `${document.category} - ${document.fileName}`
            }))}
            onChange={setSelectedDocumentId}
          />
          <Select
            label="Status"
            value={statusForm.status}
            data={statusOptions}
            onChange={(value) => {
              if (!value) {
                return;
              }

              setStatusForm((current) => ({
                ...current,
                status: value as DocumentStatusDto
              }));
            }}
          />
          <TextInput
            label="Expiry Date"
            placeholder="YYYY-MM-DD"
            value={statusForm.expiresAt ?? ""}
            onChange={(event) =>
              setStatusForm((current) => ({ ...current, expiresAt: event.currentTarget.value }))
            }
          />
          <Textarea
            label="Review Notes"
            value={statusForm.notes ?? ""}
            onChange={(event) =>
              setStatusForm((current) => ({ ...current, notes: event.currentTarget.value }))
            }
          />
          <Button onClick={handleStatusUpdate} loading={isPending} color="indigo">
            Update Review Status
          </Button>
        </Stack>
      </Card>

      {feedback ? (
        <Card radius="lg" p="lg" className="border border-white/20 bg-white/5 lg:col-span-2">
          <Text c="rgba(255,255,255,0.85)">{feedback}</Text>
          <Text c="rgba(255,255,255,0.55)" size="sm">
            Live mutations require NEXT_PUBLIC_DEMO_AUTH_TOKEN to be configured in the web app.
          </Text>
        </Card>
      ) : null}
    </SimpleGrid>
  );
}
