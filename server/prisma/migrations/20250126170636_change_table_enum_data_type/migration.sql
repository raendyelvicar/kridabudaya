/*
  Warnings:

  - The `content_type` column on the `contents` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `team_members` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `file_type` on the `file_storages` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "contents" DROP COLUMN "content_type",
ADD COLUMN     "content_type" TEXT;

-- AlterTable
ALTER TABLE "file_storages" DROP COLUMN "file_type",
ADD COLUMN     "file_type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "team_members" DROP COLUMN "role",
ADD COLUMN     "role" TEXT;
