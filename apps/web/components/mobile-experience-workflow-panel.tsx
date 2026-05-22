"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Badge, Button, Card, Group, Select, Stack, Text, TextInput, Textarea, Title } from "@mantine/core";
import type { CreateMobileFeedbackDto, MobileFeedbackDto, MobileFeedbackStatusDto } from "@contracts/index";
import { createMobileFeedback, mobileFeedbackStatusOptions, updateMobileFeedbackStatus } from "../lib/api";

interface MobileExperienceWorkflowPanelProps {
  studentId: string;
  feedbackItems: MobileFeedbackDto[];
}

export function MobileExperienceWorkflowPanel({ studentId, feedbackItems }: MobileExperienceWorkflowPanelProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [form, setForm] = useState<CreateMobileFeedbackDto>({ studentProfileId: studentId, featureArea: "", feedback: "", rating: 5 });
  const [selectedId, setSelectedId] = useState<string | null>(feedbackItems[0]?.id ?? null);
  const [status, setStatus] = useState<MobileFeedbackStatusDto>(feedbackItems[0]?.status ?? "NEW");

  const refresh = () => startTransition(() => router.refresh());

  const submitFeedback = async () => {
    const created = await createMobileFeedback(form);
    if (!created) { setMessage("Feedback creation rejected by API."); return; }
    setMessage(`Submitted feedback for ${created.featureArea}.`);
    setForm({ studentProfileId: studentId, featureArea: "", feedback: "", rating: 5 });
    refresh();
  };

  const updateStatus = async () => {
    if (!selectedId) { setMessage("Select feedback to update."); return; }
    const updated = await updateMobileFeedbackStatus(selectedId, { status });
    if (!updated) { setMessage("Feedback status update rejected by API."); return; }
    setMessage(`Updated feedback to ${updated.status}.`);
    refresh();
  };

  return (
    <Stack gap="md">
      <Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Stack gap="sm"><Group justify="space-between"><Title order={3} c="white">Submit Mobile Feedback</Title><Badge color="indigo" variant="light">Module 14</Badge></Group><TextInput label="Feature Area" value={form.featureArea} onChange={(event) => setForm((current) => ({ ...current, featureArea: event.currentTarget.value }))} /><Textarea label="Feedback" value={form.feedback} onChange={(event) => setForm((current) => ({ ...current, feedback: event.currentTarget.value }))} /><TextInput label="Rating (1-5)" value={String(form.rating)} onChange={(event) => setForm((current) => ({ ...current, rating: Number(event.currentTarget.value) || 1 }))} /><Button onClick={submitFeedback} loading={isPending}>Submit Feedback</Button></Stack></Card>
      <Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Stack gap="sm"><Title order={3} c="white">Update Feedback Status</Title><Select label="Feedback" value={selectedId} data={feedbackItems.map((item) => ({ value: item.id, label: `${item.featureArea} (${item.createdAt})` }))} onChange={(value) => { setSelectedId(value); const selected = feedbackItems.find((item) => item.id === value); if (selected) { setStatus(selected.status); } }} /><Select label="Status" value={status} data={mobileFeedbackStatusOptions} onChange={(value) => { if (!value) { return; } setStatus(value as MobileFeedbackStatusDto); }} /><Button onClick={updateStatus} loading={isPending} color="blue">Update Status</Button>{message ? <Text c="rgba(255,255,255,0.8)" size="sm">{message}</Text> : null}</Stack></Card>
    </Stack>
  );
}
