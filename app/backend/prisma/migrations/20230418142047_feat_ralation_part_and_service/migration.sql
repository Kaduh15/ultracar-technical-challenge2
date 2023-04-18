/*
  Warnings:

  - You are about to drop the `_PartToService` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PartToService" DROP CONSTRAINT "_PartToService_A_fkey";

-- DropForeignKey
ALTER TABLE "_PartToService" DROP CONSTRAINT "_PartToService_B_fkey";

-- DropTable
DROP TABLE "_PartToService";

-- CreateTable
CREATE TABLE "PartsOnService" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "partId" TEXT NOT NULL,

    CONSTRAINT "PartsOnService_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PartsOnService" ADD CONSTRAINT "PartsOnService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartsOnService" ADD CONSTRAINT "PartsOnService_partId_fkey" FOREIGN KEY ("partId") REFERENCES "Part"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
