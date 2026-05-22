import { IsNumber, IsString, Max, Min } from "class-validator";

export class CreateMobileFeedbackDto {
  @IsString()
  studentProfileId!: string;

  @IsString()
  featureArea!: string;

  @IsString()
  feedback!: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating!: number;
}
