CREATE TABLE intervals
(
    id                   INTEGER PRIMARY KEY AUTOINCREMENT,
    startTime            TEXT    NOT NULL,
    targetDuration       INTEGER NOT NULL,
    prevSessionsDuration INTEGER NOT NULL
);
