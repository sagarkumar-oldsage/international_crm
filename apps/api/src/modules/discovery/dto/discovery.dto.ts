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
