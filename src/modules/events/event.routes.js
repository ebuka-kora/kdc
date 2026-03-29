const { Router } = require('express');
const { validate } = require('../../middlewares/validate.middleware');
const { publicPostLimiter } = require('../../middlewares/rateLimiter.middleware');
const { registrationSchema } = require('./event.schema');
const { getEvents, registerForEventHandler } = require('./event.controller');

const router = Router();

router.get('/events', getEvents);
router.post(
  '/events/:eventId/registrations',
  publicPostLimiter,
  validate(registrationSchema),
  registerForEventHandler,
);

module.exports = router;
