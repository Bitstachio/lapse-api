import { Database } from "better-sqlite3";
import { IProcess, IProcessCreateDto, IProcessGetDto, IProcessRow } from "../types/process";

export class ProcessRepository {
  constructor(private db: Database) {}

  findById = (id: number): IProcess | undefined => {
    const row = this.db.prepare<[number], IProcessRow>(`
      SELECT * FROM processes WHERE id = ?
    `).get(id);
    return row ? { ...row, createdAt: new Date(row.createdAt) } : undefined;
  }

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

  update = (id: number, changes: Partial<IProcess>): IProcess | undefined => {
    const keys = Object.keys(changes) as (keyof IProcessRow)[];
    if (keys.length === 0) return this.findById(id);

    // Build SET clause dynamically: "field1 = ?, field2 = ?"
    const setClause = keys.map((key) => `${key} = ?`).join(", ");
    const values = keys.map((key) => (changes)[key]);

    const result = this.db.prepare(`
      UPDATE processes SET ${setClause} WHERE id = ?
    `).run(...values, id);

    if (result.changes === 0) return undefined;
    return this.findById(id);
  }

  pause(clientId: string) {}

  resume(clientId: string) {}

  timeout(clientId: string) {}

  extend(clientId: string) {}

  finish(clientId: string) {}
}
