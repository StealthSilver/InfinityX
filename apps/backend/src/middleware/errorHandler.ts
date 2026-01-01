import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('Error:', error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: error.message,
      statusCode: error.statusCode,
    });
  }

  res.status(500).json({
    error: 'Internal server error',
    statusCode: 500,
  });
}
