import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { UserRole } from "../../common/enums/roles.enum";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { CreateShortlistDto } from "./dto/create-shortlist.dto";
import { UpdateShortlistStatusDto } from "./dto/update-shortlist-status.dto";
import { DiscoveryService } from "./discovery.service";

@Controller("discovery")
@UseGuards(JwtAuthGuard, RolesGuard)
export class DiscoveryController {
  constructor(private readonly discoveryService: DiscoveryService) {}

  @Get("universities")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_DIRECTOR,
    UserRole.IR_COORDINATOR,
    UserRole.OUTBOUND_STUDENT,
    UserRole.INCOMING_STUDENT
  )
  listUniversities() {
    return this.discoveryService.listUniversities();
  }

  @Get("shortlists/student/:studentId")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_DIRECTOR,
    UserRole.IR_COORDINATOR,
    UserRole.OUTBOUND_STUDENT,
    UserRole.INCOMING_STUDENT
  )
  listShortlists(@Param("studentId") studentId: string) {
    return this.discoveryService.listShortlists(studentId);
  }

  @Get("shortlists/student/:studentId/summary")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_DIRECTOR,
    UserRole.IR_COORDINATOR,
    UserRole.OUTBOUND_STUDENT,
    UserRole.INCOMING_STUDENT
  )
  getSummary(@Param("studentId") studentId: string) {
    return this.discoveryService.getSummary(studentId);
  }

  @Post("shortlists")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_DIRECTOR,
    UserRole.IR_COORDINATOR,
    UserRole.OUTBOUND_STUDENT,
    UserRole.INCOMING_STUDENT
  )
  createShortlist(@Body() payload: CreateShortlistDto) {
    return this.discoveryService.createShortlist(payload);
  }

  @Patch("shortlists/:shortlistId/status")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_DIRECTOR,
    UserRole.IR_COORDINATOR,
    UserRole.OUTBOUND_STUDENT,
    UserRole.INCOMING_STUDENT
  )
  updateShortlistStatus(@Param("shortlistId") shortlistId: string, @Body() payload: UpdateShortlistStatusDto) {
    return this.discoveryService.updateShortlistStatus(shortlistId, payload);
  }
}
