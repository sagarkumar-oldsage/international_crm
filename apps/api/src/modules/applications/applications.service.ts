import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { ApplicationDto } from "./dto/application.dto";

@Injectable()
export class ApplicationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async listByStudent(studentId: string): Promise<ApplicationDto[]> {
    const applications = await this.prismaService.studentApplication.findMany({
      where: {
        studentProfileId: studentId
      },
      orderBy: {
        deadline: "asc"
      }
    });

    return applications.map((application) => ({
      id: application.id,
      studentId: application.studentProfileId,
      university: application.university,
      country: application.country,
      program: application.program,
      status: application.status,
      deadline: application.deadline.toISOString().slice(0, 10)
    }));
  }
}
