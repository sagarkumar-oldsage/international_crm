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

export interface AnalyticsOverviewDto {
  totalStudents: number;
  activeApplications: number;
  visaApprovalRate: number;
  activePartnerships: number;
  upcomingEvents: number;
  openSupportTickets: number;
}

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

export interface CreateSupportRequestDto {
  studentProfileId: string;
  category: SupportRequestCategoryDto;
  title: string;
  details: string;
  assignedTeam?: string;
}

export interface UpdateSupportRequestDto {
  status: SupportRequestStatusDto;
  assignedTeam?: string;
  appointmentDate?: string;
  completionNotes?: string;
}

export type FinanceItemTypeDto =
  | "TUITION"
  | "HOSTEL"
  | "INSURANCE"
  | "VISA_FEES"
  | "TRAVEL"
  | "SCHOLARSHIP_DISBURSEMENT"
  | "OTHER";

export type FinanceRecordStatusDto = "PENDING" | "PARTIALLY_PAID" | "PAID" | "OVERDUE" | "WAIVED";

export interface StudentFinanceRecordDto {
  id: string;
  studentProfileId: string;
  itemType: FinanceItemTypeDto;
  label: string;
  amount: number;
  currency: string;
  status: FinanceRecordStatusDto;
  dueDate: string;
  paidDate: string | null;
  notes: string | null;
}

export type ScholarshipStatusDto =
  | "IDENTIFIED"
  | "APPLIED"
  | "UNDER_REVIEW"
  | "AWARDED"
  | "DISBURSED"
  | "REJECTED";

export interface ScholarshipCaseDto {
  id: string;
  studentProfileId: string;
  scholarshipName: string;
  providerName: string;
  amount: number;
  currency: string;
  status: ScholarshipStatusDto;
  deadline: string | null;
  awardedDate: string | null;
  disbursedDate: string | null;
  notes: string | null;
}

export interface FinanceScholarshipSummaryDto {
  totalPayableAmount: number;
  totalPaidAmount: number;
  pendingAmount: number;
  activeScholarships: number;
  awardedScholarshipAmount: number;
}

export interface CreateStudentFinanceRecordDto {
  studentProfileId: string;
  itemType: FinanceItemTypeDto;
  label: string;
  amount: number;
  currency: string;
  dueDate: string;
  notes?: string;
}

export interface CreateScholarshipCaseDto {
  studentProfileId: string;
  scholarshipName: string;
  providerName: string;
  amount: number;
  currency: string;
  status: ScholarshipStatusDto;
  deadline?: string;
  notes?: string;
}

export interface UpdateStudentFinanceRecordStatusDto {
  status: FinanceRecordStatusDto;
  paidDate?: string;
  notes?: string;
}

export interface UpdateScholarshipCaseStatusDto {
  status: ScholarshipStatusDto;
  awardedDate?: string;
  disbursedDate?: string;
  notes?: string;
}

export type AutomationRuleStatusDto = "ACTIVE" | "PAUSED";

export interface AutomationRuleDto {
  id: string;
  name: string;
  trigger: string;
  action: string;
  status: AutomationRuleStatusDto;
  lastRunAt: string | null;
  successRate: number;
}

export type RecommendationPriorityDto = "LOW" | "MEDIUM" | "HIGH";

export type RecommendationStatusDto = "OPEN" | "ACCEPTED" | "DISMISSED" | "IMPLEMENTED";

export interface AiRecommendationDto {
  id: string;
  studentProfileId: string;
  title: string;
  reason: string;
  priority: RecommendationPriorityDto;
  status: RecommendationStatusDto;
  generatedAt: string;
}

export interface AiAutomationSummaryDto {
  activeRules: number;
  openRecommendations: number;
  implementedRecommendations: number;
  averageSuccessRate: number;
}

export interface CreateRecommendationDto {
  studentProfileId: string;
  title: string;
  reason: string;
  priority: RecommendationPriorityDto;
}

export interface UpdateRecommendationStatusDto {
  status: RecommendationStatusDto;
}

export interface KnowledgeArticleDto {
  id: string;
  title: string;
  category: string;
  audience: string;
  readTimeMinutes: number;
  updatedAt: string;
}

export type LearningTrackStatusDto = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export interface LearningTrackDto {
  id: string;
  studentProfileId: string;
  title: string;
  progressPercentage: number;
  mandatory: boolean;
  status: LearningTrackStatusDto;
}

export interface KnowledgeSummaryDto {
  articlesPublished: number;
  mandatoryTracks: number;
  completedTracks: number;
  averageProgress: number;
}

export interface CreateKnowledgeArticleDto {
  title: string;
  category: string;
  audience: string;
  readTimeMinutes: number;
}

export interface UpdateLearningTrackDto {
  progressPercentage: number;
  status: LearningTrackStatusDto;
}

export interface MobileAnnouncementDto {
  id: string;
  title: string;
  body: string;
  audience: string;
  publishedAt: string;
}

export type MobileFeedbackStatusDto = "NEW" | "UNDER_REVIEW" | "PLANNED" | "RESOLVED";

export interface MobileFeedbackDto {
  id: string;
  studentProfileId: string;
  featureArea: string;
  feedback: string;
  rating: number;
  status: MobileFeedbackStatusDto;
  createdAt: string;
}

export interface MobileExperienceSummaryDto {
  activeAnnouncements: number;
  feedbackTickets: number;
  averageRating: number;
  resolvedFeedback: number;
}

export interface CreateMobileFeedbackDto {
  studentProfileId: string;
  featureArea: string;
  feedback: string;
  rating: number;
}

export interface UpdateMobileFeedbackStatusDto {
  status: MobileFeedbackStatusDto;
}

export type DiscoveryFitLevelDto = "HIGH" | "MEDIUM" | "EMERGING";

export interface UniversityDiscoveryDto {
  id: string;
  universityName: string;
  country: string;
  program: string;
  tuitionEstimate: number;
  fitLevel: DiscoveryFitLevelDto;
  intake: string;
}

export type DiscoveryShortlistStatusDto = "SHORTLISTED" | "APPLIED" | "ARCHIVED";

export interface DiscoveryShortlistDto {
  id: string;
  studentProfileId: string;
  universityId: string;
  universityName: string;
  status: DiscoveryShortlistStatusDto;
  notes: string | null;
}

export interface DiscoverySummaryDto {
  availableUniversities: number;
  highFitMatches: number;
  shortlisted: number;
  applied: number;
}

export interface CreateShortlistDto {
  studentProfileId: string;
  universityId: string;
  notes?: string;
}

export interface UpdateShortlistStatusDto {
  status: DiscoveryShortlistStatusDto;
  notes?: string;
}

export type InitiativeTrendDto = "UP" | "STABLE" | "DOWN";

export interface InstitutionalKpiDto {
  id: string;
  metric: string;
  value: string;
  trend: InitiativeTrendDto;
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

export interface CreateInitiativeDto {
  title: string;
  owner: string;
  targetDate: string;
  notes: string;
}

export interface UpdateInitiativeStatusDto {
  status: InitiativeStatusDto;
  notes?: string;
}
