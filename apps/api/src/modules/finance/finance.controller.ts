import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Roles } from "../../common/decorators/roles.decorator";
import { UserRole } from "../../common/enums/roles.enum";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { CreateScholarshipCaseDto } from "./dto/create-scholarship-case.dto";
import { CreateStudentFinanceRecordDto } from "./dto/create-student-finance-record.dto";
import { UpdateScholarshipCaseStatusDto } from "./dto/update-scholarship-case-status.dto";
import { UpdateStudentFinanceRecordStatusDto } from "./dto/update-student-finance-record-status.dto";
import { FinanceService } from "./finance.service";

@Controller("finance")
@UseGuards(JwtAuthGuard, RolesGuard)
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get("student/:studentId/records")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_DIRECTOR,
    UserRole.IR_COORDINATOR,
    UserRole.FINANCE_TEAM,
    UserRole.OUTBOUND_STUDENT,
    UserRole.INCOMING_STUDENT
  )
  listFinanceRecords(@Param("studentId") studentId: string) {
    return this.financeService.listFinanceRecords(studentId);
  }

  @Get("student/:studentId/scholarships")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_DIRECTOR,
    UserRole.IR_COORDINATOR,
    UserRole.FINANCE_TEAM,
    UserRole.OUTBOUND_STUDENT,
    UserRole.INCOMING_STUDENT
  )
  listScholarships(@Param("studentId") studentId: string) {
    return this.financeService.listScholarships(studentId);
  }

  @Get("student/:studentId/summary")
  @Roles(
    UserRole.SUPER_ADMIN,
    UserRole.IR_DIRECTOR,
    UserRole.IR_COORDINATOR,
    UserRole.FINANCE_TEAM,
    UserRole.OUTBOUND_STUDENT,
    UserRole.INCOMING_STUDENT
  )
  getSummary(@Param("studentId") studentId: string) {
    return this.financeService.getSummary(studentId);
  }

  @Post("records")
  @Roles(UserRole.SUPER_ADMIN, UserRole.IR_DIRECTOR, UserRole.IR_COORDINATOR, UserRole.FINANCE_TEAM)
  createFinanceRecord(@Body() payload: CreateStudentFinanceRecordDto) {
    return this.financeService.createFinanceRecord(payload);
  }

  @Post("scholarships")
  @Roles(UserRole.SUPER_ADMIN, UserRole.IR_DIRECTOR, UserRole.IR_COORDINATOR, UserRole.FINANCE_TEAM)
  createScholarshipCase(@Body() payload: CreateScholarshipCaseDto) {
    return this.financeService.createScholarshipCase(payload);
  }

  @Patch("records/:recordId/status")
  @Roles(UserRole.SUPER_ADMIN, UserRole.IR_DIRECTOR, UserRole.IR_COORDINATOR, UserRole.FINANCE_TEAM)
  updateFinanceRecordStatus(
    @Param("recordId") recordId: string,
    @Body() payload: UpdateStudentFinanceRecordStatusDto
  ) {
    return this.financeService.updateFinanceRecordStatus(recordId, payload);
  }

  @Patch("scholarships/:scholarshipId/status")
  @Roles(UserRole.SUPER_ADMIN, UserRole.IR_DIRECTOR, UserRole.IR_COORDINATOR, UserRole.FINANCE_TEAM)
  updateScholarshipStatus(
    @Param("scholarshipId") scholarshipId: string,
    @Body() payload: UpdateScholarshipCaseStatusDto
  ) {
    return this.financeService.updateScholarshipStatus(scholarshipId, payload);
  }
}
