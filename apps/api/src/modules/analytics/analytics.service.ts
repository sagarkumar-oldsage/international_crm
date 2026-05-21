import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { AnalyticsOverviewDto } from "./dto/analytics-overview.dto";

@Injectable()
export class AnalyticsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getOverview(): Promise<AnalyticsOverviewDto> {
    const now = new Date();

    const [
      totalStudents,
      totalApplications,
      visaApprovedCount,
      activePartnerships,
      upcomingEvents,
      openSupportTickets
    ] = await Promise.all([
      this.prismaService.studentProfile.count(),
      this.prismaService.studentApplication.count(),
      this.prismaService.visaCase.count({
        where: {
          currentStage: "APPROVED"
        }
      }),
      this.prismaService.partnerUniversity.count({
        where: {
          mouStatus: {
            in: ["ACTIVE", "RENEWAL_DUE"]
          }
        }
      }),
      this.prismaService.internationalEvent.count({
        where: {
          startDate: {
            gte: now
          }
        }
      }),
      this.prismaService.supportTicket.count({
        where: {
          status: {
            in: ["OPEN", "IN_PROGRESS", "ON_HOLD"]
          }
        }
      })
    ]);

    return {
      totalStudents,
      activeApplications: totalApplications,
      visaApprovalRate: totalApplications > 0 ? Math.round((visaApprovedCount / totalApplications) * 100) : 0,
      activePartnerships,
      upcomingEvents,
      openSupportTickets
    };
  }
}
