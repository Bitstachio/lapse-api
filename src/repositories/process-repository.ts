import { Database } from "better-sqlite3";
import { IProcess, IProcessCreateDto, IProcessRow } from "../types/process";

export class ProcessRepository {
  constructor(private db: Database) {}

  findByClientId(clientId: number): IProcess | undefined {
    const row = this.db.prepare<[number], IProcessRow>(`
      SELECT * FROM processes WHERE clientId = ?
    `).get(clientId);
    return row ? { ...row, createdAt: new Date(row.createdAt) } : undefined;
  }

  create(process: IProcessCreateDto, intervalId: number, clientId: number): IProcess {
    const command = this.db.prepare(`
        INSERT INTO processes (component, quantity, state, createdAt, intervalId, clientId)
        VALUES (?, ?, ?, ?, ?, ?)
    `);
    const result = command.run(
      process.component,
      process.quantity,
      "running",
      new Date().toISOString(),
      intervalId,
      clientId,
    );
    return {
      id: Number(result.lastInsertRowid),
      component: process.component,
      quantity: process.quantity,
      state: "running",
      createdAt: new Date(),
      intervalId,
      clientId,
    };
  }

  pause(clientId: string) {}

  resume(clientId: string) {}

  timeout(clientId: string) {}

  extend(clientId: string) {}

  finish(clientId: string) {}
}
