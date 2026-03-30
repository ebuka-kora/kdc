const { z } = require('zod');

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const createEventSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200),
  date: z.string().regex(dateRegex, 'Date must be in YYYY-MM-DD format'),
  format: z.string().trim().min(1, 'Format is required').max(100),
  category: z.string().trim().min(1, 'Category is required').max(100),
  description: z.string().trim().min(1, 'Description is required').max(5000),
  is_published: z.boolean().optional().default(false),
  registration_open: z.boolean().optional().default(true),
});

// PATCH: no field defaults — only keys present in the JSON are applied (avoids flipping is_published on partial body).
const updateEventSchema = z
  .object({
    title: z.string().trim().min(1, 'Title is required').max(200).optional(),
    date: z.string().regex(dateRegex, 'Date must be in YYYY-MM-DD format').optional(),
    format: z.string().trim().min(1, 'Format is required').max(100).optional(),
    category: z.string().trim().min(1, 'Category is required').max(100).optional(),
    description: z.string().trim().min(1, 'Description is required').max(5000).optional(),
    is_published: z.boolean().optional(),
    registration_open: z.boolean().optional(),
  })
  .strict();

const registrationSchema = z.object({
  full_name: z.string().trim().min(1, 'Full name is required').max(200),
  email: z.string().trim().toLowerCase().email('Invalid email address').max(254),
  role: z.string().trim().min(1, 'Role is required').max(100),
  company: z.string().trim().max(200).nullable().optional().transform((v) => v ?? null),
  experience_level: z.string().trim().min(1, 'Experience level is required').max(100),
  comments: z.string().trim().max(1000).nullable().optional().transform((v) => v ?? null),
});

module.exports = { createEventSchema, updateEventSchema, registrationSchema };
