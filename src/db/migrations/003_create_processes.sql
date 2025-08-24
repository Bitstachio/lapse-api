CREATE TABLE processes
(
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    component  TEXT    NOT NULL,
    quantity   INTEGER NOT NULL,
    state      TEXT    NOT NULL
        CHECK (state IN ('running', 'paused', 'timeout')),
    createdAt  TEXT    NOT NULL,
    intervalId INTEGER NOT NULL,
    clientId   INTEGER NOT NULL,
    FOREIGN KEY (intervalId) REFERENCES intervals (id),
    FOREIGN KEY (clientId) REFERENCES clients (id)
);
