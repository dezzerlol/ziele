/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_cardId_fkey";

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "priority" TEXT,
ADD COLUMN     "tags" JSONB DEFAULT '[]';

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "tags" JSONB NOT NULL DEFAULT '[]';

-- DropTable
DROP TABLE "Tag";
