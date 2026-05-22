import { IsDateString, IsString } from "class-validator";

export class CreateInitiativeDto {
  @IsString()
  title!: string;

  @IsString()
  owner!: string;

  @IsDateString()
  targetDate!: string;

  @IsString()
  notes!: string;
}
