const { Router } = require('express');
const { validate } = require('../../middlewares/validate.middleware');
const { publicPostLimiter } = require('../../middlewares/rateLimiter.middleware');
const { createApplicationSchema } = require('./application.schema');
const { submitApplication } = require('./application.controller');

const router = Router();

router.post('/applications', publicPostLimiter, validate(createApplicationSchema), submitApplication);

module.exports = router;
