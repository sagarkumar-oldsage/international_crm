import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { StudentVisaCaseDto, StudentVisaSummaryDto } from "./dto/student-visa-case.dto";
import { UpdateVisaCaseDto } from "./dto/update-visa-case.dto";

@Injectable()
export class VisaService {
  constructor(private readonly prismaService: PrismaService) {}

  private mapVisaCase(visaCase: {
    id: string;
    studentProfileId: string;
    country: string;
    visaType: string;
    currentStage:
      | "NOT_STARTED"
      | "DOCUMENT_COLLECTION"
      | "APPOINTMENT_BOOKED"
      | "BIOMETRICS_COMPLETED"
      | "INTERVIEW_SCHEDULED"
      | "UNDER_PROCESS"
      | "APPROVED"
      | "REJECTED";
    appointmentDate: Date | null;
    biometricsDate: Date | null;
    interviewDate: Date | null;
    decisionDate: Date | null;
    notes: string | null;
  }): StudentVisaCaseDto {
    return {
      id: visaCase.id,
      studentId: visaCase.studentProfileId,
      country: visaCase.country,
      visaType: visaCase.visaType,
      currentStage: visaCase.currentStage,
      appointmentDate: visaCase.appointmentDate?.toISOString().slice(0, 10) ?? null,
      biometricsDate: visaCase.biometricsDate?.toISOString().slice(0, 10) ?? null,
      interviewDate: visaCase.interviewDate?.toISOString().slice(0, 10) ?? null,
      decisionDate: visaCase.decisionDate?.toISOString().slice(0, 10) ?? null,
      notes: visaCase.notes
    };
  }

  async listByStudent(studentId: string): Promise<StudentVisaCaseDto[]> {
    const visaCases = await this.prismaService.visaCase.findMany({
      where: {
        studentProfileId: studentId
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return visaCases.map((visaCase) => this.mapVisaCase(visaCase));
  }

  async getSummary(studentId: string): Promise<StudentVisaSummaryDto> {
    const visaCases = await this.prismaService.visaCase.findMany({
      where: {
        studentProfileId: studentId
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    const latestCase = visaCases[0] ?? null;
    const nextMilestone = latestCase?.interviewDate
      ? { label: "Interview", date: latestCase.interviewDate }
      : latestCase?.appointmentDate
        ? { label: "Appointment", date: latestCase.appointmentDate }
        : latestCase?.biometricsDate
          ? { label: "Biometrics", date: latestCase.biometricsDate }
          : null;

    return {
      studentId,
      totalVisaCases: visaCases.length,
      activeStage: latestCase?.currentStage ?? null,
      nextMilestoneLabel: nextMilestone?.label ?? null,
      nextMilestoneDate: nextMilestone?.date.toISOString().slice(0, 10) ?? null,
      approvedCases: visaCases.filter((visaCase) => visaCase.currentStage === "APPROVED").length
    };
  }

  async updateVisaCase(visaCaseId: string, payload: UpdateVisaCaseDto): Promise<StudentVisaCaseDto> {
    const existingVisaCase = await this.prismaService.visaCase.findUnique({
      where: {
        id: visaCaseId
      }
    });

    if (!existingVisaCase) {
      throw new NotFoundException("Visa case not found");
    }

    const updatedVisaCase = await this.prismaService.visaCase.update({
      where: {
        id: visaCaseId
      },
      data: {
        currentStage: payload.currentStage,
        appointmentDate: payload.appointmentDate
          ? new Date(payload.appointmentDate)
          : existingVisaCase.appointmentDate,
        biometricsDate: payload.biometricsDate
          ? new Date(payload.biometricsDate)
          : existingVisaCase.biometricsDate,
        interviewDate: payload.interviewDate
          ? new Date(payload.interviewDate)
          : existingVisaCase.interviewDate,
        decisionDate: payload.decisionDate
          ? new Date(payload.decisionDate)
          : existingVisaCase.decisionDate,
        notes: payload.notes ?? existingVisaCase.notes
      }
    });

    return this.mapVisaCase(updatedVisaCase);
  }
}
