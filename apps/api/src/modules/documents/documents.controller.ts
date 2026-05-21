import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { UserRole } from "../../common/enums/roles.enum";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { DocumentsService } from "./documents.service";

@Controller("documents")
@UseGuards(JwtAuthGuard, RolesGuard)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

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
}
