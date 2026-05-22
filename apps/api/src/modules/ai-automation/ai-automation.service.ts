import { Injectable, NotFoundException } from "@nestjs/common";
import {
  AiAutomationSummaryDto,
  AiRecommendationDto,
  AutomationRuleDto
} from "./dto/automation.dto";
import { CreateRecommendationDto } from "./dto/create-recommendation.dto";
import { UpdateRecommendationStatusDto } from "./dto/update-recommendation-status.dto";

@Injectable()
export class AiAutomationService {
  private readonly rules: AutomationRuleDto[] = [
    {
      id: "rule-1",
      name: "Missing Document Nudger",
      trigger: "Document status remains MISSING for 72h",
      action: "Auto-create reminder ticket and notify student",
      status: "ACTIVE",
      lastRunAt: "2026-05-21",
      successRate: 91
    },
    {
      id: "rule-2",
      name: "Visa Milestone Escalation",
      trigger: "Interview date within 5 days and docs incomplete",
      action: "Escalate to visa team and advisor",
      status: "ACTIVE",
      lastRunAt: "2026-05-22",
      successRate: 88
    },
    {
      id: "rule-3",
      name: "Scholarship Renewal Alert",
      trigger: "Renewal deadline in 10 days",
      action: "Send checklist and schedule advisor call",
      status: "PAUSED",
      lastRunAt: null,
      successRate: 0
    }
  ];

  private readonly recommendations: AiRecommendationDto[] = [
    {
      id: "ai-rec-1",
      studentProfileId: "student-1",
      title: "Switch to fast-track APS verification",
      reason: "Destination university has APS priority queue this month.",
      priority: "HIGH",
      status: "OPEN",
      generatedAt: "2026-05-20"
    },
    {
      id: "ai-rec-2",
      studentProfileId: "student-1",
      title: "Submit DAAD co-funding addendum",
      reason: "Current scholarship profile suggests 27% higher award odds.",
      priority: "MEDIUM",
      status: "ACCEPTED",
      generatedAt: "2026-05-18"
    }
  ];

  listRules(): AutomationRuleDto[] {
    return this.rules;
  }

  listRecommendations(studentId: string): AiRecommendationDto[] {
    return this.recommendations.filter((item) => item.studentProfileId === studentId);
  }

  getSummary(studentId: string): AiAutomationSummaryDto {
    const studentRecommendations = this.listRecommendations(studentId);
    const activeRules = this.rules.filter((rule) => rule.status === "ACTIVE");

    return {
      activeRules: activeRules.length,
      openRecommendations: studentRecommendations.filter((item) => item.status === "OPEN").length,
      implementedRecommendations: studentRecommendations.filter((item) => item.status === "IMPLEMENTED").length,
      averageSuccessRate:
        activeRules.length > 0
          ? Math.round(activeRules.reduce((total, rule) => total + rule.successRate, 0) / activeRules.length)
          : 0
    };
  }

  createRecommendation(payload: CreateRecommendationDto): AiRecommendationDto {
    const recommendation: AiRecommendationDto = {
      id: `ai-rec-${this.recommendations.length + 1}`,
      studentProfileId: payload.studentProfileId,
      title: payload.title,
      reason: payload.reason,
      priority: payload.priority,
      status: "OPEN",
      generatedAt: new Date().toISOString().slice(0, 10)
    };

    this.recommendations.unshift(recommendation);
    return recommendation;
  }

  updateRecommendationStatus(
    recommendationId: string,
    payload: UpdateRecommendationStatusDto
  ): AiRecommendationDto {
    const recommendation = this.recommendations.find((item) => item.id === recommendationId);
    if (!recommendation) {
      throw new NotFoundException("Recommendation not found");
    }

    recommendation.status = payload.status;
    return recommendation;
  }
}
