"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Badge, Button, Card, Group, Select, Stack, Text, TextInput, Textarea, Title } from "@mantine/core";
import type { StudentVisaCaseDto, UpdateVisaCaseDto, VisaStageDto } from "@contracts/index";
import { updateVisaCase } from "../lib/api";

const visaStageOptions: VisaStageDto[] = [
  "NOT_STARTED",
  "DOCUMENT_COLLECTION",
  "APPOINTMENT_BOOKED",
  "BIOMETRICS_COMPLETED",
  "INTERVIEW_SCHEDULED",
  "UNDER_PROCESS",
  "APPROVED",
  "REJECTED"
];

interface VisaWorkflowPanelProps {
  visaCases: StudentVisaCaseDto[];
}

export function VisaWorkflowPanel({ visaCases }: VisaWorkflowPanelProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [selectedVisaCaseId, setSelectedVisaCaseId] = useState<string | null>(visaCases[0]?.id ?? null);
  const [form, setForm] = useState<UpdateVisaCaseDto>({
    currentStage: visaCases[0]?.currentStage ?? "NOT_STARTED",
    appointmentDate: visaCases[0]?.appointmentDate ?? "",
    biometricsDate: visaCases[0]?.biometricsDate ?? "",
    interviewDate: visaCases[0]?.interviewDate ?? "",
    decisionDate: visaCases[0]?.decisionDate ?? "",
    notes: visaCases[0]?.notes ?? ""
  });

  const applySelectedCase = (visaCaseId: string | null) => {
    setSelectedVisaCaseId(visaCaseId);
    const visaCase = visaCases.find((item) => item.id === visaCaseId) ?? null;
    if (!visaCase) {
      return;
    }

    setForm({
      currentStage: visaCase.currentStage,
      appointmentDate: visaCase.appointmentDate ?? "",
      biometricsDate: visaCase.biometricsDate ?? "",
      interviewDate: visaCase.interviewDate ?? "",
      decisionDate: visaCase.decisionDate ?? "",
      notes: visaCase.notes ?? ""
    });
  };

  const runRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleUpdate = async () => {
    if (!selectedVisaCaseId) {
      setFeedback("Select a visa case before updating workflow stages.");
      return;
    }

    setFeedback(null);

    try {
      const updated = await updateVisaCase(selectedVisaCaseId, {
        currentStage: form.currentStage,
        appointmentDate: form.appointmentDate || undefined,
        biometricsDate: form.biometricsDate || undefined,
        interviewDate: form.interviewDate || undefined,
        decisionDate: form.decisionDate || undefined,
        notes: form.notes || undefined
      });

      if (!updated) {
        setFeedback("Visa workflow update request was rejected by the API.");
        return;
      }

      setFeedback(`Updated ${updated.country} visa case to ${updated.currentStage}.`);
      runRefresh();
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Visa workflow update failed.");
    }
  };

  return (
    <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
      <Stack gap="sm">
        <Group justify="space-between">
          <Title order={3} c="white">
            Visa Workflow Actions
          </Title>
          <Badge color="indigo" variant="light">
            Milestone control
          </Badge>
        </Group>
        <Select
          label="Visa Case"
          value={selectedVisaCaseId}
          data={visaCases.map((visaCase) => ({
            value: visaCase.id,
            label: `${visaCase.country} - ${visaCase.visaType}`
          }))}
          onChange={applySelectedCase}
        />
        <Select
          label="Current Stage"
          value={form.currentStage}
          data={visaStageOptions}
          onChange={(value) => {
            if (!value) {
              return;
            }

            setForm((current) => ({ ...current, currentStage: value as VisaStageDto }));
          }}
        />
        <TextInput
          label="Appointment Date"
          placeholder="YYYY-MM-DD"
          value={form.appointmentDate ?? ""}
          onChange={(event) => setForm((current) => ({ ...current, appointmentDate: event.currentTarget.value }))}
        />
        <TextInput
          label="Biometrics Date"
          placeholder="YYYY-MM-DD"
          value={form.biometricsDate ?? ""}
          onChange={(event) => setForm((current) => ({ ...current, biometricsDate: event.currentTarget.value }))}
        />
        <TextInput
          label="Interview Date"
          placeholder="YYYY-MM-DD"
          value={form.interviewDate ?? ""}
          onChange={(event) => setForm((current) => ({ ...current, interviewDate: event.currentTarget.value }))}
        />
        <TextInput
          label="Decision Date"
          placeholder="YYYY-MM-DD"
          value={form.decisionDate ?? ""}
          onChange={(event) => setForm((current) => ({ ...current, decisionDate: event.currentTarget.value }))}
        />
        <Textarea
          label="Notes"
          value={form.notes ?? ""}
          onChange={(event) => setForm((current) => ({ ...current, notes: event.currentTarget.value }))}
        />
        <Button onClick={handleUpdate} loading={isPending} color="indigo">
          Update Visa Workflow
        </Button>
        {feedback ? (
          <Text c="rgba(255,255,255,0.8)" size="sm">
            {feedback}
          </Text>
        ) : null}
      </Stack>
    </Card>
  );
}
