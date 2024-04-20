import { html } from '@elysiajs/html';
import { swagger } from '@elysiajs/swagger';
import { Layout } from '../components/Layout';
import { createElysia } from '../utils/elysia';

export const app = createElysia()
  .use(swagger())
  .use(html()) 
    .get('/', async (ctx) => {
        return (
          <Layout>
            <button hx-post="test" hx-target="test" hx-swap="innerHTML"></button>
            <p id="test"></p>
          </Layout>
        );
  })


export type App = typeof app;
