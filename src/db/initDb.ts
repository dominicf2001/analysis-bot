import Database from "bun:sqlite";
import { parseArgs } from "util";

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

const db = new Database("db.sqlite");

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
  username TEXT PRIMARY KEY
)`).run();

// BIG FIVE
db.query(`CREATE TABLE IF NOT EXISTS types_big_five (
  username TEXT,
  neuro INTEGER,
  extrav INTEGER,
  open INTEGER,
  agree INTEGER,
  con INTEGER,
  FOREIGN KEY(username) REFERENCES users(username)
)`).run();

// F TYPES
db.query(`CREATE TABLE IF NOT EXISTS types_f (
  username TEXT,
  a INTEGER,
  b INTEGER,
  c INTEGER,
  d INTEGER,
  FOREIGN KEY(username) REFERENCES users(username)
)`).run();

// PHIL TYPES
db.query(`CREATE TABLE IF NOT EXISTS types_phil (
  username TEXT,
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
  FOREIGN KEY(username) REFERENCES users(username)
)`).run();

if (values.f){
    console.log("Inserting test data...");
    db.query(`INSERT INTO users (username) VALUES ("sally")`).run();
    db.query(`INSERT INTO types_big_five VALUES ("sally", 50, 20, 43, 80, 10)`).run();
}

console.log("Finished...");
