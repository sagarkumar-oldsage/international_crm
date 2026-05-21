import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { StudentDocumentDto } from "./dto/student-document.dto";

@Injectable()
export class DocumentsService {
  constructor(private readonly prismaService: PrismaService) {}

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
}
