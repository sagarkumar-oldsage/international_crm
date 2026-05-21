-- CreateEnum
CREATE TYPE "EventCategory" AS ENUM ('SEMINAR', 'WEBINAR', 'FDP', 'WORKSHOP', 'CONFERENCE', 'DELEGATION_VISIT');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('PLANNED', 'REGISTRATION_OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "InternationalEvent" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" "EventCategory" NOT NULL,
    "format" TEXT NOT NULL,
    "hostCountry" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "registrationDeadline" TIMESTAMP(3),
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "EventStatus" NOT NULL,
    "capacity" INTEGER NOT NULL,
    "registeredCount" INTEGER NOT NULL,
    "speaker" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InternationalEvent_pkey" PRIMARY KEY ("id")
);
