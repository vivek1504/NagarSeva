/*
  Warnings:

  - Added the required column `wardId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Department" AS ENUM ('POTHOLE', 'GARBAGE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "department" "Department",
ADD COLUMN     "wardId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_wardId_fkey" FOREIGN KEY ("wardId") REFERENCES "Ward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
