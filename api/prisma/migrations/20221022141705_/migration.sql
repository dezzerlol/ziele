/*
  Warnings:

  - A unique constraint covering the columns `[title,projectId]` on the table `Column` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Column_title_projectId_key" ON "Column"("title", "projectId");
