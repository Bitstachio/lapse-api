import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

// point to project root/data/lapse.db
const dbDir = path.join(process.cwd(), "data");
const dbFile = path.join(dbDir, "lapse.db");
const migrationsDir = path.join(__dirname, "migrations");

// ensure the data directory exists
fs.mkdirSync(dbDir, { recursive: true });

// open or create DB file
const db = new Database(dbFile);

// make sure migrations table exists
db.exec(`
  CREATE TABLE IF NOT EXISTS migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    run_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

// type for rows returned from migrations table
interface MigrationRow {
  name: string;
}

// read applied migrations
const appliedMigrations = new Set(
  db
    .prepare<[], MigrationRow>("SELECT name FROM migrations")
    .all()
    .map((row) => row.name),
);

// sort files to ensure order (001_xxx.sql, 002_xxx.sql, etc.)
const files = fs.readdirSync(migrationsDir).sort();

for (const file of files) {
  if (!appliedMigrations.has(file)) {
    const filePath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(filePath, "utf8");

    console.log(`Running migration: ${file}`);
    db.exec(sql);

    db.prepare("INSERT INTO migrations (name) VALUES (?)").run(file);
  }
}
