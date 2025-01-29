import { PrismaClient } from '@prisma/client';
import { SocialMediaEntity } from '../models/entity/SocialMediaEntity';

const prisma = new PrismaClient();

export const getAllSocialMedia = async (search?: string) => {
  return await prisma.socialMedia.findMany({
    where: {
      name: {
        contains: search || '',
      },
    },
  });
};

export const getSocialMediaById = async (id: number) => {
  return await prisma.socialMedia.findUnique({
    where: { id },
  });
};

export const createSocialMedia = async (data: SocialMediaEntity) => {
  return await prisma.socialMedia.create({ data });
};

export const updateSocialMedia = async (
  id: number,
  data: SocialMediaEntity
) => {
  return await prisma.socialMedia.update({
    data,
    where: {
      id: id,
    },
  });
};

export const deleteSocialMedia = async (id: number) => {
  return await prisma.socialMedia.delete({
    where: {
      id: id,
    },
  });
};
