/*
  Warnings:

  - You are about to drop the column `serviceId` on the `Part` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Part" DROP CONSTRAINT "Part_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "Service" DROP CONSTRAINT "Service_carId_fkey";

-- AlterTable
ALTER TABLE "Part" DROP COLUMN "serviceId";

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "clientId" TEXT NOT NULL,
ALTER COLUMN "carId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "_PartToService" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PartToService_AB_unique" ON "_PartToService"("A", "B");

-- CreateIndex
CREATE INDEX "_PartToService_B_index" ON "_PartToService"("B");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PartToService" ADD CONSTRAINT "_PartToService_A_fkey" FOREIGN KEY ("A") REFERENCES "Part"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PartToService" ADD CONSTRAINT "_PartToService_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
