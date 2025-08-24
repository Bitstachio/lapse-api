CREATE TABLE clients
(
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT UNIQUE NOT NULL,
    created_at TEXT        NOT NULL
);
