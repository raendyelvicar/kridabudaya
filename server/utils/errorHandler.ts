import { Response } from 'express';

interface ErrorResponse {
  code: string;
  status: number;
  message: string;
}

export const sendErrorResponse = (
  res: Response,
  statusCode: number,
  code: string,
  message: string
): void => {
  const errorResponse: ErrorResponse = {
    code,
    status: statusCode,
    message,
  };
  res.status(statusCode).json(errorResponse);
};
