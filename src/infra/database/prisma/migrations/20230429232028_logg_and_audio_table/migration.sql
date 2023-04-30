/*
  Warnings:

  - You are about to drop the column `audioDuration` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `mediaContentType0` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `mediaUrl0` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "audioDuration",
DROP COLUMN "mediaContentType0",
DROP COLUMN "mediaUrl0";

-- CreateTable
CREATE TABLE "Audio" (
    "id" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "audioDuration" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "mediaContentType0" TEXT NOT NULL,
    "mediaUrl0" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Audio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Logger" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Logger_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Audio_messageId_key" ON "Audio"("messageId");

-- AddForeignKey
ALTER TABLE "Audio" ADD CONSTRAINT "Audio_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
