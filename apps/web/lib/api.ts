import type {
  CreatePartnerUniversityDto,
  CreateEventDto,
  CreateStudentDocumentDto,
  EventCategoryDto,
  EventStatusDto,
  EventsSummaryDto,
  InternationalEventDto,
  MouStatusDto,
  PartnerUniversityDto,
  PartnershipsSummaryDto,
  StudentVisaCaseDto,
  StudentVisaSummaryDto,
  UpdateEventStatusDto,
  UpdateVisaCaseDto,
  UpdatePartnerMouStatusDto,
  UpdateStudentDocumentStatusDto,
  StudentDocumentDto,
  StudentDocumentSummaryDto,
  StudentApplicationDto,
  StudentProfileDto
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



