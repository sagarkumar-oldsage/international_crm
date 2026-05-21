import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { UserRole } from "../../common/enums/roles.enum";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { ApplicationsService } from "./applications.service";

@Controller("applications")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Get("student/:studentId")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_COORDINATOR,
    UserRole.FACULTY_MENTOR,
    UserRole.OUTBOUND_STUDENT
  )
  listByStudent(@Param("studentId") studentId: string) {
    return this.applicationsService.listByStudent(studentId);
  }
}
