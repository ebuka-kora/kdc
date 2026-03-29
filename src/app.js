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

app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
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
