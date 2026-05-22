import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";

enum SupportRequestStatus {
  REQUESTED = "REQUESTED",
  IN_REVIEW = "IN_REVIEW",
  ACTION_IN_PROGRESS = "ACTION_IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}

export class UpdateSupportRequestDto {
  @IsEnum(SupportRequestStatus)
  status!: SupportRequestStatus;

  @IsOptional()
  @IsString()
  assignedTeam?: string;

  @IsOptional()
  @IsDateString()
  appointmentDate?: string;

  @IsOptional()
  @IsString()
  completionNotes?: string;
}
