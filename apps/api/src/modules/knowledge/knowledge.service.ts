import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateKnowledgeArticleDto } from "./dto/create-knowledge-article.dto";
import { KnowledgeArticleDto, KnowledgeSummaryDto, LearningTrackDto } from "./dto/knowledge.dto";
import { UpdateLearningTrackDto } from "./dto/update-learning-track.dto";

@Injectable()
export class KnowledgeService {
  private readonly articles: KnowledgeArticleDto[] = [
    {
      id: "article-1",
      title: "Pre-Departure Checklist 2026",
      category: "Mobility",
      audience: "Outbound Students",
      readTimeMinutes: 8,
      updatedAt: "2026-05-20"
    },
    {
      id: "article-2",
      title: "Visa Interview Preparation Playbook",
      category: "Visa",
      audience: "Outbound Students",
      readTimeMinutes: 11,
      updatedAt: "2026-05-21"
    }
  ];

  private readonly tracks: LearningTrackDto[] = [
    {
      id: "track-1",
      studentProfileId: "student-1",
      title: "Global Mobility Foundation",
      progressPercentage: 65,
      mandatory: true,
      status: "IN_PROGRESS"
    },
    {
      id: "track-2",
      studentProfileId: "student-1",
      title: "Cross-Cultural Adaptation Essentials",
      progressPercentage: 100,
      mandatory: true,
      status: "COMPLETED"
    }
  ];

  listArticles(): KnowledgeArticleDto[] {
    return this.articles;
  }

  listTracks(studentId: string): LearningTrackDto[] {
    return this.tracks.filter((track) => track.studentProfileId === studentId);
  }

  getSummary(studentId: string): KnowledgeSummaryDto {
    const tracks = this.listTracks(studentId);
    return {
      articlesPublished: this.articles.length,
      mandatoryTracks: tracks.filter((track) => track.mandatory).length,
      completedTracks: tracks.filter((track) => track.status === "COMPLETED").length,
      averageProgress:
        tracks.length > 0
          ? Math.round(tracks.reduce((total, track) => total + track.progressPercentage, 0) / tracks.length)
          : 0
    };
  }

  createArticle(payload: CreateKnowledgeArticleDto): KnowledgeArticleDto {
    const article: KnowledgeArticleDto = {
      id: `article-${this.articles.length + 1}`,
      title: payload.title,
      category: payload.category,
      audience: payload.audience,
      readTimeMinutes: payload.readTimeMinutes,
      updatedAt: new Date().toISOString().slice(0, 10)
    };

    this.articles.unshift(article);
    return article;
  }

  updateTrack(trackId: string, payload: UpdateLearningTrackDto): LearningTrackDto {
    const track = this.tracks.find((item) => item.id === trackId);
    if (!track) {
      throw new NotFoundException("Learning track not found");
    }

    track.progressPercentage = payload.progressPercentage;
    track.status = payload.status;
    return track;
  }
}
