export type AutomationRuleStatusDto = "ACTIVE" | "PAUSED";

export interface AutomationRuleDto {
  id: string;
  name: string;
  trigger: string;
  action: string;
  status: AutomationRuleStatusDto;
  lastRunAt: string | null;
  successRate: number;
}

export type RecommendationPriorityDto = "LOW" | "MEDIUM" | "HIGH";

export type RecommendationStatusDto = "OPEN" | "ACCEPTED" | "DISMISSED" | "IMPLEMENTED";

export interface AiRecommendationDto {
  id: string;
  studentProfileId: string;
  title: string;
  reason: string;
  priority: RecommendationPriorityDto;
  status: RecommendationStatusDto;
  generatedAt: string;
}

export interface AiAutomationSummaryDto {
  activeRules: number;
  openRecommendations: number;
  implementedRecommendations: number;
  averageSuccessRate: number;
}
