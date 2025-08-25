import { Database } from "better-sqlite3";
import { IProcessCreateDto } from "../types/process";

export class ProcessRepository {
  constructor(private db: Database) {}

  create(process: IProcessCreateDto, intervalId: number, clientId: number) {
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
      createdAt: new Date().toISOString(),
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
