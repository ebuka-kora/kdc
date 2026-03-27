import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError';
import { env } from '../config/env';

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      message: err.message,
      ...(err.errors.length > 0 && { errors: err.errors }),
    });
    return;
  }

  if (err instanceof MongooseError.ValidationError) {
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    res.status(400).json({ message: 'Validation error', errors });
    return;
  }

  if (err instanceof MongooseError.CastError) {
    res.status(400).json({ message: `Invalid value for field: ${err.path}` });
    return;
  }

  if (err instanceof TokenExpiredError) {
    res.status(401).json({ message: 'Token has expired' });
    return;
  }

  if (err instanceof JsonWebTokenError) {
    res.status(401).json({ message: 'Invalid token' });
    return;
  }

  // Handle duplicate key error
  if (typeof err === 'object' && err !== null && (err as { code?: number }).code === 11000) {
    res.status(409).json({ message: 'A record with that value already exists' });
    return;
  }

  console.error(err);
  res.status(500).json({
    message: 'Internal server error',
    ...(env.NODE_ENV === 'development' && { detail: String(err) }),
  });
}
