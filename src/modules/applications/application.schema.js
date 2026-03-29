const { z } = require('zod');
const { APPLICATION_STATUSES } = require('../../constants');

const urlOrNull = z
  .string()
  .max(500)
  .refine(
    (val) => {
      if (!val) return true;
      try {
        const url = new URL(val);
        return url.protocol === 'http:' || url.protocol === 'https:';
      } catch {
        return false;
      }
    },
    { message: 'Must be a valid http/https URL' },
  )
  .nullable()
  .optional()
  .transform((val) => val ?? null);

const createApplicationSchema = z.object({
  full_name: z.string().trim().min(1, 'Full name is required').max(200),
  email: z.string().trim().toLowerCase().email('Invalid email address').max(254),
  role: z.string().trim().min(1, 'Role is required').max(100),
  experience_level: z.string().trim().min(1, 'Experience level is required').max(100),
  reason: z.string().trim().min(1, 'Reason is required').max(2000),
  linkedin_url: urlOrNull,
  github_url: urlOrNull,
});

const updateApplicationSchema = z.object({
  status: z.enum(APPLICATION_STATUSES, {
    error: `Status must be one of: ${APPLICATION_STATUSES.join(', ')}`,
  }),
});

module.exports = { createApplicationSchema, updateApplicationSchema };
