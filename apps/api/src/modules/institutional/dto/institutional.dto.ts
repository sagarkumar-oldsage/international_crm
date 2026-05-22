export interface InstitutionalKpiDto {
  id: string;
  metric: string;
  value: string;
  trend: "UP" | "STABLE" | "DOWN";
}

export type InitiativeStatusDto = "PLANNED" | "IN_PROGRESS" | "AT_RISK" | "COMPLETED";

export interface InstitutionalInitiativeDto {
  id: string;
  title: string;
  owner: string;
  targetDate: string;
  status: InitiativeStatusDto;
  notes: string | null;
}

export interface InstitutionalSummaryDto {
  totalInitiatives: number;
  inProgress: number;
  atRisk: number;
  completed: number;
}
