/*
  Warnings:

  - The `media_type` column on the `gallery_items` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "gallery_items" DROP COLUMN "media_type",
ADD COLUMN     "media_type" TEXT;

-- AlterTable
ALTER TABLE "services" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "refreshToken" DROP NOT NULL;
