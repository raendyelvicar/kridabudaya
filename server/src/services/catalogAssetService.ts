import { PrismaClient } from '@prisma/client';
import { CatalogAssetsEntity } from '../models/entity/CatalogAssetsEntity';

const prisma = new PrismaClient();

export const getAllCatalogAssets = async (search?: string) => {
  return await prisma.catalogAsset.findMany();
};

export const getCatalogAssetsByCatalogId = async (catalogid: number) => {
  return await prisma.catalogAsset.findMany({
    where: { catalog_id: catalogid },
  });
};

export const createCatalogAssets = async (data: CatalogAssetsEntity) => {
  return await prisma.catalogAsset.create({ data });
};

export const deleteCatalogAssets = async (id: string, catalogid: number) => {
  return await prisma.catalogAsset.delete({
    where: {
      file_id_catalog_id: {
        file_id: id,
        catalog_id: catalogid,
      },
    },
  });
};
