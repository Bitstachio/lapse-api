import { Database } from "better-sqlite3";
import { IClient, IClientRow } from "../types/client";

export class ClientRepository {
  constructor(private db: Database) {}

  findById(id: number): IClient | undefined {
    const command = this.db.prepare<[number], IClientRow>("SELECT * FROM clients WHERE id = ?");
    const row = command.get(id);
    return row ? { ...row, createdAt: new Date(row.createdAt) } : undefined;
  }
}
