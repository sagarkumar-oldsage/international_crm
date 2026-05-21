import type {
  StudentDocumentDto,
  StudentApplicationDto,
  StudentProfileDto
} from "@contracts/index";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api/v1";

async function safeJson<T>(response: Response): Promise<T | null> {
  if (!response.ok) {
    return null;
  }

  return (await response.json()) as T;
}

// This fallback keeps frontend previews functional before auth token integration.
export async function getStudentProfile(studentId: string): Promise<StudentProfileDto | null> {
  const response = await fetch(`${API_BASE}/students/${studentId}/profile`, {
    headers: {
      Authorization: "Bearer REPLACE_WITH_REAL_JWT"
    },
    cache: "no-store"
  });

  return safeJson<StudentProfileDto>(response);
}

export async function getStudentApplications(
  studentId: string
): Promise<StudentApplicationDto[] | null> {
  const response = await fetch(`${API_BASE}/applications/student/${studentId}`, {
    headers: {
      Authorization: "Bearer REPLACE_WITH_REAL_JWT"
    },
    cache: "no-store"
  });

  return safeJson<StudentApplicationDto[]>(response);
}

export async function getStudentDocuments(
  studentId: string
): Promise<StudentDocumentDto[] | null> {
  const response = await fetch(`${API_BASE}/documents/student/${studentId}`, {
    headers: {
      Authorization: "Bearer REPLACE_WITH_REAL_JWT"
    },
    cache: "no-store"
  });

  return safeJson<StudentDocumentDto[]>(response);
}

