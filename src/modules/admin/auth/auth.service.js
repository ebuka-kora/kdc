const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { env } = require('../../../config/env');

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

const Admin = mongoose.model('Admin', adminSchema);

async function findAdminByEmail(email) {
  return Admin.findOne({ email });
}

async function verifyPassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

function generateToken(payload) {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
}

async function seedAdmin() {
  if (!env.ADMIN_SEED_EMAIL || !env.ADMIN_SEED_PASSWORD) return;
  const exists = await Admin.findOne({ email: env.ADMIN_SEED_EMAIL });
  if (!exists) {
    const hash = await bcrypt.hash(env.ADMIN_SEED_PASSWORD, 12);
    await Admin.create({ email: env.ADMIN_SEED_EMAIL, password: hash });
    console.log(`Admin seeded: ${env.ADMIN_SEED_EMAIL}`);
  }
}

module.exports = {
  Admin,
  findAdminByEmail,
  verifyPassword,
  generateToken,
  seedAdmin,
};
