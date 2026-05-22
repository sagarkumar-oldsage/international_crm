import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";

enum ScholarshipStatus {
  IDENTIFIED = "IDENTIFIED",
  APPLIED = "APPLIED",
  UNDER_REVIEW = "UNDER_REVIEW",
  AWARDED = "AWARDED",
  DISBURSED = "DISBURSED",
  REJECTED = "REJECTED"
}

export class UpdateScholarshipCaseStatusDto {
  @IsEnum(ScholarshipStatus)
  status!: ScholarshipStatus;

  @IsOptional()
  @IsDateString()
  awardedDate?: string;

  @IsOptional()
  @IsDateString()
  disbursedDate?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
