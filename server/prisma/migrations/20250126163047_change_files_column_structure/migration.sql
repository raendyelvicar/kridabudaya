/*
  Warnings:

  - You are about to drop the column `file_saved_name` on the `file_storages` table. All the data in the column will be lost.
  - You are about to drop the column `file_url` on the `file_storages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "file_storages" DROP COLUMN "file_saved_name",
DROP COLUMN "file_url",
ADD COLUMN     "file_key" TEXT;
