/*
  Warnings:

  - You are about to drop the column `responseId` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `surveyIdentifier` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_responseId_fkey";

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "responseId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "surveyIdentifier";
