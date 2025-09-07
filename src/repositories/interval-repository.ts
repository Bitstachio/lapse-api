import { Database } from "better-sqlite3";
import { IInterval, IIntervalCreateDto, IIntervalRow } from "../types/interval";

export class IntervalRepository {
  constructor(private db: Database) {}

  findById(id: number): IInterval | null {
    const row = this.db
      .prepare<[number], IIntervalRow>(
        `
          SELECT *
          FROM intervals
          WHERE id = ?
        `,
      )
      .get(id);
    return row ? { ...row, startTime: new Date(row.startTime) } : null;
  }

  create(interval: IIntervalCreateDto): IInterval {
    const stmt = this.db.prepare(
      "INSERT INTO intervals (startTime, targetDuration, prevSessionsDuration) VALUES (?, ?, ?)",
    );
    const startTime = new Date();
    const result = stmt.run(startTime.toISOString(), interval.targetDuration, 0);
    return {
      id: Number(result.lastInsertRowid),
      startTime,
      targetDuration: interval.targetDuration,
      prevSessionsDuration: 0,
    };
  }
}
