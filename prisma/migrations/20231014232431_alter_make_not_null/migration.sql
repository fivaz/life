/*
  Warnings:

  - Made the column `name` on table `event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startDate` on table `event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endDate` on table `event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isDefault` on table `event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "event" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "startDate" SET NOT NULL,
ALTER COLUMN "endDate" SET NOT NULL,
ALTER COLUMN "isDefault" SET NOT NULL;
