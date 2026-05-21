-- CreateEnum
CREATE TYPE "DocumentCategory" AS ENUM (
    'PASSPORT',
    'VISA',
    'MARKSHEET',
    'DEGREE_CERTIFICATE',
    'SOP',
    'LOR',
    'CV',
    'FINANCIAL_STATEMENT',
    'INSURANCE',
    'OFFER_LETTER',
    'ACCEPTANCE_LETTER'
);

-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM (
    'MISSING',
    'PENDING_REVIEW',
    'VERIFIED',
    'REJECTED',
    'EXPIRED'
);

-- CreateTable
CREATE TABLE "StudentDocument" (
    "id" TEXT NOT NULL,
    "studentProfileId" TEXT NOT NULL,
    "category" "DocumentCategory" NOT NULL,
    "fileName" TEXT NOT NULL,
    "storagePath" TEXT NOT NULL,
    "status" "DocumentStatus" NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentDocument_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudentDocument"
ADD CONSTRAINT "StudentDocument_studentProfileId_fkey"
FOREIGN KEY ("studentProfileId") REFERENCES "StudentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
