import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { ApiError } from '../../utils/ApiError';
import {
  createApplication,
  listApplications,
  updateApplication,
  deleteApplication,
} from './application.service';

// Public
export const submitApplication = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const application = await createApplication(req.body);
  res.status(201).json(application);
});

// Admin
export const getApplications = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { status, search } = req.query as { status?: string; search?: string };
  const applications = await listApplications({ status, search });
  res.status(200).json(applications);
});

export const patchApplication = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const updated = await updateApplication(req.params['id'] as string, req.body);
  if (!updated) throw new ApiError(404, 'Application not found');
  res.status(200).json(updated);
});

export const removeApplication = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const deleted = await deleteApplication(req.params['id'] as string);
  if (!deleted) throw new ApiError(404, 'Application not found');
  res.status(204).send();
});
