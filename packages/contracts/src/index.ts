// Shared DTO contracts reduce drift between frontend and backend.
export interface MobilityOverviewDto {
  activeApplications: number;
  visaSuccessRate: number;
  partnerUniversities: number;
  pendingDocuments: number;
}

export interface StudentProfileDto {
  id: string;
  fullName: string;
  email: string;
  program: string;
  cgpa: number;
  languageScore: string;
  destinationPreferences: string[];
  budgetBand: string;
}

export type ApplicationStatusDto =
  | "APPLIED"
  | "UNDER_REVIEW"
  | "INTERVIEW_SCHEDULED"
  | "OFFER_RECEIVED"
  | "CONDITIONAL_OFFER"
  | "REJECTED"
  | "VISA_APPROVED"
  | "ENROLLMENT_COMPLETED";

export interface StudentApplicationDto {
  id: string;
  studentId: string;
  university: string;
  country: string;
  program: string;
  status: ApplicationStatusDto;
  deadline: string;
}

export type DocumentCategoryDto =
  | "PASSPORT"
  | "VISA"
  | "MARKSHEET"
  | "DEGREE_CERTIFICATE"
  | "SOP"
  | "LOR"
  | "CV"
  | "FINANCIAL_STATEMENT"
  | "INSURANCE"
  | "OFFER_LETTER"
  | "ACCEPTANCE_LETTER";

export type DocumentStatusDto =
  | "MISSING"
  | "PENDING_REVIEW"
  | "VERIFIED"
  | "REJECTED"
  | "EXPIRED";

export interface StudentDocumentDto {
  id: string;
  studentId: string;
  category: DocumentCategoryDto;
  fileName: string;
  storagePath: string;
  status: DocumentStatusDto;
  expiresAt: string | null;
  notes: string | null;
}
