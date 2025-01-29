import { Request, Response } from 'express';
import { sendErrorResponse } from '../utils/errorHandler';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/errorMessages';
import {
  createSocialMedia,
  deleteSocialMedia,
  getAllSocialMedia,
  getSocialMediaById,
  updateSocialMedia,
} from '../services/socialMediaService';
import { uploadFileToS3 } from '../utils/fileUpload';
import { FileStorageEntity } from '../models/entity/fileStorageEntity';
import { createFileStorage } from '../services/fileStorageService';
import { SocialMediaEntity } from '../models/entity/SocialMediaEntity';

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const search = req.query.search?.toString();
    const clients = await getAllSocialMedia(search);
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
    const socialMediaId = parseInt(id);

    if (isNaN(socialMediaId)) {
      sendErrorResponse(
        res,
        400,
        ERROR_CODES.INVALID_ID,
        ERROR_MESSAGES.INVALID_ID
      );
      return;
    }

    const socialMedia = await getSocialMediaById(socialMediaId);
    if (!socialMedia) {
      sendErrorResponse(
        res,
        404,
        ERROR_CODES.NOT_FOUND,
        ERROR_MESSAGES.NOT_FOUND
      );
      return;
    }

    res.json(socialMedia);
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
    const { name, url } = req.body;
    const file = req.file;

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

    let uploadedFile;
    if (file) {
      // Save into AWS S3
      const fileKey = await uploadFileToS3(file);

      //Save into File Storage table
      //Get the id
      const fileStorageModel = {
        file_type: file.mimetype,
        file_size: file.size,
        file_name: file.originalname,
        file_key: fileKey,
      };

      uploadedFile = await createFileStorage(fileStorageModel);
      if (!uploadedFile) {
        sendErrorResponse(
          res,
          500,
          ERROR_CODES.CREATE_ERROR,
          ERROR_MESSAGES.CREATE_ERROR
        );
        return;
      }
    }

    const model: SocialMediaEntity = {
      name,
      url,
      logo_fileid: uploadedFile?.fileid,
    };
    const client = await createSocialMedia(model);

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
    const { name, url } = req.body;
    const file = req.file;
    const socialMediaId: number = parseInt(req.params.id);

    if (isNaN(socialMediaId)) {
      sendErrorResponse(
        res,
        400,
        ERROR_CODES.INVALID_ID,
        ERROR_MESSAGES.INVALID_ID
      );
      return;
    }

    let uploadedFile;
    if (file) {
      // Save into AWS S3
      const fileKey = await uploadFileToS3(file);

      //Save into File Storage table
      //Get the id
      const fileStorageModel = {
        file_type: file.mimetype,
        file_size: file.size,
        file_name: file.originalname,
        file_key: fileKey,
      };

      uploadedFile = await createFileStorage(fileStorageModel);
      if (!uploadedFile) {
        sendErrorResponse(
          res,
          500,
          ERROR_CODES.CREATE_ERROR,
          ERROR_MESSAGES.CREATE_ERROR
        );
        return;
      }
    }

    const model: SocialMediaEntity = {
      name,
      url,
      logo_fileid: uploadedFile?.fileid,
    };
    const updateResult = await updateSocialMedia(socialMediaId, model);
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
    const socialMediaId = parseInt(req.params.id);
    const deleteResult = await deleteSocialMedia(socialMediaId);

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
