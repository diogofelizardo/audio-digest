-- CreateEnum
CREATE TYPE "Locales" AS ENUM ('en', 'pt', 'es');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "locale" "Locales" NOT NULL DEFAULT 'en';
