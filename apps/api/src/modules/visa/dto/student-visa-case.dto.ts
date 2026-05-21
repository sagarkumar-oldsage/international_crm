export type VisaStageDto =
  | "NOT_STARTED"
  | "DOCUMENT_COLLECTION"
  | "APPOINTMENT_BOOKED"
  | "BIOMETRICS_COMPLETED"
  | "INTERVIEW_SCHEDULED"
  | "UNDER_PROCESS"
  | "APPROVED"
  | "REJECTED";

export interface StudentVisaCaseDto {
  id: string;
  studentId: string;
  country: string;
  visaType: string;
  currentStage: VisaStageDto;
  appointmentDate: string | null;
  biometricsDate: string | null;
  interviewDate: string | null;
  decisionDate: string | null;
  notes: string | null;
}

export interface StudentVisaSummaryDto {
  studentId: string;
  totalVisaCases: number;
  activeStage: VisaStageDto | null;
  nextMilestoneLabel: string | null;
  nextMilestoneDate: string | null;
  approvedCases: number;
}
