import { Router } from 'express';
import { validate } from '../../middlewares/validate.middleware';
import { publicPostLimiter } from '../../middlewares/rateLimiter.middleware';
import { registrationSchema } from './event.schema';
import { getEvents, registerForEventHandler } from './event.controller';

const router = Router();

router.get('/events', getEvents);
router.post(
  '/events/:eventId/registrations',
  publicPostLimiter,
  validate(registrationSchema),
  registerForEventHandler,
);

export default router;
