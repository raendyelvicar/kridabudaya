/*
  Warnings:

  - The primary key for the `content_mappings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bannerId` on the `content_mappings` table. All the data in the column will be lost.
  - You are about to drop the column `contentId` on the `content_mappings` table. All the data in the column will be lost.
  - You are about to drop the column `content_mapping` on the `content_mappings` table. All the data in the column will be lost.
  - You are about to drop the column `fAQId` on the `content_mappings` table. All the data in the column will be lost.
  - You are about to drop the column `serviceId` on the `content_mappings` table. All the data in the column will be lost.
  - You are about to drop the column `statisticId` on the `content_mappings` table. All the data in the column will be lost.
  - You are about to drop the column `teamMemberId` on the `content_mappings` table. All the data in the column will be lost.
  - You are about to drop the column `testimonialId` on the `content_mappings` table. All the data in the column will be lost.
  - Added the required column `content_mapping_id` to the `content_mappings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content_type` to the `content_mappings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "content_mappings" DROP CONSTRAINT "content_mappings_bannerId_fkey";

-- DropForeignKey
ALTER TABLE "content_mappings" DROP CONSTRAINT "content_mappings_contentId_fkey";

-- DropForeignKey
ALTER TABLE "content_mappings" DROP CONSTRAINT "content_mappings_fAQId_fkey";

-- DropForeignKey
ALTER TABLE "content_mappings" DROP CONSTRAINT "content_mappings_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "content_mappings" DROP CONSTRAINT "content_mappings_statisticId_fkey";

-- DropForeignKey
ALTER TABLE "content_mappings" DROP CONSTRAINT "content_mappings_teamMemberId_fkey";

-- DropForeignKey
ALTER TABLE "content_mappings" DROP CONSTRAINT "content_mappings_testimonialId_fkey";

-- AlterTable
ALTER TABLE "content_mappings" DROP CONSTRAINT "content_mappings_pkey",
DROP COLUMN "bannerId",
DROP COLUMN "contentId",
DROP COLUMN "content_mapping",
DROP COLUMN "fAQId",
DROP COLUMN "serviceId",
DROP COLUMN "statisticId",
DROP COLUMN "teamMemberId",
DROP COLUMN "testimonialId",
ADD COLUMN     "content_mapping_id" INTEGER NOT NULL,
ADD COLUMN     "content_type" "ContentType" NOT NULL,
ADD CONSTRAINT "content_mappings_pkey" PRIMARY KEY ("content_id", "content_mapping_id");
