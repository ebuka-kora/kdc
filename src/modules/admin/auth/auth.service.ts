import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose, { Schema, Document } from 'mongoose';
import { env } from '../../../config/env';

interface IAdmin extends Document {
  email: string;
  password: string;
}

const adminSchema = new Schema<IAdmin>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

export const Admin = mongoose.model<IAdmin>('Admin', adminSchema);

export async function findAdminByEmail(email: string): Promise<IAdmin | null> {
  return Admin.findOne({ email });
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export function generateToken(payload: { id: string; email: string }): string {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN } as jwt.SignOptions);
}

export async function seedAdmin(): Promise<void> {
  if (!env.ADMIN_SEED_EMAIL || !env.ADMIN_SEED_PASSWORD) return;
  const exists = await Admin.findOne({ email: env.ADMIN_SEED_EMAIL });
  if (!exists) {
    const hash = await bcrypt.hash(env.ADMIN_SEED_PASSWORD, 12);
    await Admin.create({ email: env.ADMIN_SEED_EMAIL, password: hash });
    console.log(`Admin seeded: ${env.ADMIN_SEED_EMAIL}`);
  }
}
