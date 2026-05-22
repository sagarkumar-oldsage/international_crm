"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Badge, Button, Card, Group, Select, Stack, Text, TextInput, Title } from "@mantine/core";
import type {
  CreateShortlistDto,
  DiscoveryShortlistDto,
  DiscoveryShortlistStatusDto,
  UniversityDiscoveryDto
} from "@contracts/index";
import { createShortlist, discoveryShortlistStatusOptions, updateShortlistStatus } from "../lib/api";

interface DiscoveryWorkflowPanelProps {
  studentId: string;
  universities: UniversityDiscoveryDto[];
  shortlists: DiscoveryShortlistDto[];
}

export function DiscoveryWorkflowPanel({ studentId, universities, shortlists }: DiscoveryWorkflowPanelProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [form, setForm] = useState<CreateShortlistDto>({ studentProfileId: studentId, universityId: universities[0]?.id ?? "", notes: "" });
  const [selectedShortlistId, setSelectedShortlistId] = useState<string | null>(shortlists[0]?.id ?? null);
  const [status, setStatus] = useState<DiscoveryShortlistStatusDto>(shortlists[0]?.status ?? "SHORTLISTED");
  const [notes, setNotes] = useState<string>(shortlists[0]?.notes ?? "");

  const refresh = () => startTransition(() => router.refresh());

  const addShortlist = async () => {
    const created = await createShortlist({ ...form, notes: form.notes || undefined });
    if (!created) { setMessage("Shortlist creation rejected by API."); return; }
    setMessage(`Added ${created.universityName} to shortlist.`);
    refresh();
  };

  const updateStatus = async () => {
    if (!selectedShortlistId) { setMessage("Select shortlist item to update."); return; }
    const updated = await updateShortlistStatus(selectedShortlistId, { status, notes: notes || undefined });
    if (!updated) { setMessage("Shortlist update rejected by API."); return; }
    setMessage(`Updated shortlist to ${updated.status}.`);
    refresh();
  };

  return (
    <Stack gap="md">
      <Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Stack gap="sm"><Group justify="space-between"><Title order={3} c="white">Add University to Shortlist</Title><Badge color="indigo" variant="light">Module 16</Badge></Group><Select label="University" value={form.universityId} data={universities.map((uni) => ({ value: uni.id, label: `${uni.universityName} (${uni.country})` }))} onChange={(value) => { if (!value) { return; } setForm((current) => ({ ...current, universityId: value })); }} /><TextInput label="Notes" value={form.notes ?? ""} onChange={(event) => setForm((current) => ({ ...current, notes: event.currentTarget.value }))} /><Button onClick={addShortlist} loading={isPending}>Add Shortlist</Button></Stack></Card>
      <Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Stack gap="sm"><Title order={3} c="white">Update Shortlist Status</Title><Select label="Shortlist Item" value={selectedShortlistId} data={shortlists.map((item) => ({ value: item.id, label: `${item.universityName} (${item.status})` }))} onChange={(value) => { setSelectedShortlistId(value); const selected = shortlists.find((item) => item.id === value); if (selected) { setStatus(selected.status); setNotes(selected.notes ?? ""); } }} /><Select label="Status" value={status} data={discoveryShortlistStatusOptions} onChange={(value) => { if (!value) { return; } setStatus(value as DiscoveryShortlistStatusDto); }} /><TextInput label="Notes" value={notes} onChange={(event) => setNotes(event.currentTarget.value)} /><Button onClick={updateStatus} loading={isPending} color="blue">Update Shortlist</Button>{message ? <Text c="rgba(255,255,255,0.8)" size="sm">{message}</Text> : null}</Stack></Card>
    </Stack>
  );
}
