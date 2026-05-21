import { Injectable, NotFoundException } from "@nestjs/common";
import { StudentProfileDto } from "./dto/student-profile.dto";

@Injectable()
export class StudentsService {
  // Temporary in-memory profile until database persistence is connected.
  private readonly profiles: StudentProfileDto[] = [
    {
      id: "student-1",
      fullName: "Aarav Sharma",
      email: "student@internationalcrm.edu",
      program: "B.Tech Computer Science",
      cgpa: 8.7,
      languageScore: "IELTS 7.5",
      destinationPreferences: ["Germany", "Canada", "Japan"],
      budgetBand: "Medium"
    }
  ];

  getProfile(studentId: string): StudentProfileDto {
    const profile = this.profiles.find((item) => item.id === studentId);
    if (!profile) {
      throw new NotFoundException("Student profile not found");
    }
    return profile;
  }
}
