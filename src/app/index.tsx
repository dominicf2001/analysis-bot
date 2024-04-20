import { html } from '@elysiajs/html';
import { swagger } from '@elysiajs/swagger';
import { Layout } from '../components/Layout';
import { createElysia } from '../utils/elysia';
import { env } from "../env"
import Database from "bun:sqlite";

const db = new Database(env.DB_URL);

export const app = createElysia()
  .use(swagger())
  .use(html()) 
    .get('/', async ctx => {
        return (
          <Layout>
          </Layout>
        );
  })
  // .get('users', async ctx => {
  //     const users: User[] = db.query("select * from users;").all() as User[];
  //     console.log(users);
  //     return (<>
  //        {users.map(user => (
  //           <li> {user.username}</li>
  //         ))}
  //     </>);
  // })

export type App = typeof app;
