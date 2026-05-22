"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Badge,
  Button,
  Card,
  Group,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title
} from "@mantine/core";
import type {
  CreateSupportRequestDto,
  SupportRequestCategoryDto,
  SupportRequestDto,
  SupportRequestStatusDto,
  UpdateSupportRequestDto
} from "@contracts/index";
import {
  createSupportRequest,
  supportRequestCategoryOptions,
  supportRequestStatusOptions,
  updateSupportRequest
} from "../lib/api";

interface SupportWorkflowPanelProps {
  studentId: string;
  requests: SupportRequestDto[];
}

const emptyCreateForm: CreateSupportRequestDto = {
  studentProfileId: "student-1",
  category: "PRE_ARRIVAL",
  title: "",
  details: "",
  assignedTeam: ""
};

export function SupportWorkflowPanel({ studentId, requests }: SupportWorkflowPanelProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [createForm, setCreateForm] = useState<CreateSupportRequestDto>({
    ...emptyCreateForm,
    studentProfileId: studentId
  });
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(requests[0]?.id ?? null);
  const [updateForm, setUpdateForm] = useState<UpdateSupportRequestDto>({
    status: requests[0]?.status ?? "REQUESTED",
    assignedTeam: requests[0]?.assignedTeam ?? "",
    appointmentDate: requests[0]?.appointmentDate?.slice(0, 10) ?? "",
    completionNotes: requests[0]?.completionNotes ?? ""
  });

  const refreshPage = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleRequestSelection = (requestId: string | null) => {
    setSelectedRequestId(requestId);
    const selectedRequest = requests.find((request) => request.id === requestId);
    if (!selectedRequest) {
      return;
    }

    setUpdateForm({
      status: selectedRequest.status,
      assignedTeam: selectedRequest.assignedTeam ?? "",
      appointmentDate: selectedRequest.appointmentDate?.slice(0, 10) ?? "",
      completionNotes: selectedRequest.completionNotes ?? ""
    });
  };

  const handleCreate = async () => {
    setFeedback(null);

    try {
      const created = await createSupportRequest({
        ...createForm,
        assignedTeam: createForm.assignedTeam || undefined
      });

      if (!created) {
        setFeedback("Support request creation was rejected by the API.");
        return;
      }

      setCreateForm({ ...emptyCreateForm, studentProfileId: studentId });
      setFeedback(`Created support request: ${created.title}.`);
      refreshPage();
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Support request creation failed.");
    }
  };

  const handleUpdate = async () => {
    if (!selectedRequestId) {
      setFeedback("Select a support request before updating status.");
      return;
    }

    setFeedback(null);

    try {
      const updated = await updateSupportRequest(selectedRequestId, {
        status: updateForm.status,
        assignedTeam: updateForm.assignedTeam || undefined,
        appointmentDate: updateForm.appointmentDate || undefined,
        completionNotes: updateForm.completionNotes || undefined
      });

      if (!updated) {
        setFeedback("Support request update was rejected by the API.");
        return;
      }

      setFeedback(`Updated support request ${updated.id} to ${updated.status}.`);
      refreshPage();
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Support request update failed.");
    }
  };

  return (
    <Stack gap="md">
      <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
        <Stack gap="sm">
          <Group justify="space-between">
            <Title order={3} c="white">Raise Student Support Request</Title>
            <Badge color="indigo" variant="light">Module 6 workflow</Badge>
          </Group>
          <Select
            label="Category"
            value={createForm.category}
            data={supportRequestCategoryOptions}
            onChange={(value) => {
              if (!value) {
                return;
              }

              setCreateForm((current) => ({
                ...current,
                category: value as SupportRequestCategoryDto
              }));
            }}
          />
          <TextInput
            label="Title"
            value={createForm.title}
            onChange={(event) => setCreateForm((current) => ({ ...current, title: event.currentTarget.value }))}
          />
          <Textarea
            label="Details"
            minRows={3}
            value={createForm.details}
            onChange={(event) =>
              setCreateForm((current) => ({ ...current, details: event.currentTarget.value }))
            }
          />
          <TextInput
            label="Assigned Team"
            value={createForm.assignedTeam ?? ""}
            onChange={(event) =>
              setCreateForm((current) => ({ ...current, assignedTeam: event.currentTarget.value }))
            }
          />
          <Button onClick={handleCreate} loading={isPending} color="indigo">Create Support Request</Button>
        </Stack>
      </Card>

      <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
        <Stack gap="sm">
          <Group justify="space-between">
            <Title order={3} c="white">Update Support Request</Title>
            <Badge color="blue" variant="light">Service operations</Badge>
          </Group>
          <Select
            label="Support Request"
            value={selectedRequestId}
            data={requests.map((request) => ({
              value: request.id,
              label: `${request.title} (${request.category})`
            }))}
            onChange={handleRequestSelection}
          />
          <Select
            label="Status"
            value={updateForm.status}
            data={supportRequestStatusOptions}
            onChange={(value) => {
              if (!value) {
                return;
              }

              setUpdateForm((current) => ({
                ...current,
                status: value as SupportRequestStatusDto
              }));
            }}
          />
          <TextInput
            label="Assigned Team"
            value={updateForm.assignedTeam ?? ""}
            onChange={(event) =>
              setUpdateForm((current) => ({ ...current, assignedTeam: event.currentTarget.value }))
            }
          />
          <TextInput
            label="Appointment Date"
            placeholder="YYYY-MM-DD"
            value={updateForm.appointmentDate ?? ""}
            onChange={(event) =>
              setUpdateForm((current) => ({ ...current, appointmentDate: event.currentTarget.value }))
            }
          />
          <Textarea
            label="Completion Notes"
            value={updateForm.completionNotes ?? ""}
            onChange={(event) =>
              setUpdateForm((current) => ({ ...current, completionNotes: event.currentTarget.value }))
            }
          />
          <Button onClick={handleUpdate} loading={isPending} color="blue">Update Support Request</Button>
          {feedback ? (
            <Text c="rgba(255,255,255,0.8)" size="sm">{feedback}</Text>
          ) : null}
        </Stack>
      </Card>
    </Stack>
  );
}
