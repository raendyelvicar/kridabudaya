import { PrismaClient } from '@prisma/client';
import { PortfolioEntity } from '../models/entity/portfolioEntity';

const prisma = new PrismaClient();

export const getAllPortfolio = async (search?: string) => {
  return await prisma.portfolio.findMany({
    where: {
      title: {
        contains: search || '',
      },
    },
  });
};

export const getPortfolioById = async (id: number) => {
  return await prisma.portfolio.findUnique({
    where: { id },
  });
};

export const createPortfolio = async (data: PortfolioEntity) => {
  return await prisma.portfolio.create({ data });
};

export const updatePortfolio = async (id: number, data: PortfolioEntity) => {
  return await prisma.portfolio.update({
    data,
    where: {
      id: id,
    },
  });
};

export const deletePortfolio = async (id: number) => {
  return await prisma.portfolio.delete({
    where: {
      id: id,
    },
  });
};
