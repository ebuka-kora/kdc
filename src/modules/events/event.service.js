const { Event } = require('./event.model');
const { ApiError } = require('../../utils/ApiError');

async function listPublishedEvents() {
  return Event.find({ is_published: true }, { registrations: 0 }).sort({ date: 1 }).lean();
}

async function listAllEvents() {
  return Event.find({}, { registrations: 0 }).sort({ date: 1 }).lean();
}

async function createEvent(data) {
  return Event.create(data);
}

async function updateEvent(id, data) {
  return Event.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

async function deleteEvent(id) {
  const result = await Event.findByIdAndDelete(id);
  return result !== null;
}

async function registerForEvent(eventId, data) {
  const event = await Event.findById(eventId);
  if (!event) throw new ApiError(404, 'Event not found');
  if (!event.is_published) throw new ApiError(404, 'Event not found');

  event.registrations.push({ ...data, registered_at: new Date() });
  await event.save();
}

module.exports = {
  listPublishedEvents,
  listAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
};
