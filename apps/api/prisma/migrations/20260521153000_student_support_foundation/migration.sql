-- CreateEnum
CREATE TYPE "SupportRequestCategory" AS ENUM ('PRE_ARRIVAL', 'POST_ARRIVAL', 'HOSTEL', 'MEDICAL', 'CAMPUS_ONBOARDING', 'CULTURAL_ADAPTATION');

-- CreateEnum
CREATE TYPE "SupportRequestStatus" AS ENUM ('REQUESTED', 'IN_REVIEW', 'ACTION_IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "InternationalSupportRequest" (
    "id" TEXT NOT NULL,
    "studentProfileId" TEXT NOT NULL,
    "category" "SupportRequestCategory" NOT NULL,
    "title" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "status" "SupportRequestStatus" NOT NULL,
    "assignedTeam" TEXT,
    "appointmentDate" TIMESTAMP(3),
    "completionNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InternationalSupportRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InternationalSupportRequest" ADD CONSTRAINT "InternationalSupportRequest_studentProfileId_fkey" FOREIGN KEY ("studentProfileId") REFERENCES "StudentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
