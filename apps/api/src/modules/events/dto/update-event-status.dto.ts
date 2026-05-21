import { IsDateString, IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";

enum EventStatus {
  PLANNED = "PLANNED",
  REGISTRATION_OPEN = "REGISTRATION_OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}

export class UpdateEventStatusDto {
  @IsEnum(EventStatus)
  status!: EventStatus;

  @IsOptional()
  @IsInt()
  @Min(0)
  registeredCount?: number;

  @IsOptional()
  @IsDateString()
  registrationDeadline?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
