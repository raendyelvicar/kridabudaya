import { Request, Response } from 'express';
import {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from '../services/teamMemberService';
import { sendErrorResponse } from '../utils/errorHandler';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/errorMessages';
import { uploadFileToS3 } from '../utils/fileUpload';
import { FileStorageEntity } from '../models/entity/fileStorageEntity';
import { createFileStorage } from '../services/fileStorageService';
import { TeamMember } from '@prisma/client';
import { TeamMemberEntity } from '../models/entity/teamMemberEntity';
import { getRoleByName } from '../services/roleService';
import {
  createTeamMemberRole,
  deleteTeamMemberRole,
} from '../services/teamMemberRoleService';
const formidable = require('formidable');

export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const search = req.query.search?.toString();
    const clients = await getAllTeamMembers(search);
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
    const memberId = parseInt(id);

    if (isNaN(memberId)) {
      sendErrorResponse(
        res,
        400,
        ERROR_CODES.INVALID_ID,
        ERROR_MESSAGES.INVALID_ID
      );
      return;
    }

    const member = await getTeamMemberById(memberId);
    if (!member) {
      sendErrorResponse(
        res,
        404,
        ERROR_CODES.NOT_FOUND,
        ERROR_MESSAGES.NOT_FOUND
      );
      return;
    }

    res.json(member);
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
    const { name, social_media_url, phone_number, bio, role_name } = req.body;
    const file = req.file;

    if (!Array.isArray(role_name)) {
      res.status(400).json({ message: 'role_name must be an array' });
      return;
    }

    // Validate if data is not null
    if (!req.body) {
      sendErrorResponse(
        res,
        400, // Use 400 Bad Request since it's the client’s fault (missing or invalid data)
        ERROR_CODES.INVALID_REQUEST,
        ERROR_MESSAGES.INVALID_REQUEST // Provide a more specific error message
      );
      return;
    }

    const model: TeamMemberEntity = {
      name,
      social_media_url,
      phone_number,
      bio,
    };
    if (file) {
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
    }

    const member = await createTeamMember(model);
    if (!member) {
      sendErrorResponse(
        res,
        500,
        ERROR_CODES.CREATE_ERROR,
        ERROR_MESSAGES.CREATE_ERROR
      );
    }

    const rolePromises = role_name.map(async (role) => {
      const choosenRole = await getRoleByName(role);
      if (!choosenRole) {
        sendErrorResponse(
          res,
          404, // Use 400 Bad Request since it's the client’s fault (missing or invalid data)
          ERROR_CODES.NOT_FOUND,
          ERROR_MESSAGES.NOT_FOUND // Provide a more specific error message
        );
        return;
      }

      //create team member role
      await createTeamMemberRole({
        role_id: choosenRole.id,
        team_memberid: member.id,
      });
    });

    await Promise.all(rolePromises); // Wait for all roles to be created

    res.status(201).json(member);
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
    const { name, social_media_url, phone_number, bio, role_name } = req.body;
    const memberId: number = parseInt(req.params.id);
    const file = req.file;

    if (!Array.isArray(role_name)) {
      sendErrorResponse(
        res,
        400, // Use 400 Bad Request since it's the client’s fault (missing or invalid data)
        ERROR_CODES.INVALID_REQUEST,
        ERROR_MESSAGES.INVALID_REQUEST // Provide a more specific error message
      );
      return;
    }

    // Validate if data is not null
    if (!req.body) {
      sendErrorResponse(
        res,
        400, // Use 400 Bad Request since it's the client’s fault (missing or invalid data)
        ERROR_CODES.INVALID_REQUEST,
        ERROR_MESSAGES.INVALID_REQUEST // Provide a more specific error message
      );
      return;
    }

    if (isNaN(memberId)) {
      sendErrorResponse(
        res,
        400,
        ERROR_CODES.INVALID_ID,
        ERROR_MESSAGES.INVALID_ID
      );
      return;
    }

    const model: TeamMemberEntity = {
      name,
      social_media_url,
      phone_number,
      bio,
    };

    if (file) {
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
      model.profile_picture_fileid = uploadedFile.fileid;
    }

    const updateResult = await updateTeamMember(memberId, model);
    if (!updateResult) {
      return sendErrorResponse(
        res,
        500,
        ERROR_CODES.CREATE_ERROR,
        ERROR_MESSAGES.CREATE_ERROR
      );
    }

    // ✅ Use `Promise.all()` to handle all async role operations
    await deleteTeamMemberRole(memberId); // Delete existing roles first

    const rolePromises = role_name.map(async (role) => {
      const choosenRole = await getRoleByName(role);
      if (!choosenRole) {
        throw new Error('Role not found'); // Prevent multiple responses by throwing an error
      }
      return createTeamMemberRole({
        role_id: choosenRole.id,
        team_memberid: memberId,
      });
    });

    await Promise.all(rolePromises); // Wait for all roles to be created

    res.status(200).json(updateResult);
  } catch (error) {
    return sendErrorResponse(
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
    const memberId = parseInt(req.params.id);
    await deleteTeamMemberRole(memberId);
    const deleteResult = await deleteTeamMember(memberId);

    res.json(deleteResult);
  } catch (error) {
    return sendErrorResponse(
      res,
      500,
      ERROR_CODES.DELETE_ERROR,
      ERROR_MESSAGES.DELETE_ERROR
    );
  }
};
