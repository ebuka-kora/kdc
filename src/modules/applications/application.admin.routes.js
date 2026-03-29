const { Router } = require('express');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { validate } = require('../../middlewares/validate.middleware');
const { updateApplicationSchema } = require('./application.schema');
const { getApplications, patchApplication, removeApplication } = require('./application.controller');

const router = Router();

router.use(authMiddleware);

router.get('/admin/applications', getApplications);
router.patch('/admin/applications/:id', validate(updateApplicationSchema), patchApplication);
router.delete('/admin/applications/:id', removeApplication);

module.exports = router;
