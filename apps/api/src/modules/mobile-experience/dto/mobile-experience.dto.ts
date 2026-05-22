export interface MobileAnnouncementDto {
  id: string;
  title: string;
  body: string;
  audience: string;
  publishedAt: string;
}

export type MobileFeedbackStatusDto = "NEW" | "UNDER_REVIEW" | "PLANNED" | "RESOLVED";

export interface MobileFeedbackDto {
  id: string;
  studentProfileId: string;
  featureArea: string;
  feedback: string;
  rating: number;
  status: MobileFeedbackStatusDto;
  createdAt: string;
}

export interface MobileExperienceSummaryDto {
  activeAnnouncements: number;
  feedbackTickets: number;
  averageRating: number;
  resolvedFeedback: number;
}
