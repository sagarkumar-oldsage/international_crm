import { IsDateString, IsEnum, IsOptional, IsString, MinLength } from "class-validator";

enum DocumentCategory {
  PASSPORT = "PASSPORT",
  VISA = "VISA",
  MARKSHEET = "MARKSHEET",
  DEGREE_CERTIFICATE = "DEGREE_CERTIFICATE",
  SOP = "SOP",
  LOR = "LOR",
  CV = "CV",
  FINANCIAL_STATEMENT = "FINANCIAL_STATEMENT",
  INSURANCE = "INSURANCE",
  OFFER_LETTER = "OFFER_LETTER",
  ACCEPTANCE_LETTER = "ACCEPTANCE_LETTER"
}

export class CreateStudentDocumentDto {
  @IsString()
  @MinLength(1)
  studentId!: string;

  @IsEnum(DocumentCategory)
  category!: DocumentCategory;

  @IsString()
  @MinLength(3)
  fileName!: string;

  @IsString()
  @MinLength(3)
  storagePath!: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
