const { Router } = require('express');
const { validate } = require('../../../middlewares/validate.middleware');
const { loginLimiter } = require('../../../middlewares/rateLimiter.middleware');
const { loginSchema } = require('./auth.schema');
const { login } = require('./auth.controller');

const router = Router();

router.post('/admin/auth/login', loginLimiter, validate(loginSchema), login);

module.exports = router;
