export type SupportRequestCategoryDto =
  | "PRE_ARRIVAL"
  | "POST_ARRIVAL"
  | "HOSTEL"
  | "MEDICAL"
  | "CAMPUS_ONBOARDING"
  | "CULTURAL_ADAPTATION";

export type SupportRequestStatusDto =
  | "REQUESTED"
  | "IN_REVIEW"
  | "ACTION_IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface SupportRequestDto {
  id: string;
  studentProfileId: string;
  category: SupportRequestCategoryDto;
  title: string;
  details: string;
  status: SupportRequestStatusDto;
  assignedTeam: string | null;
  appointmentDate: string | null;
  completionNotes: string | null;
}

export interface SupportRequestSummaryDto {
  totalRequests: number;
  openRequests: number;
  preArrivalRequests: number;
  postArrivalRequests: number;
  completedRequests: number;
}
