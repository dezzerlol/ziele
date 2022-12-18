/*
  Warnings:

  - A unique constraint covering the columns `[columnId,index]` on the table `Card` will be added. If there are existing duplicate values, this will fail.
  - Made the column `issueType` on table `Card` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "issueType" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Card_columnId_index_key" ON "Card"("columnId", "index");
