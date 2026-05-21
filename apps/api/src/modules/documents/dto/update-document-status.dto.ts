import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";

enum DocumentStatus {
  MISSING = "MISSING",
  PENDING_REVIEW = "PENDING_REVIEW",
  VERIFIED = "VERIFIED",
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED"
}

export class UpdateDocumentStatusDto {
  @IsEnum(DocumentStatus)
  status!: DocumentStatus;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
