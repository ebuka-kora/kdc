const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema(
  {
    full_name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    role: { type: String, required: true, trim: true },
    company: { type: String, default: null },
    experience_level: { type: String, required: true, trim: true },
    comments: { type: String, default: null },
    registered_at: { type: Date, default: Date.now },
  },
  { _id: true },
);

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    date: { type: String, required: true },
    format: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, required: true, trim: true, maxlength: 5000 },
    category: { type: String, required: true, trim: true, maxlength: 100 },
    is_published: { type: Boolean, default: false },
    registration_open: { type: Boolean, default: true },
    registrations: { type: [registrationSchema], default: [] },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

const Event = mongoose.model('Event', eventSchema);

module.exports = { Event };
