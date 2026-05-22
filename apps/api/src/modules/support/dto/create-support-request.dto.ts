import { IsEnum, IsOptional, IsString } from "class-validator";

enum SupportRequestCategory {
  PRE_ARRIVAL = "PRE_ARRIVAL",
  POST_ARRIVAL = "POST_ARRIVAL",
  HOSTEL = "HOSTEL",
  MEDICAL = "MEDICAL",
  CAMPUS_ONBOARDING = "CAMPUS_ONBOARDING",
  CULTURAL_ADAPTATION = "CULTURAL_ADAPTATION"
}

export class CreateSupportRequestDto {
  @IsString()
  studentProfileId!: string;

  @IsEnum(SupportRequestCategory)
  category!: SupportRequestCategory;

  @IsString()
  title!: string;

  @IsString()
  details!: string;

  @IsOptional()
  @IsString()
  assignedTeam?: string;
}
