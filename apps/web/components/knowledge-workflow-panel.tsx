"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Badge, Button, Card, Group, Select, Stack, Text, TextInput, Title } from "@mantine/core";
import type {
  CreateKnowledgeArticleDto,
  LearningTrackDto,
  LearningTrackStatusDto
} from "@contracts/index";
import {
  createKnowledgeArticle,
  learningTrackStatusOptions,
  updateLearningTrack
} from "../lib/api";

interface KnowledgeWorkflowPanelProps {
  tracks: LearningTrackDto[];
}

export function KnowledgeWorkflowPanel({ tracks }: KnowledgeWorkflowPanelProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [form, setForm] = useState<CreateKnowledgeArticleDto>({
    title: "",
    category: "Mobility",
    audience: "Outbound Students",
    readTimeMinutes: 5
  });
  const [trackId, setTrackId] = useState<string | null>(tracks[0]?.id ?? null);
  const [progress, setProgress] = useState<number>(tracks[0]?.progressPercentage ?? 0);
  const [status, setStatus] = useState<LearningTrackStatusDto>(tracks[0]?.status ?? "NOT_STARTED");

  const refresh = () => startTransition(() => router.refresh());

  const handleCreate = async () => {
    const created = await createKnowledgeArticle(form);
    if (!created) {
      setFeedback("Article creation rejected by API.");
      return;
    }

    setFeedback(`Created article: ${created.title}`);
    setForm({ title: "", category: "Mobility", audience: "Outbound Students", readTimeMinutes: 5 });
    refresh();
  };

  const handleUpdateTrack = async () => {
    if (!trackId) {
      setFeedback("Select a learning track to update.");
      return;
    }

    const updated = await updateLearningTrack(trackId, { progressPercentage: progress, status });
    if (!updated) {
      setFeedback("Track update rejected by API.");
      return;
    }

    setFeedback(`Updated ${updated.title} to ${updated.progressPercentage}%.`);
    refresh();
  };

  return (
    <Stack gap="md">
      <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
        <Stack gap="sm">
          <Group justify="space-between"><Title order={3} c="white">Create Knowledge Article</Title><Badge color="indigo" variant="light">Module 13</Badge></Group>
          <TextInput label="Title" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.currentTarget.value }))} />
          <TextInput label="Category" value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.currentTarget.value }))} />
          <TextInput label="Audience" value={form.audience} onChange={(event) => setForm((current) => ({ ...current, audience: event.currentTarget.value }))} />
          <TextInput label="Read Time (minutes)" value={String(form.readTimeMinutes)} onChange={(event) => setForm((current) => ({ ...current, readTimeMinutes: Number(event.currentTarget.value) || 1 }))} />
          <Button onClick={handleCreate} loading={isPending}>Create Article</Button>
        </Stack>
      </Card>
      <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
        <Stack gap="sm">
          <Title order={3} c="white">Update Track Progress</Title>
          <Select label="Track" value={trackId} data={tracks.map((track) => ({ value: track.id, label: track.title }))} onChange={(value) => { setTrackId(value); const selected = tracks.find((track) => track.id === value); if (selected) { setProgress(selected.progressPercentage); setStatus(selected.status); } }} />
          <TextInput label="Progress" value={String(progress)} onChange={(event) => setProgress(Number(event.currentTarget.value) || 0)} />
          <Select label="Status" value={status} data={learningTrackStatusOptions} onChange={(value) => { if (!value) { return; } setStatus(value as LearningTrackStatusDto); }} />
          <Button onClick={handleUpdateTrack} loading={isPending} color="blue">Update Track</Button>
          {feedback ? <Text c="rgba(255,255,255,0.8)" size="sm">{feedback}</Text> : null}
        </Stack>
      </Card>
    </Stack>
  );
}
