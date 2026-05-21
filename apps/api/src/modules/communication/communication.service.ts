import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { SupportTicketDto, TicketSummaryDto } from "./dto/ticket.dto";
import { UpdateTicketStatusDto } from "./dto/update-ticket-status.dto";

@Injectable()
export class CommunicationService {
  constructor(private readonly prismaService: PrismaService) {}

  private mapTicket(ticket: {
    id: string;
    studentProfileId: string | null;
    raisedByName: string;
    raisedByEmail: string;
    category:
      | "VISA_ISSUE"
      | "HOSTEL_ISSUE"
      | "DOCUMENTATION_ISSUE"
      | "EMERGENCY_REQUEST"
      | "SCHOLARSHIP_QUERY"
      | "GENERAL_SUPPORT";
    subject: string;
    description: string;
    priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    status: "OPEN" | "IN_PROGRESS" | "ON_HOLD" | "RESOLVED" | "CLOSED";
    assignedTeam: string | null;
    resolutionNotes: string | null;
    dueDate: Date | null;
  }): SupportTicketDto {
    return {
      id: ticket.id,
      studentProfileId: ticket.studentProfileId,
      raisedByName: ticket.raisedByName,
      raisedByEmail: ticket.raisedByEmail,
      category: ticket.category,
      subject: ticket.subject,
      description: ticket.description,
      priority: ticket.priority,
      status: ticket.status,
      assignedTeam: ticket.assignedTeam,
      resolutionNotes: ticket.resolutionNotes,
      dueDate: ticket.dueDate?.toISOString().slice(0, 10) ?? null
    };
  }

  async listTickets(): Promise<SupportTicketDto[]> {
    const tickets = await this.prismaService.supportTicket.findMany({
      orderBy: [{ status: "asc" }, { priority: "desc" }, { createdAt: "desc" }]
    });

    return tickets.map((ticket) => this.mapTicket(ticket));
  }

  async getSummary(): Promise<TicketSummaryDto> {
    const tickets = await this.prismaService.supportTicket.findMany();
    const now = new Date();

    return {
      totalTickets: tickets.length,
      openTickets: tickets.filter((ticket) => ["OPEN", "IN_PROGRESS", "ON_HOLD"].includes(ticket.status)).length,
      criticalTickets: tickets.filter((ticket) => ticket.priority === "CRITICAL").length,
      resolvedTickets: tickets.filter((ticket) => ["RESOLVED", "CLOSED"].includes(ticket.status)).length,
      overdueTickets: tickets.filter(
        (ticket) =>
          ticket.dueDate !== null &&
          ticket.dueDate.getTime() < now.getTime() &&
          !["RESOLVED", "CLOSED"].includes(ticket.status)
      ).length
    };
  }

  async createTicket(payload: CreateTicketDto): Promise<SupportTicketDto> {
    const ticket = await this.prismaService.supportTicket.create({
      data: {
        studentProfileId: payload.studentProfileId ?? null,
        raisedByName: payload.raisedByName,
        raisedByEmail: payload.raisedByEmail,
        category: payload.category,
        subject: payload.subject,
        description: payload.description,
        priority: payload.priority,
        status: "OPEN",
        assignedTeam: payload.assignedTeam ?? null,
        resolutionNotes: null,
        dueDate: payload.dueDate ? new Date(payload.dueDate) : null
      }
    });

    return this.mapTicket(ticket);
  }

  async updateTicketStatus(ticketId: string, payload: UpdateTicketStatusDto): Promise<SupportTicketDto> {
    const existingTicket = await this.prismaService.supportTicket.findUnique({
      where: {
        id: ticketId
      }
    });

    if (!existingTicket) {
      throw new NotFoundException("Support ticket not found");
    }

    const ticket = await this.prismaService.supportTicket.update({
      where: {
        id: ticketId
      },
      data: {
        status: payload.status,
        assignedTeam: payload.assignedTeam ?? existingTicket.assignedTeam,
        resolutionNotes: payload.resolutionNotes ?? existingTicket.resolutionNotes,
        dueDate: payload.dueDate ? new Date(payload.dueDate) : existingTicket.dueDate
      }
    });

    return this.mapTicket(ticket);
  }
}
