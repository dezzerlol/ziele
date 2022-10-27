/*
  Warnings:

  - You are about to drop the column `tags` on the `Card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "tags";

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cardId" TEXT,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_body_key" ON "Tag"("body");

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE SET NULL ON UPDATE CASCADE;
