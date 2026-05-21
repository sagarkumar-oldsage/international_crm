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
  CreatePartnerUniversityDto,
  MouStatusDto,
  PartnerUniversityDto,
  UpdatePartnerMouStatusDto
} from "@contracts/index";
import {
  createPartnerUniversity,
  mouStatusOptions,
  updatePartnerMouStatus
} from "../lib/api";

interface PartnershipWorkflowPanelProps {
  partners: PartnerUniversityDto[];
}

const emptyPartnerForm: CreatePartnerUniversityDto = {
  name: "",
  country: "",
  city: "",
  website: "",
  contactPersonName: "",
  contactPersonEmail: "",
  collaborationAreas: [],
  mobilityQuota: 0,
  jointPrograms: [],
  renewalDate: "",
  notes: ""
};

export function PartnershipWorkflowPanel({ partners }: PartnershipWorkflowPanelProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [createForm, setCreateForm] = useState<CreatePartnerUniversityDto>(emptyPartnerForm);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(partners[0]?.id ?? null);
  const [statusForm, setStatusForm] = useState<UpdatePartnerMouStatusDto>({
    mouStatus: partners[0]?.mouStatus ?? "DRAFT",
    renewalDate: partners[0]?.renewalDate ?? "",
    notes: partners[0]?.notes ?? ""
  });

  const refreshPage = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handlePartnerSelection = (partnerId: string | null) => {
    setSelectedPartnerId(partnerId);
    const selectedPartner = partners.find((partner) => partner.id === partnerId);
    if (!selectedPartner) {
      return;
    }

    setStatusForm({
      mouStatus: selectedPartner.mouStatus,
      renewalDate: selectedPartner.renewalDate ?? "",
      notes: selectedPartner.notes ?? ""
    });
  };

  const handleCreatePartner = async () => {
    setFeedback(null);

    try {
      const createdPartner = await createPartnerUniversity({
        ...createForm,
        website: createForm.website || undefined,
        renewalDate: createForm.renewalDate || undefined,
        notes: createForm.notes || undefined
      });

      if (!createdPartner) {
        setFeedback("Partner university creation request was rejected by the API.");
        return;
      }

      setCreateForm(emptyPartnerForm);
      setFeedback(`Created partner profile for ${createdPartner.name}.`);
      refreshPage();
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Partner creation failed.");
    }
  };

  const handleStatusUpdate = async () => {
    if (!selectedPartnerId) {
      setFeedback("Select a partner record before updating MoU status.");
      return;
    }

    setFeedback(null);

    try {
      const updatedPartner = await updatePartnerMouStatus(selectedPartnerId, {
        mouStatus: statusForm.mouStatus,
        renewalDate: statusForm.renewalDate || undefined,
        notes: statusForm.notes || undefined
      });

      if (!updatedPartner) {
        setFeedback("MoU status update request was rejected by the API.");
        return;
      }

      setFeedback(`Updated ${updatedPartner.name} to ${updatedPartner.mouStatus}.`);
      refreshPage();
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "MoU status update failed.");
    }
  };

  return (
    <Stack gap="md">
      <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
        <Stack gap="sm">
          <Group justify="space-between">
            <Title order={3} c="white">
              Add Partner University
            </Title>
            <Badge color="indigo" variant="light">
              CRM intake
            </Badge>
          </Group>
          <TextInput
            label="University Name"
            value={createForm.name}
            onChange={(event) =>
              setCreateForm((current) => ({ ...current, name: event.currentTarget.value }))
            }
          />
          <Group grow>
            <TextInput
              label="Country"
              value={createForm.country}
              onChange={(event) =>
                setCreateForm((current) => ({ ...current, country: event.currentTarget.value }))
              }
            />
            <TextInput
              label="City"
              value={createForm.city}
              onChange={(event) =>
                setCreateForm((current) => ({ ...current, city: event.currentTarget.value }))
              }
            />
          </Group>
          <TextInput
            label="Website"
            placeholder="https://example.edu"
            value={createForm.website ?? ""}
            onChange={(event) =>
              setCreateForm((current) => ({ ...current, website: event.currentTarget.value }))
            }
          />
          <Group grow>
            <TextInput
              label="Primary Contact"
              value={createForm.contactPersonName}
              onChange={(event) =>
                setCreateForm((current) => ({ ...current, contactPersonName: event.currentTarget.value }))
              }
            />
            <TextInput
              label="Contact Email"
              value={createForm.contactPersonEmail}
              onChange={(event) =>
                setCreateForm((current) => ({ ...current, contactPersonEmail: event.currentTarget.value }))
              }
            />
          </Group>
          <TextInput
            label="Collaboration Areas"
            placeholder="Student Exchange, Joint Research"
            value={createForm.collaborationAreas.join(", ")}
            onChange={(event) =>
              setCreateForm((current) => ({
                ...current,
                collaborationAreas: event.currentTarget.value
                  .split(",")
                  .map((value) => value.trim())
                  .filter(Boolean)
              }))
            }
          />
          <TextInput
            label="Joint Programs"
            placeholder="Semester Abroad, Innovation Lab"
            value={createForm.jointPrograms.join(", ")}
            onChange={(event) =>
              setCreateForm((current) => ({
                ...current,
                jointPrograms: event.currentTarget.value
                  .split(",")
                  .map((value) => value.trim())
                  .filter(Boolean)
              }))
            }
          />
          <Group grow align="end">
            <NumberInput
              label="Mobility Quota"
              min={0}
              value={createForm.mobilityQuota}
              onChange={(value) =>
                setCreateForm((current) => ({
                  ...current,
                  mobilityQuota: typeof value === "number" ? value : 0
                }))
              }
            />
            <TextInput
              label="Renewal Date"
              placeholder="YYYY-MM-DD"
              value={createForm.renewalDate ?? ""}
              onChange={(event) =>
                setCreateForm((current) => ({ ...current, renewalDate: event.currentTarget.value }))
              }
            />
          </Group>
          <Textarea
            label="Notes"
            value={createForm.notes ?? ""}
            onChange={(event) =>
              setCreateForm((current) => ({ ...current, notes: event.currentTarget.value }))
            }
          />
          <Button onClick={handleCreatePartner} loading={isPending} color="indigo">
            Create Partner Record
          </Button>
        </Stack>
      </Card>

      <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
        <Stack gap="sm">
          <Group justify="space-between">
            <Title order={3} c="white">
              Update MoU Lifecycle
            </Title>
            <Badge color="blue" variant="light">
              Status workflow
            </Badge>
          </Group>
          <Select
            label="Partner University"
            value={selectedPartnerId}
            data={partners.map((partner) => ({
              value: partner.id,
              label: `${partner.name} - ${partner.country}`
            }))}
            onChange={handlePartnerSelection}
          />
          <Select
            label="MoU Status"
            value={statusForm.mouStatus}
            data={mouStatusOptions}
            onChange={(value) => {
              if (!value) {
                return;
              }

              setStatusForm((current) => ({ ...current, mouStatus: value as MouStatusDto }));
            }}
          />
          <TextInput
            label="Renewal Date"
            placeholder="YYYY-MM-DD"
            value={statusForm.renewalDate ?? ""}
            onChange={(event) =>
              setStatusForm((current) => ({ ...current, renewalDate: event.currentTarget.value }))
            }
          />
          <Textarea
            label="Notes"
            value={statusForm.notes ?? ""}
            onChange={(event) =>
              setStatusForm((current) => ({ ...current, notes: event.currentTarget.value }))
            }
          />
          <Button onClick={handleStatusUpdate} loading={isPending} color="blue">
            Update MoU Status
          </Button>
          {feedback ? (
            <Text c="rgba(255,255,255,0.8)" size="sm">
              {feedback}
            </Text>
          ) : null}
        </Stack>
      </Card>
    </Stack>
  );
}
