import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { UserRole } from "../../common/enums/roles.enum";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { CreateSupportRequestDto } from "./dto/create-support-request.dto";
import { UpdateSupportRequestDto } from "./dto/update-support-request.dto";
import { SupportService } from "./support.service";

@Controller("support")
@UseGuards(JwtAuthGuard, RolesGuard)
export class SupportController {
  constructor(private readonly supportService: SupportService) {}

  @Get("student/:studentId")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_DIRECTOR,
    UserRole.IR_COORDINATOR,
    UserRole.OUTBOUND_STUDENT,
    UserRole.INCOMING_STUDENT
  )
  listByStudent(@Param("studentId") studentId: string) {
    return this.supportService.listByStudent(studentId);
  }

  @Get("student/:studentId/summary")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_DIRECTOR,
    UserRole.IR_COORDINATOR,
    UserRole.OUTBOUND_STUDENT,
    UserRole.INCOMING_STUDENT
  )
  getSummary(@Param("studentId") studentId: string) {
    return this.supportService.getSummary(studentId);
  }

  @Post()
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_DIRECTOR,
    UserRole.IR_COORDINATOR,
    UserRole.OUTBOUND_STUDENT,
    UserRole.INCOMING_STUDENT
  )
  createRequest(@Body() payload: CreateSupportRequestDto) {
    return this.supportService.createRequest(payload);
  }

  @Patch(":requestId")
  @Roles(UserRole.SUPER_ADMIN, UserRole.IR_DIRECTOR, UserRole.IR_COORDINATOR)
  updateRequest(@Param("requestId") requestId: string, @Body() payload: UpdateSupportRequestDto) {
    return this.supportService.updateRequest(requestId, payload);
  }
}
