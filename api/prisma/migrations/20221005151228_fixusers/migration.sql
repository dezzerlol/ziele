/*
  Warnings:

  - You are about to drop the column `cardId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "cardId",
DROP COLUMN "projectId";
