import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { ApiError } from '../utils/ApiError';

export function authMiddleware(req: Request, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Missing or invalid Authorization header'));
  }

  const token = header.slice(7);

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string; email: string };
    req.admin = decoded;
    next();
  } catch {
    next(new ApiError(401, 'Token is invalid or expired'));
  }
}
