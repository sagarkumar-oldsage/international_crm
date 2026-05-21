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
