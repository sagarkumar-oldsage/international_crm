import { IsEnum, IsString } from "class-validator";

enum RecommendationPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH"
}

export class CreateRecommendationDto {
  @IsString()
  studentProfileId!: string;

  @IsString()
  title!: string;

  @IsString()
  reason!: string;

  @IsEnum(RecommendationPriority)
  priority!: RecommendationPriority;
}
