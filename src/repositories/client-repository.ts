import { Database } from "better-sqlite3";
import { IClient, IClientRow } from "../types/client";

export class ClientRepository {
  constructor(private db: Database) {}

  findByName(name: string): IClient | null {
    const command = this.db.prepare<[string], IClientRow>("SELECT * FROM clients WHERE name = ?");
    const row = command.get(name);
    return row ? { ...row, createdAt: new Date(row.createdAt) } : null;
  }
}
