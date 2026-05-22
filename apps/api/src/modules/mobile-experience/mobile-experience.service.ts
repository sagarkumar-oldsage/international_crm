import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMobileFeedbackDto } from "./dto/create-mobile-feedback.dto";
import {
  MobileAnnouncementDto,
  MobileExperienceSummaryDto,
  MobileFeedbackDto
} from "./dto/mobile-experience.dto";
import { UpdateMobileFeedbackStatusDto } from "./dto/update-mobile-feedback-status.dto";

@Injectable()
export class MobileExperienceService {
  private readonly announcements: MobileAnnouncementDto[] = [
    {
      id: "mob-ann-1",
      title: "In-app Document Scanner Upgrade",
      body: "Improved OCR support for passport and visa pages.",
      audience: "All Students",
      publishedAt: "2026-05-20"
    },
    {
      id: "mob-ann-2",
      title: "Push Alerts for Visa Milestones",
      body: "Receive personalized milestone reminders directly on mobile.",
      audience: "Outbound Students",
      publishedAt: "2026-05-22"
    }
  ];

  private readonly feedback: MobileFeedbackDto[] = [
    {
      id: "mob-fb-1",
      studentProfileId: "student-1",
      featureArea: "Notifications",
      feedback: "Need timezone-aware reminders for interview slots.",
      rating: 4,
      status: "UNDER_REVIEW",
      createdAt: "2026-05-18"
    },
    {
      id: "mob-fb-2",
      studentProfileId: "student-1",
      featureArea: "Profile",
      feedback: "Add quick edit for emergency contact details.",
      rating: 5,
      status: "NEW",
      createdAt: "2026-05-21"
    }
  ];

  listAnnouncements(): MobileAnnouncementDto[] {
    return this.announcements;
  }

  listFeedback(studentId: string): MobileFeedbackDto[] {
    return this.feedback.filter((item) => item.studentProfileId === studentId);
  }

  getSummary(studentId: string): MobileExperienceSummaryDto {
    const studentFeedback = this.listFeedback(studentId);
    return {
      activeAnnouncements: this.announcements.length,
      feedbackTickets: studentFeedback.length,
      averageRating:
        studentFeedback.length > 0
          ? Number(
              (
                studentFeedback.reduce((total, item) => total + item.rating, 0) /
                studentFeedback.length
              ).toFixed(1)
            )
          : 0,
      resolvedFeedback: studentFeedback.filter((item) => item.status === "RESOLVED").length
    };
  }

  createFeedback(payload: CreateMobileFeedbackDto): MobileFeedbackDto {
    const created: MobileFeedbackDto = {
      id: `mob-fb-${this.feedback.length + 1}`,
      studentProfileId: payload.studentProfileId,
      featureArea: payload.featureArea,
      feedback: payload.feedback,
      rating: payload.rating,
      status: "NEW",
      createdAt: new Date().toISOString().slice(0, 10)
    };

    this.feedback.unshift(created);
    return created;
  }

  updateFeedbackStatus(feedbackId: string, payload: UpdateMobileFeedbackStatusDto): MobileFeedbackDto {
    const feedback = this.feedback.find((item) => item.id === feedbackId);
    if (!feedback) {
      throw new NotFoundException("Feedback entry not found");
    }

    feedback.status = payload.status;
    return feedback;
  }
}
