import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getRoleById = async (id: number) => {
  return await prisma.role.findUnique({
    where: {
      id: id,
    },
  });
};

export const getRoleByName = async (name: string) => {
  return await prisma.role.findUnique({
    where: {
      name: name,
    },
  });
};
