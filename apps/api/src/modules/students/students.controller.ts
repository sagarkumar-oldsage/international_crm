import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { UserRole } from "../../common/enums/roles.enum";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { StudentsService } from "./students.service";

@Controller("students")
@UseGuards(JwtAuthGuard, RolesGuard)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get(":studentId/profile")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_COORDINATOR,
    UserRole.FACULTY_MENTOR,
    UserRole.OUTBOUND_STUDENT
  )
  getProfile(@Param("studentId") studentId: string) {
    return this.studentsService.getProfile(studentId);
  }
}
