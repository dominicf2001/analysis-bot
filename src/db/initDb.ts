import Database from "bun:sqlite";
import { parseArgs } from "util";
// import { env } from "../env"
 
const { values } = parseArgs({
  args: Bun.argv,
  options: {
    f: {
      type: 'boolean',
    },
  },
  strict: true,
  allowPositionals: true
});

const db = new Database("./db.sqlite");

// delete tables
if (values.f){
    console.log("Dropping tables...");
    const tableNames = ["users", "user_positivity_history", "servers"];
    tableNames.forEach(tableName => {
      db.query(`DROP TABLE IF EXISTS ${tableName}`).run();
    });
}

console.log("Creating tables...");

// Recreate tables
db.query(`CREATE TABLE IF NOT EXISTS users (
  user_id TEXT PRIMARY KEY,
  positivity INTEGER
)`).run();

db.query(`CREATE TABLE IF NOT EXISTS user_positivity_history (
  positivity INTEGER,
  timestamp DATE,
  PRIMARY KEY (user_id, timestamp),
)`).run();

db.query(`CREATE TABLE IF NOT EXISTS servers (
  server_id TEXT PRIMARY KEY,
  channel_ids TEXT
)`).run();

if (values.f){
    console.log("Inserting test data...");
    db.query(`INSERT INTO users VALUES ("fred", 50)`).run();
    db.query(`INSERT INTO users VALUES ("sally", 20)`).run();
}

console.log("Finished...");
