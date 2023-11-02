-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "duration" BIGINT,
ALTER COLUMN "endDate" DROP NOT NULL;
