import { IsEnum, IsOptional, IsString } from "class-validator";

enum InitiativeStatus {
  PLANNED = "PLANNED",
  IN_PROGRESS = "IN_PROGRESS",
  AT_RISK = "AT_RISK",
  COMPLETED = "COMPLETED"
}

export class UpdateInitiativeStatusDto {
  @IsEnum(InitiativeStatus)
  status!: InitiativeStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}
