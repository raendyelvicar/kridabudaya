import { PrismaClient } from '@prisma/client';
import { FileStorageEntity } from '../models/entity/fileStorageEntity';
import { FileStorageSubmitModel } from '../models/submitModel/fileStorageSubmitModel';

const prisma = new PrismaClient();

export const getAllFileStorages = async (search?: string) => {
  return await prisma.fileStorage.findMany({
    where: {
      file_name: {
        contains: search || '',
      },
    },
  });
};

export const getFileStorageById = async (id: string) => {
  return await prisma.fileStorage.findUnique({
    where: { fileid: id },
  });
};

export const createFileStorage = async (data: FileStorageEntity) => {
  return await prisma.fileStorage.create({ data });
};

export const updateFileStorage = async (
  id: string,
  data: FileStorageSubmitModel
) => {
  return await prisma.fileStorage.update({
    data,
    where: {
      fileid: id,
    },
  });
};

export const deleteFileStorage = async (id: string) => {
  return await prisma.fileStorage.delete({
    where: {
      fileid: id,
    },
  });
};
