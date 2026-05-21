-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'IR_DIRECTOR', 'IR_COORDINATOR', 'DEPARTMENT_COORDINATOR', 'FACULTY_MENTOR', 'ADMISSION_TEAM', 'VISA_TEAM', 'FINANCE_TEAM', 'EVENT_MANAGER', 'OUTBOUND_STUDENT', 'INCOMING_STUDENT', 'PARTNER_REPRESENTATIVE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MobilityCase" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "applicationStatus" TEXT NOT NULL,
    "visaStatus" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MobilityCase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
