"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Badge,
  Button,
  Card,
  Group,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title
} from "@mantine/core";
import type {
  CreateEventDto,
  EventCategoryDto,
  EventStatusDto,
  InternationalEventDto,
  UpdateEventStatusDto
} from "@contracts/index";
import {
  createInternationalEvent,
  eventCategoryOptions,
  eventStatusOptions,
  updateInternationalEventStatus
} from "../lib/api";

interface EventWorkflowPanelProps {
  events: InternationalEventDto[];
}

const emptyCreateEventForm: CreateEventDto = {
  title: "",
  category: "SEMINAR",
  format: "Hybrid",
  hostCountry: "",
  venue: "",
  organizer: "",
  registrationDeadline: "",
  startDate: "",
  endDate: "",
  capacity: 0,
  speaker: "",
  notes: ""
};

export function EventWorkflowPanel({ events }: EventWorkflowPanelProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [createForm, setCreateForm] = useState<CreateEventDto>(emptyCreateEventForm);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(events[0]?.id ?? null);
  const [statusForm, setStatusForm] = useState<UpdateEventStatusDto>({
    status: events[0]?.status ?? "PLANNED",
    registeredCount: events[0]?.registeredCount ?? 0,
    registrationDeadline: events[0]?.registrationDeadline ?? "",
    notes: events[0]?.notes ?? ""
  });

  const refreshPage = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleEventSelection = (eventId: string | null) => {
    setSelectedEventId(eventId);
    const selectedEvent = events.find((event) => event.id === eventId);
    if (!selectedEvent) {
      return;
    }

    setStatusForm({
      status: selectedEvent.status,
      registeredCount: selectedEvent.registeredCount,
      registrationDeadline: selectedEvent.registrationDeadline ?? "",
      notes: selectedEvent.notes ?? ""
    });
  };

  const handleCreate = async () => {
    setFeedback(null);

    try {
      const created = await createInternationalEvent({
        ...createForm,
        registrationDeadline: createForm.registrationDeadline || undefined,
        speaker: createForm.speaker || undefined,
        notes: createForm.notes || undefined
      });

      if (!created) {
        setFeedback("Event creation request was rejected by the API.");
        return;
      }

      setCreateForm(emptyCreateEventForm);
      setFeedback(`Created outreach event: ${created.title}.`);
      refreshPage();
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Event creation failed.");
    }
  };

  const handleStatusUpdate = async () => {
    if (!selectedEventId) {
      setFeedback("Select an event before updating status.");
      return;
    }

    setFeedback(null);

    try {
      const updated = await updateInternationalEventStatus(selectedEventId, {
        status: statusForm.status,
        registeredCount: statusForm.registeredCount,
        registrationDeadline: statusForm.registrationDeadline || undefined,
        notes: statusForm.notes || undefined
      });

      if (!updated) {
        setFeedback("Event status update request was rejected by the API.");
        return;
      }

      setFeedback(`Updated ${updated.title} to ${updated.status}.`);
      refreshPage();
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Event status update failed.");
    }
  };

  return (
    <Stack gap="md">
      <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
        <Stack gap="sm">
          <Group justify="space-between">
            <Title order={3} c="white">Create Event / Delegation</Title>
            <Badge color="indigo" variant="light">Outreach planning</Badge>
          </Group>
          <TextInput
            label="Title"
            value={createForm.title}
            onChange={(event) => setCreateForm((current) => ({ ...current, title: event.currentTarget.value }))}
          />
          <Group grow>
            <Select
              label="Category"
              value={createForm.category}
              data={eventCategoryOptions}
              onChange={(value) => {
                if (!value) {
                  return;
                }

                setCreateForm((current) => ({ ...current, category: value as EventCategoryDto }));
              }}
            />
            <TextInput
              label="Format"
              value={createForm.format}
              onChange={(event) => setCreateForm((current) => ({ ...current, format: event.currentTarget.value }))}
            />
          </Group>
          <Group grow>
            <TextInput
              label="Host Country"
              value={createForm.hostCountry}
              onChange={(event) =>
                setCreateForm((current) => ({ ...current, hostCountry: event.currentTarget.value }))
              }
            />
            <TextInput
              label="Venue"
              value={createForm.venue}
              onChange={(event) => setCreateForm((current) => ({ ...current, venue: event.currentTarget.value }))}
            />
          </Group>
          <TextInput
            label="Organizer"
            value={createForm.organizer}
            onChange={(event) => setCreateForm((current) => ({ ...current, organizer: event.currentTarget.value }))}
          />
          <Group grow>
            <TextInput
              label="Registration Deadline"
              placeholder="YYYY-MM-DD"
              value={createForm.registrationDeadline ?? ""}
              onChange={(event) =>
                setCreateForm((current) => ({ ...current, registrationDeadline: event.currentTarget.value }))
              }
            />
            <NumberInput
              label="Capacity"
              min={0}
              value={createForm.capacity}
              onChange={(value) =>
                setCreateForm((current) => ({ ...current, capacity: typeof value === "number" ? value : 0 }))
              }
            />
          </Group>
          <Group grow>
            <TextInput
              label="Start DateTime (ISO)"
              placeholder="2026-08-20T10:00:00.000Z"
              value={createForm.startDate}
              onChange={(event) => setCreateForm((current) => ({ ...current, startDate: event.currentTarget.value }))}
            />
            <TextInput
              label="End DateTime (ISO)"
              placeholder="2026-08-20T13:00:00.000Z"
              value={createForm.endDate}
              onChange={(event) => setCreateForm((current) => ({ ...current, endDate: event.currentTarget.value }))}
            />
          </Group>
          <TextInput
            label="Speaker / Delegation"
            value={createForm.speaker ?? ""}
            onChange={(event) => setCreateForm((current) => ({ ...current, speaker: event.currentTarget.value }))}
          />
          <Textarea
            label="Notes"
            value={createForm.notes ?? ""}
            onChange={(event) => setCreateForm((current) => ({ ...current, notes: event.currentTarget.value }))}
          />
          <Button onClick={handleCreate} loading={isPending} color="indigo">Create Event</Button>
        </Stack>
      </Card>

      <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
        <Stack gap="sm">
          <Group justify="space-between">
            <Title order={3} c="white">Update Event Status</Title>
            <Badge color="blue" variant="light">Execution workflow</Badge>
          </Group>
          <Select
            label="Event"
            value={selectedEventId}
            data={events.map((event) => ({ value: event.id, label: event.title }))}
            onChange={handleEventSelection}
          />
          <Select
            label="Status"
            value={statusForm.status}
            data={eventStatusOptions}
            onChange={(value) => {
              if (!value) {
                return;
              }

              setStatusForm((current) => ({ ...current, status: value as EventStatusDto }));
            }}
          />
          <Group grow>
            <NumberInput
              label="Registered Count"
              min={0}
              value={statusForm.registeredCount ?? 0}
              onChange={(value) =>
                setStatusForm((current) => ({
                  ...current,
                  registeredCount: typeof value === "number" ? value : 0
                }))
              }
            />
            <TextInput
              label="Registration Deadline"
              placeholder="YYYY-MM-DD"
              value={statusForm.registrationDeadline ?? ""}
              onChange={(event) =>
                setStatusForm((current) => ({ ...current, registrationDeadline: event.currentTarget.value }))
              }
            />
          </Group>
          <Textarea
            label="Notes"
            value={statusForm.notes ?? ""}
            onChange={(event) => setStatusForm((current) => ({ ...current, notes: event.currentTarget.value }))}
          />
          <Button onClick={handleStatusUpdate} loading={isPending} color="blue">Update Event</Button>
          {feedback ? (
            <Text c="rgba(255,255,255,0.8)" size="sm">{feedback}</Text>
          ) : null}
        </Stack>
      </Card>
    </Stack>
  );
}
