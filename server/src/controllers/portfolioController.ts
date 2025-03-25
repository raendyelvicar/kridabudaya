import { Request, Response } from 'express';
import { sendErrorResponse } from '../utils/errorHandler';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/errorMessages';
import { uploadFileToS3 } from '../utils/fileUpload';
import { FileStorageEntity } from '../models/entity/fileStorageEntity';
import { createFileStorage } from '../services/fileStorageService';
import {
  createPortfolio,
  deletePortfolio,
  getAllPortfolio,
  getPortfolioById,
  updatePortfolio,
} from '../services/portfolioService';
import { PortfolioAssetsEntity } from '../models/entity/portfolioAssetsEntity';
import { PortfolioEntity } from '../models/entity/portfolioEntity';
import { createPortfolioAssets } from '../services/portfolioAssetService';
const formidable = require('formidable');

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const search = req.query.search?.toString();
    const clients = await getAllPortfolio(search);
    res.json(clients);
  } catch (error) {
    sendErrorResponse(
      res,
      500,
      ERROR_CODES.RETRIEVE_ERROR,
      ERROR_MESSAGES.RETRIEVE_ERROR
    );
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const portfolioid = parseInt(id);

    if (isNaN(portfolioid)) {
      sendErrorResponse(
        res,
        400,
        ERROR_CODES.INVALID_ID,
        ERROR_MESSAGES.INVALID_ID
      );
      return;
    }

    const portfolio = await getPortfolioById(portfolioid);
    if (!portfolio) {
      sendErrorResponse(
        res,
        404,
        ERROR_CODES.NOT_FOUND,
        ERROR_MESSAGES.NOT_FOUND
      );
      return;
    }

    res.json(portfolio);
  } catch (error) {
    sendErrorResponse(
      res,
      500,
      ERROR_CODES.RETRIEVE_ERROR,
      ERROR_MESSAGES.RETRIEVE_ERROR
    );
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, synopsis, choreographer, music_director, province_id } =
      req.body;
    let files = req.files as Express.Multer.File[];

    // Validasi input
    if (!title || !synopsis || !province_id) {
      return sendErrorResponse(
        res,
        400,
        ERROR_CODES.INVALID_REQUEST,
        ERROR_MESSAGES.INVALID_REQUEST
      );
    }

    // Pastikan req.files adalah array
    if (!Array.isArray(files)) {
      sendErrorResponse(
        res,
        400,
        ERROR_CODES.INVALID_REQUEST,
        ERROR_MESSAGES.INVALID_REQUEST
      );
      return;
    }

    // Insert ke database
    const model: PortfolioEntity = {
      title,
      synopsis,
      music_director,
      choreographer,
      province_id: Number(province_id),
    };
    const portfolio = await createPortfolio(model);

    const failedFiles: string[] = [];

    await Promise.all(
      files.map(async (file) => {
        try {
          const fileKey = await uploadFileToS3(file);

          const fileStorageModel: FileStorageEntity = {
            file_type: file.mimetype,
            file_size: file.size,
            file_name: file.originalname,
            file_key: fileKey,
          };
          const uploadedFile = await createFileStorage(fileStorageModel);

          if (!uploadedFile) {
            throw new Error(`Failed to store file: ${file.originalname}`);
          }

          const portfolioAssetModel: PortfolioAssetsEntity = {
            file_id: uploadedFile.fileid,
            portfolio_id: portfolio.id,
          };
          await createPortfolioAssets(portfolioAssetModel);
        } catch (error) {
          console.error('Error uploading file:', file.originalname, error);
          failedFiles.push(file.originalname);
        }
      })
    );

    if (failedFiles.length) {
      res.status(207).json({
        message: 'Some files failed to upload',
        failedFiles,
      });
      return;
    }

    res
      .status(201)
      .json({ message: 'Portfolio created successfully', portfolio });
  } catch (error: any) {
    sendErrorResponse(
      res,
      500,
      ERROR_CODES.CREATE_ERROR,
      ERROR_MESSAGES.CREATE_ERROR
    );
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const reqBody: PortfolioEntity = req.body;
    const portfolioid: number = parseInt(req.params.id);

    if (isNaN(portfolioid)) {
      sendErrorResponse(
        res,
        400,
        ERROR_CODES.INVALID_ID,
        ERROR_MESSAGES.INVALID_ID
      );
      return;
    }

    const updateResult = await updatePortfolio(portfolioid, reqBody);
    res.status(200).json(updateResult);
  } catch (error) {
    sendErrorResponse(
      res,
      500,
      ERROR_CODES.UPDATE_ERROR,
      ERROR_MESSAGES.UPDATE_ERROR
    );
  }
};

export const deleteData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const portfolioid = parseInt(req.params.id);
    const deleteResult = await deletePortfolio(portfolioid);

    res.json(deleteResult);
  } catch (error: any) {
    sendErrorResponse(
      res,
      500,
      ERROR_CODES.DELETE_ERROR,
      ERROR_MESSAGES.DELETE_ERROR
    );
  }
};
