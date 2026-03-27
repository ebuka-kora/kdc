import { Event, IEvent, IRegistration } from './event.model';
import { ApiError } from '../../utils/ApiError';

export async function listPublishedEvents(): Promise<IEvent[]> {
  return Event.find({ is_published: true }, { registrations: 0 }).sort({ date: 1 }).lean();
}

export async function listAllEvents(): Promise<IEvent[]> {
  return Event.find({}, { registrations: 0 }).sort({ date: 1 }).lean();
}

export async function createEvent(data: Partial<IEvent>): Promise<IEvent> {
  return Event.create(data);
}

export async function updateEvent(id: string, data: Partial<IEvent>): Promise<IEvent | null> {
  return Event.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export async function deleteEvent(id: string): Promise<boolean> {
  const result = await Event.findByIdAndDelete(id);
  return result !== null;
}

export async function registerForEvent(
  eventId: string,
  data: Omit<IRegistration, 'registered_at'>,
): Promise<void> {
  const event = await Event.findById(eventId);
  if (!event) throw new ApiError(404, 'Event not found');
  if (!event.is_published) throw new ApiError(404, 'Event not found');

  event.registrations.push({ ...data, registered_at: new Date() });
  await event.save();
}
