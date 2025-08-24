CREATE TABLE processes
(
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    component   TEXT    NOT NULL,
    quantity    INTEGER NOT NULL,
    state       TEXT    NOT NULL
        CHECK (state IN ('running', 'paused', 'timeout')),
    created_at  TEXT    NOT NULL,
    interval_id INTEGER NOT NULL,
    client_id   INTEGER NOT NULL,
    FOREIGN KEY (interval_id) REFERENCES intervals (id),
    FOREIGN KEY (client_id) REFERENCES clients (id)
);
