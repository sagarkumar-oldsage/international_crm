import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { EventsSummaryDto, InternationalEventDto } from "./dto/event.dto";
import { UpdateEventStatusDto } from "./dto/update-event-status.dto";

@Injectable()
export class EventsService {
  constructor(private readonly prismaService: PrismaService) {}

  private mapEvent(event: {
    id: string;
    title: string;
    category: "SEMINAR" | "WEBINAR" | "FDP" | "WORKSHOP" | "CONFERENCE" | "DELEGATION_VISIT";
    format: string;
    hostCountry: string;
    venue: string;
    organizer: string;
    registrationDeadline: Date | null;
    startDate: Date;
    endDate: Date;
    status: "PLANNED" | "REGISTRATION_OPEN" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
    capacity: number;
    registeredCount: number;
    speaker: string | null;
    notes: string | null;
  }): InternationalEventDto {
    return {
      id: event.id,
      title: event.title,
      category: event.category,
      format: event.format,
      hostCountry: event.hostCountry,
      venue: event.venue,
      organizer: event.organizer,
      registrationDeadline: event.registrationDeadline?.toISOString().slice(0, 10) ?? null,
      startDate: event.startDate.toISOString(),
      endDate: event.endDate.toISOString(),
      status: event.status,
      capacity: event.capacity,
      registeredCount: event.registeredCount,
      speaker: event.speaker,
      notes: event.notes
    };
  }

  async listAll(): Promise<InternationalEventDto[]> {
    const events = await this.prismaService.internationalEvent.findMany({
      orderBy: [{ startDate: "asc" }, { title: "asc" }]
    });

    return events.map((event) => this.mapEvent(event));
  }

  async getSummary(): Promise<EventsSummaryDto> {
    const events = await this.prismaService.internationalEvent.findMany();
    const now = new Date();

    const totalRegistrations = events.reduce((total, event) => total + event.registeredCount, 0);
    const averageFillRate = events.length
      ? Math.round(
          events.reduce(
            (total, event) => total + (event.capacity > 0 ? event.registeredCount / event.capacity : 0),
            0
          ) *
            100 /
            events.length
        )
      : 0;

    return {
      totalEvents: events.length,
      registrationOpen: events.filter((event) => event.status === "REGISTRATION_OPEN").length,
      upcomingDelegations: events.filter(
        (event) => event.category === "DELEGATION_VISIT" && event.startDate.getTime() >= now.getTime()
      ).length,
      totalRegistrations,
      averageFillRate
    };
  }

  async createEvent(payload: CreateEventDto): Promise<InternationalEventDto> {
    const event = await this.prismaService.internationalEvent.create({
      data: {
        title: payload.title,
        category: payload.category,
        format: payload.format,
        hostCountry: payload.hostCountry,
        venue: payload.venue,
        organizer: payload.organizer,
        registrationDeadline: payload.registrationDeadline ? new Date(payload.registrationDeadline) : null,
        startDate: new Date(payload.startDate),
        endDate: new Date(payload.endDate),
        status: "PLANNED",
        capacity: payload.capacity,
        registeredCount: 0,
        speaker: payload.speaker ?? null,
        notes: payload.notes ?? null
      }
    });

    return this.mapEvent(event);
  }

  async updateStatus(eventId: string, payload: UpdateEventStatusDto): Promise<InternationalEventDto> {
    const existingEvent = await this.prismaService.internationalEvent.findUnique({
      where: {
        id: eventId
      }
    });

    if (!existingEvent) {
      throw new NotFoundException("International event record not found");
    }

    const updatedEvent = await this.prismaService.internationalEvent.update({
      where: {
        id: eventId
      },
      data: {
        status: payload.status,
        registeredCount: payload.registeredCount ?? existingEvent.registeredCount,
        registrationDeadline: payload.registrationDeadline
          ? new Date(payload.registrationDeadline)
          : existingEvent.registrationDeadline,
        notes: payload.notes ?? existingEvent.notes
      }
    });

    return this.mapEvent(updatedEvent);
  }
}
