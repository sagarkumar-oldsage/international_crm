import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateSupportRequestDto } from "./dto/create-support-request.dto";
import { SupportRequestDto, SupportRequestSummaryDto } from "./dto/support-request.dto";
import { UpdateSupportRequestDto } from "./dto/update-support-request.dto";

@Injectable()
export class SupportService {
  constructor(private readonly prismaService: PrismaService) {}

  private mapRequest(request: {
    id: string;
    studentProfileId: string;
    category:
      | "PRE_ARRIVAL"
      | "POST_ARRIVAL"
      | "HOSTEL"
      | "MEDICAL"
      | "CAMPUS_ONBOARDING"
      | "CULTURAL_ADAPTATION";
    title: string;
    details: string;
    status: "REQUESTED" | "IN_REVIEW" | "ACTION_IN_PROGRESS" | "COMPLETED" | "CANCELLED";
    assignedTeam: string | null;
    appointmentDate: Date | null;
    completionNotes: string | null;
  }): SupportRequestDto {
    return {
      id: request.id,
      studentProfileId: request.studentProfileId,
      category: request.category,
      title: request.title,
      details: request.details,
      status: request.status,
      assignedTeam: request.assignedTeam,
      appointmentDate: request.appointmentDate?.toISOString() ?? null,
      completionNotes: request.completionNotes
    };
  }

  async listByStudent(studentId: string): Promise<SupportRequestDto[]> {
    const requests = await this.prismaService.internationalSupportRequest.findMany({
      where: {
        studentProfileId: studentId
      },
      orderBy: [{ status: "asc" }, { createdAt: "desc" }]
    });

    return requests.map((request) => this.mapRequest(request));
  }

  async getSummary(studentId: string): Promise<SupportRequestSummaryDto> {
    const requests = await this.prismaService.internationalSupportRequest.findMany({
      where: {
        studentProfileId: studentId
      }
    });

    return {
      totalRequests: requests.length,
      openRequests: requests.filter((request) => ["REQUESTED", "IN_REVIEW", "ACTION_IN_PROGRESS"].includes(request.status)).length,
      preArrivalRequests: requests.filter((request) => request.category === "PRE_ARRIVAL").length,
      postArrivalRequests: requests.filter((request) => request.category !== "PRE_ARRIVAL").length,
      completedRequests: requests.filter((request) => request.status === "COMPLETED").length
    };
  }

  async createRequest(payload: CreateSupportRequestDto): Promise<SupportRequestDto> {
    const request = await this.prismaService.internationalSupportRequest.create({
      data: {
        studentProfileId: payload.studentProfileId,
        category: payload.category,
        title: payload.title,
        details: payload.details,
        status: "REQUESTED",
        assignedTeam: payload.assignedTeam ?? null,
        appointmentDate: null,
        completionNotes: null
      }
    });

    return this.mapRequest(request);
  }

  async updateRequest(requestId: string, payload: UpdateSupportRequestDto): Promise<SupportRequestDto> {
    const existingRequest = await this.prismaService.internationalSupportRequest.findUnique({
      where: {
        id: requestId
      }
    });

    if (!existingRequest) {
      throw new NotFoundException("Support request not found");
    }

    const request = await this.prismaService.internationalSupportRequest.update({
      where: {
        id: requestId
      },
      data: {
        status: payload.status,
        assignedTeam: payload.assignedTeam ?? existingRequest.assignedTeam,
        appointmentDate: payload.appointmentDate
          ? new Date(payload.appointmentDate)
          : existingRequest.appointmentDate,
        completionNotes: payload.completionNotes ?? existingRequest.completionNotes
      }
    });

    return this.mapRequest(request);
  }
}
