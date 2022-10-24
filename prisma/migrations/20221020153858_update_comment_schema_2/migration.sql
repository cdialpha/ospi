/*
  Warnings:

  - You are about to drop the column `Images` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "Images",
ADD COLUMN     "images" TEXT[];
