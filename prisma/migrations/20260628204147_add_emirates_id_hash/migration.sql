/*
  Warnings:

  - A unique constraint covering the columns `[emiratesIdHash]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emiratesIdHash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_emiratesId_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emiratesIdHash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_emiratesIdHash_key" ON "User"("emiratesIdHash");
