const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api/v1";

async function safeJson<T>(response: Response): Promise<T | null> {
  if (!response.ok) {
    return null;
  }

  return (await response.json()) as T;
}

export interface StudentProfile {
  id: string;
  fullName: string;
  email: string;
  program: string;
  cgpa: number;
  languageScore: string;
  destinationPreferences: string[];
  budgetBand: string;
}

export interface StudentApplication {
  id: string;
  studentId: string;
  university: string;
  country: string;
  program: string;
  status: string;
  deadline: string;
}

// This fallback keeps frontend previews functional before auth token integration.
export async function getStudentProfile(studentId: string): Promise<StudentProfile | null> {
  const response = await fetch(`${API_BASE}/students/${studentId}/profile`, {
    headers: {
      Authorization: "Bearer REPLACE_WITH_REAL_JWT"
    },
    cache: "no-store"
  });

  return safeJson<StudentProfile>(response);
}

export async function getStudentApplications(
  studentId: string
): Promise<StudentApplication[] | null> {
  const response = await fetch(`${API_BASE}/applications/student/${studentId}`, {
    headers: {
      Authorization: "Bearer REPLACE_WITH_REAL_JWT"
    },
    cache: "no-store"
  });

  return safeJson<StudentApplication[]>(response);
}
