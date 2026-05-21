export interface ApplicationDto {
  id: string;
  studentId: string;
  university: string;
  country: string;
  program: string;
  status:
    | "APPLIED"
    | "UNDER_REVIEW"
    | "INTERVIEW_SCHEDULED"
    | "OFFER_RECEIVED"
    | "CONDITIONAL_OFFER"
    | "REJECTED"
    | "VISA_APPROVED"
    | "ENROLLMENT_COMPLETED";
  deadline: string;
}
