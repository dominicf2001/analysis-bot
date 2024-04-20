import staticPlugin from '@elysiajs/static';
import { app } from './app';
import { env } from './env';
import { createElysia } from './utils/elysia';

const server = createElysia()
  .use(staticPlugin())
  // Routes
  .use(app);

server.listen({ port: env.PORT }, ({ hostname, port }) => {
  const url = env.NODE_ENV === 'production' ? 'https' : 'http';

  console.log(`🦊 Elysia is running at ${url}://${hostname}:${port}`);
});
