import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { env } from './config/env';
import { errorMiddleware } from './middlewares/error.middleware';

import authRoutes from './modules/admin/auth/auth.routes';
import applicationRoutes from './modules/applications/application.routes';
import applicationAdminRoutes from './modules/applications/application.admin.routes';
import eventRoutes from './modules/events/event.routes';
import eventAdminRoutes from './modules/events/event.admin.routes';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/api/v1', authRoutes);
app.use('/api/v1', applicationRoutes);
app.use('/api/v1', applicationAdminRoutes);
app.use('/api/v1', eventRoutes);
app.use('/api/v1', eventAdminRoutes);

// 404
app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use(errorMiddleware);

export default app;
