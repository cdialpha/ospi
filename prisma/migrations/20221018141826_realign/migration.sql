/*
  Warnings:

  - The primary key for the `Comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - The required column `commentId` was added to the `Comment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `updatedAt` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bio` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facebook` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `insta` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `twitter` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_pkey",
DROP COLUMN "id",
ADD COLUMN     "commentId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "Comment_pkey" PRIMARY KEY ("commentId");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerified",
ADD COLUMN     "bio" TEXT NOT NULL,
ADD COLUMN     "dateJoined" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "facebook" TEXT NOT NULL,
ADD COLUMN     "insta" TEXT NOT NULL,
ADD COLUMN     "twitter" TEXT NOT NULL,
ADD COLUMN     "website" TEXT NOT NULL;
