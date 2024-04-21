import { html } from '@elysiajs/html';
import { swagger } from '@elysiajs/swagger';
import { Layout } from '../components/Layout';
import { createElysia } from '../utils/elysia';
import { env } from "../env"
import Database from "bun:sqlite";
import { User } from '../db/models';
import { Dashboard } from '../components/Dashboard';
import { Home } from '../components/Home';

const db = new Database(env.DB_URL);

export const app = createElysia()
  .use(swagger())
  .use(html())
    .get('/', async ctx => {
        return (
          <Layout>
            <Home></Home>
          </Layout>
        );
  })
  .get('dashboard/:server_id', ctx => {
      return (
          <Layout>
            <Dashboard serverId={ctx.params.server_id}></Dashboard>
          </Layout>
    );
  })
  .get('dashboard/users/:server_id', async ctx => {
      const users: User[] = db.query("select user_id, positivity, neutral, negativity from users natural join servers where server_id = ?").all(ctx.params.server_id) as User[];
      return users;
  })
  .get('user/:user_id', async ctx => {
      const user: User = db.query("select * from users where user_id = ?").get(ctx.params.user_id) as User;
      return user;
  })

export type App = typeof app;
