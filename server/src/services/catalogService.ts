import { PrismaClient } from '@prisma/client';
import { CatalogEntity } from '../models/entity/CatalogEntity';

const prisma = new PrismaClient();

export const getAllCatalog = async (search?: string) => {
  return await prisma.catalog.findMany({
    where: {
      title: {
        contains: search || '',
      },
    },
  });
};

export const getCatalogById = async (id: number) => {
  return await prisma.catalog.findUnique({
    where: { id },
  });
};

export const createCatalog = async (data: CatalogEntity) => {
  return await prisma.catalog.create({ data });
};

export const updateCatalog = async (id: number, data: CatalogEntity) => {
  return await prisma.catalog.update({
    data,
    where: {
      id: id,
    },
  });
};

export const deleteCatalog = async (id: number) => {
  return await prisma.catalog.delete({
    where: {
      id: id,
    },
  });
};
