-- CreateEnum
CREATE TYPE "VisaStage" AS ENUM (
    'NOT_STARTED',
    'DOCUMENT_COLLECTION',
    'APPOINTMENT_BOOKED',
    'BIOMETRICS_COMPLETED',
    'INTERVIEW_SCHEDULED',
    'UNDER_PROCESS',
    'APPROVED',
    'REJECTED'
);

-- CreateTable
CREATE TABLE "VisaCase" (
    "id" TEXT NOT NULL,
    "studentProfileId" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "visaType" TEXT NOT NULL,
    "currentStage" "VisaStage" NOT NULL,
    "appointmentDate" TIMESTAMP(3),
    "biometricsDate" TIMESTAMP(3),
    "interviewDate" TIMESTAMP(3),
    "decisionDate" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VisaCase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VisaCase"
ADD CONSTRAINT "VisaCase_studentProfileId_fkey"
FOREIGN KEY ("studentProfileId") REFERENCES "StudentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
