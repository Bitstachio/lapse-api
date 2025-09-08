// ===== Models =====

export interface IClient {
  id: number;
  name: string;
  createdAt: Date;
}

export interface IClientRow {
  id: number;
  name: string;
  createdAt: string;
}

// ===== DTOs =====

export interface IClientIdentifier {
  clientName: string;
}
