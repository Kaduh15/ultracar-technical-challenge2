/*
  Warnings:

  - You are about to drop the `service` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "part" DROP CONSTRAINT "part_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "service" DROP CONSTRAINT "service_carId_fkey";

-- DropForeignKey
ALTER TABLE "service" DROP CONSTRAINT "service_contributorId_fkey";

-- DropTable
DROP TABLE "service";

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "contributorId" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "initalService" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishService" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_contributorId_fkey" FOREIGN KEY ("contributorId") REFERENCES "Contributor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "part" ADD CONSTRAINT "part_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;
