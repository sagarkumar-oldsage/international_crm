import { IsEnum, IsOptional, IsString } from "class-validator";

enum DiscoveryShortlistStatus {
  SHORTLISTED = "SHORTLISTED",
  APPLIED = "APPLIED",
  ARCHIVED = "ARCHIVED"
}

export class UpdateShortlistStatusDto {
  @IsEnum(DiscoveryShortlistStatus)
  status!: DiscoveryShortlistStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}
