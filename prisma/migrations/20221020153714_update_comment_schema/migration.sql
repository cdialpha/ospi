-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "Images" TEXT[],
ADD COLUMN     "text" TEXT NOT NULL DEFAULT '';
