-- CreateEnum
CREATE TYPE "MouStatus" AS ENUM ('DRAFT', 'UNDER_REVIEW', 'ACTIVE', 'RENEWAL_DUE', 'EXPIRED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "PartnerUniversity" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "website" TEXT,
    "contactPersonName" TEXT NOT NULL,
    "contactPersonEmail" TEXT NOT NULL,
    "collaborationAreas" TEXT[],
    "mouStatus" "MouStatus" NOT NULL,
    "renewalDate" TIMESTAMP(3),
    "mobilityQuota" INTEGER NOT NULL,
    "jointPrograms" TEXT[],
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PartnerUniversity_pkey" PRIMARY KEY ("id")
);
