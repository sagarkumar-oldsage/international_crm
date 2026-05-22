import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { UserRole } from "../../common/enums/roles.enum";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { CreateInitiativeDto } from "./dto/create-initiative.dto";
import { UpdateInitiativeStatusDto } from "./dto/update-initiative-status.dto";
import { InstitutionalService } from "./institutional.service";

@Controller("institutional")
@UseGuards(JwtAuthGuard, RolesGuard)
export class InstitutionalController {
  constructor(private readonly institutionalService: InstitutionalService) {}

  @Get("kpis")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_DIRECTOR,
    UserRole.IR_COORDINATOR,
    UserRole.DEPARTMENT_COORDINATOR
  )
  listKpis() {
    return this.institutionalService.listKpis();
  }

  @Get("initiatives")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_DIRECTOR,
    UserRole.IR_COORDINATOR,
    UserRole.DEPARTMENT_COORDINATOR
  )
  listInitiatives() {
    return this.institutionalService.listInitiatives();
  }

  @Get("summary")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_DIRECTOR,
    UserRole.IR_COORDINATOR,
    UserRole.DEPARTMENT_COORDINATOR
  )
  getSummary() {
    return this.institutionalService.getSummary();
  }

  @Post("initiatives")
  @Roles(UserRole.SUPER_ADMIN, UserRole.IR_DIRECTOR, UserRole.IR_COORDINATOR)
  createInitiative(@Body() payload: CreateInitiativeDto) {
    return this.institutionalService.createInitiative(payload);
  }

  @Patch("initiatives/:initiativeId/status")
  @Roles(UserRole.SUPER_ADMIN, UserRole.IR_DIRECTOR, UserRole.IR_COORDINATOR)
  updateInitiativeStatus(
    @Param("initiativeId") initiativeId: string,
    @Body() payload: UpdateInitiativeStatusDto
  ) {
    return this.institutionalService.updateInitiativeStatus(initiativeId, payload);
  }
}
