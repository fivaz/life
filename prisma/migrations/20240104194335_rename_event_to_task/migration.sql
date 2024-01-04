ALTER TABLE "Event" RENAME CONSTRAINT "Event_categoryId_fkey" TO "Task_categoryId_fkey";
ALTER TABLE "Event" RENAME CONSTRAINT "Event_userId_fkey" TO "Task_userId_fkey";
ALTER TABLE "Event" RENAME CONSTRAINT "Event_pkey" TO "Task_pkey";
ALTER TABLE "Event" RENAME TO "Task";
