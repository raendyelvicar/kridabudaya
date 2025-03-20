/*
  Warnings:

  - You are about to drop the `portfolio_assets` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `portfolios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "portfolio_assets" DROP CONSTRAINT "portfolio_assets_file_id_fkey";

-- DropForeignKey
ALTER TABLE "portfolio_assets" DROP CONSTRAINT "portfolio_assets_portfolio_id_fkey";

-- DropForeignKey
ALTER TABLE "portfolios" DROP CONSTRAINT "portfolios_province_id_fkey";

-- DropTable
DROP TABLE "portfolio_assets";

-- DropTable
DROP TABLE "portfolios";

-- CreateTable
CREATE TABLE "catalog_assets" (
    "file_id" TEXT NOT NULL,
    "catalog_id" INTEGER NOT NULL,

    CONSTRAINT "catalog_assets_pkey" PRIMARY KEY ("file_id","catalog_id")
);

-- CreateTable
CREATE TABLE "catalogs" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "synopsis" TEXT,
    "choreographer" TEXT,
    "music_director" TEXT,
    "province_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "catalogs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "catalog_assets" ADD CONSTRAINT "catalog_assets_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "file_storages"("fileid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catalog_assets" ADD CONSTRAINT "catalog_assets_catalog_id_fkey" FOREIGN KEY ("catalog_id") REFERENCES "catalogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "catalogs" ADD CONSTRAINT "catalogs_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE SET NULL ON UPDATE CASCADE;
