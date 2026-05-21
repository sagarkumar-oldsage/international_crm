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

export interface StudentDocumentSummaryDto {
  studentId: string;
  totalDocuments: number;
  verifiedDocuments: number;
  pendingReviewDocuments: number;
  expiredDocuments: number;
  expiringSoonDocuments: number;
  completionPercentage: number;
  missingCategories: DocumentCategoryDto[];
}

export interface CreateStudentDocumentDto {
  studentId: string;
  category: DocumentCategoryDto;
  fileName: string;
  storagePath: string;
  expiresAt?: string;
  notes?: string;
}

export interface UpdateStudentDocumentStatusDto {
  status: DocumentStatusDto;
  expiresAt?: string;
  notes?: string;
}

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

export interface UpdateVisaCaseDto {
  currentStage: VisaStageDto;
  appointmentDate?: string;
  biometricsDate?: string;
  interviewDate?: string;
  decisionDate?: string;
  notes?: string;
}

export type MouStatusDto =
  | "DRAFT"
  | "UNDER_REVIEW"
  | "ACTIVE"
  | "RENEWAL_DUE"
  | "EXPIRED"
  | "ARCHIVED";

export interface PartnerUniversityDto {
  id: string;
  name: string;
  country: string;
  city: string;
  website: string | null;
  contactPersonName: string;
  contactPersonEmail: string;
  collaborationAreas: string[];
  mouStatus: MouStatusDto;
  renewalDate: string | null;
  mobilityQuota: number;
  jointPrograms: string[];
  notes: string | null;
}

export interface PartnershipsSummaryDto {
  totalPartners: number;
  activeMous: number;
  renewalsDueSoon: number;
  countriesCovered: number;
  totalMobilityQuota: number;
}

export interface CreatePartnerUniversityDto {
  name: string;
  country: string;
  city: string;
  website?: string;
  contactPersonName: string;
  contactPersonEmail: string;
  collaborationAreas: string[];
  mobilityQuota: number;
  jointPrograms: string[];
  renewalDate?: string;
  notes?: string;
}

export interface UpdatePartnerMouStatusDto {
  mouStatus: MouStatusDto;
  renewalDate?: string;
  notes?: string;
}

export type EventCategoryDto =
  | "SEMINAR"
  | "WEBINAR"
  | "FDP"
  | "WORKSHOP"
  | "CONFERENCE"
  | "DELEGATION_VISIT";

export type EventStatusDto =
  | "PLANNED"
  | "REGISTRATION_OPEN"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface InternationalEventDto {
  id: string;
  title: string;
  category: EventCategoryDto;
  format: string;
  hostCountry: string;
  venue: string;
  organizer: string;
  registrationDeadline: string | null;
  startDate: string;
  endDate: string;
  status: EventStatusDto;
  capacity: number;
  registeredCount: number;
  speaker: string | null;
  notes: string | null;
}

export interface EventsSummaryDto {
  totalEvents: number;
  registrationOpen: number;
  upcomingDelegations: number;
  totalRegistrations: number;
  averageFillRate: number;
}

export interface CreateEventDto {
  title: string;
  category: EventCategoryDto;
  format: string;
  hostCountry: string;
  venue: string;
  organizer: string;
  registrationDeadline?: string;
  startDate: string;
  endDate: string;
  capacity: number;
  speaker?: string;
  notes?: string;
}

export interface UpdateEventStatusDto {
  status: EventStatusDto;
  registeredCount?: number;
  registrationDeadline?: string;
  notes?: string;
}

export type TicketCategoryDto =
  | "VISA_ISSUE"
  | "HOSTEL_ISSUE"
  | "DOCUMENTATION_ISSUE"
  | "EMERGENCY_REQUEST"
  | "SCHOLARSHIP_QUERY"
  | "GENERAL_SUPPORT";

export type TicketPriorityDto = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type TicketStatusDto = "OPEN" | "IN_PROGRESS" | "ON_HOLD" | "RESOLVED" | "CLOSED";

export interface SupportTicketDto {
  id: string;
  studentProfileId: string | null;
  raisedByName: string;
  raisedByEmail: string;
  category: TicketCategoryDto;
  subject: string;
  description: string;
  priority: TicketPriorityDto;
  status: TicketStatusDto;
  assignedTeam: string | null;
  resolutionNotes: string | null;
  dueDate: string | null;
}

export interface TicketSummaryDto {
  totalTickets: number;
  openTickets: number;
  criticalTickets: number;
  resolvedTickets: number;
  overdueTickets: number;
}

export interface CreateTicketDto {
  studentProfileId?: string;
  raisedByName: string;
  raisedByEmail: string;
  category: TicketCategoryDto;
  subject: string;
  description: string;
  priority: TicketPriorityDto;
  assignedTeam?: string;
  dueDate?: string;
}

export interface UpdateTicketStatusDto {
  status: TicketStatusDto;
  assignedTeam?: string;
  resolutionNotes?: string;
  dueDate?: string;
}
