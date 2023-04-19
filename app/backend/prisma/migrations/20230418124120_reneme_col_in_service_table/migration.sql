/*
  Warnings:

  - You are about to drop the column `initalService` on the `Service` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "initalService",
ADD COLUMN     "initialService" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
