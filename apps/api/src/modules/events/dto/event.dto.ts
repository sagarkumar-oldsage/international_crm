export type EventCategoryDto =
  | "SEMINAR"
  | "WEBINAR"
  | "FDP"
  | "WORKSHOP"
  | "CONFERENCE"
  | "DELEGATION_VISIT";

export type EventStatusDto =
  | "PLANNED"
  | "REGISTRATION_OPEN"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface InternationalEventDto {
  id: string;
  title: string;
  category: EventCategoryDto;
  format: string;
  hostCountry: string;
  venue: string;
  organizer: string;
  registrationDeadline: string | null;
  startDate: string;
  endDate: string;
  status: EventStatusDto;
  capacity: number;
  registeredCount: number;
  speaker: string | null;
  notes: string | null;
}

export interface EventsSummaryDto {
  totalEvents: number;
  registrationOpen: number;
  upcomingDelegations: number;
  totalRegistrations: number;
  averageFillRate: number;
}
