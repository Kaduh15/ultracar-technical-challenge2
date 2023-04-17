-- CreateTable
CREATE TABLE "service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contributorId" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "initalService" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishService" DATETIME NOT NULL,
    CONSTRAINT "service_contributorId_fkey" FOREIGN KEY ("contributorId") REFERENCES "Contributor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "service_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "part" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serviceId" TEXT,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    CONSTRAINT "part_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
