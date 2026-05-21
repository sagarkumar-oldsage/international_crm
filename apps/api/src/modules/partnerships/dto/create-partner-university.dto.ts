import { IsArray, IsEmail, IsInt, IsOptional, IsString, IsUrl, Min } from "class-validator";

export class CreatePartnerUniversityDto {
  @IsString()
  name!: string;

  @IsString()
  country!: string;

  @IsString()
  city!: string;

  @IsOptional()
  @IsUrl({ require_protocol: true })
  website?: string;

  @IsString()
  contactPersonName!: string;

  @IsEmail()
  contactPersonEmail!: string;

  @IsArray()
  @IsString({ each: true })
  collaborationAreas!: string[];

  @IsInt()
  @Min(0)
  mobilityQuota!: number;

  @IsArray()
  @IsString({ each: true })
  jointPrograms!: string[];

  @IsOptional()
  @IsString()
  renewalDate?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
