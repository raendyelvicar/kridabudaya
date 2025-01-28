import { Response, NextFunction, Request } from 'express';
import { verifyToken } from '../utils/jwt';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access denied' });
    return;
  }

  const payload = verifyToken(token) as {
    id: number;
    username: string;
    role: string;
  };
  if (!payload) {
    res.status(403).json({ message: 'Invalid token' });
    return;
  }

  req.user = payload;
  next();
};
