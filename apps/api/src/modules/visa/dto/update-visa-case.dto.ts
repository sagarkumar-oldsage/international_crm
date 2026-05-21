import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";

enum VisaStage {
  NOT_STARTED = "NOT_STARTED",
  DOCUMENT_COLLECTION = "DOCUMENT_COLLECTION",
  APPOINTMENT_BOOKED = "APPOINTMENT_BOOKED",
  BIOMETRICS_COMPLETED = "BIOMETRICS_COMPLETED",
  INTERVIEW_SCHEDULED = "INTERVIEW_SCHEDULED",
  UNDER_PROCESS = "UNDER_PROCESS",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED"
}

export class UpdateVisaCaseDto {
  @IsEnum(VisaStage)
  currentStage!: VisaStage;

  @IsOptional()
  @IsDateString()
  appointmentDate?: string;

  @IsOptional()
  @IsDateString()
  biometricsDate?: string;

  @IsOptional()
  @IsDateString()
  interviewDate?: string;

  @IsOptional()
  @IsDateString()
  decisionDate?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
