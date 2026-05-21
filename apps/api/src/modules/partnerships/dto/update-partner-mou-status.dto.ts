import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";

enum MouStatus {
  DRAFT = "DRAFT",
  UNDER_REVIEW = "UNDER_REVIEW",
  ACTIVE = "ACTIVE",
  RENEWAL_DUE = "RENEWAL_DUE",
  EXPIRED = "EXPIRED",
  ARCHIVED = "ARCHIVED"
}

export class UpdatePartnerMouStatusDto {
  @IsEnum(MouStatus)
  mouStatus!: MouStatus;

  @IsOptional()
  @IsDateString()
  renewalDate?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
