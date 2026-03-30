const { Router } = require('express');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { validate } = require('../../middlewares/validate.middleware');
const { createEventSchema, updateEventSchema } = require('./event.schema');
const {
  adminGetEvents,
  createEventHandler,
  updateEventHandler,
  deleteEventHandler,
} = require('./event.controller');

const router = Router();

router.use('/admin', authMiddleware);

router.get('/admin/events', adminGetEvents);
router.post('/admin/events', validate(createEventSchema), createEventHandler);
router.patch('/admin/events/:id', validate(updateEventSchema), updateEventHandler);
router.delete('/admin/events/:id', deleteEventHandler);

module.exports = router;
