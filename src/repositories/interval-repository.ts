import { Database } from "better-sqlite3";
import { IIntervalCreateDto } from "../types/interval";

export class IntervalRepository {
  constructor(private db: Database) {}

  create(interval: IIntervalCreateDto) {
    const stmt = this.db.prepare(
      "INSERT INTO intervals (start_time, target_duration, prev_sessions_duration) VALUES (?, ?, ?)",
    );
    const result = stmt.run(new Date().toISOString(), interval.targetDuration, 0);
    return {
      id: Number(result.lastInsertRowid),
      targetDuration: interval.targetDuration,
      prevSessionsDuration: 0,
    };
  }
}
