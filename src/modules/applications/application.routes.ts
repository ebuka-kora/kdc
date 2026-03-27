import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware';
import { publicPostLimiter } from '../../middlewares/rateLimiter.middleware';
import { createApplicationSchema } from './application.schema';
import { submitApplication } from './application.controller';

const router = Router();

router.post('/applications', publicPostLimiter, validate(createApplicationSchema), submitApplication);

export default router;
