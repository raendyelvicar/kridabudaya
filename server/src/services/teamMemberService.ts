import { PrismaClient, TeamMember } from '@prisma/client';
import { TeamMemberEntity } from '../models/entity/teamMemberEntity';

const prisma = new PrismaClient();

export const getAllTeamMembers = async (search?: string) => {
  return await prisma.teamMember.findMany({
    where: {
      name: {
        contains: search || '',
      },
    },
    include: {
      team_member_role: {
        include: {
          role: true,
        },
      },
    },
  });
};

export const getTeamMemberById = async (id: number) => {
  return await prisma.teamMember.findUnique({
    where: { id },
    include: {
      team_member_role: {
        include: {
          role: true,
        },
      },
    },
  });
};

export const createTeamMember = async (data: TeamMemberEntity) => {
  return await prisma.teamMember.create({ data });
};

export const updateTeamMember = async (id: number, data: TeamMemberEntity) => {
  return await prisma.teamMember.update({
    data,
    where: {
      id: id,
    },
  });
};

export const deleteTeamMember = async (id: number) => {
  return await prisma.teamMember.delete({
    where: {
      id: id,
    },
  });
};
