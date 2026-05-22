import { hashSync } from "bcryptjs";
import {
  ApplicationStatus,
  DocumentCategory,
  DocumentStatus,
  EventCategory,
  EventStatus,
  FinanceItemType,
  FinanceRecordStatus,
  MouStatus,
  PrismaClient,
  ScholarshipStatus,
  TicketCategory,
  TicketPriority,
  TicketStatus,
  SupportRequestCategory,
  SupportRequestStatus,
  UserRole,
  VisaStage
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

  await prisma.visaCase.upsert({
    where: {
      id: "visa-1"
    },
    update: {
      studentProfileId: studentProfile.id,
      country: "Germany",
      visaType: "National Visa (D)",
      currentStage: VisaStage.APPOINTMENT_BOOKED,
      appointmentDate: new Date("2026-07-18"),
      biometricsDate: new Date("2026-07-18"),
      interviewDate: new Date("2026-07-25"),
      decisionDate: null,
      notes: "Keep blocked account statement and insurance copy ready."
    },
    create: {
      id: "visa-1",
      studentProfileId: studentProfile.id,
      country: "Germany",
      visaType: "National Visa (D)",
      currentStage: VisaStage.APPOINTMENT_BOOKED,
      appointmentDate: new Date("2026-07-18"),
      biometricsDate: new Date("2026-07-18"),
      interviewDate: new Date("2026-07-25"),
      decisionDate: null,
      notes: "Keep blocked account statement and insurance copy ready."
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

  await prisma.partnerUniversity.upsert({
    where: {
      id: "partner-1"
    },
    update: {
      name: "Technical University of Munich",
      country: "Germany",
      city: "Munich",
      website: "https://www.tum.de",
      contactPersonName: "Dr. Anna Fischer",
      contactPersonEmail: "anna.fischer@tum.example",
      collaborationAreas: ["Student Exchange", "Research Collaboration", "Summer School"],
      mouStatus: MouStatus.ACTIVE,
      renewalDate: new Date("2027-03-15"),
      mobilityQuota: 12,
      jointPrograms: ["AI Mobility Semester", "Industry Research Residency"],
      notes: "Priority partner for engineering mobility tracks"
    },
    create: {
      id: "partner-1",
      name: "Technical University of Munich",
      country: "Germany",
      city: "Munich",
      website: "https://www.tum.de",
      contactPersonName: "Dr. Anna Fischer",
      contactPersonEmail: "anna.fischer@tum.example",
      collaborationAreas: ["Student Exchange", "Research Collaboration", "Summer School"],
      mouStatus: MouStatus.ACTIVE,
      renewalDate: new Date("2027-03-15"),
      mobilityQuota: 12,
      jointPrograms: ["AI Mobility Semester", "Industry Research Residency"],
      notes: "Priority partner for engineering mobility tracks"
    }
  });

  await prisma.partnerUniversity.upsert({
    where: {
      id: "partner-2"
    },
    update: {
      name: "University of British Columbia",
      country: "Canada",
      city: "Vancouver",
      website: "https://www.ubc.ca",
      contactPersonName: "Prof. Liam Carter",
      contactPersonEmail: "liam.carter@ubc.example",
      collaborationAreas: ["Faculty Exchange", "Joint Conference"],
      mouStatus: MouStatus.RENEWAL_DUE,
      renewalDate: new Date("2026-07-01"),
      mobilityQuota: 8,
      jointPrograms: ["Global Innovation Forum"],
      notes: "Renewal in legal review stage"
    },
    create: {
      id: "partner-2",
      name: "University of British Columbia",
      country: "Canada",
      city: "Vancouver",
      website: "https://www.ubc.ca",
      contactPersonName: "Prof. Liam Carter",
      contactPersonEmail: "liam.carter@ubc.example",
      collaborationAreas: ["Faculty Exchange", "Joint Conference"],
      mouStatus: MouStatus.RENEWAL_DUE,
      renewalDate: new Date("2026-07-01"),
      mobilityQuota: 8,
      jointPrograms: ["Global Innovation Forum"],
      notes: "Renewal in legal review stage"
    }
  });

  await prisma.internationalEvent.upsert({
    where: {
      id: "event-1"
    },
    update: {
      title: "Global Mobility Orientation 2026",
      category: EventCategory.SEMINAR,
      format: "Hybrid",
      hostCountry: "India",
      venue: "Senate Hall, Poornima Campus",
      organizer: "International Relations Office",
      registrationDeadline: new Date("2026-06-05"),
      startDate: new Date("2026-06-10T10:00:00.000Z"),
      endDate: new Date("2026-06-10T13:00:00.000Z"),
      status: EventStatus.REGISTRATION_OPEN,
      capacity: 250,
      registeredCount: 184,
      speaker: "Dr. Sofia Mehta",
      notes: "Includes exchange briefing and visa readiness clinic"
    },
    create: {
      id: "event-1",
      title: "Global Mobility Orientation 2026",
      category: EventCategory.SEMINAR,
      format: "Hybrid",
      hostCountry: "India",
      venue: "Senate Hall, Poornima Campus",
      organizer: "International Relations Office",
      registrationDeadline: new Date("2026-06-05"),
      startDate: new Date("2026-06-10T10:00:00.000Z"),
      endDate: new Date("2026-06-10T13:00:00.000Z"),
      status: EventStatus.REGISTRATION_OPEN,
      capacity: 250,
      registeredCount: 184,
      speaker: "Dr. Sofia Mehta",
      notes: "Includes exchange briefing and visa readiness clinic"
    }
  });

  await prisma.internationalEvent.upsert({
    where: {
      id: "event-2"
    },
    update: {
      title: "Germany University Delegation Visit",
      category: EventCategory.DELEGATION_VISIT,
      format: "In Person",
      hostCountry: "India",
      venue: "International Collaboration Boardroom",
      organizer: "Partnerships and Outreach Cell",
      registrationDeadline: null,
      startDate: new Date("2026-07-22T08:30:00.000Z"),
      endDate: new Date("2026-07-22T17:00:00.000Z"),
      status: EventStatus.PLANNED,
      capacity: 40,
      registeredCount: 18,
      speaker: "TUM and DAAD Delegation",
      notes: "Includes campus tour, MoU review, and faculty roundtable"
    },
    create: {
      id: "event-2",
      title: "Germany University Delegation Visit",
      category: EventCategory.DELEGATION_VISIT,
      format: "In Person",
      hostCountry: "India",
      venue: "International Collaboration Boardroom",
      organizer: "Partnerships and Outreach Cell",
      registrationDeadline: null,
      startDate: new Date("2026-07-22T08:30:00.000Z"),
      endDate: new Date("2026-07-22T17:00:00.000Z"),
      status: EventStatus.PLANNED,
      capacity: 40,
      registeredCount: 18,
      speaker: "TUM and DAAD Delegation",
      notes: "Includes campus tour, MoU review, and faculty roundtable"
    }
  });

  await prisma.supportTicket.upsert({
    where: {
      id: "ticket-1"
    },
    update: {
      studentProfileId: studentProfile.id,
      raisedByName: "Aarav Sharma",
      raisedByEmail: "student@internationalcrm.edu",
      category: TicketCategory.VISA_ISSUE,
      subject: "Appointment slot reschedule support",
      description: "Need guidance on embassy appointment rescheduling after exam overlap.",
      priority: TicketPriority.HIGH,
      status: TicketStatus.IN_PROGRESS,
      assignedTeam: "Visa Team",
      resolutionNotes: null,
      dueDate: new Date("2026-06-02")
    },
    create: {
      id: "ticket-1",
      studentProfileId: studentProfile.id,
      raisedByName: "Aarav Sharma",
      raisedByEmail: "student@internationalcrm.edu",
      category: TicketCategory.VISA_ISSUE,
      subject: "Appointment slot reschedule support",
      description: "Need guidance on embassy appointment rescheduling after exam overlap.",
      priority: TicketPriority.HIGH,
      status: TicketStatus.IN_PROGRESS,
      assignedTeam: "Visa Team",
      resolutionNotes: null,
      dueDate: new Date("2026-06-02")
    }
  });

  await prisma.supportTicket.upsert({
    where: {
      id: "ticket-2"
    },
    update: {
      studentProfileId: studentProfile.id,
      raisedByName: "Aarav Sharma",
      raisedByEmail: "student@internationalcrm.edu",
      category: TicketCategory.DOCUMENTATION_ISSUE,
      subject: "LOR format clarification",
      description: "Need university-specific LOR template confirmation for TUM application.",
      priority: TicketPriority.MEDIUM,
      status: TicketStatus.OPEN,
      assignedTeam: "Documentation Desk",
      resolutionNotes: null,
      dueDate: new Date("2026-06-06")
    },
    create: {
      id: "ticket-2",
      studentProfileId: studentProfile.id,
      raisedByName: "Aarav Sharma",
      raisedByEmail: "student@internationalcrm.edu",
      category: TicketCategory.DOCUMENTATION_ISSUE,
      subject: "LOR format clarification",
      description: "Need university-specific LOR template confirmation for TUM application.",
      priority: TicketPriority.MEDIUM,
      status: TicketStatus.OPEN,
      assignedTeam: "Documentation Desk",
      resolutionNotes: null,
      dueDate: new Date("2026-06-06")
    }
  });

  await prisma.internationalSupportRequest.upsert({
    where: {
      id: "support-1"
    },
    update: {
      studentProfileId: studentProfile.id,
      category: SupportRequestCategory.PRE_ARRIVAL,
      title: "Airport pickup request",
      details: "Need pickup from Jaipur International Airport on 2026-07-14.",
      status: SupportRequestStatus.IN_REVIEW,
      assignedTeam: "International Student Desk",
      appointmentDate: new Date("2026-07-14T09:30:00.000Z"),
      completionNotes: null
    },
    create: {
      id: "support-1",
      studentProfileId: studentProfile.id,
      category: SupportRequestCategory.PRE_ARRIVAL,
      title: "Airport pickup request",
      details: "Need pickup from Jaipur International Airport on 2026-07-14.",
      status: SupportRequestStatus.IN_REVIEW,
      assignedTeam: "International Student Desk",
      appointmentDate: new Date("2026-07-14T09:30:00.000Z"),
      completionNotes: null
    }
  });

  await prisma.internationalSupportRequest.upsert({
    where: {
      id: "support-2"
    },
    update: {
      studentProfileId: studentProfile.id,
      category: SupportRequestCategory.CAMPUS_ONBOARDING,
      title: "Orientation and local registration support",
      details: "Need help with FRRO local registration and orientation schedule.",
      status: SupportRequestStatus.REQUESTED,
      assignedTeam: "Onboarding Cell",
      appointmentDate: null,
      completionNotes: null
    },
    create: {
      id: "support-2",
      studentProfileId: studentProfile.id,
      category: SupportRequestCategory.CAMPUS_ONBOARDING,
      title: "Orientation and local registration support",
      details: "Need help with FRRO local registration and orientation schedule.",
      status: SupportRequestStatus.REQUESTED,
      assignedTeam: "Onboarding Cell",
      appointmentDate: null,
      completionNotes: null
    }
  });

  await prisma.studentFinanceRecord.upsert({
    where: {
      id: "finance-1"
    },
    update: {
      studentProfileId: studentProfile.id,
      itemType: FinanceItemType.TUITION,
      label: "Semester 1 Tuition Fee",
      amount: 12800,
      currency: "EUR",
      status: FinanceRecordStatus.PENDING,
      dueDate: new Date("2026-08-20"),
      paidDate: null,
      notes: "Eligible for 15% early scholarship adjustment"
    },
    create: {
      id: "finance-1",
      studentProfileId: studentProfile.id,
      itemType: FinanceItemType.TUITION,
      label: "Semester 1 Tuition Fee",
      amount: 12800,
      currency: "EUR",
      status: FinanceRecordStatus.PENDING,
      dueDate: new Date("2026-08-20"),
      paidDate: null,
      notes: "Eligible for 15% early scholarship adjustment"
    }
  });

  await prisma.studentFinanceRecord.upsert({
    where: {
      id: "finance-2"
    },
    update: {
      studentProfileId: studentProfile.id,
      itemType: FinanceItemType.INSURANCE,
      label: "Mandatory Student Insurance",
      amount: 680,
      currency: "EUR",
      status: FinanceRecordStatus.PAID,
      dueDate: new Date("2026-07-15"),
      paidDate: new Date("2026-07-08"),
      notes: "Policy attached in document vault"
    },
    create: {
      id: "finance-2",
      studentProfileId: studentProfile.id,
      itemType: FinanceItemType.INSURANCE,
      label: "Mandatory Student Insurance",
      amount: 680,
      currency: "EUR",
      status: FinanceRecordStatus.PAID,
      dueDate: new Date("2026-07-15"),
      paidDate: new Date("2026-07-08"),
      notes: "Policy attached in document vault"
    }
  });

  await prisma.scholarshipCase.upsert({
    where: {
      id: "scholarship-1"
    },
    update: {
      studentProfileId: studentProfile.id,
      scholarshipName: "Global Merit Scholarship",
      providerName: "Technical University of Munich",
      amount: 5400,
      currency: "EUR",
      status: ScholarshipStatus.UNDER_REVIEW,
      deadline: new Date("2026-07-25"),
      awardedDate: null,
      disbursedDate: null,
      notes: "Interview round planned with scholarship committee"
    },
    create: {
      id: "scholarship-1",
      studentProfileId: studentProfile.id,
      scholarshipName: "Global Merit Scholarship",
      providerName: "Technical University of Munich",
      amount: 5400,
      currency: "EUR",
      status: ScholarshipStatus.UNDER_REVIEW,
      deadline: new Date("2026-07-25"),
      awardedDate: null,
      disbursedDate: null,
      notes: "Interview round planned with scholarship committee"
    }
  });

  await prisma.scholarshipCase.upsert({
    where: {
      id: "scholarship-2"
    },
    update: {
      studentProfileId: studentProfile.id,
      scholarshipName: "DAAD Mobility Grant",
      providerName: "DAAD",
      amount: 2200,
      currency: "EUR",
      status: ScholarshipStatus.AWARDED,
      deadline: new Date("2026-06-30"),
      awardedDate: new Date("2026-07-04"),
      disbursedDate: null,
      notes: "Disbursement expected after university enrollment confirmation"
    },
    create: {
      id: "scholarship-2",
      studentProfileId: studentProfile.id,
      scholarshipName: "DAAD Mobility Grant",
      providerName: "DAAD",
      amount: 2200,
      currency: "EUR",
      status: ScholarshipStatus.AWARDED,
      deadline: new Date("2026-06-30"),
      awardedDate: new Date("2026-07-04"),
      disbursedDate: null,
      notes: "Disbursement expected after university enrollment confirmation"
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
