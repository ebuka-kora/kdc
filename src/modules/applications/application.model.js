const mongoose = require('mongoose');
const { APPLICATION_STATUSES } = require('../../constants');

const applicationSchema = new mongoose.Schema(
  {
    full_name: { type: String, required: true, trim: true, maxlength: 200 },
    email: { type: String, required: true, lowercase: true, trim: true, maxlength: 254 },
    role: { type: String, required: true, trim: true, maxlength: 100 },
    experience_level: { type: String, required: true, trim: true, maxlength: 100 },
    reason: { type: String, required: true, trim: true, maxlength: 2000 },
    linkedin_url: { type: String, default: null, maxlength: 500 },
    github_url: { type: String, default: null, maxlength: 500 },
    status: { type: String, enum: APPLICATION_STATUSES, default: 'pending' },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

const Application = mongoose.model('Application', applicationSchema);

module.exports = { Application };
