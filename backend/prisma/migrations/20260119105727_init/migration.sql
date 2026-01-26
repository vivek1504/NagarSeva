/*
  Warnings:

  - Added the required column `distance` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endLat` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endLon` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startLat` to the `Route` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startLon` to the `Route` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Route" ADD COLUMN     "distance" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "endLat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "endLon" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "startLat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "startLon" DOUBLE PRECISION NOT NULL;
