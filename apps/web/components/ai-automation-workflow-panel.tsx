"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Badge, Button, Card, Group, Select, Stack, Text, TextInput, Textarea, Title } from "@mantine/core";
import type {
  AiRecommendationDto,
  CreateRecommendationDto,
  RecommendationPriorityDto,
  RecommendationStatusDto
} from "@contracts/index";
import {
  createRecommendation,
  recommendationPriorityOptions,
  recommendationStatusOptions,
  updateRecommendationStatus
} from "../lib/api";

interface AiAutomationWorkflowPanelProps {
  studentId: string;
  recommendations: AiRecommendationDto[];
}

export function AiAutomationWorkflowPanel({
  studentId,
  recommendations
}: AiAutomationWorkflowPanelProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [selectedRecommendationId, setSelectedRecommendationId] = useState<string | null>(
    recommendations[0]?.id ?? null
  );
  const [status, setStatus] = useState<RecommendationStatusDto>(recommendations[0]?.status ?? "OPEN");
  const [form, setForm] = useState<CreateRecommendationDto>({
    studentProfileId: studentId,
    title: "",
    reason: "",
    priority: "MEDIUM"
  });

  const refresh = () => {
    startTransition(() => router.refresh());
  };

  const handleCreate = async () => {
    setFeedback(null);
    const created = await createRecommendation(form);
    if (!created) {
      setFeedback("Recommendation creation was rejected by the API.");
      return;
    }

    setForm({ studentProfileId: studentId, title: "", reason: "", priority: "MEDIUM" });
    setFeedback(`Created recommendation: ${created.title}`);
    refresh();
  };

  const handleUpdate = async () => {
    if (!selectedRecommendationId) {
      setFeedback("Select a recommendation to update status.");
      return;
    }

    setFeedback(null);
    const updated = await updateRecommendationStatus(selectedRecommendationId, { status });
    if (!updated) {
      setFeedback("Recommendation update was rejected by the API.");
      return;
    }

    setFeedback(`Updated recommendation to ${updated.status}.`);
    refresh();
  };

  return (
    <Stack gap="md">
      <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
        <Stack gap="sm">
          <Group justify="space-between">
            <Title order={3} c="white">Create AI Recommendation</Title>
            <Badge color="indigo" variant="light">Module 12</Badge>
          </Group>
          <TextInput
            label="Title"
            value={form.title}
            onChange={(event) => setForm((current) => ({ ...current, title: event.currentTarget.value }))}
          />
          <Textarea
            label="Reason"
            value={form.reason}
            onChange={(event) => setForm((current) => ({ ...current, reason: event.currentTarget.value }))}
          />
          <Select
            label="Priority"
            value={form.priority}
            data={recommendationPriorityOptions}
            onChange={(value) => {
              if (!value) {
                return;
              }

              setForm((current) => ({ ...current, priority: value as RecommendationPriorityDto }));
            }}
          />
          <Button onClick={handleCreate} loading={isPending} color="indigo">Create Recommendation</Button>
        </Stack>
      </Card>

      <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
        <Stack gap="sm">
          <Title order={3} c="white">Update Recommendation Status</Title>
          <Select
            label="Recommendation"
            value={selectedRecommendationId}
            data={recommendations.map((item) => ({ value: item.id, label: `${item.title} (${item.priority})` }))}
            onChange={(value) => {
              setSelectedRecommendationId(value);
              const selected = recommendations.find((item) => item.id === value);
              if (selected) {
                setStatus(selected.status);
              }
            }}
          />
          <Select
            label="Status"
            value={status}
            data={recommendationStatusOptions}
            onChange={(value) => {
              if (!value) {
                return;
              }

              setStatus(value as RecommendationStatusDto);
            }}
          />
          <Button onClick={handleUpdate} loading={isPending} color="blue">Update Status</Button>
          {feedback ? <Text c="rgba(255,255,255,0.8)" size="sm">{feedback}</Text> : null}
        </Stack>
      </Card>
    </Stack>
  );
}
