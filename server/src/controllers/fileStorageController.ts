import { Request, Response } from 'express';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/errorMessages';
import { sendErrorResponse } from '../utils/errorHandler';
import {
  getAllFileStorages,
  getFileStorageById,
  updateFileStorage,
  deleteFileStorage,
  createFileStorage,
} from '../services/fileStorageService';
import { FileStorageSubmitModel } from '../models/submitModel/fileStorageSubmitModel';
import { FileStorageEntity } from '../models/entity/fileStorageEntity';

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const search = req.query.search?.toString();
    const clients = await getAllFileStorages(search);
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
    const { fileId } = req.params;

    if (fileId.trim() === '') {
      sendErrorResponse(
        res,
        400,
        ERROR_CODES.INVALID_ID,
        ERROR_MESSAGES.INVALID_ID
      );
      return;
    }

    const file = await getFileStorageById(fileId);
    if (!file) {
      sendErrorResponse(
        res,
        404,
        ERROR_CODES.NOT_FOUND,
        ERROR_MESSAGES.NOT_FOUND
      );
      return;
    }

    res.json(file);
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
    const reqBody: FileStorageSubmitModel = req.body;

    // Validate if data is not null
    if (!reqBody) {
      sendErrorResponse(
        res,
        400, // Use 400 Bad Request since it's the client’s fault (missing or invalid data)
        ERROR_CODES.INVALID_REQUEST,
        ERROR_CODES.INVALID_REQUEST // Provide a more specific error message
      );
      return;
    }

    let model: FileStorageEntity = {
      ...reqBody,
    };
    const file = await createFileStorage(model);

    res.status(201).json(file);
  } catch (error) {
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
    const reqBody: FileStorageSubmitModel = req.body;
    const fileId: string = req.params.id;

    if (fileId.trim() === '') {
      sendErrorResponse(
        res,
        400,
        ERROR_CODES.INVALID_ID,
        ERROR_MESSAGES.INVALID_ID
      );
      return;
    }

    const updateResult = await updateFileStorage(fileId, reqBody);
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
    const fileId = req.params.id;
    const deleteResult = await deleteFileStorage(fileId);

    res.json(deleteResult);
  } catch (error) {
    sendErrorResponse(
      res,
      500,
      ERROR_CODES.DELETE_ERROR,
      ERROR_MESSAGES.DELETE_ERROR
    );
  }
};
