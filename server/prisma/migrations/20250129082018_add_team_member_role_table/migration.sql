/*
  Warnings:

  - You are about to drop the column `role` on the `team_members` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "team_members" DROP COLUMN "role";

-- CreateTable
CREATE TABLE "TeamMemberRole" (
    "team_memberid" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "TeamMemberRole_pkey" PRIMARY KEY ("team_memberid","role_id")
);

-- AddForeignKey
ALTER TABLE "TeamMemberRole" ADD CONSTRAINT "TeamMemberRole_team_memberid_fkey" FOREIGN KEY ("team_memberid") REFERENCES "team_members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMemberRole" ADD CONSTRAINT "TeamMemberRole_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
