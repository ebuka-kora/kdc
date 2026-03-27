import { Request, Response } from 'express';
import { catchAsync } from '../../../utils/catchAsync';
import { ApiError } from '../../../utils/ApiError';
import { findAdminByEmail, verifyPassword, generateToken } from './auth.service';

export const login = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as { email: string; password: string };

  const admin = await findAdminByEmail(email);
  if (!admin || !(await verifyPassword(password, admin.password))) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = generateToken({ id: String(admin._id), email: admin.email });

  res.status(200).json({
    access_token: token,
    token_type: 'Bearer',
    expires_in: 3600,
  });
});
