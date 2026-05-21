import { DocumentCategoryDto } from "./student-document.dto";

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
