import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { UserRole } from "../../common/enums/roles.enum";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { CreateRecommendationDto } from "./dto/create-recommendation.dto";
import { UpdateRecommendationStatusDto } from "./dto/update-recommendation-status.dto";
import { AiAutomationService } from "./ai-automation.service";

@Controller("ai-automation")
@UseGuards(JwtAuthGuard, RolesGuard)
export class AiAutomationController {
  constructor(private readonly aiAutomationService: AiAutomationService) {}

  @Get("rules")
  @Roles(UserRole.SUPER_ADMIN, UserRole.IR_DIRECTOR, UserRole.IR_COORDINATOR)
  listRules() {
    return this.aiAutomationService.listRules();
  }

  @Get("recommendations/student/:studentId")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_DIRECTOR,
    UserRole.IR_COORDINATOR,
    UserRole.OUTBOUND_STUDENT,
    UserRole.INCOMING_STUDENT
  )
  listRecommendations(@Param("studentId") studentId: string) {
    return this.aiAutomationService.listRecommendations(studentId);
  }

  @Get("recommendations/student/:studentId/summary")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_DIRECTOR,
    UserRole.IR_COORDINATOR,
    UserRole.OUTBOUND_STUDENT,
    UserRole.INCOMING_STUDENT
  )
  getSummary(@Param("studentId") studentId: string) {
    return this.aiAutomationService.getSummary(studentId);
  }

  @Post("recommendations")
  @Roles(UserRole.SUPER_ADMIN, UserRole.IR_DIRECTOR, UserRole.IR_COORDINATOR)
  createRecommendation(@Body() payload: CreateRecommendationDto) {
    return this.aiAutomationService.createRecommendation(payload);
  }

  @Patch("recommendations/:recommendationId/status")
  @Roles(UserRole.SUPER_ADMIN, UserRole.IR_DIRECTOR, UserRole.IR_COORDINATOR)
  updateRecommendationStatus(
    @Param("recommendationId") recommendationId: string,
    @Body() payload: UpdateRecommendationStatusDto
  ) {
    return this.aiAutomationService.updateRecommendationStatus(recommendationId, payload);
  }
}
