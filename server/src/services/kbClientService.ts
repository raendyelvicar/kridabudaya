import { PrismaClient } from '@prisma/client';
import { KBClientSubmitModel } from '../models/submitModel/kbClientSubmitModel';
import { KBCLientEntity } from '../models/entity/kbClienEntity';

const prisma = new PrismaClient();

export const getAllKBClients = async (search?: string) => {
  return await prisma.kBClient.findMany({
    where: {
      name: {
        contains: search || '',
      },
    },
  });
};

export const getKBClientById = async (id: number) => {
  return await prisma.kBClient.findUnique({
    where: { id },
  });
};

export const createKBClient = async (data: KBCLientEntity) => {
  return await prisma.kBClient.create({ data });
};

export const updateKBClient = async (id: number, data: KBClientSubmitModel) => {
  return await prisma.kBClient.update({
    data,
    where: {
      id: id,
    },
  });
};

export const deleteKBClient = async (id: number) => {
  return await prisma.kBClient.delete({
    where: {
      id: id,
    },
  });
};
