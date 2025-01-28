import { Request, Response, NextFunction, RequestHandler } from 'express';
import { verifyToken } from '../utils/jwt';

export const authorizeRole = (roles: string[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = verifyToken(token) as {
        id: number;
        username: string;
        role: string;
      };

      if (!roles.includes(decoded.role)) {
        res
          .status(403)
          .json({ message: 'Access denied: insufficient permissions' });
        return;
      }

      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }
  };
};
