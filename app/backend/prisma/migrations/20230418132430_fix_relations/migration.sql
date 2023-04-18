/*
  Warnings:

  - You are about to drop the column `carId` on the `Service` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_carId_fkey";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "carId";
