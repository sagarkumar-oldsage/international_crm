import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { UserRole } from "../../common/enums/roles.enum";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { CreateMobileFeedbackDto } from "./dto/create-mobile-feedback.dto";
import { UpdateMobileFeedbackStatusDto } from "./dto/update-mobile-feedback-status.dto";
import { MobileExperienceService } from "./mobile-experience.service";

@Controller("mobile-experience")
@UseGuards(JwtAuthGuard, RolesGuard)
export class MobileExperienceController {
  constructor(private readonly mobileExperienceService: MobileExperienceService) {}

  @Get("announcements")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_DIRECTOR,
    UserRole.IR_COORDINATOR,
    UserRole.OUTBOUND_STUDENT,
    UserRole.INCOMING_STUDENT
  )
  listAnnouncements() {
    return this.mobileExperienceService.listAnnouncements();
  }

  @Get("feedback/student/:studentId")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_DIRECTOR,
    UserRole.IR_COORDINATOR,
    UserRole.OUTBOUND_STUDENT,
    UserRole.INCOMING_STUDENT
  )
  listFeedback(@Param("studentId") studentId: string) {
    return this.mobileExperienceService.listFeedback(studentId);
  }

  @Get("feedback/student/:studentId/summary")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_DIRECTOR,
    UserRole.IR_COORDINATOR,
    UserRole.OUTBOUND_STUDENT,
    UserRole.INCOMING_STUDENT
  )
  getSummary(@Param("studentId") studentId: string) {
    return this.mobileExperienceService.getSummary(studentId);
  }

  @Post("feedback")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_DIRECTOR,
    UserRole.IR_COORDINATOR,
    UserRole.OUTBOUND_STUDENT,
    UserRole.INCOMING_STUDENT
  )
  createFeedback(@Body() payload: CreateMobileFeedbackDto) {
    return this.mobileExperienceService.createFeedback(payload);
  }

  @Patch("feedback/:feedbackId/status")
  @Roles(UserRole.SUPER_ADMIN, UserRole.IR_DIRECTOR, UserRole.IR_COORDINATOR)
  updateFeedbackStatus(
    @Param("feedbackId") feedbackId: string,
    @Body() payload: UpdateMobileFeedbackStatusDto
  ) {
    return this.mobileExperienceService.updateFeedbackStatus(feedbackId, payload);
  }
}
