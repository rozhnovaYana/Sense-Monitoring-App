/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Message` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Message_numberOfIncident_key";

-- CreateIndex
CREATE UNIQUE INDEX "Message_id_key" ON "Message"("id");
