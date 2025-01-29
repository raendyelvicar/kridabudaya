-- DropForeignKey
ALTER TABLE "portfolios" DROP CONSTRAINT "portfolios_province_id_fkey";

-- AlterTable
ALTER TABLE "portfolios" ALTER COLUMN "province_id" DROP NOT NULL;

-- AlterTable
CREATE SEQUENCE provinces_id_seq;
ALTER TABLE "provinces" ALTER COLUMN "id" SET DEFAULT nextval('provinces_id_seq'),
ADD CONSTRAINT "provinces_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE provinces_id_seq OWNED BY "provinces"."id";

-- DropIndex
DROP INDEX "provinces_id_key";

-- CreateTable
CREATE TABLE "social_media" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "logo_fileid" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "social_media_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_media" ADD CONSTRAINT "social_media_logo_fileid_fkey" FOREIGN KEY ("logo_fileid") REFERENCES "file_storages"("fileid") ON DELETE SET NULL ON UPDATE CASCADE;
