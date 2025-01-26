/*
  Warnings:

  - You are about to drop the `files` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "banners" DROP CONSTRAINT "banners_banner_fileid_fkey";

-- DropForeignKey
ALTER TABLE "gallery_items" DROP CONSTRAINT "gallery_items_media_fileid_fkey";

-- DropForeignKey
ALTER TABLE "kb_clients" DROP CONSTRAINT "kb_clients_logo_fileid_fkey";

-- DropForeignKey
ALTER TABLE "portfolio_assets" DROP CONSTRAINT "portfolio_assets_file_id_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_service_fileid_fkey";

-- DropForeignKey
ALTER TABLE "team_members" DROP CONSTRAINT "team_members_profile_picture_fileid_fkey";

-- DropForeignKey
ALTER TABLE "testimonials" DROP CONSTRAINT "testimonials_image_fileid_fkey";

-- DropTable
DROP TABLE "files";

-- CreateTable
CREATE TABLE "file_storages" (
    "fileid" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "file_type" "FileType" NOT NULL,
    "file_size" INTEGER NOT NULL,
    "file_name" TEXT,
    "file_saved_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "file_storages_pkey" PRIMARY KEY ("fileid")
);

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_service_fileid_fkey" FOREIGN KEY ("service_fileid") REFERENCES "file_storages"("fileid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "banners" ADD CONSTRAINT "banners_banner_fileid_fkey" FOREIGN KEY ("banner_fileid") REFERENCES "file_storages"("fileid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_profile_picture_fileid_fkey" FOREIGN KEY ("profile_picture_fileid") REFERENCES "file_storages"("fileid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kb_clients" ADD CONSTRAINT "kb_clients_logo_fileid_fkey" FOREIGN KEY ("logo_fileid") REFERENCES "file_storages"("fileid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gallery_items" ADD CONSTRAINT "gallery_items_media_fileid_fkey" FOREIGN KEY ("media_fileid") REFERENCES "file_storages"("fileid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_image_fileid_fkey" FOREIGN KEY ("image_fileid") REFERENCES "file_storages"("fileid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio_assets" ADD CONSTRAINT "portfolio_assets_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "file_storages"("fileid") ON DELETE RESTRICT ON UPDATE CASCADE;
