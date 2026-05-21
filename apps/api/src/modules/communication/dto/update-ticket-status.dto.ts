import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";

enum TicketStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  ON_HOLD = "ON_HOLD",
  RESOLVED = "RESOLVED",
  CLOSED = "CLOSED"
}

export class UpdateTicketStatusDto {
  @IsEnum(TicketStatus)
  status!: TicketStatus;

  @IsOptional()
  @IsString()
  assignedTeam?: string;

  @IsOptional()
  @IsString()
  resolutionNotes?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
