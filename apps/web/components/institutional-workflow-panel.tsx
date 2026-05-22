"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Badge, Button, Card, Group, Select, Stack, Text, TextInput, Title } from "@mantine/core";
import type {
  CreateInitiativeDto,
  InitiativeStatusDto,
  InstitutionalInitiativeDto
} from "@contracts/index";
import { createInitiative, initiativeStatusOptions, updateInitiativeStatus } from "../lib/api";

interface InstitutionalWorkflowPanelProps {
  initiatives: InstitutionalInitiativeDto[];
}

export function InstitutionalWorkflowPanel({ initiatives }: InstitutionalWorkflowPanelProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [form, setForm] = useState<CreateInitiativeDto>({ title: "", owner: "", targetDate: "", notes: "" });
  const [selectedId, setSelectedId] = useState<string | null>(initiatives[0]?.id ?? null);
  const [status, setStatus] = useState<InitiativeStatusDto>(initiatives[0]?.status ?? "PLANNED");
  const [notes, setNotes] = useState<string>(initiatives[0]?.notes ?? "");

  const refresh = () => startTransition(() => router.refresh());

  const handleCreate = async () => {
    const created = await createInitiative(form);
    if (!created) { setMessage("Initiative creation rejected by API."); return; }
    setMessage(`Created initiative: ${created.title}`);
    setForm({ title: "", owner: "", targetDate: "", notes: "" });
    refresh();
  };

  const handleUpdate = async () => {
    if (!selectedId) { setMessage("Select an initiative to update."); return; }
    const updated = await updateInitiativeStatus(selectedId, { status, notes: notes || undefined });
    if (!updated) { setMessage("Initiative update rejected by API."); return; }
    setMessage(`Updated initiative to ${updated.status}.`);
    refresh();
  };

  return (
    <Stack gap="md">
      <Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Stack gap="sm"><Group justify="space-between"><Title order={3} c="white">Create Initiative</Title><Badge color="indigo" variant="light">Module 17</Badge></Group><TextInput label="Title" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.currentTarget.value }))} /><TextInput label="Owner" value={form.owner} onChange={(event) => setForm((current) => ({ ...current, owner: event.currentTarget.value }))} /><TextInput label="Target Date" placeholder="YYYY-MM-DD" value={form.targetDate} onChange={(event) => setForm((current) => ({ ...current, targetDate: event.currentTarget.value }))} /><TextInput label="Notes" value={form.notes} onChange={(event) => setForm((current) => ({ ...current, notes: event.currentTarget.value }))} /><Button onClick={handleCreate} loading={isPending}>Create Initiative</Button></Stack></Card>
      <Card radius="lg" p="lg" className="border border-white/20 bg-white/5"><Stack gap="sm"><Title order={3} c="white">Update Initiative Status</Title><Select label="Initiative" value={selectedId} data={initiatives.map((item) => ({ value: item.id, label: item.title }))} onChange={(value) => { setSelectedId(value); const selected = initiatives.find((item) => item.id === value); if (selected) { setStatus(selected.status); setNotes(selected.notes ?? ""); } }} /><Select label="Status" value={status} data={initiativeStatusOptions} onChange={(value) => { if (!value) { return; } setStatus(value as InitiativeStatusDto); }} /><TextInput label="Notes" value={notes} onChange={(event) => setNotes(event.currentTarget.value)} /><Button onClick={handleUpdate} loading={isPending} color="blue">Update Initiative</Button>{message ? <Text c="rgba(255,255,255,0.8)" size="sm">{message}</Text> : null}</Stack></Card>
    </Stack>
  );
}
