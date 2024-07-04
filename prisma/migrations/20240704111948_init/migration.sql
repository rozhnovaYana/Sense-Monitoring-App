/*
  Warnings:

  - Added the required column `theme` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
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
    "endDate" TEXT NOT NULL
);
INSERT INTO "new_Message" ("activities", "endDate", "id", "isResolved", "level", "numberOfIncident", "numberOfMessage", "reasons", "startDate") SELECT "activities", "endDate", "id", "isResolved", "level", "numberOfIncident", "numberOfMessage", "reasons", "startDate" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
