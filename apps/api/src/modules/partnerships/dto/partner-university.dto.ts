export type MouStatusDto =
  | "DRAFT"
  | "UNDER_REVIEW"
  | "ACTIVE"
  | "RENEWAL_DUE"
  | "EXPIRED"
  | "ARCHIVED";

export interface PartnerUniversityDto {
  id: string;
  name: string;
  country: string;
  city: string;
  website: string | null;
  contactPersonName: string;
  contactPersonEmail: string;
  collaborationAreas: string[];
  mouStatus: MouStatusDto;
  renewalDate: string | null;
  mobilityQuota: number;
  jointPrograms: string[];
  notes: string | null;
}

export interface PartnershipsSummaryDto {
  totalPartners: number;
  activeMous: number;
  renewalsDueSoon: number;
  countriesCovered: number;
  totalMobilityQuota: number;
}
