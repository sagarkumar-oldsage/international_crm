import { IsEnum, IsNumber } from "class-validator";

enum TrackStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED"
}

export class UpdateLearningTrackDto {
  @IsNumber()
  progressPercentage!: number;

  @IsEnum(TrackStatus)
  status!: TrackStatus;
}
