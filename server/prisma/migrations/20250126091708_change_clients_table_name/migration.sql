/*
  Warnings:

  - You are about to drop the `clients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_logo_fileid_fkey";

-- DropTable
DROP TABLE "clients";

-- CreateTable
CREATE TABLE "kb_clients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logo_fileid" TEXT,
    "description" TEXT,
    "website" TEXT,
    "contact_email" TEXT,
    "phone_number" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kb_clients_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "kb_clients" ADD CONSTRAINT "kb_clients_logo_fileid_fkey" FOREIGN KEY ("logo_fileid") REFERENCES "files"("fileid") ON DELETE SET NULL ON UPDATE CASCADE;
