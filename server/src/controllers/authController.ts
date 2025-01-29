import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import {
  generateRefreshToken,
  generateToken,
  verifyRefreshToken,
} from '../utils/jwt';
import {
  createUser,
  getUserById,
  getUserByUsername,
} from '../services/userService';
import { sendErrorResponse } from '../utils/errorHandler';
import { ERROR_CODES, ERROR_MESSAGES } from '../constants/errorMessages';
import { getRoleByName } from '../services/roleService';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { username, password, roleName } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Find role by name
    const role = await getRoleByName(roleName);
    if (!role) {
      sendErrorResponse(
        res,
        400,
        ERROR_CODES.INVALID_REQUEST,
        ERROR_MESSAGES.INVALID_REQUEST
      );
      return;
    }

    const user = await createUser({
      username: username,
      password: hashedPassword,
      role_id: role.id,
      refresh_token: '',
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    sendErrorResponse(
      res,
      500,
      ERROR_CODES.CREATE_ERROR,
      'Error registering user'
    );
  }
};

// Login User
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByUsername(username);
    if (!user) {
      sendErrorResponse(
        res,
        404,
        ERROR_CODES.NOT_FOUND,
        ERROR_MESSAGES.NOT_FOUND
      );
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      sendErrorResponse(
        res,
        400,
        ERROR_CODES.INVALID_REQUEST,
        'Invalid credentials'
      );
      return;
    }

    const token = generateToken({
      id: user.id,
      username: user.username,
      role: user.role.name,
    });

    const refreshToken = generateRefreshToken({
      id: user.id,
      username: user.username,
      role: user.role.name,
    });

    //update current user with refresh token
    await prisma.user.update({
      data: {
        refresh_token: refreshToken,
      },
      where: {
        id: user.id,
      },
    });

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, //1 days
    });

    res.json({ token }); //return access token
  } catch (error) {
    sendErrorResponse(
      res,
      500,
      ERROR_CODES.INTERNAL_SERVER_ERROR,
      'Error logging in'
    );
  }
};

// Get User Info
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.user as { id: number };

  try {
    const user = await getUserById(id);
    if (!user) {
      sendErrorResponse(
        res,
        404,
        ERROR_CODES.NOT_FOUND,
        ERROR_MESSAGES.NOT_FOUND
      );
      return;
    }

    res.json({ user });
  } catch (error) {
    sendErrorResponse(
      res,
      500,
      ERROR_CODES.RETRIEVE_ERROR,
      ERROR_MESSAGES.RETRIEVE_ERROR
    );
  }
};

export const getRefreshToken = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;

    // Check if refresh token exists in cookies
    if (!cookies?.jwt) {
      res
        .status(401)
        .json({ message: 'Unauthorized: No refresh token provided.' });
      return;
    }

    const refreshToken = cookies.jwt;

    // Find user with the provided refresh token
    const foundUser = await prisma.user.findFirst({
      where: { refresh_token: refreshToken },
      include: { role: true },
    });

    if (!foundUser) {
      res.status(403).json({ message: 'Forbidden: Invalid refresh token.' });
      return;
    }

    // Verify the refresh token
    const newToken = await verifyRefreshToken(refreshToken);
    if (!newToken) {
      res
        .status(403)
        .json({ message: 'Forbidden: Refresh token verification failed.' });
      return;
    }

    // Generate a new access token
    const accessToken = generateToken({
      id: foundUser.id,
      username: foundUser.username,
      role: foundUser.role.name,
    });

    // Send the new access token in response
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error('Error in getRefreshToken:', error);
    res.status(500).json({ message: 'Internal Server Error.' });
    return;
  }
};
