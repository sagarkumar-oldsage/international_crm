import { IsDateString, IsEnum, IsOptional, IsString } from "class-validator";

enum FinanceRecordStatus {
  PENDING = "PENDING",
  PARTIALLY_PAID = "PARTIALLY_PAID",
  PAID = "PAID",
  OVERDUE = "OVERDUE",
  WAIVED = "WAIVED"
}

export class UpdateStudentFinanceRecordStatusDto {
  @IsEnum(FinanceRecordStatus)
  status!: FinanceRecordStatus;

  @IsOptional()
  @IsDateString()
  paidDate?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
