-- CreateEnum
CREATE TYPE "FinanceItemType" AS ENUM ('TUITION', 'HOSTEL', 'INSURANCE', 'VISA_FEES', 'TRAVEL', 'SCHOLARSHIP_DISBURSEMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "FinanceRecordStatus" AS ENUM ('PENDING', 'PARTIALLY_PAID', 'PAID', 'OVERDUE', 'WAIVED');

-- CreateEnum
CREATE TYPE "ScholarshipStatus" AS ENUM ('IDENTIFIED', 'APPLIED', 'UNDER_REVIEW', 'AWARDED', 'DISBURSED', 'REJECTED');

-- CreateTable
CREATE TABLE "StudentFinanceRecord" (
    "id" TEXT NOT NULL,
    "studentProfileId" TEXT NOT NULL,
    "itemType" "FinanceItemType" NOT NULL,
    "label" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL,
    "status" "FinanceRecordStatus" NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paidDate" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentFinanceRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScholarshipCase" (
    "id" TEXT NOT NULL,
    "studentProfileId" TEXT NOT NULL,
    "scholarshipName" TEXT NOT NULL,
    "providerName" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL,
    "status" "ScholarshipStatus" NOT NULL,
    "deadline" TIMESTAMP(3),
    "awardedDate" TIMESTAMP(3),
    "disbursedDate" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScholarshipCase_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudentFinanceRecord" ADD CONSTRAINT "StudentFinanceRecord_studentProfileId_fkey" FOREIGN KEY ("studentProfileId") REFERENCES "StudentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScholarshipCase" ADD CONSTRAINT "ScholarshipCase_studentProfileId_fkey" FOREIGN KEY ("studentProfileId") REFERENCES "StudentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
