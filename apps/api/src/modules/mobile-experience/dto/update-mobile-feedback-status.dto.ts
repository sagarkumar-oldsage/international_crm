import { IsEnum } from "class-validator";

enum MobileFeedbackStatus {
  NEW = "NEW",
  UNDER_REVIEW = "UNDER_REVIEW",
  PLANNED = "PLANNED",
  RESOLVED = "RESOLVED"
}

export class UpdateMobileFeedbackStatusDto {
  @IsEnum(MobileFeedbackStatus)
  status!: MobileFeedbackStatus;
}
