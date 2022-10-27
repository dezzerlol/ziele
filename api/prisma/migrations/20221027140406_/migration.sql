/*
  Warnings:

  - You are about to drop the column `tags` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "tags";

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "projectId" TEXT;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
