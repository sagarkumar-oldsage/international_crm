import { hashSync } from "bcryptjs";
import {
  ApplicationStatus,
  DocumentCategory,
  DocumentStatus,
  PrismaClient,
  UserRole
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed baseline users so the Prisma-backed auth flow is usable immediately.
  const adminUser = await prisma.user.upsert({
    where: {
      email: "admin@internationalcrm.edu"
    },
    update: {
      id: "user-1",
      fullName: "Platform Super Admin",
      passwordHash: hashSync("Admin@123", 10),
      role: UserRole.SUPER_ADMIN
    },
    create: {
      id: "user-1",
      email: "admin@internationalcrm.edu",
      fullName: "Platform Super Admin",
      passwordHash: hashSync("Admin@123", 10),
      role: UserRole.SUPER_ADMIN
    }
  });

  const studentUser = await prisma.user.upsert({
    where: {
      email: "student@internationalcrm.edu"
    },
    update: {
      id: "user-2",
      fullName: "Outbound Mobility Student",
      passwordHash: hashSync("Student@123", 10),
      role: UserRole.OUTBOUND_STUDENT
    },
    create: {
      id: "user-2",
      email: "student@internationalcrm.edu",
      fullName: "Outbound Mobility Student",
      passwordHash: hashSync("Student@123", 10),
      role: UserRole.OUTBOUND_STUDENT
    }
  });

  const studentProfile = await prisma.studentProfile.upsert({
    where: {
      id: "student-1"
    },
    update: {
      userId: studentUser.id,
      program: "B.Tech Computer Science",
      cgpa: 8.7,
      languageScore: "IELTS 7.5",
      destinationPreferences: ["Germany", "Canada", "Japan"],
      budgetBand: "Medium"
    },
    create: {
      id: "student-1",
      userId: studentUser.id,
      program: "B.Tech Computer Science",
      cgpa: 8.7,
      languageScore: "IELTS 7.5",
      destinationPreferences: ["Germany", "Canada", "Japan"],
      budgetBand: "Medium"
    }
  });

  await prisma.studentApplication.upsert({
    where: {
      id: "app-1"
    },
    update: {
      studentProfileId: studentProfile.id,
      university: "Technical University of Munich",
      country: "Germany",
      program: "Data Engineering",
      status: ApplicationStatus.UNDER_REVIEW,
      deadline: new Date("2026-08-12")
    },
    create: {
      id: "app-1",
      studentProfileId: studentProfile.id,
      university: "Technical University of Munich",
      country: "Germany",
      program: "Data Engineering",
      status: ApplicationStatus.UNDER_REVIEW,
      deadline: new Date("2026-08-12")
    }
  });

  await prisma.studentApplication.upsert({
    where: {
      id: "app-2"
    },
    update: {
      studentProfileId: studentProfile.id,
      university: "University of Toronto",
      country: "Canada",
      program: "AI and Systems",
      status: ApplicationStatus.INTERVIEW_SCHEDULED,
      deadline: new Date("2026-09-02")
    },
    create: {
      id: "app-2",
      studentProfileId: studentProfile.id,
      university: "University of Toronto",
      country: "Canada",
      program: "AI and Systems",
      status: ApplicationStatus.INTERVIEW_SCHEDULED,
      deadline: new Date("2026-09-02")
    }
  });

  await prisma.studentDocument.upsert({
    where: {
      id: "doc-1"
    },
    update: {
      studentProfileId: studentProfile.id,
      category: DocumentCategory.PASSPORT,
      fileName: "aarav-sharma-passport.pdf",
      storagePath: "/documents/student-1/passport-v1.pdf",
      status: DocumentStatus.VERIFIED,
      expiresAt: new Date("2030-05-14"),
      notes: "Passport verified by visa team"
    },
    create: {
      id: "doc-1",
      studentProfileId: studentProfile.id,
      category: DocumentCategory.PASSPORT,
      fileName: "aarav-sharma-passport.pdf",
      storagePath: "/documents/student-1/passport-v1.pdf",
      status: DocumentStatus.VERIFIED,
      expiresAt: new Date("2030-05-14"),
      notes: "Passport verified by visa team"
    }
  });

  await prisma.studentDocument.upsert({
    where: {
      id: "doc-2"
    },
    update: {
      studentProfileId: studentProfile.id,
      category: DocumentCategory.SOP,
      fileName: "aarav-sharma-sop.pdf",
      storagePath: "/documents/student-1/sop-v2.pdf",
      status: DocumentStatus.PENDING_REVIEW,
      expiresAt: null,
      notes: "Awaiting faculty mentor review"
    },
    create: {
      id: "doc-2",
      studentProfileId: studentProfile.id,
      category: DocumentCategory.SOP,
      fileName: "aarav-sharma-sop.pdf",
      storagePath: "/documents/student-1/sop-v2.pdf",
      status: DocumentStatus.PENDING_REVIEW,
      expiresAt: null,
      notes: "Awaiting faculty mentor review"
    }
  });

  void adminUser;
}

main()
  .catch(async (error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
