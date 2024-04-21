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
    const tableNames = ["users", "types_big_five", "types_f", "types_phil"];
    tableNames.forEach(tableName => {
      db.query(`DROP TABLE IF EXISTS ${tableName}`).run();
    });
}


console.log("Creating tables...");

// Recreate tables
db.query(`CREATE TABLE IF NOT EXISTS users (
  user_id TEXT PRIMARY KEY
)`).run();

// BIG FIVE
db.query(`CREATE TABLE IF NOT EXISTS types_big_five (
  user_id TEXT,
  neuroticsm INTEGER,
  extraversion INTEGER,
  openness INTEGER,
  agreeableness INTEGER,
  conscientiousness INTEGER,
  FOREIGN KEY(user_id) REFERENCES users(user_id)
)`).run();

// F TYPES
db.query(`CREATE TABLE IF NOT EXISTS types_f (
  user_id TEXT,
  a INTEGER,
  b INTEGER,
  c INTEGER,
  d INTEGER,
  FOREIGN KEY(user_id) REFERENCES users(user_id)
)`).run();

// PHIL TYPES
db.query(`CREATE TABLE IF NOT EXISTS types_phil (
  user_id TEXT,
  stoic INTEGER,
  nihil INTEGER,
  absurd INTEGER,
  exist INTEGER,
  empir INTEGER,
  rational INTEGER,
  conf INTEGER,
  determine INTEGER,
  object INTEGER,
  util INTEGER,
  FOREIGN KEY(user_id) REFERENCES users(user_id)
)`).run();

if (values.f){
    console.log("Inserting test data...");
    db.query(`INSERT INTO users (user_id) VALUES ("1234")`).run();
    db.query(`INSERT INTO types_big_five VALUES ("1234", 50, 20, 43, 80, 10)`).run();
}

console.log("Finished...");
