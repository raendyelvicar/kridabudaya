import { PrismaClient } from '@prisma/client';
import { PortfolioAssetsEntity } from '../models/entity/PortfolioAssetsEntity';

const prisma = new PrismaClient();

export const getAllPortfolioAssets = async (search?: string) => {
  return await prisma.portfolioAsset.findMany();
};

export const getPortfolioAssetsByPortfolioId = async (portfolioid: number) => {
  return await prisma.portfolioAsset.findMany({
    where: { portfolio_id: portfolioid },
  });
};

export const createPortfolioAssets = async (data: PortfolioAssetsEntity) => {
  return await prisma.portfolioAsset.create({ data });
};

export const deletePortfolioAssets = async (
  id: string,
  portfolioid: number
) => {
  return await prisma.portfolioAsset.delete({
    where: {
      file_id_portfolio_id: {
        file_id: id,
        portfolio_id: portfolioid,
      },
    },
  });
};
