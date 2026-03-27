import { Router } from 'express';
import { validate } from '../../../middlewares/validate.middleware';
import { loginLimiter } from '../../../middlewares/rateLimiter.middleware';
import { loginSchema } from './auth.schema';
import { login } from './auth.controller';

const router = Router();

router.post('/admin/auth/login', loginLimiter, validate(loginSchema), login);

export default router;
