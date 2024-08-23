/*
  Warnings:

  - You are about to drop the `invertor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "invertor";

-- CreateTable
CREATE TABLE "investor" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "investor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "investor_email_key" ON "investor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "investor_username_key" ON "investor"("username");
