/*
  Warnings:

  - You are about to alter the column `duration` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - Made the column `endDate` on table `Event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `duration` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "endDate" SET NOT NULL,
ALTER COLUMN "duration" SET NOT NULL,
ALTER COLUMN "duration" SET DATA TYPE INTEGER;
