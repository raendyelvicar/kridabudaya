import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (data: {
  username: string;
  password: string;
  roleId: number;
  refreshToken: string;
}) => {
  return await prisma.user.create({ data });
};

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      role: true,
    },
  });
};

export const getUserByUsername = async (username: string) => {
  return await prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
      role: true,
    },
  });
};
