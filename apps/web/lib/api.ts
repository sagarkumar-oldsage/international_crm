import type {
  AiAutomationSummaryDto,
  AiRecommendationDto,
  AnalyticsOverviewDto,
  AutomationRuleDto,
  CreateInitiativeDto,
  CreateKnowledgeArticleDto,
  CreateMobileFeedbackDto,
  CreateRecommendationDto,
  CreateScholarshipCaseDto,
  CreateShortlistDto,
  CreateStudentFinanceRecordDto,
  CreateSupportRequestDto,
  CreateTicketDto,
  CreatePartnerUniversityDto,
  CreateEventDto,
  CreateStudentDocumentDto,
  DiscoveryShortlistDto,
  DiscoveryShortlistStatusDto,
  DiscoverySummaryDto,
  EventCategoryDto,
  EventStatusDto,
  EventsSummaryDto,
  FinanceItemTypeDto,
  FinanceRecordStatusDto,
  FinanceScholarshipSummaryDto,
  InitiativeStatusDto,
  InstitutionalInitiativeDto,
  InstitutionalKpiDto,
  InstitutionalSummaryDto,
  InternationalEventDto,
  KnowledgeArticleDto,
  KnowledgeSummaryDto,
  LearningTrackDto,
  LearningTrackStatusDto,
  MobileAnnouncementDto,
  MobileExperienceSummaryDto,
  MobileFeedbackDto,
  MobileFeedbackStatusDto,
  ScholarshipCaseDto,
  ScholarshipStatusDto,
  RecommendationPriorityDto,
  RecommendationStatusDto,
  UniversityDiscoveryDto,
  StudentFinanceRecordDto,
  MouStatusDto,
  PartnerUniversityDto,
  PartnershipsSummaryDto,
  SupportTicketDto,
  StudentVisaCaseDto,
  StudentVisaSummaryDto,
  TicketCategoryDto,
  TicketPriorityDto,
  TicketStatusDto,
  TicketSummaryDto,
  UpdateEventStatusDto,
  UpdateTicketStatusDto,
  UpdateVisaCaseDto,
  UpdatePartnerMouStatusDto,
  UpdateStudentDocumentStatusDto,
  StudentDocumentDto,
  StudentDocumentSummaryDto,
  StudentApplicationDto,
  StudentProfileDto
} from "@contracts/index";
import type {
  SupportRequestCategoryDto,
  SupportRequestDto,
  SupportRequestStatusDto,
  SupportRequestSummaryDto,
  UpdateSupportRequestDto
} from "@contracts/index";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api/v1";

const DEMO_AUTH_TOKEN = process.env.NEXT_PUBLIC_DEMO_AUTH_TOKEN;

async function safeJson<T>(response: Response): Promise<T | null> {
  if (!response.ok) {
    return null;
  }

  return (await response.json()) as T;
}

async function requestJson<T>(input: string, init?: RequestInit): Promise<T | null> {
  try {
    const response = await fetch(input, init);
    return safeJson<T>(response);
  } catch {
    return null;
  }
}

function getAuthHeaders() {
  if (!DEMO_AUTH_TOKEN) {
    throw new Error("NEXT_PUBLIC_DEMO_AUTH_TOKEN is not configured.");
  }

  return {
    Authorization: `Bearer ${DEMO_AUTH_TOKEN}`,
    "Content-Type": "application/json"
  };
}

function getReadHeaders() {
  return DEMO_AUTH_TOKEN
    ? {
        Authorization: `Bearer ${DEMO_AUTH_TOKEN}`
      }
    : {
        Authorization: "Bearer REPLACE_WITH_REAL_JWT"
      };
}

// This fallback keeps frontend previews functional before auth token integration.
export async function getStudentProfile(studentId: string): Promise<StudentProfileDto | null> {
  return requestJson<StudentProfileDto>(`${API_BASE}/students/${studentId}/profile`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function getStudentApplications(
  studentId: string
): Promise<StudentApplicationDto[] | null> {
  return requestJson<StudentApplicationDto[]>(`${API_BASE}/applications/student/${studentId}`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function getStudentDocuments(
  studentId: string
): Promise<StudentDocumentDto[] | null> {
  return requestJson<StudentDocumentDto[]>(`${API_BASE}/documents/student/${studentId}`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function getStudentDocumentSummary(
  studentId: string
): Promise<StudentDocumentSummaryDto | null> {
  return requestJson<StudentDocumentSummaryDto>(`${API_BASE}/documents/student/${studentId}/summary`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function createStudentDocument(
  payload: CreateStudentDocumentDto
): Promise<StudentDocumentDto | null> {
  return requestJson<StudentDocumentDto>(`${API_BASE}/documents`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
}

export async function updateStudentDocumentStatus(
  documentId: string,
  payload: UpdateStudentDocumentStatusDto
): Promise<StudentDocumentDto | null> {
  return requestJson<StudentDocumentDto>(`${API_BASE}/documents/${documentId}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
}

export async function getStudentVisaCases(
  studentId: string
): Promise<StudentVisaCaseDto[] | null> {
  return requestJson<StudentVisaCaseDto[]>(`${API_BASE}/visa/student/${studentId}`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function getStudentVisaSummary(
  studentId: string
): Promise<StudentVisaSummaryDto | null> {
  return requestJson<StudentVisaSummaryDto>(`${API_BASE}/visa/student/${studentId}/summary`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function updateVisaCase(
  visaCaseId: string,
  payload: UpdateVisaCaseDto
): Promise<StudentVisaCaseDto | null> {
  return requestJson<StudentVisaCaseDto>(`${API_BASE}/visa/${visaCaseId}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
}

export async function getPartnerUniversities(): Promise<PartnerUniversityDto[] | null> {
  return requestJson<PartnerUniversityDto[]>(`${API_BASE}/partnerships`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function getPartnershipsSummary(): Promise<PartnershipsSummaryDto | null> {
  return requestJson<PartnershipsSummaryDto>(`${API_BASE}/partnerships/summary`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function createPartnerUniversity(
  payload: CreatePartnerUniversityDto
): Promise<PartnerUniversityDto | null> {
  return requestJson<PartnerUniversityDto>(`${API_BASE}/partnerships`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
}

export async function updatePartnerMouStatus(
  partnerUniversityId: string,
  payload: UpdatePartnerMouStatusDto
): Promise<PartnerUniversityDto | null> {
  return requestJson<PartnerUniversityDto>(`${API_BASE}/partnerships/${partnerUniversityId}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
}

export const mouStatusOptions: MouStatusDto[] = [
  "DRAFT",
  "UNDER_REVIEW",
  "ACTIVE",
  "RENEWAL_DUE",
  "EXPIRED",
  "ARCHIVED"
];

export async function getInternationalEvents(): Promise<InternationalEventDto[] | null> {
  return requestJson<InternationalEventDto[]>(`${API_BASE}/events`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function getEventsSummary(): Promise<EventsSummaryDto | null> {
  return requestJson<EventsSummaryDto>(`${API_BASE}/events/summary`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function createInternationalEvent(
  payload: CreateEventDto
): Promise<InternationalEventDto | null> {
  return requestJson<InternationalEventDto>(`${API_BASE}/events`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
}

export async function updateInternationalEventStatus(
  eventId: string,
  payload: UpdateEventStatusDto
): Promise<InternationalEventDto | null> {
  return requestJson<InternationalEventDto>(`${API_BASE}/events/${eventId}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
}

export const eventCategoryOptions: EventCategoryDto[] = [
  "SEMINAR",
  "WEBINAR",
  "FDP",
  "WORKSHOP",
  "CONFERENCE",
  "DELEGATION_VISIT"
];

export const eventStatusOptions: EventStatusDto[] = [
  "PLANNED",
  "REGISTRATION_OPEN",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED"
];

export async function getSupportTickets(): Promise<SupportTicketDto[] | null> {
  return requestJson<SupportTicketDto[]>(`${API_BASE}/communication/tickets`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function getTicketSummary(): Promise<TicketSummaryDto | null> {
  return requestJson<TicketSummaryDto>(`${API_BASE}/communication/tickets/summary`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function createSupportTicket(payload: CreateTicketDto): Promise<SupportTicketDto | null> {
  return requestJson<SupportTicketDto>(`${API_BASE}/communication/tickets`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
}

export async function updateSupportTicketStatus(
  ticketId: string,
  payload: UpdateTicketStatusDto
): Promise<SupportTicketDto | null> {
  return requestJson<SupportTicketDto>(`${API_BASE}/communication/tickets/${ticketId}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
}

export const ticketCategoryOptions: TicketCategoryDto[] = [
  "VISA_ISSUE",
  "HOSTEL_ISSUE",
  "DOCUMENTATION_ISSUE",
  "EMERGENCY_REQUEST",
  "SCHOLARSHIP_QUERY",
  "GENERAL_SUPPORT"
];

export const ticketPriorityOptions: TicketPriorityDto[] = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];

export const ticketStatusOptions: TicketStatusDto[] = [
  "OPEN",
  "IN_PROGRESS",
  "ON_HOLD",
  "RESOLVED",
  "CLOSED"
];

export async function getAnalyticsOverview(): Promise<AnalyticsOverviewDto | null> {
  return requestJson<AnalyticsOverviewDto>(`${API_BASE}/analytics/overview`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function getSupportRequests(studentId: string): Promise<SupportRequestDto[] | null> {
  return requestJson<SupportRequestDto[]>(`${API_BASE}/support/student/${studentId}`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function getSupportRequestSummary(
  studentId: string
): Promise<SupportRequestSummaryDto | null> {
  return requestJson<SupportRequestSummaryDto>(`${API_BASE}/support/student/${studentId}/summary`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function createSupportRequest(
  payload: CreateSupportRequestDto
): Promise<SupportRequestDto | null> {
  return requestJson<SupportRequestDto>(`${API_BASE}/support`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
}

export async function updateSupportRequest(
  requestId: string,
  payload: UpdateSupportRequestDto
): Promise<SupportRequestDto | null> {
  return requestJson<SupportRequestDto>(`${API_BASE}/support/${requestId}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
}

export const supportRequestCategoryOptions: SupportRequestCategoryDto[] = [
  "PRE_ARRIVAL",
  "POST_ARRIVAL",
  "HOSTEL",
  "MEDICAL",
  "CAMPUS_ONBOARDING",
  "CULTURAL_ADAPTATION"
];

export const supportRequestStatusOptions: SupportRequestStatusDto[] = [
  "REQUESTED",
  "IN_REVIEW",
  "ACTION_IN_PROGRESS",
  "COMPLETED",
  "CANCELLED"
];

export async function getStudentFinanceRecords(
  studentId: string
): Promise<StudentFinanceRecordDto[] | null> {
  return requestJson<StudentFinanceRecordDto[]>(`${API_BASE}/finance/student/${studentId}/records`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function getStudentScholarships(studentId: string): Promise<ScholarshipCaseDto[] | null> {
  return requestJson<ScholarshipCaseDto[]>(`${API_BASE}/finance/student/${studentId}/scholarships`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function getFinanceScholarshipSummary(
  studentId: string
): Promise<FinanceScholarshipSummaryDto | null> {
  return requestJson<FinanceScholarshipSummaryDto>(`${API_BASE}/finance/student/${studentId}/summary`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function createStudentFinanceRecord(
  payload: CreateStudentFinanceRecordDto
): Promise<StudentFinanceRecordDto | null> {
  return requestJson<StudentFinanceRecordDto>(`${API_BASE}/finance/records`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
}

export async function createScholarshipCase(
  payload: CreateScholarshipCaseDto
): Promise<ScholarshipCaseDto | null> {
  return requestJson<ScholarshipCaseDto>(`${API_BASE}/finance/scholarships`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
}

export async function updateStudentFinanceRecordStatus(
  recordId: string,
  payload: { status: FinanceRecordStatusDto; paidDate?: string; notes?: string }
): Promise<StudentFinanceRecordDto | null> {
  return requestJson<StudentFinanceRecordDto>(`${API_BASE}/finance/records/${recordId}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
}

export async function updateScholarshipStatus(
  scholarshipId: string,
  payload: { status: ScholarshipStatusDto; awardedDate?: string; disbursedDate?: string; notes?: string }
): Promise<ScholarshipCaseDto | null> {
  return requestJson<ScholarshipCaseDto>(`${API_BASE}/finance/scholarships/${scholarshipId}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
}

export const financeItemTypeOptions: FinanceItemTypeDto[] = [
  "TUITION",
  "HOSTEL",
  "INSURANCE",
  "VISA_FEES",
  "TRAVEL",
  "SCHOLARSHIP_DISBURSEMENT",
  "OTHER"
];

export const financeRecordStatusOptions: FinanceRecordStatusDto[] = [
  "PENDING",
  "PARTIALLY_PAID",
  "PAID",
  "OVERDUE",
  "WAIVED"
];

export const scholarshipStatusOptions: ScholarshipStatusDto[] = [
  "IDENTIFIED",
  "APPLIED",
  "UNDER_REVIEW",
  "AWARDED",
  "DISBURSED",
  "REJECTED"
];

export async function getAutomationRules(): Promise<AutomationRuleDto[] | null> {
  return requestJson<AutomationRuleDto[]>(`${API_BASE}/ai-automation/rules`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function getAiRecommendations(studentId: string): Promise<AiRecommendationDto[] | null> {
  return requestJson<AiRecommendationDto[]>(`${API_BASE}/ai-automation/recommendations/student/${studentId}`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function getAiAutomationSummary(studentId: string): Promise<AiAutomationSummaryDto | null> {
  return requestJson<AiAutomationSummaryDto>(`${API_BASE}/ai-automation/recommendations/student/${studentId}/summary`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function createRecommendation(
  payload: CreateRecommendationDto
): Promise<AiRecommendationDto | null> {
  return requestJson<AiRecommendationDto>(`${API_BASE}/ai-automation/recommendations`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
}

export async function updateRecommendationStatus(
  recommendationId: string,
  payload: { status: RecommendationStatusDto }
): Promise<AiRecommendationDto | null> {
  return requestJson<AiRecommendationDto>(`${API_BASE}/ai-automation/recommendations/${recommendationId}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
}

export const recommendationPriorityOptions: RecommendationPriorityDto[] = ["LOW", "MEDIUM", "HIGH"];

export const recommendationStatusOptions: RecommendationStatusDto[] = [
  "OPEN",
  "ACCEPTED",
  "DISMISSED",
  "IMPLEMENTED"
];

export async function getKnowledgeArticles(): Promise<KnowledgeArticleDto[] | null> {
  return requestJson<KnowledgeArticleDto[]>(`${API_BASE}/knowledge/articles`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function getLearningTracks(studentId: string): Promise<LearningTrackDto[] | null> {
  return requestJson<LearningTrackDto[]>(`${API_BASE}/knowledge/tracks/student/${studentId}`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function getKnowledgeSummary(studentId: string): Promise<KnowledgeSummaryDto | null> {
  return requestJson<KnowledgeSummaryDto>(`${API_BASE}/knowledge/tracks/student/${studentId}/summary`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function createKnowledgeArticle(
  payload: CreateKnowledgeArticleDto
): Promise<KnowledgeArticleDto | null> {
  return requestJson<KnowledgeArticleDto>(`${API_BASE}/knowledge/articles`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
}

export async function updateLearningTrack(
  trackId: string,
  payload: { progressPercentage: number; status: LearningTrackStatusDto }
): Promise<LearningTrackDto | null> {
  return requestJson<LearningTrackDto>(`${API_BASE}/knowledge/tracks/${trackId}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
}

export const learningTrackStatusOptions: LearningTrackStatusDto[] = [
  "NOT_STARTED",
  "IN_PROGRESS",
  "COMPLETED"
];

export async function getMobileAnnouncements(): Promise<MobileAnnouncementDto[] | null> {
  return requestJson<MobileAnnouncementDto[]>(`${API_BASE}/mobile-experience/announcements`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function getMobileFeedback(studentId: string): Promise<MobileFeedbackDto[] | null> {
  return requestJson<MobileFeedbackDto[]>(`${API_BASE}/mobile-experience/feedback/student/${studentId}`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function getMobileExperienceSummary(
  studentId: string
): Promise<MobileExperienceSummaryDto | null> {
  return requestJson<MobileExperienceSummaryDto>(`${API_BASE}/mobile-experience/feedback/student/${studentId}/summary`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function createMobileFeedback(
  payload: CreateMobileFeedbackDto
): Promise<MobileFeedbackDto | null> {
  return requestJson<MobileFeedbackDto>(`${API_BASE}/mobile-experience/feedback`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
}

export async function updateMobileFeedbackStatus(
  feedbackId: string,
  payload: { status: MobileFeedbackStatusDto }
): Promise<MobileFeedbackDto | null> {
  return requestJson<MobileFeedbackDto>(`${API_BASE}/mobile-experience/feedback/${feedbackId}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
}

export const mobileFeedbackStatusOptions: MobileFeedbackStatusDto[] = [
  "NEW",
  "UNDER_REVIEW",
  "PLANNED",
  "RESOLVED"
];

export async function getDiscoveryUniversities(): Promise<UniversityDiscoveryDto[] | null> {
  return requestJson<UniversityDiscoveryDto[]>(`${API_BASE}/discovery/universities`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function getDiscoveryShortlists(
  studentId: string
): Promise<DiscoveryShortlistDto[] | null> {
  return requestJson<DiscoveryShortlistDto[]>(`${API_BASE}/discovery/shortlists/student/${studentId}`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function getDiscoverySummary(studentId: string): Promise<DiscoverySummaryDto | null> {
  return requestJson<DiscoverySummaryDto>(`${API_BASE}/discovery/shortlists/student/${studentId}/summary`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function createShortlist(
  payload: CreateShortlistDto
): Promise<DiscoveryShortlistDto | null> {
  return requestJson<DiscoveryShortlistDto>(`${API_BASE}/discovery/shortlists`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
}

export async function updateShortlistStatus(
  shortlistId: string,
  payload: { status: DiscoveryShortlistStatusDto; notes?: string }
): Promise<DiscoveryShortlistDto | null> {
  return requestJson<DiscoveryShortlistDto>(`${API_BASE}/discovery/shortlists/${shortlistId}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
}

export const discoveryShortlistStatusOptions: DiscoveryShortlistStatusDto[] = [
  "SHORTLISTED",
  "APPLIED",
  "ARCHIVED"
];

export async function getInstitutionalKpis(): Promise<InstitutionalKpiDto[] | null> {
  return requestJson<InstitutionalKpiDto[]>(`${API_BASE}/institutional/kpis`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function getInstitutionalInitiatives(): Promise<InstitutionalInitiativeDto[] | null> {
  return requestJson<InstitutionalInitiativeDto[]>(`${API_BASE}/institutional/initiatives`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function getInstitutionalSummary(): Promise<InstitutionalSummaryDto | null> {
  return requestJson<InstitutionalSummaryDto>(`${API_BASE}/institutional/summary`, {
    headers: getReadHeaders(),
    cache: "no-store"
  });
}

export async function createInitiative(
  payload: CreateInitiativeDto
): Promise<InstitutionalInitiativeDto | null> {
  return requestJson<InstitutionalInitiativeDto>(`${API_BASE}/institutional/initiatives`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
}

export async function updateInitiativeStatus(
  initiativeId: string,
  payload: { status: InitiativeStatusDto; notes?: string }
): Promise<InstitutionalInitiativeDto | null> {
  return requestJson<InstitutionalInitiativeDto>(`${API_BASE}/institutional/initiatives/${initiativeId}/status`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
}

export const initiativeStatusOptions: InitiativeStatusDto[] = [
  "PLANNED",
  "IN_PROGRESS",
  "AT_RISK",
  "COMPLETED"
];



