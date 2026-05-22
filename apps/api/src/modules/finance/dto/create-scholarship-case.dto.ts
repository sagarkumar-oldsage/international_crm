import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

enum ScholarshipStatus {
  IDENTIFIED = "IDENTIFIED",
  APPLIED = "APPLIED",
  UNDER_REVIEW = "UNDER_REVIEW",
  AWARDED = "AWARDED",
  DISBURSED = "DISBURSED",
  REJECTED = "REJECTED"
}

export class CreateScholarshipCaseDto {
  @IsString()
  studentProfileId!: string;

  @IsString()
  scholarshipName!: string;

  @IsString()
  providerName!: string;

  @IsNumber()
  amount!: number;

  @IsString()
  currency!: string;

  @IsEnum(ScholarshipStatus)
  status!: ScholarshipStatus;

  @IsOptional()
  @IsDateString()
  deadline?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
