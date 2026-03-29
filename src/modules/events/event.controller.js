const { catchAsync } = require('../../utils/catchAsync');
const { ApiError } = require('../../utils/ApiError');
const {
  listPublishedEvents,
  listAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
} = require('./event.service');

const getEvents = catchAsync(async (_req, res) => {
  const events = await listPublishedEvents();
  res.status(200).json(events);
});

const registerForEventHandler = catchAsync(async (req, res) => {
  await registerForEvent(req.params.eventId, req.body);
  res.status(201).json({ message: 'Registration successful' });
});

const adminGetEvents = catchAsync(async (_req, res) => {
  const events = await listAllEvents();
  res.status(200).json(events);
});

const createEventHandler = catchAsync(async (req, res) => {
  const event = await createEvent(req.body);
  res.status(201).json(event);
});

const updateEventHandler = catchAsync(async (req, res) => {
  const updated = await updateEvent(req.params.id, req.body);
  if (!updated) throw new ApiError(404, 'Event not found');
  res.status(200).json(updated);
});

const deleteEventHandler = catchAsync(async (req, res) => {
  const deleted = await deleteEvent(req.params.id);
  if (!deleted) throw new ApiError(404, 'Event not found');
  res.status(204).send();
});

module.exports = {
  getEvents,
  registerForEventHandler,
  adminGetEvents,
  createEventHandler,
  updateEventHandler,
  deleteEventHandler,
};
