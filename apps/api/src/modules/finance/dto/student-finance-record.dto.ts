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
