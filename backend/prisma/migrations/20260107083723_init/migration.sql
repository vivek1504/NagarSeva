/*
  Warnings:

  - The values [VERIFIED,CLOSED] on the enum `IssueStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `engineerid` on the `IssueAssignment` table. All the data in the column will be lost.
  - Added the required column `engineerId` to the `IssueAssignment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RouteAssignmentStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- AlterEnum
BEGIN;
CREATE TYPE "IssueStatus_new" AS ENUM ('DETECTED', 'ASSIGNED', 'IN_PROGRESS', 'FIXED', 'REJECTED', 'RESOLVED');
ALTER TABLE "Issue" ALTER COLUMN "status" TYPE "IssueStatus_new" USING ("status"::text::"IssueStatus_new");
ALTER TYPE "IssueStatus" RENAME TO "IssueStatus_old";
ALTER TYPE "IssueStatus_new" RENAME TO "IssueStatus";
DROP TYPE "public"."IssueStatus_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "IssueAssignment" DROP CONSTRAINT "IssueAssignment_engineerid_fkey";

-- AlterTable
ALTER TABLE "IssueAssignment" DROP COLUMN "engineerid",
ADD COLUMN     "engineerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "IssueResolution" ADD COLUMN     "feedback" TEXT;

-- AlterTable
ALTER TABLE "RouteAssignment" ADD COLUMN     "status" "RouteAssignmentStatus" NOT NULL DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE "IssueAssignment" ADD CONSTRAINT "IssueAssignment_engineerId_fkey" FOREIGN KEY ("engineerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
