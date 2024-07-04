-- CreateTable
CREATE TABLE "Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "level" TEXT NOT NULL,
    "activities" TEXT NOT NULL,
    "reasons" TEXT NOT NULL,
    "isResolved" BOOLEAN NOT NULL,
    "numberOfIncident" TEXT NOT NULL,
    "numberOfMessage" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL
);
