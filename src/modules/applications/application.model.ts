import mongoose, { Schema, Document } from 'mongoose';
import { APPLICATION_STATUSES, ApplicationStatus } from '../../constants';

export interface IApplication extends Document {
  full_name: string;
  email: string;
  role: string;
  experience_level: string;
  reason: string;
  linkedin_url: string | null;
  github_url: string | null;
  status: ApplicationStatus;
  created_at: Date;
}

const applicationSchema = new Schema<IApplication>(
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

export const Application = mongoose.model<IApplication>('Application', applicationSchema);
