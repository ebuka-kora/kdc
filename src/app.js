const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { env } = require('./config/env');
const { errorMiddleware } = require('./middlewares/error.middleware');

const authRoutes = require('./modules/admin/auth/auth.routes');
const applicationRoutes = require('./modules/applications/application.routes');
const applicationAdminRoutes = require('./modules/applications/application.admin.routes');
const eventRoutes = require('./modules/events/event.routes');
const eventAdminRoutes = require('./modules/events/event.admin.routes');

const app = express();
const allowedOrigins = env.CORS_ORIGINS;

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (no Origin header) and configured browser origins.
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  }),
);
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/v1', authRoutes);
app.use('/api/v1', applicationRoutes);
app.use('/api/v1', applicationAdminRoutes);
app.use('/api/v1', eventRoutes);
app.use('/api/v1', eventAdminRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorMiddleware);

module.exports = app;
