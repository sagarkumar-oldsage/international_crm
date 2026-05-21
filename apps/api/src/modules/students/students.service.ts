import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { StudentProfileDto } from "./dto/student-profile.dto";

@Injectable()
export class StudentsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProfile(studentId: string): Promise<StudentProfileDto> {
    const profile = await this.prismaService.studentProfile.findUnique({
      where: {
        id: studentId
      },
      include: {
        user: true
      }
    });

    if (!profile) {
      throw new NotFoundException("Student profile not found");
    }

    return {
      id: profile.id,
      fullName: profile.user.fullName,
      email: profile.user.email,
      program: profile.program,
      cgpa: Number(profile.cgpa),
      languageScore: profile.languageScore,
      destinationPreferences: profile.destinationPreferences,
      budgetBand: profile.budgetBand
    };
  }
}
