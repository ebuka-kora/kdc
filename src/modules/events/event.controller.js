const { catchAsync } = require('../../utils/catchAsync');
const { Types } = require('mongoose');
const { ApiError } = require('../../utils/ApiError');
const {
  listPublishedEvents,
  listAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  getEventWithRegistrations,
} = require('./event.service');

function registrationCreatedAtIso(value) {
  if (value == null) return null;
  if (value instanceof Date) return value.toISOString();
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

function toRegistrationDto(reg, eventIdStr, index) {
  return {
    id: reg._id != null ? String(reg._id) : `${eventIdStr}:${index}`,
    event_id: eventIdStr,
    full_name: reg.full_name,
    email: reg.email,
    role: reg.role,
    company: reg.company ?? null,
    experience_level: reg.experience_level,
    comments: reg.comments ?? null,
    created_at: registrationCreatedAtIso(reg.registered_at),
  };
}

const toEventDto = (doc) => {
  const createdAtValue = doc.created_at ?? doc.createdAt ?? null;
  const updatedAtValue = doc.updated_at ?? doc.updatedAt ?? null;

  return {
    id: String(doc._id),
    title: doc.title,
    date: doc.date,
    format: doc.format,
    description: doc.description,
    category: doc.category,
    is_published: doc.is_published,
    created_at: createdAtValue?.toISOString?.() ?? createdAtValue,
    updated_at: updatedAtValue?.toISOString?.() ?? updatedAtValue,
  };
};

const getEvents = catchAsync(async (_req, res) => {
  const events = await listPublishedEvents();
  res.status(200).json(events.map(toEventDto));
});

const registerForEventHandler = catchAsync(async (req, res) => {
  await registerForEvent(req.params.eventId, req.body);
  res.status(201).json({ message: 'Registration successful' });
});

const adminGetEvents = catchAsync(async (_req, res) => {
  const events = await listAllEvents();
  res.status(200).json(events.map(toEventDto));
});

const adminGetEventRegistrations = catchAsync(async (req, res) => {
  const { eventId } = req.params;
  if (!Types.ObjectId.isValid(eventId)) {
    res.status(400).json({ message: 'Invalid value for field: _id' });
    return;
  }

  const event = await getEventWithRegistrations(eventId);
  if (!event) throw new ApiError(404, 'Event not found');

  const eventIdStr = String(event._id);
  const regs = event.registrations || [];
  res.status(200).json(regs.map((reg, index) => toRegistrationDto(reg, eventIdStr, index)));
});

const createEventHandler = catchAsync(async (req, res) => {
  const event = await createEvent(req.body);
  res.status(201).json(toEventDto(event));
});

const updateEventHandler = catchAsync(async (req, res) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Invalid value for field: _id' });
    return;
  }

  const updated = await updateEvent(req.params.id, req.body);
  if (!updated) throw new ApiError(404, 'Event not found');
  res.status(200).json(toEventDto(updated));
});

const deleteEventHandler = catchAsync(async (req, res) => {
  if (!Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Invalid value for field: _id' });
    return;
  }

  const deleted = await deleteEvent(req.params.id);
  if (!deleted) throw new ApiError(404, 'Event not found');
  res.status(204).send();
});

module.exports = {
  getEvents,
  registerForEventHandler,
  adminGetEvents,
  adminGetEventRegistrations,
  createEventHandler,
  updateEventHandler,
  deleteEventHandler,
};
