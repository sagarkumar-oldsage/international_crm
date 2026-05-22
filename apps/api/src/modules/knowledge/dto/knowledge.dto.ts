export interface KnowledgeArticleDto {
  id: string;
  title: string;
  category: string;
  audience: string;
  readTimeMinutes: number;
  updatedAt: string;
}

export interface LearningTrackDto {
  id: string;
  studentProfileId: string;
  title: string;
  progressPercentage: number;
  mandatory: boolean;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
}

export interface KnowledgeSummaryDto {
  articlesPublished: number;
  mandatoryTracks: number;
  completedTracks: number;
  averageProgress: number;
}
