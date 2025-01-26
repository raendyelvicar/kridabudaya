/*
  Warnings:

  - You are about to drop the `content_mapppings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "content_mapppings" DROP CONSTRAINT "content_mapppings_bannerId_fkey";

-- DropForeignKey
ALTER TABLE "content_mapppings" DROP CONSTRAINT "content_mapppings_contentId_fkey";

-- DropForeignKey
ALTER TABLE "content_mapppings" DROP CONSTRAINT "content_mapppings_fAQId_fkey";

-- DropForeignKey
ALTER TABLE "content_mapppings" DROP CONSTRAINT "content_mapppings_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "content_mapppings" DROP CONSTRAINT "content_mapppings_statisticId_fkey";

-- DropForeignKey
ALTER TABLE "content_mapppings" DROP CONSTRAINT "content_mapppings_teamMemberId_fkey";

-- DropForeignKey
ALTER TABLE "content_mapppings" DROP CONSTRAINT "content_mapppings_testimonialId_fkey";

-- DropTable
DROP TABLE "content_mapppings";

-- CreateTable
CREATE TABLE "content_mappings" (
    "content_id" INTEGER NOT NULL,
    "content_mapping" TEXT NOT NULL,
    "contentId" INTEGER,
    "serviceId" INTEGER,
    "bannerId" INTEGER,
    "teamMemberId" INTEGER,
    "statisticId" INTEGER,
    "testimonialId" INTEGER,
    "fAQId" INTEGER,

    CONSTRAINT "content_mappings_pkey" PRIMARY KEY ("content_id","content_mapping")
);

-- AddForeignKey
ALTER TABLE "content_mappings" ADD CONSTRAINT "content_mappings_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "contents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_mappings" ADD CONSTRAINT "content_mappings_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_mappings" ADD CONSTRAINT "content_mappings_bannerId_fkey" FOREIGN KEY ("bannerId") REFERENCES "banners"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_mappings" ADD CONSTRAINT "content_mappings_teamMemberId_fkey" FOREIGN KEY ("teamMemberId") REFERENCES "team_members"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_mappings" ADD CONSTRAINT "content_mappings_statisticId_fkey" FOREIGN KEY ("statisticId") REFERENCES "statistics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_mappings" ADD CONSTRAINT "content_mappings_testimonialId_fkey" FOREIGN KEY ("testimonialId") REFERENCES "testimonials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_mappings" ADD CONSTRAINT "content_mappings_fAQId_fkey" FOREIGN KEY ("fAQId") REFERENCES "faqs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
