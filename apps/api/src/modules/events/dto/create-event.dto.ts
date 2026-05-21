import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min
} from "class-validator";

enum EventCategory {
  SEMINAR = "SEMINAR",
  WEBINAR = "WEBINAR",
  FDP = "FDP",
  WORKSHOP = "WORKSHOP",
  CONFERENCE = "CONFERENCE",
  DELEGATION_VISIT = "DELEGATION_VISIT"
}

export class CreateEventDto {
  @IsString()
  title!: string;

  @IsEnum(EventCategory)
  category!: EventCategory;

  @IsString()
  format!: string;

  @IsString()
  hostCountry!: string;

  @IsString()
  venue!: string;

  @IsString()
  organizer!: string;

  @IsOptional()
  @IsDateString()
  registrationDeadline?: string;

  @IsDateString()
  startDate!: string;

  @IsDateString()
  endDate!: string;

  @IsInt()
  @Min(0)
  capacity!: number;

  @IsOptional()
  @IsString()
  speaker?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
