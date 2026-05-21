import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { UserRole } from "../../common/enums/roles.enum";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventStatusDto } from "./dto/update-event-status.dto";
import { EventsService } from "./events.service";

@Controller("events")
@UseGuards(JwtAuthGuard, RolesGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_DIRECTOR,
    UserRole.IR_COORDINATOR,
    UserRole.EVENT_MANAGER,
    UserRole.PARTNER_REPRESENTATIVE,
    UserRole.OUTBOUND_STUDENT,
    UserRole.INCOMING_STUDENT
  )
  listAll() {
    return this.eventsService.listAll();
  }

  @Get("summary")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_DIRECTOR,
    UserRole.IR_COORDINATOR,
    UserRole.EVENT_MANAGER,
    UserRole.PARTNER_REPRESENTATIVE,
    UserRole.OUTBOUND_STUDENT,
    UserRole.INCOMING_STUDENT
  )
  getSummary() {
    return this.eventsService.getSummary();
  }

  @Post()
  @Roles(UserRole.SUPER_ADMIN, UserRole.IR_DIRECTOR, UserRole.IR_COORDINATOR, UserRole.EVENT_MANAGER)
  createEvent(@Body() payload: CreateEventDto) {
    return this.eventsService.createEvent(payload);
  }

  @Patch(":eventId/status")
  @Roles(UserRole.SUPER_ADMIN, UserRole.IR_DIRECTOR, UserRole.IR_COORDINATOR, UserRole.EVENT_MANAGER)
  updateStatus(@Param("eventId") eventId: string, @Body() payload: UpdateEventStatusDto) {
    return this.eventsService.updateStatus(eventId, payload);
  }
}
