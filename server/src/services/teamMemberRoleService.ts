import { PrismaClient, TeamMember } from '@prisma/client';
import { TeamMemberRoleEntity } from '../models/entity/teamMemberRoleEntity';

const prisma = new PrismaClient();

export const createTeamMemberRole = async (data: TeamMemberRoleEntity) => {
  return await prisma.teamMemberRole.create({ data });
};

export const deleteTeamMemberRole = async (id: number) => {
  return await prisma.teamMemberRole.deleteMany({
    where: {
      team_memberid: id,
    },
  });
};
