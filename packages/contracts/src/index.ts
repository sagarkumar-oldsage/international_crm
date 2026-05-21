// Shared DTO contracts reduce drift between frontend and backend.
export interface MobilityOverviewDto {
  activeApplications: number;
  visaSuccessRate: number;
  partnerUniversities: number;
  pendingDocuments: number;
}
