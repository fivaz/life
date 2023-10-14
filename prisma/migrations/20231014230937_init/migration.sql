-- CreateTable
CREATE TABLE "event" (
    "name" TEXT,
    "description" TEXT,
    "startDate" DATE,
    "endDate" DATE,
    "isDone" BOOLEAN,
    "id" SERIAL NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);
