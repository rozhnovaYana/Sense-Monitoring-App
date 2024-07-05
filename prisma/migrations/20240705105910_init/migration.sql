-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Incident" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numberOfIncident" TEXT NOT NULL,
    "timeRequest" TEXT NOT NULL,
    "timeSend" TEXT NOT NULL,
    "reporter" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "isSLA" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Incident_numberOfIncident_key" ON "Incident"("numberOfIncident");
