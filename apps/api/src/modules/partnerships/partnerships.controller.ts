import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { UserRole } from "../../common/enums/roles.enum";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { CreatePartnerUniversityDto } from "./dto/create-partner-university.dto";
import { UpdatePartnerMouStatusDto } from "./dto/update-partner-mou-status.dto";
import { PartnershipsService } from "./partnerships.service";

@Controller("partnerships")
@UseGuards(JwtAuthGuard, RolesGuard)
export class PartnershipsController {
  constructor(private readonly partnershipsService: PartnershipsService) {}

  @Get()
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_DIRECTOR,
    UserRole.IR_COORDINATOR,
    UserRole.PARTNER_REPRESENTATIVE
  )
  listAll() {
    return this.partnershipsService.listAll();
  }

  @Get("summary")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_DIRECTOR,
    UserRole.IR_COORDINATOR,
    UserRole.PARTNER_REPRESENTATIVE
  )
  getSummary() {
    return this.partnershipsService.getSummary();
  }

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.IR_DIRECTOR, UserRole.IR_COORDINATOR)
  createPartnerUniversity(@Body() payload: CreatePartnerUniversityDto) {
    return this.partnershipsService.createPartnerUniversity(payload);
  }

  @Patch(":partnerUniversityId/status")
  @Roles(UserRole.SUPER_ADMIN, UserRole.IR_DIRECTOR, UserRole.IR_COORDINATOR)
  updateMouStatus(
    @Param("partnerUniversityId") partnerUniversityId: string,
    @Body() payload: UpdatePartnerMouStatusDto
  ) {
    return this.partnershipsService.updateMouStatus(partnerUniversityId, payload);
  }
}
