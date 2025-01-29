import { Request, Response } from 'express';
import {
  getAllKBClients,
  getKBClientById,
  createKBClient,
  updateKBClient,
  deleteKBClient,
} from '../services/kbClientService';
import { KBClientSubmitModel } from '../models/submitModel/kbClientSubmitModel';
import { sendErrorResponse } from '../utils/errorHandler';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/errorMessages';
import { KBClientEntity } from '../models/entity/kbClienEntity';
import { uploadFileToS3 } from '../utils/fileUpload';
import { FileStorageEntity } from '../models/entity/fileStorageEntity';
import { createFileStorage } from '../services/fileStorageService';
const formidable = require('formidable');

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const search = req.query.search?.toString();
    const clients = await getAllKBClients(search);
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
    const clientId = parseInt(id);

    if (isNaN(clientId)) {
      sendErrorResponse(
        res,
        400,
        ERROR_CODES.INVALID_ID,
        ERROR_MESSAGES.INVALID_ID
      );
      return;
    }

    const client = await getKBClientById(clientId);
    if (!client) {
      sendErrorResponse(
        res,
        404,
        ERROR_CODES.NOT_FOUND,
        ERROR_MESSAGES.NOT_FOUND
      );
      return;
    }

    res.json(client);
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
    const { name, description, website, contact_email, phone_number } =
      req.body;
    const file = req.file;

    //Optional if image for client is required
    if (!file) {
      sendErrorResponse(
        res,
        400,
        ERROR_CODES.INVALID_REQUEST,
        ERROR_MESSAGES.INVALID_REQUEST
      );
      return;
    }

    // Validate if data is not null
    if (!req.body) {
      sendErrorResponse(
        res,
        400, // Use 400 Bad Request since it's the client’s fault (missing or invalid data)
        ERROR_CODES.INVALID_REQUEST,
        ERROR_CODES.INVALID_REQUEST // Provide a more specific error message
      );
      return;
    }

    // Save into AWS S3
    const fileKey = await uploadFileToS3(file);

    //Save into File Storage table
    //Get the id
    const fileStorageModel: FileStorageEntity = {
      file_type: file.mimetype,
      file_size: file.size,
      file_name: file.originalname,
      file_key: fileKey,
    };
    const uploadedFile = await createFileStorage(fileStorageModel);

    if (!uploadedFile) {
      sendErrorResponse(
        res,
        500,
        ERROR_CODES.CREATE_ERROR,
        ERROR_MESSAGES.CREATE_ERROR
      );
      return;
    }

    const model: KBClientEntity = {
      name,
      logo_fileid: uploadedFile.fileid,
      description,
      website,
      contact_email,
      phone_number,
    };
    const client = await createKBClient(model);

    res.status(201).json(client);
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
    const reqBody: KBClientSubmitModel = req.body;
    const clientId: number = parseInt(req.params.id);

    if (isNaN(clientId)) {
      sendErrorResponse(
        res,
        400,
        ERROR_CODES.INVALID_ID,
        ERROR_MESSAGES.INVALID_ID
      );
      return;
    }

    const updateResult = await updateKBClient(clientId, reqBody);
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
    const clientId = parseInt(req.params.id);
    const deleteResult = await deleteKBClient(clientId);

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
