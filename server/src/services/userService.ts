import { PrismaClient } from '@prisma/client';
import { UserEntity } from '../models/entity/userEntity';

const prisma = new PrismaClient();

export const createUser = async (data: UserEntity) => {
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
