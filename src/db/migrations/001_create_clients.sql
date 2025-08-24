CREATE TABLE clients
(
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    name      TEXT UNIQUE NOT NULL,
    createdAt TEXT        NOT NULL
);
