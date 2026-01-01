import { Response, NextFunction } from 'express';
import { verifyToken, JWTPayload } from '../utils/jwt';
import { AuthRequest } from './errorHandler';
import { UnauthorizedError } from '../utils/errors';

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('Missing or invalid authorization header');
  }

  const token = authHeader.slice(7);

  try {
    const payload = verifyToken(token);
    req.user = {
      userId: payload.userId,
      email: payload.email,
    };
    next();
  } catch (error) {
    throw new UnauthorizedError('Invalid token');
  }
}
