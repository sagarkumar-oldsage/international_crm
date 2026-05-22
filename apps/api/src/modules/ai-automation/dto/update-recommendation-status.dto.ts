import { IsEnum } from "class-validator";

enum RecommendationStatus {
  OPEN = "OPEN",
  ACCEPTED = "ACCEPTED",
  DISMISSED = "DISMISSED",
  IMPLEMENTED = "IMPLEMENTED"
}

export class UpdateRecommendationStatusDto {
  @IsEnum(RecommendationStatus)
  status!: RecommendationStatus;
}
