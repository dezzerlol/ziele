-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "tags" SET DEFAULT '{}';

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "tags" DROP NOT NULL,
ALTER COLUMN "tags" SET DEFAULT '{}';
