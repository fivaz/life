/*
  Warnings:

  - You are about to drop the `ToDo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ToDo" DROP CONSTRAINT "ToDo_userId_fkey";

-- DropTable
DROP TABLE "ToDo";
