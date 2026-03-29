const { connectDB } = require('./config/db');
const { seedAdmin } = require('./modules/admin/auth/auth.service');
const { env } = require('./config/env');
const app = require('./app');

async function bootstrap() {
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
