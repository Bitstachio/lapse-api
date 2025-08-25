import Database from "better-sqlite3";

const db = new Database("data/lapse.db", { verbose: console.log });

export default db;
