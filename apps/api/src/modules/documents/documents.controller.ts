import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { UserRole } from "../../common/enums/roles.enum";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { CreateStudentDocumentDto } from "./dto/create-student-document.dto";
import { UpdateDocumentStatusDto } from "./dto/update-document-status.dto";
import { DocumentsService } from "./documents.service";

@Controller("documents")
@UseGuards(JwtAuthGuard, RolesGuard)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_COORDINATOR,
    UserRole.FACULTY_MENTOR,
    UserRole.VISA_TEAM,
    UserRole.OUTBOUND_STUDENT
  )
  create(@Body() payload: CreateStudentDocumentDto) {
    return this.documentsService.createDocument(payload);
  }

  @Get("student/:studentId/summary")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_COORDINATOR,
    UserRole.FACULTY_MENTOR,
    UserRole.VISA_TEAM,
    UserRole.OUTBOUND_STUDENT
  )
  getSummary(@Param("studentId") studentId: string) {
    return this.documentsService.getSummary(studentId);
  }

  @Get("student/:studentId")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_COORDINATOR,
    UserRole.FACULTY_MENTOR,
    UserRole.VISA_TEAM,
    UserRole.OUTBOUND_STUDENT
  )
  listByStudent(@Param("studentId") studentId: string) {
    return this.documentsService.listByStudent(studentId);
  }

  @Patch(":documentId/status")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_COORDINATOR,
    UserRole.FACULTY_MENTOR,
    UserRole.VISA_TEAM
  )
  updateStatus(
    @Param("documentId") documentId: string,
    @Body() payload: UpdateDocumentStatusDto
  ) {
    return this.documentsService.updateDocumentStatus(documentId, payload);
  }
}
