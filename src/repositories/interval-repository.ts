import { Database } from "better-sqlite3";
import { IIntervalCreateDto } from "../types/process";

export class IntervalRepository {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  create(interval: IIntervalCreateDto) {
    const stmt = this.db.prepare("INSERT INTO  (startTime, targetDuration, prevSessionsDuration) VALUES (?, ?, ?)");
    const result = stmt.run(new Date().toISOString, interval.targetDuration, 0);
    return {
      id: Number(result.lastInsertRowid),
      targetDuration: interval.targetDuration,
      prevSessionsDuration: 0,
    };
  }
}
