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
  CreateTicketDto,
  SupportTicketDto,
  TicketCategoryDto,
  TicketPriorityDto,
  TicketStatusDto,
  UpdateTicketStatusDto
} from "@contracts/index";
import {
  createSupportTicket,
  ticketCategoryOptions,
  ticketPriorityOptions,
  ticketStatusOptions,
  updateSupportTicketStatus
} from "../lib/api";

interface TicketWorkflowPanelProps {
  tickets: SupportTicketDto[];
}

const emptyCreateTicketForm: CreateTicketDto = {
  studentProfileId: "student-1",
  raisedByName: "",
  raisedByEmail: "",
  category: "GENERAL_SUPPORT",
  subject: "",
  description: "",
  priority: "MEDIUM",
  assignedTeam: "",
  dueDate: ""
};

export function TicketWorkflowPanel({ tickets }: TicketWorkflowPanelProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [createForm, setCreateForm] = useState<CreateTicketDto>(emptyCreateTicketForm);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(tickets[0]?.id ?? null);
  const [statusForm, setStatusForm] = useState<UpdateTicketStatusDto>({
    status: tickets[0]?.status ?? "OPEN",
    assignedTeam: tickets[0]?.assignedTeam ?? "",
    resolutionNotes: tickets[0]?.resolutionNotes ?? "",
    dueDate: tickets[0]?.dueDate ?? ""
  });

  const refreshPage = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleTicketSelection = (ticketId: string | null) => {
    setSelectedTicketId(ticketId);
    const selectedTicket = tickets.find((ticket) => ticket.id === ticketId);
    if (!selectedTicket) {
      return;
    }

    setStatusForm({
      status: selectedTicket.status,
      assignedTeam: selectedTicket.assignedTeam ?? "",
      resolutionNotes: selectedTicket.resolutionNotes ?? "",
      dueDate: selectedTicket.dueDate ?? ""
    });
  };

  const handleCreate = async () => {
    setFeedback(null);

    try {
      const created = await createSupportTicket({
        ...createForm,
        studentProfileId: createForm.studentProfileId || undefined,
        assignedTeam: createForm.assignedTeam || undefined,
        dueDate: createForm.dueDate || undefined
      });

      if (!created) {
        setFeedback("Ticket creation request was rejected by the API.");
        return;
      }

      setCreateForm(emptyCreateTicketForm);
      setFeedback(`Created ticket: ${created.subject}.`);
      refreshPage();
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Ticket creation failed.");
    }
  };

  const handleStatusUpdate = async () => {
    if (!selectedTicketId) {
      setFeedback("Select a ticket before updating status.");
      return;
    }

    setFeedback(null);

    try {
      const updated = await updateSupportTicketStatus(selectedTicketId, {
        status: statusForm.status,
        assignedTeam: statusForm.assignedTeam || undefined,
        resolutionNotes: statusForm.resolutionNotes || undefined,
        dueDate: statusForm.dueDate || undefined
      });

      if (!updated) {
        setFeedback("Ticket status update request was rejected by the API.");
        return;
      }

      setFeedback(`Updated ticket ${updated.id} to ${updated.status}.`);
      refreshPage();
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Ticket status update failed.");
    }
  };

  return (
    <Stack gap="md">
      <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
        <Stack gap="sm">
          <Group justify="space-between">
            <Title order={3} c="white">Raise Support Ticket</Title>
            <Badge color="indigo" variant="light">Student + team support</Badge>
          </Group>
          <Group grow>
            <TextInput
              label="Raised By"
              value={createForm.raisedByName}
              onChange={(event) =>
                setCreateForm((current) => ({ ...current, raisedByName: event.currentTarget.value }))
              }
            />
            <TextInput
              label="Email"
              value={createForm.raisedByEmail}
              onChange={(event) =>
                setCreateForm((current) => ({ ...current, raisedByEmail: event.currentTarget.value }))
              }
            />
          </Group>
          <Group grow>
            <Select
              label="Category"
              value={createForm.category}
              data={ticketCategoryOptions}
              onChange={(value) => {
                if (!value) {
                  return;
                }

                setCreateForm((current) => ({ ...current, category: value as TicketCategoryDto }));
              }}
            />
            <Select
              label="Priority"
              value={createForm.priority}
              data={ticketPriorityOptions}
              onChange={(value) => {
                if (!value) {
                  return;
                }

                setCreateForm((current) => ({ ...current, priority: value as TicketPriorityDto }));
              }}
            />
          </Group>
          <TextInput
            label="Subject"
            value={createForm.subject}
            onChange={(event) => setCreateForm((current) => ({ ...current, subject: event.currentTarget.value }))}
          />
          <Textarea
            label="Description"
            minRows={3}
            value={createForm.description}
            onChange={(event) =>
              setCreateForm((current) => ({ ...current, description: event.currentTarget.value }))
            }
          />
          <Group grow>
            <TextInput
              label="Assigned Team"
              value={createForm.assignedTeam ?? ""}
              onChange={(event) =>
                setCreateForm((current) => ({ ...current, assignedTeam: event.currentTarget.value }))
              }
            />
            <TextInput
              label="Due Date"
              placeholder="YYYY-MM-DD"
              value={createForm.dueDate ?? ""}
              onChange={(event) => setCreateForm((current) => ({ ...current, dueDate: event.currentTarget.value }))}
            />
          </Group>
          <Button onClick={handleCreate} loading={isPending} color="indigo">Create Ticket</Button>
        </Stack>
      </Card>

      <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
        <Stack gap="sm">
          <Group justify="space-between">
            <Title order={3} c="white">Ticket Status Workflow</Title>
            <Badge color="blue" variant="light">Resolution pipeline</Badge>
          </Group>
          <Select
            label="Ticket"
            value={selectedTicketId}
            data={tickets.map((ticket) => ({ value: ticket.id, label: `${ticket.subject} (${ticket.id})` }))}
            onChange={handleTicketSelection}
          />
          <Select
            label="Status"
            value={statusForm.status}
            data={ticketStatusOptions}
            onChange={(value) => {
              if (!value) {
                return;
              }

              setStatusForm((current) => ({ ...current, status: value as TicketStatusDto }));
            }}
          />
          <Group grow>
            <TextInput
              label="Assigned Team"
              value={statusForm.assignedTeam ?? ""}
              onChange={(event) =>
                setStatusForm((current) => ({ ...current, assignedTeam: event.currentTarget.value }))
              }
            />
            <TextInput
              label="Due Date"
              placeholder="YYYY-MM-DD"
              value={statusForm.dueDate ?? ""}
              onChange={(event) => setStatusForm((current) => ({ ...current, dueDate: event.currentTarget.value }))}
            />
          </Group>
          <Textarea
            label="Resolution Notes"
            value={statusForm.resolutionNotes ?? ""}
            onChange={(event) =>
              setStatusForm((current) => ({ ...current, resolutionNotes: event.currentTarget.value }))
            }
          />
          <Button onClick={handleStatusUpdate} loading={isPending} color="blue">Update Ticket</Button>
          {feedback ? (
            <Text c="rgba(255,255,255,0.8)" size="sm">{feedback}</Text>
          ) : null}
        </Stack>
      </Card>
    </Stack>
  );
}
