import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { UserRole } from "../../common/enums/roles.enum";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { CommunicationService } from "./communication.service";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketStatusDto } from "./dto/update-ticket-status.dto";

@Controller("communication/tickets")
@UseGuards(JwtAuthGuard, RolesGuard)
export class CommunicationController {
  constructor(private readonly communicationService: CommunicationService) {}

  @Get()
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_DIRECTOR,
    UserRole.IR_COORDINATOR,
    UserRole.VISA_TEAM,
    UserRole.FINANCE_TEAM,
    UserRole.OUTBOUND_STUDENT,
    UserRole.INCOMING_STUDENT
  )
  listTickets() {
    return this.communicationService.listTickets();
  }

  @Get("summary")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_DIRECTOR,
    UserRole.IR_COORDINATOR,
    UserRole.VISA_TEAM,
    UserRole.FINANCE_TEAM,
    UserRole.OUTBOUND_STUDENT,
    UserRole.INCOMING_STUDENT
  )
  getSummary() {
    return this.communicationService.getSummary();
  }

  @Post()
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_DIRECTOR,
    UserRole.IR_COORDINATOR,
    UserRole.VISA_TEAM,
    UserRole.FINANCE_TEAM,
    UserRole.OUTBOUND_STUDENT,
    UserRole.INCOMING_STUDENT
  )
  createTicket(@Body() payload: CreateTicketDto) {
    return this.communicationService.createTicket(payload);
  }

  @Patch(":ticketId/status")
  @Roles(UserRole.SUPER_ADMIN, UserRole.IR_DIRECTOR, UserRole.IR_COORDINATOR, UserRole.VISA_TEAM, UserRole.FINANCE_TEAM)
  updateTicketStatus(@Param("ticketId") ticketId: string, @Body() payload: UpdateTicketStatusDto) {
    return this.communicationService.updateTicketStatus(ticketId, payload);
  }
}
