-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "recurrentId" INTEGER;

-- CreateTable
CREATE TABLE "Recurrent" (
    "id" SERIAL NOT NULL,
    "startAt" TIMESTAMP(6) NOT NULL,
    "endAt" TIMESTAMP(6) NOT NULL,
    "daysOfWeek" TEXT[],

    CONSTRAINT "Recurrent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_recurrentId_fkey" FOREIGN KEY ("recurrentId") REFERENCES "Recurrent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
