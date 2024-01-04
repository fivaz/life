-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "isRecurring" BOOLEAN,
ADD COLUMN     "recurringDaysOfWeek" TEXT[],
ADD COLUMN     "recurringEndAt" TIMESTAMP(6),
ADD COLUMN     "recurringStartAt" TIMESTAMP(6);
