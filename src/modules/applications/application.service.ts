import { Document } from 'mongoose';
import { Application, IApplication } from './application.model';
import { ApplicationStatus } from '../../constants';

export async function createApplication(
  data: Omit<IApplication, keyof Document | 'status' | 'created_at'>,
): Promise<IApplication> {
  return Application.create(data);
}

export async function listApplications(filters: {
  status?: string;
  search?: string;
}): Promise<IApplication[]> {
  const query: Record<string, unknown> = {};

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.search) {
    const regex = new RegExp(filters.search, 'i');
    query.$or = [{ full_name: regex }, { email: regex }, { role: regex }];
  }

  return Application.find(query).sort({ created_at: -1 }).lean();
}

export async function getApplicationById(id: string): Promise<IApplication | null> {
  return Application.findById(id);
}

export async function updateApplication(
  id: string,
  data: { status: ApplicationStatus },
): Promise<IApplication | null> {
  return Application.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteApplication(id: string): Promise<boolean> {
  const result = await Application.findByIdAndDelete(id);
  return result !== null;
}
