import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateScholarshipCaseDto } from "./dto/create-scholarship-case.dto";
import { CreateStudentFinanceRecordDto } from "./dto/create-student-finance-record.dto";
import {
  FinanceScholarshipSummaryDto,
  ScholarshipCaseDto,
  StudentFinanceRecordDto
} from "./dto/student-finance-record.dto";
import { UpdateScholarshipCaseStatusDto } from "./dto/update-scholarship-case-status.dto";
import { UpdateStudentFinanceRecordStatusDto } from "./dto/update-student-finance-record-status.dto";

@Injectable()
export class FinanceService {
  constructor(private readonly prismaService: PrismaService) {}

  private mapFinanceRecord(record: {
    id: string;
    studentProfileId: string;
    itemType: "TUITION" | "HOSTEL" | "INSURANCE" | "VISA_FEES" | "TRAVEL" | "SCHOLARSHIP_DISBURSEMENT" | "OTHER";
    label: string;
    amount: { toNumber(): number };
    currency: string;
    status: "PENDING" | "PARTIALLY_PAID" | "PAID" | "OVERDUE" | "WAIVED";
    dueDate: Date;
    paidDate: Date | null;
    notes: string | null;
  }): StudentFinanceRecordDto {
    return {
      id: record.id,
      studentProfileId: record.studentProfileId,
      itemType: record.itemType,
      label: record.label,
      amount: record.amount.toNumber(),
      currency: record.currency,
      status: record.status,
      dueDate: record.dueDate.toISOString().slice(0, 10),
      paidDate: record.paidDate?.toISOString().slice(0, 10) ?? null,
      notes: record.notes
    };
  }

  private mapScholarshipCase(record: {
    id: string;
    studentProfileId: string;
    scholarshipName: string;
    providerName: string;
    amount: { toNumber(): number };
    currency: string;
    status: "IDENTIFIED" | "APPLIED" | "UNDER_REVIEW" | "AWARDED" | "DISBURSED" | "REJECTED";
    deadline: Date | null;
    awardedDate: Date | null;
    disbursedDate: Date | null;
    notes: string | null;
  }): ScholarshipCaseDto {
    return {
      id: record.id,
      studentProfileId: record.studentProfileId,
      scholarshipName: record.scholarshipName,
      providerName: record.providerName,
      amount: record.amount.toNumber(),
      currency: record.currency,
      status: record.status,
      deadline: record.deadline?.toISOString().slice(0, 10) ?? null,
      awardedDate: record.awardedDate?.toISOString().slice(0, 10) ?? null,
      disbursedDate: record.disbursedDate?.toISOString().slice(0, 10) ?? null,
      notes: record.notes
    };
  }

  async listFinanceRecords(studentId: string): Promise<StudentFinanceRecordDto[]> {
    const records = await this.prismaService.studentFinanceRecord.findMany({
      where: {
        studentProfileId: studentId
      },
      orderBy: [{ dueDate: "asc" }, { createdAt: "desc" }]
    });

    return records.map((record) => this.mapFinanceRecord(record));
  }

  async listScholarships(studentId: string): Promise<ScholarshipCaseDto[]> {
    const records = await this.prismaService.scholarshipCase.findMany({
      where: {
        studentProfileId: studentId
      },
      orderBy: [{ status: "asc" }, { createdAt: "desc" }]
    });

    return records.map((record) => this.mapScholarshipCase(record));
  }

  async getSummary(studentId: string): Promise<FinanceScholarshipSummaryDto> {
    const financeRecords = await this.prismaService.studentFinanceRecord.findMany({
      where: {
        studentProfileId: studentId
      }
    });
    const scholarshipRecords = await this.prismaService.scholarshipCase.findMany({
      where: {
        studentProfileId: studentId
      }
    });

    const totalPayableAmount = financeRecords.reduce((total, record) => total + record.amount.toNumber(), 0);
    const totalPaidAmount = financeRecords
      .filter((record) => ["PAID", "WAIVED"].includes(record.status))
      .reduce((total, record) => total + record.amount.toNumber(), 0);
    const pendingAmount = totalPayableAmount - totalPaidAmount;

    return {
      totalPayableAmount,
      totalPaidAmount,
      pendingAmount,
      activeScholarships: scholarshipRecords.filter((record) => ["APPLIED", "UNDER_REVIEW", "AWARDED"].includes(record.status)).length,
      awardedScholarshipAmount: scholarshipRecords
        .filter((record) => ["AWARDED", "DISBURSED"].includes(record.status))
        .reduce((total, record) => total + record.amount.toNumber(), 0)
    };
  }

  async createFinanceRecord(payload: CreateStudentFinanceRecordDto): Promise<StudentFinanceRecordDto> {
    const record = await this.prismaService.studentFinanceRecord.create({
      data: {
        studentProfileId: payload.studentProfileId,
        itemType: payload.itemType,
        label: payload.label,
        amount: payload.amount,
        currency: payload.currency,
        status: "PENDING",
        dueDate: new Date(payload.dueDate),
        paidDate: null,
        notes: payload.notes ?? null
      }
    });

    return this.mapFinanceRecord(record);
  }

  async createScholarshipCase(payload: CreateScholarshipCaseDto): Promise<ScholarshipCaseDto> {
    const record = await this.prismaService.scholarshipCase.create({
      data: {
        studentProfileId: payload.studentProfileId,
        scholarshipName: payload.scholarshipName,
        providerName: payload.providerName,
        amount: payload.amount,
        currency: payload.currency,
        status: payload.status,
        deadline: payload.deadline ? new Date(payload.deadline) : null,
        awardedDate: null,
        disbursedDate: null,
        notes: payload.notes ?? null
      }
    });

    return this.mapScholarshipCase(record);
  }

  async updateFinanceRecordStatus(
    recordId: string,
    payload: UpdateStudentFinanceRecordStatusDto
  ): Promise<StudentFinanceRecordDto> {
    const existingRecord = await this.prismaService.studentFinanceRecord.findUnique({
      where: {
        id: recordId
      }
    });

    if (!existingRecord) {
      throw new NotFoundException("Finance record not found");
    }

    const record = await this.prismaService.studentFinanceRecord.update({
      where: {
        id: recordId
      },
      data: {
        status: payload.status,
        paidDate: payload.paidDate ? new Date(payload.paidDate) : existingRecord.paidDate,
        notes: payload.notes ?? existingRecord.notes
      }
    });

    return this.mapFinanceRecord(record);
  }

  async updateScholarshipStatus(
    scholarshipId: string,
    payload: UpdateScholarshipCaseStatusDto
  ): Promise<ScholarshipCaseDto> {
    const existingRecord = await this.prismaService.scholarshipCase.findUnique({
      where: {
        id: scholarshipId
      }
    });

    if (!existingRecord) {
      throw new NotFoundException("Scholarship record not found");
    }

    const record = await this.prismaService.scholarshipCase.update({
      where: {
        id: scholarshipId
      },
      data: {
        status: payload.status,
        awardedDate: payload.awardedDate ? new Date(payload.awardedDate) : existingRecord.awardedDate,
        disbursedDate: payload.disbursedDate ? new Date(payload.disbursedDate) : existingRecord.disbursedDate,
        notes: payload.notes ?? existingRecord.notes
      }
    });

    return this.mapScholarshipCase(record);
  }
}
