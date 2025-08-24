CREATE TABLE intervals
(
    id                     INTEGER PRIMARY KEY AUTOINCREMENT,
    start_time             TEXT    NOT NULL,
    target_duration        INTEGER NOT NULL,
    prev_sessions_duration INTEGER NOT NULL
);
