/*
  Warnings:

  - You are about to drop the `TeamMemberRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TeamMemberRole" DROP CONSTRAINT "TeamMemberRole_role_id_fkey";

-- DropForeignKey
ALTER TABLE "TeamMemberRole" DROP CONSTRAINT "TeamMemberRole_team_memberid_fkey";

-- DropTable
DROP TABLE "TeamMemberRole";

-- CreateTable
CREATE TABLE "team_member_roles" (
    "team_memberid" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,

    CONSTRAINT "team_member_roles_pkey" PRIMARY KEY ("team_memberid","role_id")
);

-- AddForeignKey
ALTER TABLE "team_member_roles" ADD CONSTRAINT "team_member_roles_team_memberid_fkey" FOREIGN KEY ("team_memberid") REFERENCES "team_members"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_member_roles" ADD CONSTRAINT "team_member_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
