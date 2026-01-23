-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'SURVEYOR', 'ENGINEER');

-- CreateEnum
CREATE TYPE "EngineerDepartment" AS ENUM ('POTHOLE', 'GARBAGE');

-- CreateEnum
CREATE TYPE "IssueType" AS ENUM ('POTHOLE', 'GARBAGE');

-- CreateEnum
CREATE TYPE "IssueStatus" AS ENUM ('DETECTED', 'ASSIGNED', 'IN_PROGRESS', 'FIXED', 'REJECTED', 'RESOLVED');

-- CreateEnum
CREATE TYPE "RouteAssignmentStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "wardId" TEXT NOT NULL,
    "department" "EngineerDepartment",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ward" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "Ward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Issue" (
    "id" TEXT NOT NULL,
    "clientCaptureId" TEXT NOT NULL,
    "type" "IssueType",
    "aiDetectedType" "IssueType",
    "aiConfidence" DOUBLE PRECISION,
    "status" "IssueStatus" NOT NULL DEFAULT 'DETECTED',
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "afterImageUrl" TEXT,
    "wardId" TEXT NOT NULL,
    "surveyorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IssueAssignment" (
    "id" TEXT NOT NULL,
    "issueId" TEXT NOT NULL,
    "engineerId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IssueAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IssueResolution" (
    "id" TEXT NOT NULL,
    "issueId" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "feedback" TEXT,
    "verifiedByAdminId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IssueResolution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Ward_number_key" ON "Ward"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Issue_clientCaptureId_key" ON "Issue"("clientCaptureId");

-- CreateIndex
CREATE UNIQUE INDEX "IssueAssignment_issueId_key" ON "IssueAssignment"("issueId");

-- CreateIndex
CREATE UNIQUE INDEX "IssueResolution_issueId_key" ON "IssueResolution"("issueId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_wardId_fkey" FOREIGN KEY ("wardId") REFERENCES "Ward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_wardId_fkey" FOREIGN KEY ("wardId") REFERENCES "Ward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_surveyorId_fkey" FOREIGN KEY ("surveyorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IssueAssignment" ADD CONSTRAINT "IssueAssignment_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IssueAssignment" ADD CONSTRAINT "IssueAssignment_engineerId_fkey" FOREIGN KEY ("engineerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IssueResolution" ADD CONSTRAINT "IssueResolution_verifiedByAdminId_fkey" FOREIGN KEY ("verifiedByAdminId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IssueResolution" ADD CONSTRAINT "IssueResolution_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
