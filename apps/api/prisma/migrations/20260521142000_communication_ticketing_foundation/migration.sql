-- CreateEnum
CREATE TYPE "TicketCategory" AS ENUM ('VISA_ISSUE', 'HOSTEL_ISSUE', 'DOCUMENTATION_ISSUE', 'EMERGENCY_REQUEST', 'SCHOLARSHIP_QUERY', 'GENERAL_SUPPORT');

-- CreateEnum
CREATE TYPE "TicketPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'ON_HOLD', 'RESOLVED', 'CLOSED');

-- CreateTable
CREATE TABLE "SupportTicket" (
    "id" TEXT NOT NULL,
    "studentProfileId" TEXT,
    "raisedByName" TEXT NOT NULL,
    "raisedByEmail" TEXT NOT NULL,
    "category" "TicketCategory" NOT NULL,
    "subject" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" "TicketPriority" NOT NULL,
    "status" "TicketStatus" NOT NULL,
    "assignedTeam" TEXT,
    "resolutionNotes" TEXT,
    "dueDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SupportTicket_pkey" PRIMARY KEY ("id")
);
