import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validate.middleware';
import { updateApplicationSchema } from './application.schema';
import { getApplications, patchApplication, removeApplication } from './application.controller';

const router = Router();

router.use(authMiddleware);

router.get('/admin/applications', getApplications);
router.patch('/admin/applications/:id', validate(updateApplicationSchema), patchApplication);
router.delete('/admin/applications/:id', removeApplication);

export default router;
