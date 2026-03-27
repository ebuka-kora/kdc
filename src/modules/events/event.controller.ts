import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { ApiError } from '../../utils/ApiError';
import {
  listPublishedEvents,
  listAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
} from './event.service';

// Public
export const getEvents = catchAsync(async (_req: Request, res: Response): Promise<void> => {
  const events = await listPublishedEvents();
  res.status(200).json(events);
});

export const registerForEventHandler = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    await registerForEvent(req.params['eventId'] as string, req.body);
    res.status(201).json({ message: 'Registration successful' });
  },
);

// Admin
export const adminGetEvents = catchAsync(async (_req: Request, res: Response): Promise<void> => {
  const events = await listAllEvents();
  res.status(200).json(events);
});

export const createEventHandler = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const event = await createEvent(req.body);
  res.status(201).json(event);
});

export const updateEventHandler = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const updated = await updateEvent(req.params['id'] as string, req.body);
  if (!updated) throw new ApiError(404, 'Event not found');
  res.status(200).json(updated);
});

export const deleteEventHandler = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const deleted = await deleteEvent(req.params['id'] as string);
  if (!deleted) throw new ApiError(404, 'Event not found');
  res.status(204).send();
});
