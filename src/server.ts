import { connectDB } from './config/db';
import { seedAdmin } from './modules/admin/auth/auth.service';
import { env } from './config/env';
import app from './app';

async function bootstrap(): Promise<void> {
  await connectDB();
  await seedAdmin();
  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT} [${env.NODE_ENV}]`);
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
