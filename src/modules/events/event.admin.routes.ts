import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { createEventSchema, updateEventSchema } from './event.schema';
import {
  adminGetEvents,
  createEventHandler,
  updateEventHandler,
  deleteEventHandler,
} from './event.controller';

const router = Router();

router.use(authMiddleware);

router.get('/admin/events', adminGetEvents);
router.post('/admin/events', validate(createEventSchema), createEventHandler);
router.patch('/admin/events/:id', validate(updateEventSchema), updateEventHandler);
router.delete('/admin/events/:id', deleteEventHandler);

export default router;
