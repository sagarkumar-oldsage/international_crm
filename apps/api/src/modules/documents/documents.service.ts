import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateStudentDocumentDto } from "./dto/create-student-document.dto";
import { StudentDocumentDto } from "./dto/student-document.dto";
import { StudentDocumentSummaryDto } from "./dto/document-summary.dto";
import { UpdateDocumentStatusDto } from "./dto/update-document-status.dto";

const REQUIRED_DOCUMENT_CATEGORIES = [
  "PASSPORT",
  "SOP",
  "CV",
  "MARKSHEET",
  "FINANCIAL_STATEMENT"
] as const;

@Injectable()
export class DocumentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createDocument(payload: CreateStudentDocumentDto): Promise<StudentDocumentDto> {
    const document = await this.prismaService.studentDocument.create({
      data: {
        studentProfileId: payload.studentId,
        category: payload.category,
        fileName: payload.fileName,
        storagePath: payload.storagePath,
        status: "PENDING_REVIEW",
        expiresAt: payload.expiresAt ? new Date(payload.expiresAt) : null,
        notes: payload.notes ?? null
      }
    });

    return {
      id: document.id,
      studentId: document.studentProfileId,
      category: document.category,
      fileName: document.fileName,
      storagePath: document.storagePath,
      status: document.status,
      expiresAt: document.expiresAt ? document.expiresAt.toISOString().slice(0, 10) : null,
      notes: document.notes
    };
  }

  async listByStudent(studentId: string): Promise<StudentDocumentDto[]> {
    const documents = await this.prismaService.studentDocument.findMany({
      where: {
        studentProfileId: studentId
      },
      orderBy: [{ status: "asc" }, { createdAt: "desc" }]
    });

    return documents.map((document) => ({
      id: document.id,
      studentId: document.studentProfileId,
      category: document.category,
      fileName: document.fileName,
      storagePath: document.storagePath,
      status: document.status,
      expiresAt: document.expiresAt ? document.expiresAt.toISOString().slice(0, 10) : null,
      notes: document.notes
    }));
  }

  async getSummary(studentId: string): Promise<StudentDocumentSummaryDto> {
    const documents = await this.prismaService.studentDocument.findMany({
      where: {
        studentProfileId: studentId
      }
    });

    const now = new Date();
    const thirtyDaysFromNow = new Date(now);
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    const uploadedCategories = new Set(documents.map((document) => document.category));
    const missingCategories = REQUIRED_DOCUMENT_CATEGORIES.filter(
      (category) => !uploadedCategories.has(category)
    );

    const verifiedDocuments = documents.filter((document) => document.status === "VERIFIED").length;
    const pendingReviewDocuments = documents.filter(
      (document) => document.status === "PENDING_REVIEW"
    ).length;
    const expiredDocuments = documents.filter(
      (document) =>
        document.status === "EXPIRED" ||
        (document.expiresAt !== null && document.expiresAt.getTime() < now.getTime())
    ).length;
    const expiringSoonDocuments = documents.filter(
      (document) =>
        document.expiresAt !== null &&
        document.expiresAt.getTime() >= now.getTime() &&
        document.expiresAt.getTime() <= thirtyDaysFromNow.getTime()
    ).length;

    return {
      studentId,
      totalDocuments: documents.length,
      verifiedDocuments,
      pendingReviewDocuments,
      expiredDocuments,
      expiringSoonDocuments,
      completionPercentage: Math.round(
        ((REQUIRED_DOCUMENT_CATEGORIES.length - missingCategories.length) /
          REQUIRED_DOCUMENT_CATEGORIES.length) *
          100
      ),
      missingCategories
    };
  }

  async updateDocumentStatus(
    documentId: string,
    payload: UpdateDocumentStatusDto
  ): Promise<StudentDocumentDto> {
    const existingDocument = await this.prismaService.studentDocument.findUnique({
      where: {
        id: documentId
      }
    });

    if (!existingDocument) {
      throw new NotFoundException("Document record not found");
    }

    const document = await this.prismaService.studentDocument.update({
      where: {
        id: documentId
      },
      data: {
        status: payload.status,
        expiresAt: payload.expiresAt ? new Date(payload.expiresAt) : existingDocument.expiresAt,
        notes: payload.notes ?? existingDocument.notes
      }
    });

    return {
      id: document.id,
      studentId: document.studentProfileId,
      category: document.category,
      fileName: document.fileName,
      storagePath: document.storagePath,
      status: document.status,
      expiresAt: document.expiresAt ? document.expiresAt.toISOString().slice(0, 10) : null,
      notes: document.notes
    };
  }
}
