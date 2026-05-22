import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

enum FinanceItemType {
  TUITION = "TUITION",
  HOSTEL = "HOSTEL",
  INSURANCE = "INSURANCE",
  VISA_FEES = "VISA_FEES",
  TRAVEL = "TRAVEL",
  SCHOLARSHIP_DISBURSEMENT = "SCHOLARSHIP_DISBURSEMENT",
  OTHER = "OTHER"
}

export class CreateStudentFinanceRecordDto {
  @IsString()
  studentProfileId!: string;

  @IsEnum(FinanceItemType)
  itemType!: FinanceItemType;

  @IsString()
  label!: string;

  @IsNumber()
  amount!: number;

  @IsString()
  currency!: string;

  @IsDateString()
  dueDate!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
