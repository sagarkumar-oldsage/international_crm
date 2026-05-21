import { Injectable } from "@nestjs/common";
import { ApplicationDto } from "./dto/application.dto";

@Injectable()
export class ApplicationsService {
  // Seed application list mirrors the MVP admission workflow states.
  private readonly applications: ApplicationDto[] = [
    {
      id: "app-1",
      studentId: "student-1",
      university: "Technical University of Munich",
      country: "Germany",
      program: "Data Engineering",
      status: "UNDER_REVIEW",
      deadline: "2026-08-12"
    },
    {
      id: "app-2",
      studentId: "student-1",
      university: "University of Toronto",
      country: "Canada",
      program: "AI and Systems",
      status: "INTERVIEW_SCHEDULED",
      deadline: "2026-09-02"
    }
  ];

  listByStudent(studentId: string): ApplicationDto[] {
    return this.applications.filter((item) => item.studentId === studentId);
  }
}
