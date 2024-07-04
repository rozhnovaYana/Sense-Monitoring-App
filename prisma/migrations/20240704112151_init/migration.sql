-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "level" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "activities" TEXT NOT NULL,
    "reasons" TEXT NOT NULL,
    "isResolved" BOOLEAN NOT NULL,
    "numberOfIncident" TEXT NOT NULL,
    "numberOfMessage" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT
);
INSERT INTO "new_Message" ("activities", "endDate", "id", "isResolved", "level", "numberOfIncident", "numberOfMessage", "reasons", "startDate", "theme") SELECT "activities", "endDate", "id", "isResolved", "level", "numberOfIncident", "numberOfMessage", "reasons", "startDate", "theme" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
CREATE UNIQUE INDEX "Message_numberOfIncident_key" ON "Message"("numberOfIncident");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
