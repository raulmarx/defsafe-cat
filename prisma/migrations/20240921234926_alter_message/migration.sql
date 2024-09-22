/*
  Warnings:

  - You are about to drop the column `mensage` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "mensage",
ADD COLUMN     "message" TEXT;
