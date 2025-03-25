/*
  Warnings:

  - You are about to drop the column `name` on the `banners` table. All the data in the column will be lost.
  - Added the required column `is_publish` to the `banners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_number` to the `banners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtitle` to the `banners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `banners` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "banners" DROP COLUMN "name",
ADD COLUMN     "is_publish" BOOLEAN NOT NULL,
ADD COLUMN     "order_number" INTEGER NOT NULL,
ADD COLUMN     "subtitle" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "achievements" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "year" INTEGER,
    "location" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolios" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "portfolio_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "portfolios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio_assets" (
    "file_id" TEXT NOT NULL,
    "portfolio_id" INTEGER NOT NULL,

    CONSTRAINT "portfolio_assets_pkey" PRIMARY KEY ("file_id","portfolio_id")
);

-- AddForeignKey
ALTER TABLE "portfolio_assets" ADD CONSTRAINT "portfolio_assets_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "file_storages"("fileid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio_assets" ADD CONSTRAINT "portfolio_assets_portfolio_id_fkey" FOREIGN KEY ("portfolio_id") REFERENCES "portfolios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
