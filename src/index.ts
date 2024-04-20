import { Elysia } from "elysia";
import Database from "bun:sqlite";

const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

const db = new Database("db.sqlite");
db.query("CREATE TABLE test (valOne, valTwo);").run();
db.close();
