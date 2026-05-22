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
  CreateScholarshipCaseDto,
  CreateStudentFinanceRecordDto,
  FinanceItemTypeDto,
  FinanceRecordStatusDto,
  ScholarshipCaseDto,
  ScholarshipStatusDto,
  StudentFinanceRecordDto
} from "@contracts/index";
import {
  createScholarshipCase,
  createStudentFinanceRecord,
  financeItemTypeOptions,
  financeRecordStatusOptions,
  scholarshipStatusOptions,
  updateScholarshipStatus,
  updateStudentFinanceRecordStatus
} from "../lib/api";

interface FinanceWorkflowPanelProps {
  studentId: string;
  records: StudentFinanceRecordDto[];
  scholarships: ScholarshipCaseDto[];
}

const emptyFinanceForm: CreateStudentFinanceRecordDto = {
  studentProfileId: "student-1",
  itemType: "TUITION",
  label: "",
  amount: 0,
  currency: "EUR",
  dueDate: "",
  notes: ""
};

const emptyScholarshipForm: CreateScholarshipCaseDto = {
  studentProfileId: "student-1",
  scholarshipName: "",
  providerName: "",
  amount: 0,
  currency: "EUR",
  status: "IDENTIFIED",
  deadline: "",
  notes: ""
};

export function FinanceWorkflowPanel({ studentId, records, scholarships }: FinanceWorkflowPanelProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);

  const [financeForm, setFinanceForm] = useState<CreateStudentFinanceRecordDto>({
    ...emptyFinanceForm,
    studentProfileId: studentId
  });
  const [scholarshipForm, setScholarshipForm] = useState<CreateScholarshipCaseDto>({
    ...emptyScholarshipForm,
    studentProfileId: studentId
  });

  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(records[0]?.id ?? null);
  const [selectedScholarshipId, setSelectedScholarshipId] = useState<string | null>(
    scholarships[0]?.id ?? null
  );

  const [recordStatus, setRecordStatus] = useState<FinanceRecordStatusDto>(records[0]?.status ?? "PENDING");
  const [recordPaidDate, setRecordPaidDate] = useState(records[0]?.paidDate ?? "");
  const [recordNotes, setRecordNotes] = useState(records[0]?.notes ?? "");

  const [scholarshipStatus, setScholarshipStatus] = useState<ScholarshipStatusDto>(
    scholarships[0]?.status ?? "IDENTIFIED"
  );
  const [scholarshipAwardedDate, setScholarshipAwardedDate] = useState(scholarships[0]?.awardedDate ?? "");
  const [scholarshipDisbursedDate, setScholarshipDisbursedDate] = useState(
    scholarships[0]?.disbursedDate ?? ""
  );
  const [scholarshipNotes, setScholarshipNotes] = useState(scholarships[0]?.notes ?? "");

  const refreshPage = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const applyRecordSelection = (recordId: string | null) => {
    setSelectedRecordId(recordId);
    const selected = records.find((record) => record.id === recordId);
    if (!selected) {
      return;
    }

    setRecordStatus(selected.status);
    setRecordPaidDate(selected.paidDate ?? "");
    setRecordNotes(selected.notes ?? "");
  };

  const applyScholarshipSelection = (scholarshipId: string | null) => {
    setSelectedScholarshipId(scholarshipId);
    const selected = scholarships.find((record) => record.id === scholarshipId);
    if (!selected) {
      return;
    }

    setScholarshipStatus(selected.status);
    setScholarshipAwardedDate(selected.awardedDate ?? "");
    setScholarshipDisbursedDate(selected.disbursedDate ?? "");
    setScholarshipNotes(selected.notes ?? "");
  };

  const handleCreateFinanceRecord = async () => {
    setFeedback(null);
    const created = await createStudentFinanceRecord({
      ...financeForm,
      notes: financeForm.notes || undefined
    });

    if (!created) {
      setFeedback("Finance record creation was rejected by the API.");
      return;
    }

    setFinanceForm({ ...emptyFinanceForm, studentProfileId: studentId });
    setFeedback(`Created finance record: ${created.label}.`);
    refreshPage();
  };

  const handleCreateScholarship = async () => {
    setFeedback(null);
    const created = await createScholarshipCase({
      ...scholarshipForm,
      deadline: scholarshipForm.deadline || undefined,
      notes: scholarshipForm.notes || undefined
    });

    if (!created) {
      setFeedback("Scholarship case creation was rejected by the API.");
      return;
    }

    setScholarshipForm({ ...emptyScholarshipForm, studentProfileId: studentId });
    setFeedback(`Created scholarship case: ${created.scholarshipName}.`);
    refreshPage();
  };

  const handleUpdateFinanceStatus = async () => {
    if (!selectedRecordId) {
      setFeedback("Select a finance record before updating status.");
      return;
    }

    setFeedback(null);
    const updated = await updateStudentFinanceRecordStatus(selectedRecordId, {
      status: recordStatus,
      paidDate: recordPaidDate || undefined,
      notes: recordNotes || undefined
    });

    if (!updated) {
      setFeedback("Finance record status update was rejected by the API.");
      return;
    }

    setFeedback(`Updated finance record ${updated.label} to ${updated.status}.`);
    refreshPage();
  };

  const handleUpdateScholarshipStatus = async () => {
    if (!selectedScholarshipId) {
      setFeedback("Select a scholarship case before updating status.");
      return;
    }

    setFeedback(null);
    const updated = await updateScholarshipStatus(selectedScholarshipId, {
      status: scholarshipStatus,
      awardedDate: scholarshipAwardedDate || undefined,
      disbursedDate: scholarshipDisbursedDate || undefined,
      notes: scholarshipNotes || undefined
    });

    if (!updated) {
      setFeedback("Scholarship status update was rejected by the API.");
      return;
    }

    setFeedback(`Updated scholarship ${updated.scholarshipName} to ${updated.status}.`);
    refreshPage();
  };

  return (
    <Stack gap="md">
      <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
        <Stack gap="sm">
          <Group justify="space-between">
            <Title order={3} c="white">Create Finance Record</Title>
            <Badge color="indigo" variant="light">Payables</Badge>
          </Group>
          <Select
            label="Item Type"
            value={financeForm.itemType}
            data={financeItemTypeOptions}
            onChange={(value) => {
              if (!value) {
                return;
              }

              setFinanceForm((current) => ({ ...current, itemType: value as FinanceItemTypeDto }));
            }}
          />
          <TextInput
            label="Label"
            value={financeForm.label}
            onChange={(event) => setFinanceForm((current) => ({ ...current, label: event.currentTarget.value }))}
          />
          <TextInput
            label="Amount"
            value={financeForm.amount.toString()}
            onChange={(event) =>
              setFinanceForm((current) => ({ ...current, amount: Number(event.currentTarget.value) || 0 }))
            }
          />
          <TextInput
            label="Currency"
            value={financeForm.currency}
            onChange={(event) => setFinanceForm((current) => ({ ...current, currency: event.currentTarget.value }))}
          />
          <TextInput
            label="Due Date"
            placeholder="YYYY-MM-DD"
            value={financeForm.dueDate}
            onChange={(event) => setFinanceForm((current) => ({ ...current, dueDate: event.currentTarget.value }))}
          />
          <Textarea
            label="Notes"
            value={financeForm.notes ?? ""}
            onChange={(event) => setFinanceForm((current) => ({ ...current, notes: event.currentTarget.value }))}
          />
          <Button onClick={handleCreateFinanceRecord} loading={isPending} color="indigo">Create Finance Record</Button>
        </Stack>
      </Card>

      <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
        <Stack gap="sm">
          <Group justify="space-between">
            <Title order={3} c="white">Create Scholarship Case</Title>
            <Badge color="blue" variant="light">Funding pipeline</Badge>
          </Group>
          <TextInput
            label="Scholarship Name"
            value={scholarshipForm.scholarshipName}
            onChange={(event) =>
              setScholarshipForm((current) => ({ ...current, scholarshipName: event.currentTarget.value }))
            }
          />
          <TextInput
            label="Provider"
            value={scholarshipForm.providerName}
            onChange={(event) =>
              setScholarshipForm((current) => ({ ...current, providerName: event.currentTarget.value }))
            }
          />
          <TextInput
            label="Amount"
            value={scholarshipForm.amount.toString()}
            onChange={(event) =>
              setScholarshipForm((current) => ({ ...current, amount: Number(event.currentTarget.value) || 0 }))
            }
          />
          <Select
            label="Status"
            value={scholarshipForm.status}
            data={scholarshipStatusOptions}
            onChange={(value) => {
              if (!value) {
                return;
              }

              setScholarshipForm((current) => ({ ...current, status: value as ScholarshipStatusDto }));
            }}
          />
          <TextInput
            label="Deadline"
            placeholder="YYYY-MM-DD"
            value={scholarshipForm.deadline ?? ""}
            onChange={(event) =>
              setScholarshipForm((current) => ({ ...current, deadline: event.currentTarget.value }))
            }
          />
          <Textarea
            label="Notes"
            value={scholarshipForm.notes ?? ""}
            onChange={(event) => setScholarshipForm((current) => ({ ...current, notes: event.currentTarget.value }))}
          />
          <Button onClick={handleCreateScholarship} loading={isPending} color="blue">Create Scholarship Case</Button>
        </Stack>
      </Card>

      <Card radius="lg" p="lg" className="border border-white/20 bg-white/5">
        <Stack gap="sm">
          <Title order={3} c="white">Update Finance and Scholarship Status</Title>
          <Select
            label="Finance Record"
            value={selectedRecordId}
            data={records.map((record) => ({ value: record.id, label: `${record.label} (${record.itemType})` }))}
            onChange={applyRecordSelection}
          />
          <Select
            label="Finance Status"
            value={recordStatus}
            data={financeRecordStatusOptions}
            onChange={(value) => {
              if (!value) {
                return;
              }

              setRecordStatus(value as FinanceRecordStatusDto);
            }}
          />
          <TextInput
            label="Paid Date"
            placeholder="YYYY-MM-DD"
            value={recordPaidDate}
            onChange={(event) => setRecordPaidDate(event.currentTarget.value)}
          />
          <Textarea
            label="Finance Notes"
            value={recordNotes}
            onChange={(event) => setRecordNotes(event.currentTarget.value)}
          />
          <Button onClick={handleUpdateFinanceStatus} loading={isPending} color="indigo">Update Finance Status</Button>

          <Select
            label="Scholarship Case"
            value={selectedScholarshipId}
            data={scholarships.map((item) => ({
              value: item.id,
              label: `${item.scholarshipName} (${item.providerName})`
            }))}
            onChange={applyScholarshipSelection}
          />
          <Select
            label="Scholarship Status"
            value={scholarshipStatus}
            data={scholarshipStatusOptions}
            onChange={(value) => {
              if (!value) {
                return;
              }

              setScholarshipStatus(value as ScholarshipStatusDto);
            }}
          />
          <TextInput
            label="Awarded Date"
            placeholder="YYYY-MM-DD"
            value={scholarshipAwardedDate}
            onChange={(event) => setScholarshipAwardedDate(event.currentTarget.value)}
          />
          <TextInput
            label="Disbursed Date"
            placeholder="YYYY-MM-DD"
            value={scholarshipDisbursedDate}
            onChange={(event) => setScholarshipDisbursedDate(event.currentTarget.value)}
          />
          <Textarea
            label="Scholarship Notes"
            value={scholarshipNotes}
            onChange={(event) => setScholarshipNotes(event.currentTarget.value)}
          />
          <Button onClick={handleUpdateScholarshipStatus} loading={isPending} color="blue">Update Scholarship Status</Button>
          {feedback ? (
            <Text c="rgba(255,255,255,0.8)" size="sm">{feedback}</Text>
          ) : null}
        </Stack>
      </Card>
    </Stack>
  );
}
