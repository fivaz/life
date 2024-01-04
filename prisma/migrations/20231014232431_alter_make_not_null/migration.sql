/*
  Warnings:

  - Made the column `name` on table `task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startDate` on table `task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endDate` on table `task` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isDone` on table `task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "event" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "startDate" SET NOT NULL,
ALTER COLUMN "endDate" SET NOT NULL,
ALTER COLUMN "isDone" SET NOT NULL;
