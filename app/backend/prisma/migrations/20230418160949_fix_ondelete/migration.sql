-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_carId_fkey";

-- DropForeignKey
ALTER TABLE "PartsOnService" DROP CONSTRAINT "PartsOnService_serviceId_fkey";

-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "carId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartsOnService" ADD CONSTRAINT "PartsOnService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
