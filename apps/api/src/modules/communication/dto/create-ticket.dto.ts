import { IsDateString, IsEmail, IsEnum, IsOptional, IsString } from "class-validator";

enum TicketCategory {
  VISA_ISSUE = "VISA_ISSUE",
  HOSTEL_ISSUE = "HOSTEL_ISSUE",
  DOCUMENTATION_ISSUE = "DOCUMENTATION_ISSUE",
  EMERGENCY_REQUEST = "EMERGENCY_REQUEST",
  SCHOLARSHIP_QUERY = "SCHOLARSHIP_QUERY",
  GENERAL_SUPPORT = "GENERAL_SUPPORT"
}

enum TicketPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  CRITICAL = "CRITICAL"
}

export class CreateTicketDto {
  @IsOptional()
  @IsString()
  studentProfileId?: string;

  @IsString()
  raisedByName!: string;

  @IsEmail()
  raisedByEmail!: string;

  @IsEnum(TicketCategory)
  category!: TicketCategory;

  @IsString()
  subject!: string;

  @IsString()
  description!: string;

  @IsEnum(TicketPriority)
  priority!: TicketPriority;

  @IsOptional()
  @IsString()
  assignedTeam?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
