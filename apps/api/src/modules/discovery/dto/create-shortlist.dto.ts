import { IsOptional, IsString } from "class-validator";

export class CreateShortlistDto {
  @IsString()
  studentProfileId!: string;

  @IsString()
  universityId!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
