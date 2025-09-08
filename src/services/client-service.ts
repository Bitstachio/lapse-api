import { ClientRepository } from "../repositories/client-repository";
import { ClientNotFoundError } from "../errors/process/client-not-found-error";
import { IClient } from "../types/client";

export class ClientService {
  constructor(private repo: ClientRepository) {}

  getByName(name: string): IClient {
    const client = this.repo.findByName(name);
    if (client) return client;
    throw new ClientNotFoundError("name", name);
  }
}
