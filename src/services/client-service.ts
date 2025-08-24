import { IClient } from "../types/client";
import { ClientRepository } from "../repositories/client-repository";
import { ClientNotFoundError } from "../errors/process/client-not-found-error";

export class ClientService {
  constructor(private clientRepository: ClientRepository) {}

  findById(id: number): IClient | undefined {
    const client = this.clientRepository.findById(id);
    if (client) return client;
    throw new ClientNotFoundError(id);
  }
}
