import { Body, Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { UserRole } from "../../common/enums/roles.enum";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { UpdateVisaCaseDto } from "./dto/update-visa-case.dto";
import { VisaService } from "./visa.service";

@Controller("visa")
@UseGuards(JwtAuthGuard, RolesGuard)
export class VisaController {
  constructor(private readonly visaService: VisaService) {}

  @Get("student/:studentId")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_COORDINATOR,
    UserRole.VISA_TEAM,
    UserRole.OUTBOUND_STUDENT
  )
  listByStudent(@Param("studentId") studentId: string) {
    return this.visaService.listByStudent(studentId);
  }

  @Get("student/:studentId/summary")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_COORDINATOR,
    UserRole.VISA_TEAM,
    UserRole.OUTBOUND_STUDENT
  )
  getSummary(@Param("studentId") studentId: string) {
    return this.visaService.getSummary(studentId);
  }

  @Patch(":visaCaseId")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_COORDINATOR,
    UserRole.VISA_TEAM
  )
  updateVisaCase(
    @Param("visaCaseId") visaCaseId: string,
    @Body() payload: UpdateVisaCaseDto
  ) {
    return this.visaService.updateVisaCase(visaCaseId, payload);
  }
}
