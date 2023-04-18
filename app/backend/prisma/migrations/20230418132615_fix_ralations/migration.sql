/*
  Warnings:

  - You are about to drop the column `contributorId` on the `Car` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_contributorId_fkey";

-- AlterTable
ALTER TABLE "Car" DROP COLUMN "contributorId";
