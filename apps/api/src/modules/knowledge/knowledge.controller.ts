import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { UserRole } from "../../common/enums/roles.enum";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { CreateKnowledgeArticleDto } from "./dto/create-knowledge-article.dto";
import { UpdateLearningTrackDto } from "./dto/update-learning-track.dto";
import { KnowledgeService } from "./knowledge.service";

@Controller("knowledge")
@UseGuards(JwtAuthGuard, RolesGuard)
export class KnowledgeController {
  constructor(private readonly knowledgeService: KnowledgeService) {}

  @Get("articles")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_DIRECTOR,
    UserRole.IR_COORDINATOR,
    UserRole.OUTBOUND_STUDENT,
    UserRole.INCOMING_STUDENT
  )
  listArticles() {
    return this.knowledgeService.listArticles();
  }

  @Get("tracks/student/:studentId")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_DIRECTOR,
    UserRole.IR_COORDINATOR,
    UserRole.OUTBOUND_STUDENT,
    UserRole.INCOMING_STUDENT
  )
  listTracks(@Param("studentId") studentId: string) {
    return this.knowledgeService.listTracks(studentId);
  }

  @Get("tracks/student/:studentId/summary")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_DIRECTOR,
    UserRole.IR_COORDINATOR,
    UserRole.OUTBOUND_STUDENT,
    UserRole.INCOMING_STUDENT
  )
  getSummary(@Param("studentId") studentId: string) {
    return this.knowledgeService.getSummary(studentId);
  }

  @Post("articles")
  @Roles(UserRole.SUPER_ADMIN, UserRole.IR_DIRECTOR, UserRole.IR_COORDINATOR)
  createArticle(@Body() payload: CreateKnowledgeArticleDto) {
    return this.knowledgeService.createArticle(payload);
  }

  @Patch("tracks/:trackId")
  @Roles(UserRole.SUPER_ADMIN, UserRole.IR_DIRECTOR, UserRole.IR_COORDINATOR)
  updateTrack(@Param("trackId") trackId: string, @Body() payload: UpdateLearningTrackDto) {
    return this.knowledgeService.updateTrack(trackId, payload);
  }
}
