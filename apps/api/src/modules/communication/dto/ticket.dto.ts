export type TicketCategoryDto =
  | "VISA_ISSUE"
  | "HOSTEL_ISSUE"
  | "DOCUMENTATION_ISSUE"
  | "EMERGENCY_REQUEST"
  | "SCHOLARSHIP_QUERY"
  | "GENERAL_SUPPORT";

export type TicketPriorityDto = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type TicketStatusDto = "OPEN" | "IN_PROGRESS" | "ON_HOLD" | "RESOLVED" | "CLOSED";

export interface SupportTicketDto {
  id: string;
  studentProfileId: string | null;
  raisedByName: string;
  raisedByEmail: string;
  category: TicketCategoryDto;
  subject: string;
  description: string;
  priority: TicketPriorityDto;
  status: TicketStatusDto;
  assignedTeam: string | null;
  resolutionNotes: string | null;
  dueDate: string | null;
}

export interface TicketSummaryDto {
  totalTickets: number;
  openTickets: number;
  criticalTickets: number;
  resolvedTickets: number;
  overdueTickets: number;
}
