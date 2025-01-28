import jwt from 'jsonwebtoken';

const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET as string;
const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET as string;

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
};

export const generateRefreshToken = (payload: object): string => {
  return jwt.sign(payload, JWT_REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
};

export const verifyToken = (token: string): jwt.JwtPayload | string | null => {
  try {
    return jwt.verify(token, JWT_ACCESS_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (
  refreshToken: string
): jwt.JwtPayload | string | null => {
  try {
    return jwt.verify(refreshToken, JWT_REFRESH_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};
